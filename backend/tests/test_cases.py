import pytest
from fastapi.testclient import TestClient


def test_create_and_get_case(client: TestClient, investigator_headers):
    # 1. Create Case
    create_resp = client.post(
        "/api/v1/cases",
        headers=investigator_headers,
        json={
            "case_number": "CAS-TEST-001",
            "title": "Operation Nightfall — Counter-Trafficking",
            "description": "Targeting illicit supply routes.",
            "status": "ACTIVE",
            "priority": "HIGH",
            "lead_officer": "Test Lead Investigator",
            "lead_officer_badge": "AGY-7701",
            "target_syndicate": "Nightfall Syndicate",
            "progress_percent": 30,
            "estimated_risk_score": 78.0,
        },
    )
    assert create_resp.status_code == 201
    case_data = create_resp.json()["data"]
    case_id = case_data["id"]
    assert case_data["case_number"] == "CAS-TEST-001"

    # 2. Get Case By ID
    get_resp = client.get(f"/api/v1/cases/{case_id}", headers=investigator_headers)
    assert get_resp.status_code == 200
    assert get_resp.json()["data"]["title"] == "Operation Nightfall — Counter-Trafficking"

    # 3. Update Case
    patch_resp = client.patch(
        f"/api/v1/cases/{case_id}",
        headers=investigator_headers,
        json={"status": "UNDER_REVIEW", "progress_percent": 75},
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["data"]["status"] == "UNDER_REVIEW"
    assert patch_resp.json()["data"]["progress_percent"] == 75

    # 4. List Cases with Filter
    list_resp = client.get("/api/v1/cases?status=UNDER_REVIEW", headers=investigator_headers)
    assert list_resp.status_code == 200
    assert len(list_resp.json()["data"]) >= 1


def test_delete_case_admin_only(client: TestClient, investigator_headers, admin_headers):
    # Create a case to delete
    create_resp = client.post(
        "/api/v1/cases",
        headers=investigator_headers,
        json={
            "case_number": "CAS-DEL-999",
            "title": "Temporary Case to Delete",
            "lead_officer": "Agent Test",
        },
    )
    case_id = create_resp.json()["data"]["id"]

    # Investigator cannot delete
    del_inv = client.delete(f"/api/v1/cases/{case_id}", headers=investigator_headers)
    assert del_inv.status_code == 403

    # Admin can delete
    del_admin = client.delete(f"/api/v1/cases/{case_id}", headers=admin_headers)
    assert del_admin.status_code == 200
    assert del_admin.json()["data"]["success"] is True
