from datetime import datetime
from typing import Any, Dict, List, Optional
from pydantic import BaseModel, ConfigDict, Field


class ReportGenerateRequest(BaseModel):
    title: str
    report_type: str = "Network Summary"
    classification_level: str = "TOP SECRET // INTEL"
    target_entity_id: Optional[str] = None
    target_case_id: Optional[str] = None
    custom_notes: Optional[str] = None


class ReportRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: str
    reportNumber: str
    report_number: str
    title: str
    type: str
    status: str
    author: str
    targetEntity: Optional[str] = None
    target_entity: Optional[str] = None
    summary: str
    classificationLevel: str
    classification_level: str
    keyFindings: List[str] = Field(default_factory=list)
    key_findings: List[str] = Field(default_factory=list)
    aiRiskScore: float
    ai_risk_score: float
    metrics: Dict[str, Any] = Field(default_factory=dict)
    fileSizeBytes: int
    file_size_bytes: int
    file_path: Optional[str] = None
    dateGenerated: str
    date_generated: datetime
    created_at: datetime
