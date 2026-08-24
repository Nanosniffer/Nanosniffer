import json
from datetime import datetime
from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import get_db, require_role
from app.models.audit import AuditLog
from app.models.user import User
from app.schemas.audit import AuditLogRead
from app.schemas.common import PaginatedResponseEnvelope, PaginationMeta

router = APIRouter(prefix="/audit-logs", tags=["Audit Trails (Admin Only)"])


def _format_audit_read(a: AuditLog) -> AuditLogRead:
    details = {}
    if a.details_json:
        try:
            details = json.loads(a.details_json)
        except Exception:
            details = {}
    return AuditLogRead(
        id=a.id,
        user_id=a.user_id,
        user_email=a.user_email,
        action=a.action,
        resource_type=a.resource_type,
        resource_id=a.resource_id,
        details=details,
        ip_address=a.ip_address,
        user_agent=a.user_agent,
        created_at=a.created_at,
    )


@router.get("", response_model=PaginatedResponseEnvelope[AuditLogRead])
def query_audit_logs(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=200),
    user_id: Optional[str] = None,
    action: Optional[str] = None,
    resource_type: Optional[str] = None,
    current_user: User = Depends(require_role(["ADMIN"])),
    db: Session = Depends(get_db),
):
    """Admin-only: query immutable audit log records."""
    query = select(AuditLog)

    if user_id:
        query = query.where(AuditLog.user_id == user_id)
    if action:
        query = query.where(AuditLog.action == action.upper())
    if resource_type:
        query = query.where(AuditLog.resource_type == resource_type.upper())

    count_query = select(func.count(AuditLog.id))
    if user_id:
        count_query = count_query.where(AuditLog.user_id == user_id)
    if action:
        count_query = count_query.where(AuditLog.action == action.upper())
    if resource_type:
        count_query = count_query.where(AuditLog.resource_type == resource_type.upper())
    total = db.execute(count_query).scalar() or 0

    offset = (page - 1) * limit
    results = db.execute(query.offset(offset).limit(limit).order_by(AuditLog.created_at.desc())).scalars().all()

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
        data=[_format_audit_read(a) for a in results],
        meta=meta,
    )
