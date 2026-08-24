import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, Text, Column, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    user_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    user_email = Column(String(255), nullable=True)
    action = Column(String(50), nullable=False, index=True)  # CREATE, READ, UPDATE, DELETE, LOGIN, LOGOUT, EXPORT, RESOLVE
    resource_type = Column(String(50), nullable=False, index=True)  # CASE, ENTITY, RELATIONSHIP, REPORT, ALERT, USER, AUTH
    resource_id = Column(String(100), nullable=True, index=True)
    details_json = Column(Text, default="{}", nullable=False)
    ip_address = Column(String(50), nullable=True)
    user_agent = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False, index=True)

    # Relationship
    user = relationship("User", back_populates="audit_logs")
