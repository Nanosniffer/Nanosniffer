from datetime import datetime, timezone
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, Query, Request, status
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import get_client_info, get_current_user, get_db, require_role
from app.core.exceptions import NotFoundException
from app.models.alert import Alert
from app.models.entity import Entity
from app.models.user import User
from app.schemas.alert import AlertCreate, AlertRead, AlertUpdate
from app.schemas.common import APIResponseEnvelope, PaginatedResponseEnvelope, PaginationMeta, SuccessMessage
from app.services.audit_service import audit_service
from app.services.notification_service import notification_manager

router = APIRouter(prefix="/alerts", tags=["Threat Alerts & Notifications"])


def _format_alert_read(a: Alert) -> AlertRead:
    loc = {
        "name": a.location_name or "Metropolitan Hub",
        "city": a.city or "New York",
        "coordinates": [a.latitude or 40.7128, a.longitude or -74.0060],
    }
    related = []
    if a.related_entity:
        related.append({
            "id": a.related_entity.id,
            "name": a.related_entity.name,
            "alias": a.related_entity.alias or "",
            "riskScore": float(a.related_entity.risk_score or 75.0),
        })

    return AlertRead(
        id=a.id,
        alertCode=a.alert_code,
        alert_code=a.alert_code,
        title=a.title,
        alertLevel=a.severity,
        severity=a.severity,
        aiConfidence=float(a.ai_confidence),
        ai_confidence=float(a.ai_confidence),
        description=a.description,
        category=a.category,
        status=a.status,
        suggestedAction=a.suggested_action or "Dispatch tactical surveillance unit.",
        suggested_action=a.suggested_action,
        location=loc,
        timestamp=a.created_at.strftime("%H:%M UTC • %b %d") if a.created_at else "Just now",
        created_at=a.created_at,
        is_read=a.is_read,
        relatedCriminals=related,
    )


@router.post("", response_model=APIResponseEnvelope[AlertRead], status_code=status.HTTP_201_CREATED)
async def create_alert(
    payload: AlertCreate,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
    db: Session = Depends(get_db),
):
    """Create a new threat alert and broadcast live over WebSockets."""
    new_alert = Alert(
        alert_code=payload.alert_code,
        title=payload.title,
        severity=payload.severity.upper(),
        ai_confidence=payload.ai_confidence,
        description=payload.description,
        category=payload.category,
        status=payload.status.upper(),
        suggested_action=payload.suggested_action,
        location_name=payload.location_name,
        city=payload.city,
        latitude=payload.latitude,
        longitude=payload.longitude,
        related_entity_id=payload.related_entity_id,
        related_case_id=payload.related_case_id,
    )
    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)

    # Broadcast live alert to all active WebSocket clients
    formatted = _format_alert_read(new_alert)
    await notification_manager.broadcast_alert(formatted.model_dump(mode="json"))

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="CREATE",
        resource_type="ALERT",
        resource_id=new_alert.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details={"alert_code": new_alert.alert_code, "severity": new_alert.severity},
        **client_info,
    )

    return APIResponseEnvelope(data=formatted)


@router.get("", response_model=PaginatedResponseEnvelope[AlertRead])
def list_alerts(
    page: int = Query(1, ge=1),
    limit: int = Query(50, ge=1, le=100),
    severity: Optional[str] = None,
    status: Optional[str] = None,
    category: Optional[str] = None,
    db: Session = Depends(get_db),
):
    """List threat alerts with severity, status, and category filtering."""
    query = select(Alert)

    if severity:
        query = query.where(Alert.severity == severity.upper())
    if status:
        query = query.where(Alert.status == status.upper())
    if category:
        query = query.where(Alert.category == category)

    count_query = select(func.count(Alert.id))
    if severity:
        count_query = count_query.where(Alert.severity == severity.upper())
    if status:
        count_query = count_query.where(Alert.status == status.upper())
    total = db.execute(count_query).scalar() or 0

    offset = (page - 1) * limit
    results = db.execute(query.offset(offset).limit(limit).order_by(Alert.created_at.desc())).scalars().all()

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
        data=[_format_alert_read(a) for a in results],
        meta=meta,
    )


@router.patch("/{alert_id}", response_model=APIResponseEnvelope[AlertRead])
def update_alert(
    alert_id: str,
    payload: AlertUpdate,
    request: Request,
    current_user: User = Depends(require_role(["ADMIN", "INVESTIGATOR", "ANALYST"])),
    db: Session = Depends(get_db),
):
    """Update alert status or mark read."""
    result = db.execute(select(Alert).where((Alert.id == alert_id) | (Alert.alert_code == alert_id)))
    alert_obj = result.scalars().first()
    if not alert_obj:
        raise NotFoundException(f"Alert '{alert_id}' not found.")

    update_dict = payload.model_dump(exclude_unset=True)
    if "status" in update_dict and update_dict["status"]:
        alert_obj.status = update_dict["status"].upper()
    if "is_read" in update_dict and update_dict["is_read"] is not None:
        alert_obj.is_read = update_dict["is_read"]
    if "suggested_action" in update_dict and update_dict["suggested_action"]:
        alert_obj.suggested_action = update_dict["suggested_action"]

    alert_obj.updated_at = datetime.now(timezone.utc)
    db.commit()
    db.refresh(alert_obj)

    client_info = get_client_info(request)
    audit_service.log_action(
        db=db,
        action="UPDATE",
        resource_type="ALERT",
        resource_id=alert_obj.id,
        user_id=current_user.id,
        user_email=current_user.email,
        details=update_dict,
        **client_info,
    )

    return APIResponseEnvelope(data=_format_alert_read(alert_obj))
