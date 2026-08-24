"""
Cypher query templates and utility builders for Neo4j operations.
"""

# Query for finding N-hop neighborhood around an entity
SUBGRAPH_QUERY = """
MATCH (center:Entity {id: $entity_id})
CALL apoc.path.subgraphAll(center, {
    maxLevel: $max_hops,
    relationshipFilter: "KNOWS|USES|OWNS|ASSOCIATED_WITH|INVOLVED_IN|LOCATED_AT|CALLS|MONEY_TRANSFER|MEETING|FAMILY|OPERATES_IN|SUPPLIES|TRAVEL"
})
YIELD nodes, relationships
RETURN nodes, relationships
"""

# Query for shortest path between two entities
SHORTEST_PATH_QUERY = """
MATCH (source:Entity {id: $source_id}), (target:Entity {id: $target_id})
MATCH p = shortestPath((source)-[*..10]-(target))
RETURN p, [n IN nodes(p) | n.id] AS node_ids, [r IN relationships(p) | {id: r.id, type: type(r), source: startNode(r).id, target: endNode(r).id}] AS edges
"""

# Query for calculating degree centrality
DEGREE_CENTRALITY_QUERY = """
MATCH (n:Entity)
RETURN n.id AS id, n.name AS name, size((n)--()) AS degree
ORDER BY degree DESC
LIMIT 15
"""

# Query for community detection using Label Propagation or Connected Components
COMMUNITY_DETECTION_QUERY = """
MATCH (n:Entity)
RETURN n.id AS id, n.name AS name, n.community AS community
"""
