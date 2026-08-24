import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Float, DateTime, Text, Column, ForeignKey
from app.db.base import Base


class Relationship(Base):
    __tablename__ = "relationships"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    source_id = Column(String(36), ForeignKey("entities.id", ondelete="CASCADE"), nullable=False, index=True)
    target_id = Column(String(36), ForeignKey("entities.id", ondelete="CASCADE"), nullable=False, index=True)
    relationship_type = Column(String(100), nullable=False, index=True)  # KNOWS, USES, OWNS, CALLS, MONEY_TRANSFER, etc.
    details = Column(Text, nullable=True)
    amount = Column(Float, nullable=True)
    frequency = Column(Float, nullable=True)
    risk_level = Column(String(50), default="MEDIUM", nullable=False)
    confidence_score = Column(Float, default=0.85, nullable=False)  # 0.0 to 1.0
    last_interaction = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    evidence_reference = Column(String(255), nullable=True)
    metadata_json = Column(Text, default="{}", nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
