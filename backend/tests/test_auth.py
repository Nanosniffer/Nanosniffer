import pytest
from fastapi.testclient import TestClient


def test_login_success(client: TestClient):
    resp = client.post(
        "/api/v1/auth/login",
        json={"email": "agent.vance@interpol.gov", "password": "Password123!"},
    )
    # If Vance not in test db, test with pre-seeded test-inv-01
    if resp.status_code == 401:
        resp = client.post(
            "/api/v1/auth/login",
            json={"email": "inv.test@interpol.gov", "password": "InvPass123!"},
        )
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert "access_token" in data
    assert "refresh_token" in data
    assert data["user"]["email"] in ["agent.vance@interpol.gov", "inv.test@interpol.gov"]


def test_login_invalid_password(client: TestClient):
    resp = client.post(
        "/api/v1/auth/login",
        json={"email": "inv.test@interpol.gov", "password": "WrongPassword123!"},
    )
    assert resp.status_code == 401
    assert resp.json()["error"]["code"] == "UNAUTHORIZED"


def test_register_new_user(client: TestClient):
    resp = client.post(
        "/api/v1/auth/register",
        json={
            "email": "new.detective@interpol.gov",
            "password": "SecurePassword123!",
            "name": "Detective John Doe",
            "badge_number": "AGY-9901",
            "role": "INVESTIGATOR",
            "clearance_level": "SECRET",
            "agency": "Special Investigations",
        },
    )
    assert resp.status_code == 201
    data = resp.json()["data"]
    assert data["email"] == "new.detective@interpol.gov"
    assert data["name"] == "Detective John Doe"


def test_token_refresh(client: TestClient):
    # First login
    login_resp = client.post(
        "/api/v1/auth/login",
        json={"email": "inv.test@interpol.gov", "password": "InvPass123!"},
    )
    refresh_token = login_resp.json()["data"]["refresh_token"]

    resp = client.post(
        "/api/v1/auth/refresh",
        json={"refresh_token": refresh_token},
    )
    assert resp.status_code == 200
    assert "access_token" in resp.json()["data"]


def test_get_current_user_profile(client: TestClient, investigator_headers):
    resp = client.get("/api/v1/auth/me", headers=investigator_headers)
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert data["role"] == "INVESTIGATOR"
    assert data["email"] == "inv.test@interpol.gov"


def test_rbac_admin_endpoint_forbidden_for_investigator(client: TestClient, investigator_headers):
    resp = client.get("/api/v1/audit-logs", headers=investigator_headers)
    assert resp.status_code == 403
    assert resp.json()["error"]["code"] == "FORBIDDEN"


def test_rbac_admin_endpoint_allowed_for_admin(client: TestClient, admin_headers):
    resp = client.get("/api/v1/audit-logs", headers=admin_headers)
    assert resp.status_code == 200
    assert "data" in resp.json()
