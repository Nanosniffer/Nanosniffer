import pytest
from fastapi.testclient import TestClient


def test_network_graph_endpoint(client: TestClient):
    resp = client.get("/api/v1/network/graph")
    assert resp.status_code == 200
    data = resp.json()
    assert "nodes" in data
    assert "edges" in data
    assert "metrics" in data


def test_network_metrics_analytics(client: TestClient):
    resp = client.get("/api/v1/analytics/network-metrics")
    assert resp.status_code == 200
    data = resp.json()["data"]
    assert "degreeCentralityTopNodes" in data
    assert "betweennessCentralityTopNodes" in data
    assert "communityClustersCount" in data


def test_shortest_path_endpoint(client: TestClient, investigator_headers):
    # Create chain A -> B -> C
    eA = client.post("/api/v1/entities", headers=investigator_headers, json={"entity_id": "CR-PATH-A", "name": "Node A"}).json()["data"]
    eB = client.post("/api/v1/entities", headers=investigator_headers, json={"entity_id": "CR-PATH-B", "name": "Node B"}).json()["data"]
    eC = client.post("/api/v1/entities", headers=investigator_headers, json={"entity_id": "CR-PATH-C", "name": "Node C"}).json()["data"]

    client.post("/api/v1/relationships", headers=investigator_headers, json={"source_id": eA["id"], "target_id": eB["id"], "relationship_type": "KNOWS", "confidence_score": 0.9})
    client.post("/api/v1/relationships", headers=investigator_headers, json={"source_id": eB["id"], "target_id": eC["id"], "relationship_type": "KNOWS", "confidence_score": 0.9})

    # Query shortest path between A and C
    path_resp = client.get(f"/api/v1/network/shortest-path?source_id={eA['id']}&target_id={eC['id']}")
    assert path_resp.status_code == 200
    data = path_resp.json()["data"]
    assert data["found"] is True
    assert data["path_length"] == 2
