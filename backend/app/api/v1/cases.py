import json
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import APIRouter, Depends, Query, Request, status
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.api.deps import get_client_info, get_current_user, get_db, require_role
from app.core.exceptions import NotFoundException
from app.models.case import CaseEntityLink, CaseTimelineEvent, InvestigationCase
from app.models.entity import Entity
from app.models.user import User
from app.schemas.case import (
    CaseCreate,
    CaseEntityLinkCreate,
    CaseEntityLinkRead,
    CaseRead,
    CaseUpdate,
    TimelineEventCreate,
    TimelineEventRead,
)
from app.schemas.common import APIResponseEnvelope, PaginatedResponseEnvelope, PaginationMeta, SuccessMessage
from app.services.audit_service import audit_service

router = APIRouter(prefix="/cases", tags=["Investigation Cases"])


@router.post("", response_model=APIResponseEnvelope[CaseRead], status_code=status.HTTP_201_CREATED)
def create_case(
    payload: CaseCreate,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR"])),
    db: Session = Depends(get_db),
):
    """Create a new investigation case."""
    new_case = InvestigationCase(
        case_number=payload.case_number,
        title=payload.title,
        description=payload.description,
        status=payload.status.upper(),
        priority=payload.priority.upper(),
        lead_officer=payload.lead_officer,
        lead_officer_badge=payload.lead_officer_badge or "AGY-7701",
        target_syndicate=payload.target_syndicate,
        progress_percent=payload.progress_percent,
        estimated_risk_score=payload.estimated_risk_score,
        assigned_to_id=payload.assigned_to_id or current_user.id,
        created_by_id=current_user.id,
    )
    db.add(new_case)
    db.commit()
    db.refresh(new_case)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="CREATE",
        resource_type="CASE",
        resource_id=new_case.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={"case_number": new_case.case_number, "title": new_case.title},
        **client_info,
    )

    return APIResponseEnvelope(data=CaseRead.model_validate(new_case))


@router.get("", response_model=PaginatedResponseEnvelope[CaseRead])
def list_cases(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    status: Optional[str] = None,
    priority: Optional[str] = None,
    assigned_to_id: Optional[str] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """List investigation cases with filtering, search query, and pagination."""
    query = select(InvestigationCase)

    if status:
        query = query.where(InvestigationCase.status == status.upper())
    if priority:
        query = query.where(InvestigationCase.priority == priority.upper())
    if assigned_to_id:
        query = query.where(InvestigationCase.assigned_to_id == assigned_to_id)
    if search:
        search_pattern = f"%{search}%"
        query = query.where(
            or_(
                InvestigationCase.title.ilike(search_pattern),
                InvestigationCase.case_number.ilike(search_pattern),
                InvestigationCase.target_syndicate.ilike(search_pattern),
                InvestigationCase.lead_officer.ilike(search_pattern),
            )
        )

    count_query = select(func.count(InvestigationCase.id))
    if status:
        count_query = count_query.where(InvestigationCase.status == status.upper())
    if priority:
        count_query = count_query.where(InvestigationCase.priority == priority.upper())
    if assigned_to_id:
        count_query = count_query.where(InvestigationCase.assigned_to_id == assigned_to_id)
    if search:
        search_pattern = f"%{search}%"
        count_query = count_query.where(
            or_(
                InvestigationCase.title.ilike(search_pattern),
                InvestigationCase.case_number.ilike(search_pattern),
                InvestigationCase.target_syndicate.ilike(search_pattern),
            )
        )
    total = db.execute(count_query).scalar() or 0

    offset = (page - 1) * limit
    results = db.execute(query.offset(offset).limit(limit).order_by(InvestigationCase.updated_at.desc())).scalars().all()

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
        data=[CaseRead.model_validate(c) for c in results],
        meta=meta,
    )


@router.get("/{case_id}", response_model=APIResponseEnvelope[CaseRead])
def get_case_by_id(
    case_id: str,
    db: Session = Depends(get_db),
):
    """Get single investigation case by ID or case number."""
    result = db.execute(
        select(InvestigationCase).where(
            or_(InvestigationCase.id == case_id, InvestigationCase.case_number == case_id)
        )
    )
    case_obj = result.scalars().first()
    if not case_obj:
        raise NotFoundException(f"Case '{case_id}' not found.")
    return APIResponseEnvelope(data=CaseRead.model_validate(case_obj))


@router.patch("/{case_id}", response_model=APIResponseEnvelope[CaseRead])
def update_case(
    case_id: str,
    payload: CaseUpdate,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR"])),
    db: Session = Depends(get_db),
):
    """Update case status, progress, priority, or lead details."""
    result = db.execute(select(InvestigationCase).where(InvestigationCase.id == case_id))
    case_obj = result.scalars().first()
    if not case_obj:
        raise NotFoundException(f"Case '{case_id}' not found.")

    update_dict = payload.model_dump(exclude_unset=True)
    for k, v in update_dict.items():
        if k in ["status", "priority"] and v:
            setattr(case_obj, k, v.upper())
        else:
            setattr(case_obj, k, v)

    case_obj.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(case_obj)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="UPDATE",
        resource_type="CASE",
        resource_id=case_obj.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details=update_dict,
        **client_info,
    )

    return APIResponseEnvelope(data=CaseRead.model_validate(case_obj))


@router.delete("/{case_id}", response_model=APIResponseEnvelope[SuccessMessage])
def delete_case(
    case_id: str,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN"])),
    db: Session = Depends(get_db),
):
    """Delete an investigation case."""
    result = db.execute(select(InvestigationCase).where(InvestigationCase.id == case_id))
    case_obj = result.scalars().first()
    if not case_obj:
        raise NotFoundException(f"Case '{case_id}' not found.")

    db.delete(case_obj)
    db.commit()

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="DELETE",
        resource_type="CASE",
        resource_id=case_id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={},
        **client_info,
    )

    return APIResponseEnvelope(data=SuccessMessage(success=True, message=f"Case {case_id} deleted."))


@router.post("/{case_id}/entities", response_model=APIResponseEnvelope[CaseEntityLinkRead])
def link_entity_to_case(
    case_id: str,
    payload: CaseEntityLinkCreate,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
    db: Session = Depends(get_db),
):
    """Associate an entity with a case."""
    link = CaseEntityLink(
        case_id=case_id,
        entity_id=payload.entity_id,
        role_in_case=payload.role_in_case,
        notes=payload.notes,
    )
    db.add(link)
    db.commit()
    db.refresh(link)
    return APIResponseEnvelope(data=CaseEntityLinkRead.model_validate(link))


@router.delete("/{case_id}/entities/{entity_id}", response_model=APIResponseEnvelope[SuccessMessage])
def unlink_entity_from_case(
    case_id: str,
    entity_id: str,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR"])),
    db: Session = Depends(get_db),
):
    """Unlink an entity from a case."""
    result = db.execute(
        select(CaseEntityLink).where(
            CaseEntityLink.case_id == case_id,
            CaseEntityLink.entity_id == entity_id,
        )
    )
    link = result.scalars().first()
    if link:
        db.delete(link)
        db.commit()
    return APIResponseEnvelope(data=SuccessMessage(success=True, message="Entity unlinked from case."))


@router.get("/{case_id}/timeline", response_model=APIResponseEnvelope[List[TimelineEventRead]])
def get_case_timeline(
    case_id: str,
    db: Session = Depends(get_db),
):
    """Retrieve all chronological events associated with a case."""
    result = db.execute(
        select(CaseTimelineEvent)
        .where(CaseTimelineEvent.case_id == case_id)
        .order_by(CaseTimelineEvent.timestamp.desc())
    )
    events = result.scalars().all()

    out = []
    for ev in events:
        ev_files = []
        if ev.evidence_files_json:
            try:
                ev_files = json.loads(ev.evidence_files_json)
            except Exception:
                ev_files = []
        out.append(
            TimelineEventRead(
                id=ev.id,
                title=ev.title,
                event_type=ev.event_type,
                timestamp=ev.timestamp,
                location=ev.location,
                latitude=ev.latitude,
                longitude=ev.longitude,
                description=ev.description,
                confidence_score=ev.confidence_score,
                severity=ev.severity,
                is_verified=bool(ev.is_verified),
                evidence_files=ev_files,
                criminal_id=ev.entity_id,
            )
        )
    return APIResponseEnvelope(data=out)
