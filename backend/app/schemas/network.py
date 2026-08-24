from typing import Any, Dict, List, Optional
from pydantic import BaseModel, Field


class NodePosition(BaseModel):
    x: float = 0.0
    y: float = 0.0


class NetworkNodeData(BaseModel):
    label: str
    type: str
    subType: Optional[str] = None
    riskScore: Optional[float] = 50.0
    riskLevel: Optional[str] = "MEDIUM"
    entityId: str
    avatarUrl: Optional[str] = None
    status: Optional[str] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)
    connectionsCount: Optional[int] = 0
    centralityScore: Optional[float] = 0.0


class NetworkNode(BaseModel):
    id: str
    type: str = "custom"
    position: NodePosition = Field(default_factory=NodePosition)
    data: NetworkNodeData
    style: Optional[Dict[str, Any]] = None


class NetworkEdgeData(BaseModel):
    relationshipType: str
    details: Optional[str] = ""
    amount: Optional[float] = None
    frequency: Optional[float] = None
    riskLevel: Optional[str] = "MEDIUM"
    lastInteraction: Optional[str] = None


class NetworkEdge(BaseModel):
    id: str
    source: str
    target: str
    label: Optional[str] = None
    animated: Optional[bool] = False
    data: Optional[NetworkEdgeData] = None
    style: Optional[Dict[str, Any]] = None


class CentralityNode(BaseModel):
    id: str
    name: str
    score: float


class NetworkMetrics(BaseModel):
    degreeCentralityTopNodes: List[CentralityNode] = Field(default_factory=list)
    betweennessCentralityTopNodes: List[CentralityNode] = Field(default_factory=list)
    communityClustersCount: int = 1
    highestInfluenceLeader: Optional[CentralityNode] = None
    totalConnections: int = 0
    averageConnectionsPerNode: float = 0.0


class NetworkGraphData(BaseModel):
    nodes: List[NetworkNode] = Field(default_factory=list)
    edges: List[NetworkEdge] = Field(default_factory=list)
    metrics: NetworkMetrics


class SubgraphResponse(BaseModel):
    center_node_id: str
    hops: int
    nodes: List[NetworkNode] = Field(default_factory=list)
    edges: List[NetworkEdge] = Field(default_factory=list)


class ShortestPathResponse(BaseModel):
    found: bool
    source_id: str
    target_id: str
    path_length: int = 0
    nodes: List[Dict[str, Any]] = Field(default_factory=list)
    edges: List[Dict[str, Any]] = Field(default_factory=list)
