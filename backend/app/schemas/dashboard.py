from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class MonthlyCrime(BaseModel):
    month: str
    total: int
    resolved: int
    drugTrafficking: int
    cybercrime: int
    extortion: int


class CategoryDist(BaseModel):
    name: str
    value: int
    color: str


class HighRiskZone(BaseModel):
    zone: str
    threatLevel: float
    activeSuspects: int
    incidents: int


class FinancialTrend(BaseModel):
    date: str
    volumeUSD: float
    flaggedVolumeUSD: float


class CommFreq(BaseModel):
    timeSlot: str
    voiceCalls: int
    encryptedMessages: int
    interceptedRadio: int


class ActivityFeedItem(BaseModel):
    id: str
    timestamp: str
    message: str
    type: str  # 'alert', 'update', 'surveillance', 'arrest'
    actor: str


class DashboardSummary(BaseModel):
    totalSuspects: int = 0
    suspectsTrend: float = 0.0
    activeInvestigations: int = 0
    investigationsTrend: float = 0.0
    highRiskIndividuals: int = 0
    highRiskTrend: float = 0.0
    locationsUnderSurveillance: int = 0
    locationsTrend: float = 0.0
    aiRiskScore: float = 0.0
    aiRiskTrend: float = 0.0
    recentAlertsCount: int = 0
    alertsTrend: float = 0.0

    crimesPerMonth: List[MonthlyCrime] = Field(default_factory=list)
    crimeCategoryDistribution: List[CategoryDist] = Field(default_factory=list)
    highRiskZones: List[HighRiskZone] = Field(default_factory=list)
    financialActivityTrend: List[FinancialTrend] = Field(default_factory=list)
    communicationFrequency: List[CommFreq] = Field(default_factory=list)
    
    recentInvestigations: List[Dict[str, Any]] = Field(default_factory=list)
    recentActivityFeed: List[ActivityFeedItem] = Field(default_factory=list)
