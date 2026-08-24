from typing import Any, Dict
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.graph.client import graph_client
from app.schemas.common import APIResponseEnvelope
from app.schemas.network import CentralityNode, NetworkMetrics

router = APIRouter(prefix="/analytics", tags=["Network Graph Analytics"])


@router.get("/network-metrics", response_model=APIResponseEnvelope[NetworkMetrics])
async def get_network_metrics(
    db: Session = Depends(get_db),
):
    """Calculate and return network-wide centrality indicators, modularity, and top leaders."""
    metrics_data = await graph_client.get_network_metrics()

    top_degree = [CentralityNode(id=x["id"], name=x["name"], score=x["score"]) for x in metrics_data.get("degree_centrality", [])]
    top_between = [CentralityNode(id=x["id"], name=x["name"], score=x["score"]) for x in metrics_data.get("betweenness_centrality", [])]
    highest_leader = top_degree[0] if top_degree else None

    metrics = NetworkMetrics(
        degreeCentralityTopNodes=top_degree,
        betweennessCentralityTopNodes=top_between,
        communityClustersCount=metrics_data.get("communities_count", 1),
        highestInfluenceLeader=highest_leader,
        totalConnections=metrics_data.get("total_edges", 0),
        averageConnectionsPerNode=metrics_data.get("average_connections", 0.0),
    )
    return APIResponseEnvelope(data=metrics)
