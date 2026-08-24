import json
from typing import Any, Dict, Optional
from sqlalchemy.orm import Session
from app.models.audit import AuditLog


class AuditService:
    """Service to log security, data mutation, and authentication events."""

    @staticmethod
    def log_action(
        db: Session,
        action: str,  # CREATE, READ, UPDATE, DELETE, LOGIN, LOGOUT, EXPORT, RESOLVE
        resource_type: str,  # CASE, ENTITY, RELATIONSHIP, REPORT, ALERT, USER, AUTH
        resource_id: Optional[str] = None,
        user_id: Optional[str] = None,
        user_email: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None,
        user_agent: Optional[str] = None,
    ) -> AuditLog:
        audit_entry = AuditLog(
            user_id=user_id,
            user_email=user_email,
            action=action.upper(),
            resource_type=resource_type.upper(),
            resource_id=str(resource_id) if resource_id else None,
            details_json=json.dumps(details or {}),
            ip_address=ip_address,
            user_agent=user_agent,
        )
        db.add(audit_entry)
        db.commit()
        db.refresh(audit_entry)
        return audit_entry


audit_service = AuditService()
