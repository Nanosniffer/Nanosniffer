import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Float, DateTime, Text, Column
from sqlalchemy.orm import relationship
from app.db.base import Base


class Entity(Base):
    __tablename__ = "entities"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    entity_id = Column(String(50), unique=True, index=True, nullable=False)  # e.g., "CR-8942", "LOC-101", "PH-991"
    name = Column(String(255), nullable=False, index=True)
    alias = Column(String(255), nullable=True, index=True)
    type = Column(String(50), default="person", nullable=False, index=True)  # person, phone, vehicle, organization, location, bank
    sub_type = Column(String(100), nullable=True)
    crime_category = Column(String(100), nullable=True, index=True)  # Drug Trafficking, Cybercrime, etc.
    risk_score = Column(Float, default=50.0, nullable=False, index=True)
    risk_level = Column(String(50), default="MEDIUM", nullable=False, index=True)  # CRITICAL, HIGH, MEDIUM, LOW
    status = Column(String(50), default="UNDER_SURVEILLANCE", nullable=False, index=True)  # WANTED, IN_CUSTODY, ACTIVE, etc.
    
    photo_url = Column(String(500), nullable=True)
    age = Column(String(50), nullable=True)
    gender = Column(String(50), nullable=True)
    nationality = Column(String(100), nullable=True)
    biography = Column(Text, nullable=True)
    ai_threat_summary = Column(Text, nullable=True)
    
    # Location data
    address = Column(String(255), nullable=True)
    city = Column(String(100), nullable=True, index=True)
    state = Column(String(100), nullable=True)
    country = Column(String(100), default="USA", nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    
    last_activity = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    active_warrants = Column(String(50), default="0", nullable=False)
    
    # Polymorphic / Type-specific structured JSON data
    personal_details_json = Column(Text, default="{}", nullable=False)
    type_specific_data_json = Column(Text, default="{}", nullable=False)  # vehicles, phones, accounts, org info
    tags_json = Column(Text, default="[]", nullable=False)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    case_links = relationship("CaseEntityLink", back_populates="entity", cascade="all, delete-orphan")
    timeline_events = relationship("CaseTimelineEvent", back_populates="entity", cascade="all, delete-orphan")
    alerts = relationship("Alert", back_populates="related_entity")
    documents = relationship("EvidenceDocument", back_populates="entity")
