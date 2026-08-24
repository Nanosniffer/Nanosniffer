import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Integer, Float, DateTime, Text, ForeignKey, Column
from sqlalchemy.orm import relationship
from app.db.base import Base


class InvestigationCase(Base):
    __tablename__ = "cases"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    case_number = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=True)
    status = Column(String(50), default="ACTIVE", nullable=False, index=True)  # ACTIVE, UNDER_REVIEW, CLOSED, ESCALATED
    priority = Column(String(50), default="HIGH", nullable=False, index=True)  # CRITICAL, HIGH, MEDIUM, LOW
    lead_officer = Column(String(255), nullable=False)
    lead_officer_badge = Column(String(50), nullable=True)
    target_syndicate = Column(String(255), nullable=True)
    progress_percent = Column(Integer, default=10, nullable=False)
    estimated_risk_score = Column(Float, default=70.0, nullable=False)
    start_date = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    assigned_to_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_by_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    assigned_to = relationship("User", foreign_keys=[assigned_to_id], back_populates="cases")
    created_by = relationship("User", foreign_keys=[created_by_id], back_populates="created_cases")
    entity_links = relationship("CaseEntityLink", back_populates="case", cascade="all, delete-orphan")
    documents = relationship("EvidenceDocument", back_populates="case")
    timeline_events = relationship("CaseTimelineEvent", back_populates="case", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="case")


class CaseEntityLink(Base):
    __tablename__ = "case_entity_links"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    case_id = Column(String(36), ForeignKey("cases.id", ondelete="CASCADE"), nullable=False, index=True)
    entity_id = Column(String(36), ForeignKey("entities.id", ondelete="CASCADE"), nullable=False, index=True)
    role_in_case = Column(String(100), default="Primary Suspect", nullable=False)
    notes = Column(Text, nullable=True)
    linked_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    case = relationship("InvestigationCase", back_populates="entity_links")
    entity = relationship("Entity", back_populates="case_links")


class CaseTimelineEvent(Base):
    __tablename__ = "timeline_events"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    case_id = Column(String(36), ForeignKey("cases.id", ondelete="CASCADE"), nullable=True, index=True)
    entity_id = Column(String(36), ForeignKey("entities.id", ondelete="CASCADE"), nullable=True, index=True)
    title = Column(String(255), nullable=False)
    event_type = Column(String(100), nullable=False, index=True)  # Phone Calls, ATM Withdrawal, Wire Transfer, etc.
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
    location = Column(String(255), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    confidence_score = Column(Integer, default=90, nullable=False)
    severity = Column(String(50), default="HIGH", nullable=False)
    is_verified = Column(Integer, default=1, nullable=False)  # 1 for verified, 0 unverified
    evidence_files_json = Column(Text, default="[]", nullable=False)  # JSON array of evidence files
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    case = relationship("InvestigationCase", back_populates="timeline_events")
    entity = relationship("Entity", back_populates="timeline_events")
