from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field


class AlertBase(BaseModel):
    alert_code: str
    title: str
    severity: str = "HIGH"
    ai_confidence: float = 90.0
    description: str
    category: str = "Financial Anomaly"
    status: str = "NEW"
    suggested_action: Optional[str] = None
    location_name: Optional[str] = None
    city: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    related_entity_id: Optional[str] = None
    related_case_id: Optional[str] = None


class AlertCreate(AlertBase):
    pass


class AlertUpdate(BaseModel):
    status: Optional[str] = None
    suggested_action: Optional[str] = None
    is_read: Optional[bool] = None


class AlertRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    alertCode: str
    alert_code: str
    title: str
    alertLevel: str
    severity: str
    aiConfidence: float
    ai_confidence: float
    description: str
    category: str
    status: str
    suggestedAction: Optional[str] = None
    suggested_action: Optional[str] = None
    location: Optional[Dict[str, Any]] = None
    timestamp: str
    created_at: datetime
    is_read: bool = False
    relatedCriminals: List[Dict[str, Any]] = Field(default_factory=list)
