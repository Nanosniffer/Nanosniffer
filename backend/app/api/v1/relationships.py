import json
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, Query, Request, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import get_client_info, get_current_user, get_db, require_role
from app.core.exceptions import NotFoundException
from app.graph.sync_service import graph_sync
from app.models.entity import Entity
from app.models.relationship import Relationship
from app.models.user import User
from app.schemas.common import APIResponseEnvelope, PaginatedResponseEnvelope, PaginationMeta, SuccessMessage
from app.schemas.relationship import (
    BulkRelationshipImport,
    RelationshipCreate,
    RelationshipRead,
    RelationshipUpdate,
)
from app.services.audit_service import audit_service

router = APIRouter(prefix="/relationships", tags=["Relationship Graph Edges"])


def _format_rel_read(r: Relationship) -> RelationshipRead:
    meta = {}
    if r.metadata_json:
        try:
            meta = json.loads(r.metadata_json)
        except Exception:
            meta = {}
    return RelationshipRead(
        id=r.id,
        source_id=r.source_id,
        target_id=r.target_id,
        relationship_type=r.relationship_type,
        details=r.details or "",
        amount=r.amount,
        frequency=r.frequency,
        risk_level=r.risk_level,
        confidence_score=r.confidence_score,
        evidence_reference=r.evidence_reference,
        metadata=meta,
        last_interaction=r.last_interaction,
        created_at=r.created_at,
        updated_at=r.updated_at,
    )


@router.post("", response_model=APIResponseEnvelope[RelationshipRead], status_code=status.HTTP_201_CREATED)
async def create_relationship(
    payload: RelationshipCreate,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
    db: Session = Depends(get_db),
):
    """Create a new typed relationship edge between two entities and sync to Neo4j."""
    res1 = db.execute(select(Entity).where(Entity.id == payload.source_id))
    e1 = res1.scalars().first()
    res2 = db.execute(select(Entity).where(Entity.id == payload.target_id))
    e2 = res2.scalars().first()

    if not e1 or not e2:
        raise NotFoundException("Source or target entity for relationship does not exist.")

    new_rel = Relationship(
        source_id=payload.source_id,
        target_id=payload.target_id,
        relationship_type=payload.relationship_type,
        details=payload.details,
        amount=payload.amount,
        frequency=payload.frequency or 1.0,
        risk_level=payload.risk_level or "MEDIUM",
        confidence_score=payload.confidence_score,
        evidence_reference=payload.evidence_reference,
        metadata_json=json.dumps(payload.metadata or {}),
        last_interaction=datetime.now(timezone.utc),
    )
    db.add(new_rel)
    db.commit()
    db.refresh(new_rel)

    # Sync to Graph
    await graph_sync.sync_relationship(new_rel)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="CREATE",
        resource_type="RELATIONSHIP",
        resource_id=new_rel.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={"source": payload.source_id, "target": payload.target_id, "type": payload.relationship_type},
        **client_info,
    )

    return APIResponseEnvelope(data=_format_rel_read(new_rel))


@router.get("", response_model=PaginatedResponseEnvelope[RelationshipRead])
def list_relationships(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=200),
    source_id: Optional[str] = None,
    target_id: Optional[str] = None,
    rel_type: Optional[str] = None,
    min_confidence: Optional[float] = None,
    db: Session = Depends(get_db),
):
    """List relationships with filtering and pagination."""
    query = select(Relationship)

    if source_id:
        query = query.where(Relationship.source_id == source_id)
    if target_id:
        query = query.where(Relationship.target_id == target_id)
    if rel_type:
        query = query.where(Relationship.relationship_type == rel_type)
    if min_confidence is not None:
        query = query.where(Relationship.confidence_score >= min_confidence)

    count_query = select(func.count(Relationship.id))
    if source_id:
        count_query = count_query.where(Relationship.source_id == source_id)
    if target_id:
        count_query = count_query.where(Relationship.target_id == target_id)
    if rel_type:
        count_query = count_query.where(Relationship.relationship_type == rel_type)
    total = db.execute(count_query).scalar() or 0

    offset = (page - 1) * limit
    results = db.execute(query.offset(offset).limit(limit).order_by(Relationship.created_at.desc())).scalars().all()

    total_pages = max(1, (total + limit - 1) // limit)
    meta = PaginationMeta(
        page=page,
        limit=limit,
        total=total,
        total_pages=total_pages,
        has_next=page < total_pages,
        has_prev=page > 1,
    )
    return PaginatedResponseEnvelope(
        data=[_format_rel_read(r) for r in results],
        meta=meta,
    )


@router.get("/{rel_id}", response_model=APIResponseEnvelope[RelationshipRead])
def get_relationship_by_id(
    rel_id: str,
    db: Session = Depends(get_db),
):
    """Retrieve single relationship edge by ID."""
    result = db.execute(select(Relationship).where(Relationship.id == rel_id))
    rel = result.scalars().first()
    if not rel:
        raise NotFoundException(f"Relationship '{rel_id}' not found.")
    return APIResponseEnvelope(data=_format_rel_read(rel))


@router.patch("/{rel_id}", response_model=APIResponseEnvelope[RelationshipRead])
async def update_relationship(
    rel_id: str,
    payload: RelationshipUpdate,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
    db: Session = Depends(get_db),
):
    """Update relationship metadata and confidence."""
    result = db.execute(select(Relationship).where(Relationship.id == rel_id))
    rel = result.scalars().first()
    if not rel:
        raise NotFoundException(f"Relationship '{rel_id}' not found.")

    update_dict = payload.model_dump(exclude_unset=True)
    if "metadata" in update_dict:
        rel.metadata_json = json.dumps(update_dict.pop("metadata"))

    for k, v in update_dict.items():
        setattr(rel, k, v)

    rel.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(rel)

    # Sync update to Graph
    await graph_sync.sync_relationship(rel)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="UPDATE",
        resource_type="RELATIONSHIP",
        resource_id=rel.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details=update_dict,
        **client_info,
    )

    return APIResponseEnvelope(data=_format_rel_read(rel))


@router.delete("/{rel_id}", response_model=APIResponseEnvelope[SuccessMessage])
async def delete_relationship(
    rel_id: str,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR"])),
    db: Session = Depends(get_db),
):
    """Delete relationship edge from Postgres and Neo4j."""
    result = db.execute(select(Relationship).where(Relationship.id == rel_id))
    rel = result.scalars().first()
    if not rel:
        raise NotFoundException(f"Relationship '{rel_id}' not found.")

    db.delete(rel)
    db.commit()

    # Remove from Graph
    await graph_sync.remove_relationship(rel_id)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="DELETE",
        resource_type="RELATIONSHIP",
        resource_id=rel_id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={},
        **client_info,
    )

    return APIResponseEnvelope(data=SuccessMessage(success=True, message=f"Relationship {rel_id} deleted."))


@router.post("/bulk-import", response_model=APIResponseEnvelope[SuccessMessage])
async def bulk_import_relationships(
    payload: BulkRelationshipImport,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR"])),
    db: Session = Depends(get_db),
):
    """Bulk import multiple relationship edges from case evidence imports."""
    count = 0
    for item in payload.relationships:
        new_rel = Relationship(
            source_id=item.source_id,
            target_id=item.target_id,
            relationship_type=item.relationship_type,
            details=item.details,
            amount=item.amount,
            frequency=item.frequency or 1.0,
            risk_level=item.risk_level or "MEDIUM",
            confidence_score=item.confidence_score,
            evidence_reference=item.evidence_reference,
            metadata_json=json.dumps(item.metadata or {}),
            last_interaction=datetime.now(timezone.utc),
        )
        db.add(new_rel)
        db.flush()
        await graph_sync.sync_relationship(new_rel)
        count += 1

    db.commit()

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="BULK_IMPORT",
        resource_type="RELATIONSHIP",
        resource_id=None,
        user_id=current_user.id,
        user_email=current_user.email,
        details={"count": count},
        **client_info,
    )

    return APIResponseEnvelope(
        data=SuccessMessage(success=True, message=f"Successfully imported {count} relationships.")
    )
