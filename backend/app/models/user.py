import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Boolean, DateTime, Column
from sqlalchemy.orm import relationship
from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    badge_number = Column(String(50), nullable=True, default="AGY-0000")
    role = Column(String(50), default="INVESTIGATOR", nullable=False)  # ADMIN, INVESTIGATOR, ANALYST
    clearance_level = Column(String(50), default="SECRET", nullable=False)
    agency = Column(String(255), default="Tactical Criminal Intelligence Task Force", nullable=False)
    avatar_url = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    cases = relationship("InvestigationCase", foreign_keys="InvestigationCase.assigned_to_id", back_populates="assigned_to")
    created_cases = relationship("InvestigationCase", foreign_keys="InvestigationCase.created_by_id", back_populates="created_by")
    audit_logs = relationship("AuditLog", back_populates="user")


class TokenBlocklist(Base):
    __tablename__ = "token_blocklist"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    token_jti = Column(String(255), unique=True, index=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    revoked_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
