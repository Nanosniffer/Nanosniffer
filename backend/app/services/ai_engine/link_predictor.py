import math
from typing import Any, Dict, List
import networkx as nx
from app.graph.client import graph_client
from app.schemas.ai import LinkPredictionResult


class LinkPredictionEngine:
    """Graph link prediction engine predicting unobserved covert relationships."""

    @staticmethod
    async def predict_links(top_k: int = 15, min_score: float = 0.25) -> List[LinkPredictionResult]:
        g = nx.Graph(graph_client.in_memory.graph)
        if len(g.nodes) < 2:
            return []

        results = []
        nodes = list(g.nodes)
        n = len(nodes)

        for i in range(n):
            u = nodes[i]
            neighbors_u = set(g.neighbors(u))
            u_name = g.nodes[u].get("name", u)

            for j in range(i + 1, n):
                v = nodes[j]
                # Skip already connected pairs
                if g.has_edge(u, v):
                    continue

                neighbors_v = set(g.neighbors(v))
                v_name = g.nodes[v].get("name", v)

                common = neighbors_u.intersection(neighbors_v)
                if not common:
                    continue

                union_size = len(neighbors_u.union(neighbors_v))
                # Jaccard coefficient
                jaccard = len(common) / union_size if union_size > 0 else 0.0

                # Adamic-Adar index
                adamic_adar = sum(1.0 / math.log(max(2, len(list(g.neighbors(w))))) for w in common)

                # Normalized link score (0.0 to 1.0)
                score = min(1.0, (jaccard * 0.5) + (min(1.0, adamic_adar / 3.0) * 0.5))

                if score >= min_score:
                    common_names = [g.nodes[w].get("name", w) for w in common]
                    
                    # Infer probable relationship
                    rel_type = "Associate"
                    if any("Cartel" in g.nodes[w].get("name", "") or "Syndicate" in g.nodes[w].get("name", "") for w in common):
                        rel_type = "Co-conspirator"
                    elif any(g.nodes[w].get("type") == "bank" for w in common):
                        rel_type = "Money Transfer"
                    elif any(g.nodes[w].get("type") == "phone" for w in common):
                        rel_type = "Calls"

                    rationale = (
                        f"Shared {len(common)} mutual contacts ({', '.join(common_names[:3])}). "
                        f"Adamic-Adar proximity score: {adamic_adar:.2f}, Jaccard coefficient: {jaccard:.2f}."
                    )

                    results.append(
                        LinkPredictionResult(
                            source_id=u,
                            source_name=u_name,
                            target_id=v,
                            target_name=v_name,
                            predicted_relationship=rel_type,
                            prediction_score=round(score, 3),
                            common_associates=common_names,
                            confidence_rationale=rationale,
                        )
                    )

        return sorted(results, key=lambda r: r.prediction_score, reverse=True)[:top_k]


link_predictor = LinkPredictionEngine()
