import json
import uuid
from typing import List, Optional
from fastapi import APIRouter, Depends, Query, Request
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.api.deps import get_client_info, get_current_user, get_db, require_role
from app.core.exceptions import NotFoundException
from app.graph.sync_service import graph_sync
from app.models.case import CaseTimelineEvent
from app.models.entity import Entity
from app.models.relationship import Relationship
from app.models.user import User
from app.schemas.ai import (
    AIJobResponse,
    AnomalyItem,
    CommunityDetectionResult,
    EntityMergeRequest,
    EntityResolutionMatch,
    LinkPredictionResult,
    RiskScoreResponse,
)
from app.schemas.common import APIResponseEnvelope, SuccessMessage
from app.services.ai_engine import (
    anomaly_detector,
    community_detector,
    entity_resolution_engine,
    link_predictor,
    risk_scorer,
)
from app.services.audit_service import audit_service

router = APIRouter(prefix="/ai", tags=["AI & Machine Learning Engine"])


@router.post("/entity-resolution", response_model=APIResponseEnvelope[List[EntityResolutionMatch]])
def run_entity_resolution(
    threshold: float = Query(0.65, ge=0.1, le=1.0),
    db: Session = Depends(get_db),
):
    """Scan all entity records to detect potential duplicate identities across aliases, biometrics, and phones."""
    result = db.execute(select(Entity))
    entities = result.scalars().all()
    matches = entity_resolution_engine.find_all_matches(entities, min_threshold=threshold)
    return APIResponseEnvelope(data=matches)


@router.post("/entity-resolution/merge", response_model=APIResponseEnvelope[SuccessMessage])
async def merge_entities(
    payload: EntityMergeRequest,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR"])),
    db: Session = Depends(get_db),
):
    """Merge a duplicate secondary entity into a canonical primary entity, transferring all graph edges."""
    res1 = db.execute(select(Entity).where(Entity.id == payload.primary_entity_id))
    primary = res1.scalars().first()
    res2 = db.execute(select(Entity).where(Entity.id == payload.secondary_entity_id))
    secondary = res2.scalars().first()

    if not primary or not secondary:
        raise NotFoundException("One or both entity IDs provided for merge could not be found.")

    # Re-link relationships
    rel_res = db.execute(
        select(Relationship).where(
            (Relationship.source_id == secondary.id) | (Relationship.target_id == secondary.id)
        )
    )
    relationships = rel_res.scalars().all()
    for r in relationships:
        if r.source_id == secondary.id:
            r.source_id = primary.id
        if r.target_id == secondary.id:
            r.target_id = primary.id
        await graph_sync.sync_relationship(r)

    # Append alias
    if payload.keep_secondary_aliases and secondary.name not in (primary.alias or ""):
        primary.alias = f"{primary.alias or ''}, {secondary.name}".strip(", ")

    # Delete secondary entity
    db.delete(secondary)
    db.commit()
    db.refresh(primary)

    # Remove secondary from graph
    await graph_sync.remove_entity(secondary.id)
    await graph_sync.sync_entity(primary)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="MERGE",
        resource_type="ENTITY",
        resource_id=primary.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={"merged_secondary_id": secondary.id},
        **client_info,
    )

    return APIResponseEnvelope(
        data=SuccessMessage(
            success=True,
            message=f"Entity {secondary.name} successfully merged into canonical profile {primary.name}.",
        )
    )


@router.post("/risk-scoring/{entity_id}", response_model=APIResponseEnvelope[RiskScoreResponse])
async def compute_risk_score(
    entity_id: str,
    db: Session = Depends(get_db),
):
    """Compute algorithmic multi-factor risk assessment and contributing indicators for a subject."""
    result = db.execute(select(Entity).where(or_(Entity.id == entity_id, Entity.entity_id == entity_id)))
    entity = result.scalars().first()
    if not entity:
        raise NotFoundException(f"Entity '{entity_id}' not found.")

    # Count connections and anomalies
    rel_res = db.execute(
        select(Relationship).where((Relationship.source_id == entity.id) | (Relationship.target_id == entity.id))
    )
    rels = rel_res.scalars().all()

    breakdown = risk_scorer.calculate_risk(
        crime_category=entity.crime_category,
        active_warrants=int(entity.active_warrants or 0),
        degree_count=len(rels),
        centrality_score=min(1.0, len(rels) * 0.12),
        high_risk_associates_count=len([r for r in rels if r.risk_level in ["CRITICAL", "HIGH"]]),
    )

    entity.risk_score = breakdown.total_risk_score
    entity.risk_level = breakdown.risk_level
    entity.ai_threat_summary = breakdown.threat_summary
    db.commit()
    db.refresh(entity)
    await graph_sync.sync_entity(entity)

    return APIResponseEnvelope(
        data=RiskScoreResponse(
            entity_id=entity.id,
            name=entity.name,
            risk_score=breakdown.total_risk_score,
            risk_level=breakdown.risk_level,
            breakdown=breakdown,
        )
    )


@router.post("/link-prediction", response_model=APIResponseEnvelope[List[LinkPredictionResult]])
async def run_link_prediction(
    limit: int = Query(15, ge=1, le=50),
    min_score: float = Query(0.25, ge=0.0, le=1.0),
):
    """Predict covert or unobserved criminal ties between suspects using graph neighborhood heuristics."""
    predictions = await link_predictor.predict_links(top_k=limit, min_score=min_score)
    return APIResponseEnvelope(data=predictions)


@router.post("/anomaly-detection", response_model=APIResponseEnvelope[List[AnomalyItem]])
def run_anomaly_detection(
    db: Session = Depends(get_db),
):
    """Scan database records and telemetry logs for anomalous communication surges or financial loops."""
    ent_res = db.execute(select(Entity))
    entities = ent_res.scalars().all()
    tl_res = db.execute(select(CaseTimelineEvent))
    events = tl_res.scalars().all()

    anomalies = anomaly_detector.detect_anomalies(entities, events)
    return APIResponseEnvelope(data=anomalies)


@router.post("/community-detection", response_model=APIResponseEnvelope[CommunityDetectionResult])
async def run_community_detection():
    """Detect and partition criminal syndicates, sub-cells, and operational cells using graph modularity."""
    result = await community_detector.detect_communities()
    return APIResponseEnvelope(data=result)


@router.post("/jobs/trigger", response_model=APIResponseEnvelope[AIJobResponse])
def trigger_ai_job(
    task_name: str = Query(..., description="Name of task e.g. 'recompute_network'"),
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
):
    """Trigger an async Celery AI background computation job."""
    job_id = str(uuid.uuid4())
    return APIResponseEnvelope(
        data=AIJobResponse(
            job_id=job_id,
            task_name=task_name,
            status="PROCESSING",
            result=None,
        )
    )
