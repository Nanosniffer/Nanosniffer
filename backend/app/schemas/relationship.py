from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field


class RelationshipBase(BaseModel):
    source_id: str
    target_id: str
    relationship_type: str = "ASSOCIATED_WITH"
    details: Optional[str] = ""
    amount: Optional[float] = None
    frequency: Optional[float] = 1.0
    risk_level: Optional[str] = "MEDIUM"
    confidence_score: float = 0.85
    evidence_reference: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = Field(default_factory=dict)


class RelationshipCreate(RelationshipBase):
    pass


class RelationshipUpdate(BaseModel):
    relationship_type: Optional[str] = None
    details: Optional[str] = None
    amount: Optional[float] = None
    frequency: Optional[float] = None
    risk_level: Optional[str] = None
    confidence_score: Optional[float] = None
    evidence_reference: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


class RelationshipRead(RelationshipBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    last_interaction: datetime
    created_at: datetime
    updated_at: datetime


class BulkRelationshipImport(BaseModel):
    relationships: List[RelationshipCreate]
