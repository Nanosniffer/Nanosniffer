import asyncio
import logging
from typing import Any, Dict, List, Optional
import networkx as nx
from app.core.config import settings

logger = logging.getLogger(__name__)


class InMemoryGraphEngine:
    """High-performance in-memory graph engine using NetworkX as a transparent fallback

    when Neo4j is offline or during standalone unit testing.
    """

    def __init__(self):
        self.graph = nx.MultiDiGraph()
        self._lock = asyncio.Lock()

    async def upsert_node(self, node_id: str, labels: List[str], properties: Dict[str, Any]) -> None:
        async with self._lock:
            if not self.graph.has_node(node_id):
                self.graph.add_node(node_id, labels=labels, **properties)
            else:
                current_data = self.graph.nodes[node_id]
                current_data.update(properties)
                current_data["labels"] = list(set(current_data.get("labels", []) + labels))

    async def delete_node(self, node_id: str) -> None:
        async with self._lock:
            if self.graph.has_node(node_id):
                self.graph.remove_node(node_id)

    async def upsert_edge(
        self,
        edge_id: str,
        source_id: str,
        target_id: str,
        rel_type: str,
        properties: Dict[str, Any],
    ) -> None:
        async with self._lock:
            # Ensure endpoints exist
            if not self.graph.has_node(source_id):
                self.graph.add_node(source_id, labels=["Entity"])
            if not self.graph.has_node(target_id):
                self.graph.add_node(target_id, labels=["Entity"])
            
            # Add or update edge
            self.graph.add_edge(source_id, target_id, key=edge_id, rel_type=rel_type, **properties)

    async def delete_edge(self, edge_id: str) -> None:
        async with self._lock:
            for u, v, k in list(self.graph.edges(keys=True)):
                if k == edge_id:
                    self.graph.remove_edge(u, v, key=k)
                    break

    async def get_subgraph(self, entity_id: str, max_hops: int = 2) -> Dict[str, Any]:
        async with self._lock:
            if not self.graph.has_node(entity_id):
                return {"nodes": [], "edges": []}
            
            # Perform undirected BFS to find N-hop neighborhood
            undirected = self.graph.to_undirected(as_view=True)
            lengths = nx.single_source_shortest_path_length(undirected, entity_id, cutoff=max_hops)
            subgraph_nodes = set(lengths.keys())

            nodes_data = []
            for n in subgraph_nodes:
                node_props = dict(self.graph.nodes[n])
                nodes_data.append({"id": n, "properties": node_props})

            edges_data = []
            for u, v, k, data in self.graph.edges(subgraph_nodes, keys=True, data=True):
                if u in subgraph_nodes and v in subgraph_nodes:
                    edges_data.append({
                        "id": k,
                        "source": u,
                        "target": v,
                        "type": data.get("rel_type", "ASSOCIATED_WITH"),
                        "properties": {k_: v_ for k_, v_ in data.items() if k_ != "rel_type"},
                    })

            return {"nodes": nodes_data, "edges": edges_data}

    async def get_shortest_path(self, source_id: str, target_id: str) -> Optional[Dict[str, Any]]:
        async with self._lock:
            if not self.graph.has_node(source_id) or not self.graph.has_node(target_id):
                return None
            try:
                undirected = self.graph.to_undirected(as_view=True)
                path = nx.shortest_path(undirected, source=source_id, target=target_id)
                
                path_nodes = [{"id": n, "properties": dict(self.graph.nodes[n])} for n in path]
                path_edges = []
                for i in range(len(path) - 1):
                    u, v = path[i], path[i + 1]
                    # Find connecting edge
                    edge_data = None
                    if self.graph.has_edge(u, v):
                        k, d = next(iter(self.graph[u][v].items()))
                        edge_data = {"id": k, "source": u, "target": v, "type": d.get("rel_type", "LINK"), "properties": d}
                    elif self.graph.has_edge(v, u):
                        k, d = next(iter(self.graph[v][u].items()))
                        edge_data = {"id": k, "source": v, "target": u, "type": d.get("rel_type", "LINK"), "properties": d}
                    if edge_data:
                        path_edges.append(edge_data)

                return {"path": path, "length": len(path) - 1, "nodes": path_nodes, "edges": path_edges}
            except (nx.NetworkXNoPath, nx.NodeNotFound):
                return None

    async def get_all_graph(self, limit: int = 200) -> Dict[str, Any]:
        async with self._lock:
            nodes_data = []
            for n in list(self.graph.nodes)[:limit]:
                nodes_data.append({"id": n, "properties": dict(self.graph.nodes[n])})

            edges_data = []
            for u, v, k, data in list(self.graph.edges(keys=True, data=True))[:limit]:
                edges_data.append({
                    "id": k,
                    "source": u,
                    "target": v,
                    "type": data.get("rel_type", "ASSOCIATED_WITH"),
                    "properties": {k_: v_ for k_, v_ in data.items() if k_ != "rel_type"},
                })

            return {"nodes": nodes_data, "edges": edges_data}

    async def get_network_metrics(self) -> Dict[str, Any]:
        async with self._lock:
            if len(self.graph.nodes) == 0:
                return {
                    "total_nodes": 0,
                    "total_edges": 0,
                    "density": 0.0,
                    "degree_centrality": [],
                    "betweenness_centrality": [],
                    "communities_count": 0,
                    "average_connections": 0.0,
                }

            # Convert to simple undirected graph for network analytics
            simple_g = nx.Graph(self.graph)
            
            deg_centrality = nx.degree_centrality(simple_g)
            between_centrality = nx.betweenness_centrality(simple_g) if len(simple_g) > 1 else {n: 0.0 for n in simple_g}
            
            # Sort top nodes
            top_degree = sorted([{"id": k, "name": self.graph.nodes[k].get("name", k), "score": round(v, 4)} for k, v in deg_centrality.items()], key=lambda x: x["score"], reverse=True)[:10]
            top_between = sorted([{"id": k, "name": self.graph.nodes[k].get("name", k), "score": round(v, 4)} for k, v in between_centrality.items()], key=lambda x: x["score"], reverse=True)[:10]

            density = nx.density(simple_g)
            num_connected_components = nx.number_connected_components(simple_g)
            total_edges = self.graph.number_of_edges()
            total_nodes = self.graph.number_of_nodes()
            avg_connections = (2 * total_edges / total_nodes) if total_nodes > 0 else 0.0

            return {
                "total_nodes": total_nodes,
                "total_edges": total_edges,
                "density": round(density, 4),
                "degree_centrality": top_degree,
                "betweenness_centrality": top_between,
                "communities_count": num_connected_components,
                "average_connections": round(avg_connections, 2),
            }


class Neo4jGraphClient:
    """Async Neo4j Client with automatic fallback to InMemoryGraphEngine."""

    def __init__(self):
        self.driver = None
        self.is_connected = False
        self.in_memory = InMemoryGraphEngine()

    async def connect(self) -> None:
        """Attempt connection to live Neo4j instance; activate in-memory engine if unavailable."""
        try:
            from neo4j import AsyncGraphDatabase
            self.driver = AsyncGraphDatabase.driver(
                settings.NEO4J_URI,
                auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD),
                max_connection_pool_size=settings.NEO4J_MAX_CONNECTION_POOL_SIZE,
            )
            # Verify connectivity with 2s timeout
            async with asyncio.timeout(2.0):
                await self.driver.verify_connectivity()
            self.is_connected = True
            logger.info("Successfully established connection to Neo4j cluster.")
        except Exception as e:
            self.is_connected = False
            self.driver = None
            logger.warning(f"Neo4j cluster unavailable ({e}). Seamlessly engaging in-memory graph analytics engine.")

    async def close(self) -> None:
        if self.driver:
            await self.driver.close()
            self.is_connected = False

    async def upsert_entity_node(self, entity_id: str, label: str, properties: Dict[str, Any]) -> None:
        # Update in-memory graph
        await self.in_memory.upsert_node(entity_id, [label, "Entity"], properties)

        # If live Neo4j is available, run Cypher
        if self.is_connected and self.driver:
            try:
                query = f"""
                MERGE (n:{label} {{id: $entity_id}})
                SET n += $properties, n:Entity
                """
                async with self.driver.session(database=settings.NEO4J_DATABASE) as session:
                    await session.run(query, entity_id=entity_id, properties=properties)
            except Exception as e:
                logger.error(f"Error syncing node {entity_id} to Neo4j: {e}")

    async def delete_entity_node(self, entity_id: str) -> None:
        await self.in_memory.delete_node(entity_id)
        if self.is_connected and self.driver:
            try:
                query = "MATCH (n:Entity {id: $entity_id}) DETACH DELETE n"
                async with self.driver.session(database=settings.NEO4J_DATABASE) as session:
                    await session.run(query, entity_id=entity_id)
            except Exception as e:
                logger.error(f"Error deleting node {entity_id} in Neo4j: {e}")

    async def upsert_relationship(
        self,
        rel_id: str,
        source_id: str,
        target_id: str,
        rel_type: str,
        properties: Dict[str, Any],
    ) -> None:
        clean_rel_type = rel_type.replace(" ", "_").upper()
        await self.in_memory.upsert_edge(rel_id, source_id, target_id, clean_rel_type, properties)

        if self.is_connected and self.driver:
            try:
                query = f"""
                MATCH (a:Entity {{id: $source_id}})
                MATCH (b:Entity {{id: $target_id}})
                MERGE (a)-[r:{clean_rel_type} {{id: $rel_id}}]->(b)
                SET r += $properties
                """
                async with self.driver.session(database=settings.NEO4J_DATABASE) as session:
                    await session.run(
                        query,
                        source_id=source_id,
                        target_id=target_id,
                        rel_id=rel_id,
                        properties=properties,
                    )
            except Exception as e:
                logger.error(f"Error syncing relationship {rel_id} to Neo4j: {e}")

    async def delete_relationship(self, rel_id: str) -> None:
        await self.in_memory.delete_edge(rel_id)
        if self.is_connected and self.driver:
            try:
                query = "MATCH ()-[r {id: $rel_id}]->() DELETE r"
                async with self.driver.session(database=settings.NEO4J_DATABASE) as session:
                    await session.run(query, rel_id=rel_id)
            except Exception as e:
                logger.error(f"Error deleting relationship {rel_id} in Neo4j: {e}")

    async def get_subgraph(self, entity_id: str, max_hops: int = 2) -> Dict[str, Any]:
        return await self.in_memory.get_subgraph(entity_id, max_hops)

    async def get_shortest_path(self, source_id: str, target_id: str) -> Optional[Dict[str, Any]]:
        return await self.in_memory.get_shortest_path(source_id, target_id)

    async def get_all_graph(self, limit: int = 200) -> Dict[str, Any]:
        return await self.in_memory.get_all_graph(limit)

    async def get_network_metrics(self) -> Dict[str, Any]:
        return await self.in_memory.get_network_metrics()


graph_client = Neo4jGraphClient()
