import pytest
from fastapi.testclient import TestClient


def test_entity_resolution_and_merge(client: TestClient, investigator_headers):
    # 1. Create duplicate records with near-identical names & aliases
    e1 = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={
            "entity_id": "CR-DUP-01",
            "name": "Dmitri Sokolov",
            "alias": "The Ghost",
            "type": "person",
            "city": "Miami",
            "personal_details": {"dob": "1985-05-12", "fingerprintId": "FP-SOKOLOV-99"},
        },
    ).json()["data"]

    e2 = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={
            "entity_id": "CR-DUP-02",
            "name": "Dmitry Sokoloff",
            "alias": "The Ghost",
            "type": "person",
            "city": "Miami",
            "personal_details": {"dob": "1985-05-12", "fingerprintId": "FP-SOKOLOV-99"},
        },
    ).json()["data"]

    # 2. Run entity resolution scan
    res_resp = client.post("/api/v1/ai/entity-resolution?threshold=0.60")
    assert res_resp.status_code == 200
    matches = res_resp.json()["data"]
    assert len(matches) >= 1
    top_match = matches[0]
    assert top_match["match_score"] >= 0.70

    # 3. Merge duplicate entities
    merge_resp = client.post(
        "/api/v1/ai/entity-resolution/merge",
        headers=investigator_headers,
        json={
            "primary_entity_id": e1["id"],
            "secondary_entity_id": e2["id"],
            "keep_secondary_aliases": True,
        },
    )
    assert merge_resp.status_code == 200
    assert merge_resp.json()["data"]["success"] is True

    # 4. Confirm secondary entity is removed
    get_e2 = client.get(f"/api/v1/entities/{e2['id']}")
    assert get_e2.status_code == 404


def test_risk_scoring_engine(client: TestClient, investigator_headers):
    # Create high-threat suspect
    e = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={
            "entity_id": "CR-RISK-01",
            "name": "High Threat Boss",
            "crime_category": "Terrorism Financing",
            "active_warrants": "3",
        },
    ).json()["data"]

    # Trigger risk assessment calculation
    risk_resp = client.post(f"/api/v1/ai/risk-scoring/{e['id']}")
    assert risk_resp.status_code == 200
    data = risk_resp.json()["data"]
    assert data["risk_score"] >= 75.0
    assert "breakdown" in data
    assert data["breakdown"]["risk_level"] in ["CRITICAL", "HIGH"]


def test_anomaly_detection_scan(client: TestClient):
    resp = client.post("/api/v1/ai/anomaly-detection")
    assert resp.status_code == 200
    anomalies = resp.json()["data"]
    assert isinstance(anomalies, list)


def test_community_detection_scan(client: TestClient):
    resp = client.post("/api/v1/ai/community-detection")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert "total_clusters" in data
    assert "clusters" in data
