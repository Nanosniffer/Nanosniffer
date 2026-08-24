import math
from typing import Any, Dict, List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.graph.client import graph_client
from app.models.entity import Entity
from app.models.relationship import Relationship
from app.schemas.common import APIResponseEnvelope
from app.schemas.network import (
    CentralityNode,
    NetworkEdge,
    NetworkEdgeData,
    NetworkGraphData,
    NetworkMetrics,
    NetworkNode,
    NetworkNodeData,
    NodePosition,
    ShortestPathResponse,
    SubgraphResponse,
)

router = APIRouter(prefix="/network", tags=["Network Graph Visualization & Traversal"])


def _compute_layout_positions(nodes: List[Dict[str, Any]]) -> Dict[str, NodePosition]:
    """Compute 2D layout coordinates in a circular pattern for frontend visualization."""
    positions = {}
    n = len(nodes)
    if n == 0:
        return positions
    
    radius = max(250, n * 35)
    center_x, center_y = 500.0, 400.0

    for idx, node in enumerate(nodes):
        node_id = node.get("id")
        risk = float(node.get("properties", {}).get("risk_score", 50.0))
        r = radius * (1.0 - (risk / 150.0))
        angle = (2 * math.pi * idx) / n
        x = center_x + r * math.cos(angle)
        y = center_y + r * math.sin(angle)
        positions[node_id] = NodePosition(x=round(x, 1), y=round(y, 1))

    return positions


@router.get("/graph", response_model=NetworkGraphData)
async def get_network_graph(
    min_risk: Optional[float] = None,
    entity_type: Optional[str] = None,
    limit: int = Query(250, ge=1, le=1000),
    db: Session = Depends(get_db),
):
    """Retrieve full visual network topology formatted for React Flow graph rendering."""
    raw_graph = await graph_client.get_all_graph(limit=limit)
    metrics_data = await graph_client.get_network_metrics()

    nodes_raw = raw_graph.get("nodes", [])
    edges_raw = raw_graph.get("edges", [])

    if entity_type:
        nodes_raw = [n for n in nodes_raw if n.get("properties", {}).get("type", "").lower() == entity_type.lower()]
        valid_ids = {n["id"] for n in nodes_raw}
        edges_raw = [e for e in edges_raw if e["source"] in valid_ids and e["target"] in valid_ids]

    if min_risk is not None:
        nodes_raw = [n for n in nodes_raw if float(n.get("properties", {}).get("risk_score", 0)) >= min_risk]
        valid_ids = {n["id"] for n in nodes_raw}
        edges_raw = [e for e in edges_raw if e["source"] in valid_ids and e["target"] in valid_ids]

    positions = _compute_layout_positions(nodes_raw)

    formatted_nodes: List[NetworkNode] = []
    for n in nodes_raw:
        props = n.get("properties", {})
        node_id = n.get("id")
        node_data = NetworkNodeData(
            label=props.get("name", "Unknown Entity"),
            type=props.get("type", "person"),
            subType=props.get("sub_type"),
            riskScore=props.get("risk_score", 50.0),
            riskLevel=props.get("risk_level", "MEDIUM"),
            entityId=props.get("entity_id", node_id),
            avatarUrl=props.get("photo_url"),
            status=props.get("status", "ACTIVE"),
            metadata=props,
            connectionsCount=0,
            centralityScore=0.0,
        )
        formatted_nodes.append(
            NetworkNode(
                id=node_id,
                type="custom",
                position=positions.get(node_id, NodePosition(x=400, y=300)),
                data=node_data,
            )
        )

    formatted_edges: List[NetworkEdge] = []
    for e in edges_raw:
        edge_data = NetworkEdgeData(
            relationshipType=e.get("type", "ASSOCIATED_WITH"),
            details=e.get("properties", {}).get("details", ""),
            amount=e.get("properties", {}).get("amount"),
            frequency=e.get("properties", {}).get("frequency"),
            riskLevel=e.get("properties", {}).get("risk_level", "MEDIUM"),
            lastInteraction=e.get("properties", {}).get("last_interaction"),
        )
        formatted_edges.append(
            NetworkEdge(
                id=e.get("id"),
                source=e.get("source"),
                target=e.get("target"),
                label=e.get("type", "ASSOCIATED_WITH"),
                animated=e.get("type") in ["MONEY_TRANSFER", "CALLS"],
                data=edge_data,
            )
        )

    top_degree = [CentralityNode(id=x["id"], name=x["name"], score=x["score"]) for x in metrics_data.get("degree_centrality", [])]
    top_between = [CentralityNode(id=x["id"], name=x["name"], score=x["score"]) for x in metrics_data.get("betweenness_centrality", [])]
    highest_leader = top_degree[0] if top_degree else None

    metrics = NetworkMetrics(
        degreeCentralityTopNodes=top_degree,
        betweennessCentralityTopNodes=top_between,
        communityClustersCount=metrics_data.get("communities_count", 1),
        highestInfluenceLeader=highest_leader,
        totalConnections=metrics_data.get("total_edges", len(formatted_edges)),
        averageConnectionsPerNode=metrics_data.get("average_connections", 0.0),
    )

    return NetworkGraphData(
        nodes=formatted_nodes,
        edges=formatted_edges,
        metrics=metrics,
    )


@router.get("/subgraph/{entity_id}", response_model=APIResponseEnvelope[SubgraphResponse])
async def get_entity_subgraph(
    entity_id: str,
    hops: int = Query(2, ge=1, le=5),
):
    """Retrieve N-hop neighborhood surrounding a specified target entity."""
    raw_subgraph = await graph_client.get_subgraph(entity_id, max_hops=hops)
    nodes_raw = raw_subgraph.get("nodes", [])
    edges_raw = raw_subgraph.get("edges", [])

    positions = _compute_layout_positions(nodes_raw)

    formatted_nodes = []
    for n in nodes_raw:
        props = n.get("properties", {})
        node_id = n.get("id")
        formatted_nodes.append(
            NetworkNode(
                id=node_id,
                type="custom",
                position=positions.get(node_id, NodePosition(x=400, y=300)),
                data=NetworkNodeData(
                    label=props.get("name", "Unknown Entity"),
                    type=props.get("type", "person"),
                    subType=props.get("sub_type"),
                    riskScore=props.get("risk_score", 50.0),
                    riskLevel=props.get("risk_level", "MEDIUM"),
                    entityId=props.get("entity_id", node_id),
                    avatarUrl=props.get("photo_url"),
                    status=props.get("status", "ACTIVE"),
                    metadata=props,
                ),
            )
        )

    formatted_edges = []
    for e in edges_raw:
        formatted_edges.append(
            NetworkEdge(
                id=e.get("id"),
                source=e.get("source"),
                target=e.get("target"),
                label=e.get("type", "ASSOCIATED_WITH"),
                data=NetworkEdgeData(
                    relationshipType=e.get("type", "ASSOCIATED_WITH"),
                    details=e.get("properties", {}).get("details", ""),
                    riskLevel=e.get("properties", {}).get("risk_level", "MEDIUM"),
                ),
            )
        )

    resp = SubgraphResponse(
        center_node_id=entity_id,
        hops=hops,
        nodes=formatted_nodes,
        edges=formatted_edges,
    )
    return APIResponseEnvelope(data=resp)


@router.get("/shortest-path", response_model=APIResponseEnvelope[ShortestPathResponse])
async def get_shortest_path(
    source_id: str = Query(...),
    target_id: str = Query(...),
):
    """Calculate the shortest connection chain between two suspect entities."""
    path_result = await graph_client.get_shortest_path(source_id, target_id)
    if not path_result:
        return APIResponseEnvelope(
            data=ShortestPathResponse(
                found=False,
                source_id=source_id,
                target_id=target_id,
                path_length=0,
                nodes=[],
                edges=[],
            )
        )

    return APIResponseEnvelope(
        data=ShortestPathResponse(
            found=True,
            source_id=source_id,
            target_id=target_id,
            path_length=path_result.get("length", 0),
            nodes=path_result.get("nodes", []),
            edges=path_result.get("edges", []),
        )
    )
