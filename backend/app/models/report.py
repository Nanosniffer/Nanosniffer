import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Integer, Float, DateTime, Text, Column, ForeignKey
from app.db.base import Base


class GeneratedReport(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    report_number = Column(String(50), unique=True, index=True, nullable=False)  # e.g. "RPT-2026-041"
    title = Column(String(255), nullable=False)
    type = Column(String(100), default="Network Summary", nullable=False)  # Network Summary, Timeline Report, Financial Analysis, etc.
    status = Column(String(50), default="COMPLETED", nullable=False)  # PENDING, GENERATING, COMPLETED, FAILED
    author = Column(String(255), default="Intelligence Division", nullable=False)
    author_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    target_entity = Column(String(255), nullable=True)
    target_entity_id = Column(String(36), ForeignKey("entities.id", ondelete="SET NULL"), nullable=True)
    target_case_id = Column(String(36), ForeignKey("cases.id", ondelete="SET NULL"), nullable=True)
    
    classification_level = Column(String(50), default="TOP SECRET // INTEL", nullable=False)
    summary = Column(Text, nullable=False)
    key_findings_json = Column(Text, default="[]", nullable=False)
    ai_risk_score = Column(Float, default=75.0, nullable=False)
    metrics_json = Column(Text, default="{}", nullable=False)
    file_path = Column(String(500), nullable=True)
    file_size_bytes = Column(Integer, default=0, nullable=False)
    
    date_generated = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc), nullable=False)
