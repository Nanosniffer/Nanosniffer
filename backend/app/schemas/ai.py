from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class RiskScoreBreakdown(BaseModel):
    base_score: float
    centrality_contribution: float
    associate_risk_contribution: float
    anomaly_penalty: float
    warrant_penalty: float
    total_risk_score: float
    risk_level: str
    threat_summary: str
    contributing_factors: List[str] = Field(default_factory=list)


class RiskScoreResponse(BaseModel):
    entity_id: str
    name: str
    risk_score: float
    risk_level: str
    breakdown: RiskScoreBreakdown


class EntityResolutionMatch(BaseModel):
    source_entity_id: str
    source_name: str
    target_entity_id: str
    target_name: str
    match_score: float  # 0.0 - 1.0
    matched_features: List[str] = Field(default_factory=list)  # e.g. ["alias_similarity", "shared_phone", "same_dob"]
    recommended_action: str = "MERGE_CANDIDATE"


class EntityMergeRequest(BaseModel):
    primary_entity_id: str
    secondary_entity_id: str
    merged_name: Optional[str] = None
    keep_secondary_aliases: bool = True


class LinkPredictionResult(BaseModel):
    source_id: str
    source_name: str
    target_id: str
    target_name: str
    predicted_relationship: str
    prediction_score: float  # 0.0 - 1.0
    common_associates: List[str] = Field(default_factory=list)
    confidence_rationale: str


class AnomalyItem(BaseModel):
    id: str
    category: str  # "Financial Anomaly", "Communication Surge", "Geofence Breach", "Rapid Travel Velocity"
    severity: str  # "CRITICAL", "HIGH", "MEDIUM", "LOW"
    description: str
    affected_entity_ids: List[str] = Field(default_factory=list)
    anomaly_score: float  # Z-score or isolation score
    details: Dict[str, Any] = Field(default_factory=dict)
    detected_at: str


class CommunityCluster(BaseModel):
    cluster_id: int
    cluster_name: str
    leader_entity_id: Optional[str] = None
    leader_name: Optional[str] = None
    member_count: int
    member_ids: List[str] = Field(default_factory=list)
    dominant_crime_category: str = "Drug Trafficking"
    cohesion_score: float = 0.8


class CommunityDetectionResult(BaseModel):
    total_clusters: int
    modularity_score: float
    clusters: List[CommunityCluster] = Field(default_factory=list)


class AIJobResponse(BaseModel):
    job_id: str
    task_name: str
    status: str  # "PENDING", "PROCESSING", "COMPLETED", "FAILED"
    result: Optional[Any] = None
    error: Optional[str] = None
