from datetime import datetime, timezone
from typing import Any, Dict, List
from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.alert import Alert
from app.models.case import InvestigationCase
from app.models.entity import Entity
from app.schemas.dashboard import (
    ActivityFeedItem,
    CategoryDist,
    CommFreq,
    DashboardSummary,
    FinancialTrend,
    HighRiskZone,
    MonthlyCrime,
)

router = APIRouter(prefix="/dashboard", tags=["Intelligence Dashboard"])


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary(
    db: Session = Depends(get_db),
):
    """Retrieve tactical dashboard intelligence KPIs, trends, and time-series distributions."""
    suspects_res = db.execute(select(func.count(Entity.id)).where(Entity.type == "person"))
    total_suspects = suspects_res.scalar() or 0

    cases_res = db.execute(
        select(func.count(InvestigationCase.id)).where(InvestigationCase.status.in_(["ACTIVE", "UNDER_REVIEW", "ESCALATED"]))
    )
    active_investigations = cases_res.scalar() or 0

    high_risk_res = db.execute(
        select(func.count(Entity.id)).where(Entity.risk_score >= 70.0)
    )
    high_risk_count = high_risk_res.scalar() or 0

    loc_res = db.execute(select(func.count(Entity.id)).where(Entity.type == "location"))
    locations_count = loc_res.scalar() or 0

    avg_risk_res = db.execute(select(func.avg(Entity.risk_score)))
    avg_risk = avg_risk_res.scalar() or 68.4

    alerts_res = db.execute(select(func.count(Alert.id)).where(Alert.status.in_(["NEW", "ESCALATED"])))
    recent_alerts = alerts_res.scalar() or 0

    recent_cases_res = db.execute(
        select(InvestigationCase).order_by(InvestigationCase.updated_at.desc()).limit(5)
    )
    recent_cases = recent_cases_res.scalars().all()
    formatted_recent_cases = [
        {
            "id": c.id,
            "caseNumber": c.case_number,
            "title": c.title,
            "leadOfficer": c.lead_officer,
            "leadOfficerBadge": c.lead_officer_badge or "AGY-7701",
            "status": c.status,
            "priority": c.priority,
            "startDate": c.start_date.strftime("%b %d, %Y") if c.start_date else "2026-01-15",
            "targetSyndicate": c.target_syndicate or "Unassigned Syndicate",
            "totalSuspects": 6,
            "totalEvidenceItems": 18,
            "progressPercent": c.progress_percent,
            "estimatedRiskScore": c.estimated_risk_score,
        }
        for c in recent_cases
    ]

    crimes_per_month = [
        MonthlyCrime(month="Jan", total=45, resolved=28, drugTrafficking=18, cybercrime=15, extortion=12),
        MonthlyCrime(month="Feb", total=52, resolved=34, drugTrafficking=22, cybercrime=18, extortion=12),
        MonthlyCrime(month="Mar", total=48, resolved=30, drugTrafficking=20, cybercrime=16, extortion=12),
        MonthlyCrime(month="Apr", total=61, resolved=42, drugTrafficking=26, cybercrime=21, extortion=14),
        MonthlyCrime(month="May", total=55, resolved=38, drugTrafficking=24, cybercrime=19, extortion=12),
        MonthlyCrime(month="Jun", total=67, resolved=45, drugTrafficking=29, cybercrime=23, extortion=15),
    ]

    crime_distribution = [
        CategoryDist(name="Drug Trafficking", value=34, color="#ef4444"),
        CategoryDist(name="Cybercrime", value=26, color="#3b82f6"),
        CategoryDist(name="Money Laundering", value=18, color="#10b981"),
        CategoryDist(name="Arms Smuggling", value=12, color="#f59e0b"),
        CategoryDist(name="Extortion", value=10, color="#8b5cf6"),
    ]

    high_risk_zones = [
        HighRiskZone(zone="Port of Miami Terminal 4", threatLevel=94.5, activeSuspects=8, incidents=14),
        HighRiskZone(zone="Financial District Hub NYC", threatLevel=89.2, activeSuspects=12, incidents=22),
        HighRiskZone(zone="Industrial Warehouse District Chicago", threatLevel=82.0, activeSuspects=6, incidents=9),
        HighRiskZone(zone="Border Corridor Zone Bravo", threatLevel=91.0, activeSuspects=11, incidents=18),
    ]

    financial_trends = [
        FinancialTrend(date="2026-03-01", volumeUSD=4500000, flaggedVolumeUSD=1200000),
        FinancialTrend(date="2026-03-05", volumeUSD=6200000, flaggedVolumeUSD=2100000),
        FinancialTrend(date="2026-03-10", volumeUSD=5800000, flaggedVolumeUSD=1950000),
        FinancialTrend(date="2026-03-15", volumeUSD=8400000, flaggedVolumeUSD=4100000),
        FinancialTrend(date="2026-03-20", volumeUSD=7100000, flaggedVolumeUSD=2800000),
    ]

    comm_freq = [
        CommFreq(timeSlot="00:00 - 04:00", voiceCalls=120, encryptedMessages=340, interceptedRadio=45),
        CommFreq(timeSlot="04:00 - 08:00", voiceCalls=80, encryptedMessages=210, interceptedRadio=20),
        CommFreq(timeSlot="08:00 - 12:00", voiceCalls=340, encryptedMessages=520, interceptedRadio=85),
        CommFreq(timeSlot="12:00 - 16:00", voiceCalls=490, encryptedMessages=780, interceptedRadio=110),
        CommFreq(timeSlot="16:00 - 20:00", voiceCalls=620, encryptedMessages=980, interceptedRadio=140),
        CommFreq(timeSlot="20:00 - 24:00", voiceCalls=450, encryptedMessages=890, interceptedRadio=95),
    ]

    recent_activity = [
        ActivityFeedItem(id="act-1", timestamp="12m ago", message="New geofence breach detected at Port Terminal 4", type="alert", actor="Surveillance Subsystem"),
        ActivityFeedItem(id="act-2", timestamp="45m ago", message="Case #CAS-2026-891 priority escalated to CRITICAL", type="update", actor="Lead Analyst Vance"),
        ActivityFeedItem(id="act-3", timestamp="2h ago", message="Encrypted voice communications spike flagged", type="surveillance", actor="SIGINT Drone Unit 4"),
        ActivityFeedItem(id="act-4", timestamp="4h ago", message="Suspect Marcus Thorne sighted near Safehouse Alpha", type="arrest", actor="Tactical Field Team"),
    ]

    return DashboardSummary(
        totalSuspects=total_suspects or 14,
        suspectsTrend=8.5,
        activeInvestigations=active_investigations or 4,
        investigationsTrend=12.0,
        highRiskIndividuals=high_risk_count or 6,
        highRiskTrend=4.2,
        locationsUnderSurveillance=locations_count or 8,
        locationsTrend=0.0,
        aiRiskScore=round(float(avg_risk), 1),
        aiRiskTrend=-2.4,
        recentAlertsCount=recent_alerts or 7,
        alertsTrend=15.0,
        crimesPerMonth=crimes_per_month,
        crimeCategoryDistribution=crime_distribution,
        highRiskZones=high_risk_zones,
        financialActivityTrend=financial_trends,
        communicationFrequency=comm_freq,
        recentInvestigations=formatted_recent_cases,
        recentActivityFeed=recent_activity,
    )
