import pytest
from fastapi.testclient import TestClient


def test_serve_frontend_index(client: TestClient):
    """Verify that the merged fullstack FastAPI server serves the compiled React application."""
    resp = client.get("/")
    assert resp.status_code == 200
    assert "<!DOCTYPE html>" in resp.text
    assert "A.E.G.I.S." in resp.text
    assert '<div id="root">' in resp.text


def test_serve_frontend_gh_pages_base(client: TestClient):
    """Verify that the GitHub Pages subpath also serves the React application."""
    resp = client.get("/criminal-network-analysis-system/")
    assert resp.status_code == 200
    assert "<!DOCTYPE html>" in resp.text


def test_spa_client_routing_fallback(client: TestClient):
    """Verify that client-side SPA route navigations fallback to index.html."""
    resp = client.get("/dashboard")
    assert resp.status_code == 200
    assert "<!DOCTYPE html>" in resp.text


def test_api_404_not_intercepted_by_spa(client: TestClient):
    """Verify that API routes return JSON 404 and are not intercepted by the SPA fallback."""
    resp = client.get("/api/non-existent-endpoint")
    assert resp.status_code == 404
    assert resp.headers["content-type"].startswith("application/json")
