import pytest
from fastapi.testclient import TestClient


def test_create_and_update_alert(client: TestClient, investigator_headers):
    # 1. Create Alert
    create_resp = client.post(
        "/api/v1/alerts",
        headers=investigator_headers,
        json={
            "alert_code": "ALT-TEST-99",
            "title": "Unusual Cash Withdrawal Sequence",
            "severity": "HIGH",
            "ai_confidence": 93.0,
            "description": "Sequential ATM withdrawals exceeding daily structuring limit.",
            "category": "Financial Anomaly",
            "status": "NEW",
            "suggested_action": "Freeze associated debit cards.",
            "location_name": "Manhattan East ATM Hub",
            "city": "New York",
        },
    )
    assert create_resp.status_code == 201
    alert_data = create_resp.json()["data"]
    alert_id = alert_data["id"]
    assert alert_data["alertCode"] == "ALT-TEST-99"

    # 2. Update Alert Status
    patch_resp = client.patch(
        f"/api/v1/alerts/{alert_id}",
        headers=investigator_headers,
        json={"status": "RESOLVED", "is_read": True},
    )
    assert patch_resp.status_code == 200
    assert patch_resp.json()["data"]["status"] == "RESOLVED"
    assert patch_resp.json()["data"]["is_read"] is True

    # 3. List Alerts
    list_resp = client.get("/api/v1/alerts?status=RESOLVED")
    assert list_resp.status_code == 200
    assert len(list_resp.json()["data"]) >= 1


def test_generate_pdf_report_and_download(client: TestClient, investigator_headers):
    # 1. Generate Report
    gen_resp = client.post(
        "/api/v1/reports/generate",
        headers=investigator_headers,
        json={
            "title": "Tactical Threat Assessment Dossier",
            "report_type": "Network Summary",
            "classification_level": "TOP SECRET // INTEL",
        },
    )
    assert gen_resp.status_code == 201
    report_data = gen_resp.json()["data"]
    report_id = report_data["id"]
    assert "reportNumber" in report_data

    # 2. Download Report PDF
    dl_resp = client.get(f"/api/v1/reports/{report_id}/download")
    assert dl_resp.status_code == 200
    assert dl_resp.headers["content-type"] == "application/pdf"
    assert len(dl_resp.content) > 1000  # valid PDF binary content
