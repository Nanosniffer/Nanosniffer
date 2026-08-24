import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Float, Boolean, DateTime, Text, Column, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    alert_code = Column(String(50), unique=True, index=True, nullable=False)  # e.g., "ALT-7812"
    title = Column(String(255), nullable=False)
    severity = Column(String(50), default="HIGH", nullable=False, index=True)  # CRITICAL, HIGH, MEDIUM, LOW
    ai_confidence = Column(Float, default=90.0, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(100), default="Financial Anomaly", nullable=False, index=True)
    status = Column(String(50), default="NEW", nullable=False, index=True)  # NEW, ACKNOWLEDGED, ESCALATED, RESOLVED
    suggested_action = Column(Text, nullable=True)
    
    # Location
    location_name = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    # Associations
    related_entity_id = Column(String(36), ForeignKey("entities.id", ondelete="SET NULL"), nullable=True, index=True)
    related_case_id = Column(String(36), ForeignKey("cases.id", ondelete="SET NULL"), nullable=True, index=True)
    is_read = Column(Boolean, default=False, nullable=False)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False, index=True)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    related_entity = relationship("Entity", back_populates="alerts")
    case = relationship("InvestigationCase", back_populates="alerts")
