import json
from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, Query, Request, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.api.deps import get_client_info, get_current_user, get_db, require_role
from app.core.exceptions import NotFoundException
from app.graph.sync_service import graph_sync
from app.models.entity import Entity
from app.models.relationship import Relationship
from app.models.case import CaseTimelineEvent
from app.models.user import User
from app.schemas.common import APIResponseEnvelope, PaginatedResponseEnvelope, PaginationMeta, SuccessMessage
from app.schemas.entity import EntityCreate, EntityRead, EntityUpdate
from app.services.ai_engine.risk_scorer import risk_scorer
from app.services.audit_service import audit_service

router = APIRouter(prefix="/entities", tags=["Entities & Criminals"])


def _format_entity_read(e: Entity) -> EntityRead:
    personal_details = {}
    if e.personal_details_json:
        try:
            personal_details = json.loads(e.personal_details_json)
        except Exception:
            personal_details = {}

    type_data = {}
    if e.type_specific_data_json:
        try:
            type_data = json.loads(e.type_specific_data_json)
        except Exception:
            type_data = {}

    tags = []
    if e.tags_json:
        try:
            tags = json.loads(e.tags_json)
        except Exception:
            tags = []

    last_known_location = {
        "address": e.address or "Unknown",
        "city": e.city or "New York",
        "state": e.state or "NY",
        "country": e.country or "USA",
        "coordinates": [e.latitude or 40.7128, e.longitude or -74.0060],
    }

    return EntityRead(
        id=e.id,
        entity_id=e.entity_id,
        criminalId=e.entity_id,
        name=e.name,
        alias=e.alias or "",
        type=e.type,
        sub_type=e.sub_type,
        crimeCategory=e.crime_category,
        crime_category=e.crime_category,
        riskScore=float(e.risk_score),
        risk_score=float(e.risk_score),
        riskLevel=e.risk_level,
        risk_level=e.risk_level,
        status=e.status,
        photoUrl=e.photo_url or "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        photo_url=e.photo_url,
        age=e.age or "35",
        gender=e.gender or "Male",
        nationality=e.nationality or "USA",
        biography=e.biography or "",
        aiThreatSummary=e.ai_threat_summary or "",
        ai_threat_summary=e.ai_threat_summary or "",
        lastKnownLocation=last_known_location,
        lastActivity=e.last_activity.isoformat() if e.last_activity else "",
        last_activity=e.last_activity,
        knownAssociatesCount=len(type_data.get("knownAssociates", [])),
        activeWarrants=int(e.active_warrants or 0),
        active_warrants=str(e.active_warrants or "0"),
        tags=tags,
        personalDetails=personal_details,
        knownAssociates=type_data.get("knownAssociates", []),
        vehicles=type_data.get("vehicles", []),
        phoneNumbers=type_data.get("phoneNumbers", []),
        financialAccounts=type_data.get("financialAccounts", []),
        timeline=type_data.get("timeline", []),
        connectedOrganizations=type_data.get("connectedOrganizations", []),
        created_at=e.created_at,
        updated_at=e.updated_at,
    )


@router.post("", response_model=APIResponseEnvelope[EntityRead], status_code=status.HTTP_201_CREATED)
async def create_entity(
    payload: EntityCreate,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
    db: Session = Depends(get_db),
):
    """Create a new entity (person, phone, vehicle, org, location, bank) and sync to Neo4j."""
    breakdown = risk_scorer.calculate_risk(
        crime_category=payload.crime_category,
        active_warrants=int(payload.active_warrants or 0),
    )

    new_entity = Entity(
        entity_id=payload.entity_id,
        name=payload.name,
        alias=payload.alias,
        type=payload.type.lower(),
        sub_type=payload.sub_type,
        crime_category=payload.crime_category,
        risk_score=payload.risk_score or breakdown.total_risk_score,
        risk_level=payload.risk_level or breakdown.risk_level,
        status=payload.status,
        photo_url=payload.photo_url,
        age=str(payload.age) if payload.age else "30",
        gender=payload.gender,
        nationality=payload.nationality,
        biography=payload.biography,
        ai_threat_summary=payload.ai_threat_summary or breakdown.threat_summary,
        address=payload.address,
        city=payload.city,
        state=payload.state,
        country=payload.country,
        latitude=payload.latitude,
        longitude=payload.longitude,
        active_warrants=str(payload.active_warrants or "0"),
        tags_json=json.dumps(payload.tags or []),
        personal_details_json=json.dumps(payload.personal_details or {}),
        type_specific_data_json=json.dumps(payload.type_specific_data or {}),
    )
    db.add(new_entity)
    db.commit()
    db.refresh(new_entity)

    # Sync to Neo4j graph
    await graph_sync.sync_entity(new_entity)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="CREATE",
        resource_type="ENTITY",
        resource_id=new_entity.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={"name": new_entity.name, "type": new_entity.type},
        **client_info,
    )

    return APIResponseEnvelope(data=_format_entity_read(new_entity))


@router.get("", response_model=PaginatedResponseEnvelope[EntityRead])
def list_entities(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=200),
    type: Optional[str] = None,
    crimeType: Optional[str] = None,
    crime_category: Optional[str] = None,
    riskLevel: Optional[str] = None,
    risk_level: Optional[str] = None,
    city: Optional[str] = None,
    status: Optional[str] = None,
    searchQuery: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """List entities with filtering, search, and pagination."""
    query = select(Entity)

    if type:
        query = query.where(Entity.type == type.lower())
    
    crime_filter = crimeType or crime_category
    if crime_filter:
        query = query.where(Entity.crime_category.ilike(f"%{crime_filter}%"))

    risk_filter = riskLevel or risk_level
    if risk_filter:
        query = query.where(Entity.risk_level == risk_filter.upper())

    if city:
        query = query.where(Entity.city.ilike(f"%{city}%"))

    if status:
        query = query.where(Entity.status == status.upper())

    search_term = searchQuery or search
    if search_term:
        term_pattern = f"%{search_term}%"
        query = query.where(
            or_(
                Entity.name.ilike(term_pattern),
                Entity.alias.ilike(term_pattern),
                Entity.entity_id.ilike(term_pattern),
                Entity.city.ilike(term_pattern),
            )
        )

    count_query = select(func.count(Entity.id))
    if type:
        count_query = count_query.where(Entity.type == type.lower())
    if crime_filter:
        count_query = count_query.where(Entity.crime_category.ilike(f"%{crime_filter}%"))
    if risk_filter:
        count_query = count_query.where(Entity.risk_level == risk_filter.upper())
    if city:
        count_query = count_query.where(Entity.city.ilike(f"%{city}%"))
    if status:
        count_query = count_query.where(Entity.status == status.upper())
    if search_term:
        term_pattern = f"%{search_term}%"
        count_query = count_query.where(
            or_(
                Entity.name.ilike(term_pattern),
                Entity.alias.ilike(term_pattern),
                Entity.entity_id.ilike(term_pattern),
            )
        )
    total = db.execute(count_query).scalar() or 0

    offset = (page - 1) * limit
    results = db.execute(query.offset(offset).limit(limit).order_by(Entity.risk_score.desc())).scalars().all()

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
        data=[_format_entity_read(e) for e in results],
        meta=meta,
    )


@router.get("/search", response_model=APIResponseEnvelope[List[EntityRead]])
def search_entities(
    q: str = Query(..., min_length=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """Fuzzy multi-attribute entity search."""
    term_pattern = f"%{q}%"
    query = select(Entity).where(
        or_(
            Entity.name.ilike(term_pattern),
            Entity.alias.ilike(term_pattern),
            Entity.entity_id.ilike(term_pattern),
            Entity.city.ilike(term_pattern),
            Entity.address.ilike(term_pattern),
        )
    ).limit(limit)

    results = db.execute(query).scalars().all()
    return APIResponseEnvelope(data=[_format_entity_read(e) for e in results])


@router.get("/{entity_id}", response_model=APIResponseEnvelope[EntityRead])
def get_entity_by_id(
    entity_id: str,
    db: Session = Depends(get_db),
):
    """Retrieve full profile of an entity by UUID or entity_id (e.g. CR-8942)."""
    result = db.execute(
        select(Entity).where(or_(Entity.id == entity_id, Entity.entity_id == entity_id))
    )
    entity_obj = result.scalars().first()
    if not entity_obj:
        raise NotFoundException(f"Entity '{entity_id}' not found.")
    return APIResponseEnvelope(data=_format_entity_read(entity_obj))


@router.patch("/{entity_id}", response_model=APIResponseEnvelope[EntityRead])
async def update_entity(
    entity_id: str,
    payload: EntityUpdate,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
    db: Session = Depends(get_db),
):
    """Update entity attributes and sync changes to Neo4j graph."""
    result = db.execute(
        select(Entity).where(or_(Entity.id == entity_id, Entity.entity_id == entity_id))
    )
    entity_obj = result.scalars().first()
    if not entity_obj:
        raise NotFoundException(f"Entity '{entity_id}' not found.")

    update_dict = payload.model_dump(exclude_unset=True)
    
    if "tags" in update_dict:
        entity_obj.tags_json = json.dumps(update_dict.pop("tags"))
    if "personal_details" in update_dict:
        entity_obj.personal_details_json = json.dumps(update_dict.pop("personal_details"))
    if "type_specific_data" in update_dict:
        entity_obj.type_specific_data_json = json.dumps(update_dict.pop("type_specific_data"))

    for k, v in update_dict.items():
        setattr(entity_obj, k, v)

    entity_obj.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(entity_obj)

    # Sync updated node to Neo4j
    await graph_sync.sync_entity(entity_obj)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="UPDATE",
        resource_type="ENTITY",
        resource_id=entity_obj.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details=update_dict,
        **client_info,
    )

    return APIResponseEnvelope(data=_format_entity_read(entity_obj))


@router.delete("/{entity_id}", response_model=APIResponseEnvelope[SuccessMessage])
async def delete_entity(
    entity_id: str,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR"])),
    db: Session = Depends(get_db),
):
    """Delete entity from Postgres and remove its node & edges from Neo4j."""
    result = db.execute(
        select(Entity).where(or_(Entity.id == entity_id, Entity.entity_id == entity_id))
    )
    entity_obj = result.scalars().first()
    if not entity_obj:
        raise NotFoundException(f"Entity '{entity_id}' not found.")

    obj_id = entity_obj.id
    db.delete(entity_obj)
    db.commit()

    # Remove from Graph
    await graph_sync.remove_entity(obj_id)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="DELETE",
        resource_type="ENTITY",
        resource_id=obj_id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={},
        **client_info,
    )

    return APIResponseEnvelope(data=SuccessMessage(success=True, message=f"Entity {entity_id} deleted."))
