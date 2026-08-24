import pytest
from fastapi.testclient import TestClient


def test_create_and_list_relationships(client: TestClient, investigator_headers):
    # 1. Create two test entities
    e1 = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={"entity_id": "CR-REL-A", "name": "Operative Alpha", "type": "person"},
    ).json()["data"]

    e2 = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={"entity_id": "CR-REL-B", "name": "Operative Beta", "type": "person"},
    ).json()["data"]

    # 2. Create Relationship
    rel_resp = client.post(
        "/api/v1/relationships",
        headers=investigator_headers,
        json={
            "source_id": e1["id"],
            "target_id": e2["id"],
            "relationship_type": "MONEY_TRANSFER",
            "amount": 500000.0,
            "frequency": 3.0,
            "risk_level": "HIGH",
            "confidence_score": 0.94,
            "details": "Laundering transfer trace.",
        },
    )
    assert rel_resp.status_code == 201
    rel_data = rel_resp.json()["data"]
    rel_id = rel_data["id"]
    assert rel_data["relationship_type"] == "MONEY_TRANSFER"
    assert rel_data["amount"] == 500000.0

    # 3. Get Relationship by ID
    get_rel = client.get(f"/api/v1/relationships/{rel_id}")
    assert get_rel.status_code == 200
    assert get_rel.json()["data"]["source_id"] == e1["id"]

    # 4. List relationships with filters
    list_resp = client.get(f"/api/v1/relationships?rel_type=MONEY_TRANSFER")
    assert list_resp.status_code == 200
    assert len(list_resp.json()["data"]) >= 1


def test_bulk_import_relationships(client: TestClient, investigator_headers):
    # Create two entities
    e1 = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={"entity_id": "CR-BULK-1", "name": "Bulk Person 1", "type": "person"},
    ).json()["data"]
    e2 = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={"entity_id": "CR-BULK-2", "name": "Bulk Person 2", "type": "person"},
    ).json()["data"]

    bulk_resp = client.post(
        "/api/v1/relationships/bulk-import",
        headers=investigator_headers,
        json={
            "relationships": [
                {
                    "source_id": e1["id"],
                    "target_id": e2["id"],
                    "relationship_type": "CALLS",
                    "confidence_score": 0.88,
                }
            ]
        },
    )
    assert bulk_resp.status_code == 200
    assert bulk_resp.json()["data"]["success"] is True
