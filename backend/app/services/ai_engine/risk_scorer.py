import math
from typing import Any, Dict, List, Optional
from app.schemas.ai import RiskScoreBreakdown


class RiskScoringEngine:
    """Algorithmic multi-factor criminal risk scoring engine (0-100 scale)."""

    CATEGORY_WEIGHTS: Dict[str, float] = {
        "Terrorism Financing": 95.0,
        "Arms Smuggling": 90.0,
        "Human Trafficking": 88.0,
        "Drug Trafficking": 82.0,
        "Organized Heist": 78.0,
        "Cybercrime": 75.0,
        "Money Laundering": 70.0,
        "Extortion": 68.0,
    }

    @classmethod
    def calculate_risk(
        cls,
        crime_category: Optional[str] = None,
        active_warrants: int = 0,
        centrality_score: float = 0.0,
        degree_count: int = 0,
        high_risk_associates_count: int = 0,
        flagged_transactions_count: int = 0,
        anomaly_count: int = 0,
    ) -> RiskScoreBreakdown:
        factors = []

        # 1. Base Score from primary crime classification
        base = cls.CATEGORY_WEIGHTS.get(crime_category or "", 50.0)
        factors.append(f"Primary classification ({crime_category or 'General Suspect'}) base weight: {base:.1f}")

        # 2. Centrality & Network Influence contribution (up to +20)
        centrality_contrib = min(20.0, (centrality_score * 25.0) + (degree_count * 1.5))
        if centrality_contrib > 5.0:
            factors.append(f"High network centrality ({degree_count} direct links, score {centrality_score:.3f}): +{centrality_contrib:.1f}")

        # 3. Associate Risk Proximity (up to +15)
        associate_contrib = min(15.0, high_risk_associates_count * 3.5)
        if associate_contrib > 0:
            factors.append(f"{high_risk_associates_count} high-threat known associates in direct cluster: +{associate_contrib:.1f}")

        # 4. Anomaly Penalties (up to +15)
        anomaly_penalty = min(15.0, (flagged_transactions_count * 2.0) + (anomaly_count * 3.0))
        if anomaly_penalty > 0:
            factors.append(f"Active anomalies ({flagged_transactions_count} flagged tx, {anomaly_count} behavioral anomalies): +{anomaly_penalty:.1f}")

        # 5. Active Warrants (+12.5 each, capped at +25)
        warrant_penalty = min(25.0, active_warrants * 12.5)
        if warrant_penalty > 0:
            factors.append(f"{active_warrants} active outstanding warrants: +{warrant_penalty:.1f}")

        # Combine and normalize
        raw_total = (base * 0.60) + (centrality_contrib * 1.0) + (associate_contrib * 1.0) + (anomaly_penalty * 1.0) + (warrant_penalty * 1.0)
        total_risk = max(5.0, min(99.5, raw_total))

        # Determine level
        if total_risk >= 80.0:
            risk_level = "CRITICAL"
        elif total_risk >= 65.0:
            risk_level = "HIGH"
        elif total_risk >= 40.0:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"

        threat_summary = (
            f"Subject presents a {risk_level} threat posture (Risk Score: {total_risk:.1f}/100) based on "
            f"{crime_category or 'unclassified activity'}, {degree_count} network connections, and {active_warrants} active warrants."
        )

        return RiskScoreBreakdown(
            base_score=round(base, 1),
            centrality_contribution=round(centrality_contrib, 1),
            associate_risk_contribution=round(associate_contrib, 1),
            anomaly_penalty=round(anomaly_penalty, 1),
            warrant_penalty=round(warrant_penalty, 1),
            total_risk_score=round(total_risk, 1),
            risk_level=risk_level,
            threat_summary=threat_summary,
            contributing_factors=factors,
        )


risk_scorer = RiskScoringEngine()
