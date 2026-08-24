import pytest
from fastapi.testclient import TestClient


def test_entity_crud_and_search(client: TestClient, investigator_headers):
    # 1. Create Person Entity
    create_resp = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={
            "entity_id": "CR-TEST-99",
            "name": "Alexander Petrov",
            "alias": "The Shadow",
            "type": "person",
            "sub_type": "Logistics Boss",
            "crime_category": "Arms Smuggling",
            "risk_score": 85.0,
            "risk_level": "CRITICAL",
            "status": "WANTED",
            "city": "Chicago",
            "active_warrants": "2",
            "tags": ["Arms-Dealer", "High-Priority"],
            "personal_details": {
                "dob": "1988-08-14",
                "fingerprintId": "FP-9921-TEST",
            },
        },
    )
    assert create_resp.status_code == 201
    ent_data = create_resp.json()["data"]
    ent_id = ent_data["id"]
    assert ent_data["name"] == "Alexander Petrov"
    assert ent_data["alias"] == "The Shadow"

    # 2. Get Entity By ID
    get_resp = client.get(f"/api/v1/entities/{ent_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["data"]["entity_id"] == "CR-TEST-99"

    # 3. Fuzzy Search
    search_resp = client.get("/api/v1/entities/search?q=Petrov")
    assert search_resp.status_code == 200
    assert len(search_resp.json()["data"]) >= 1
    assert search_resp.json()["data"][0]["name"] == "Alexander Petrov"

    # 4. Frontend direct compatibility endpoint /api/criminals
    crim_resp = client.get("/api/criminals?searchQuery=Petrov")
    assert crim_resp.status_code == 200
    assert len(crim_resp.json()) >= 1

    # 5. Update Entity
    patch_resp = client.patch(
        f"/api/v1/entities/{ent_id}",
        headers=investigator_headers,
        json={"status": "IN_CUSTODY", "risk_score": 60.0},
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["data"]["status"] == "IN_CUSTODY"
    assert patch_resp.json()["data"]["risk_score"] == 60.0


def test_polymorphic_entity_types(client: TestClient, investigator_headers):
    # Location entity
    loc_resp = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={
            "entity_id": "LOC-TEST-01",
            "name": "Secret Warehouse Bravo",
            "type": "location",
            "sub_type": "Warehouse",
            "city": "Miami",
            "latitude": 25.7617,
            "longitude": -80.1918,
        },
    )
    assert loc_resp.status_code == 201
    assert loc_resp.json()["data"]["type"] == "location"

    # Organization entity
    org_resp = client.post(
        "/api/v1/entities",
        headers=investigator_headers,
        json={
            "entity_id": "ORG-TEST-01",
            "name": "Shadow Syndicate",
            "type": "organization",
            "sub_type": "Cartel",
            "city": "Miami",
        },
    )
    assert org_resp.status_code == 201
    assert org_resp.json()["data"]["type"] == "organization"
