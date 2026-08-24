from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field


class CaseBase(BaseModel):
    case_number: str
    title: str
    description: Optional[str] = None
    status: str = "ACTIVE"
    priority: str = "HIGH"
    lead_officer: str
    lead_officer_badge: Optional[str] = "AGY-7701"
    target_syndicate: Optional[str] = None
    progress_percent: int = 10
    estimated_risk_score: float = 70.0


class CaseCreate(CaseBase):
    assigned_to_id: Optional[str] = None


class CaseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    priority: Optional[str] = None
    lead_officer: Optional[str] = None
    lead_officer_badge: Optional[str] = None
    target_syndicate: Optional[str] = None
    progress_percent: Optional[int] = None
    estimated_risk_score: Optional[float] = None
    assigned_to_id: Optional[str] = None


class CaseRead(CaseBase):
    model_config = ConfigDict(from_attributes=True)

    id: str
    start_date: datetime
    assigned_to_id: Optional[str] = None
    created_by_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime


class CaseEntityLinkCreate(BaseModel):
    entity_id: str
    role_in_case: str = "Primary Suspect"
    notes: Optional[str] = None


class CaseEntityLinkRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    case_id: str
    entity_id: str
    role_in_case: str
    notes: Optional[str]
    linked_at: datetime


class TimelineEventCreate(BaseModel):
    title: str
    event_type: str
    timestamp: datetime
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    description: Optional[str] = None
    confidence_score: int = 90
    severity: str = "HIGH"
    is_verified: bool = True
    evidence_files: Optional[List[dict]] = Field(default_factory=list)


class TimelineEventRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    title: str
    event_type: str
    timestamp: datetime
    location: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    description: Optional[str]
    confidence_score: int
    severity: str
    is_verified: bool
    evidence_files: List[dict] = Field(default_factory=list)
    criminal_id: Optional[str] = None
    criminal_name: Optional[str] = None
