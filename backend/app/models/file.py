import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Integer, DateTime, Column, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base


class EvidenceDocument(Base):
    __tablename__ = "evidence_documents"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    file_name = Column(String(255), nullable=False)
    original_name = Column(String(255), nullable=False)
    file_type = Column(String(50), default="pdf", nullable=False)  # image, audio, pdf, video, document
    mime_type = Column(String(100), nullable=True)
    file_size_bytes = Column(Integer, default=0, nullable=False)
    storage_path = Column(String(500), nullable=False)
    storage_type = Column(String(50), default="local", nullable=False)
    classification_level = Column(String(50), default="CONFIDENTIAL", nullable=False)
    
    uploaded_by_id = Column(String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    case_id = Column(String(36), ForeignKey("cases.id", ondelete="SET NULL"), nullable=True, index=True)
    entity_id = Column(String(36), ForeignKey("entities.id", ondelete="SET NULL"), nullable=True, index=True)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)

    # Relationships
    case = relationship("InvestigationCase", back_populates="documents")
    entity = relationship("Entity", back_populates="documents")
