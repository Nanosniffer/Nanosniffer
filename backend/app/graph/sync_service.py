import json
from typing import Optional
from app.graph.client import graph_client
from app.models.entity import Entity
from app.models.relationship import Relationship


class GraphSyncService:
    """Service to mirror relational Postgres entity & relationship mutations into the Graph DB."""

    @staticmethod
    async def sync_entity(entity: Entity) -> None:
        type_label = entity.type.capitalize() if entity.type else "Person"
        
        # Parse JSON tags if present
        tags = []
        if entity.tags_json:
            try:
                tags = json.loads(entity.tags_json)
            except Exception:
                tags = []

        properties = {
            "entity_id": entity.entity_id,
            "name": entity.name,
            "alias": entity.alias or "",
            "type": entity.type,
            "sub_type": entity.sub_type or "",
            "risk_score": float(entity.risk_score),
            "risk_level": entity.risk_level,
            "status": entity.status,
            "crime_category": entity.crime_category or "",
            "photo_url": entity.photo_url or "",
            "city": entity.city or "",
            "tags": tags,
        }
        await graph_client.upsert_entity_node(
            entity_id=entity.id,
            label=type_label,
            properties=properties,
        )

    @staticmethod
    async def remove_entity(entity_id: str) -> None:
        await graph_client.delete_entity_node(entity_id)

    @staticmethod
    async def sync_relationship(rel: Relationship) -> None:
        properties = {
            "details": rel.details or "",
            "amount": float(rel.amount) if rel.amount is not None else 0.0,
            "frequency": float(rel.frequency) if rel.frequency is not None else 1.0,
            "risk_level": rel.risk_level,
            "confidence_score": float(rel.confidence_score),
            "last_interaction": rel.last_interaction.isoformat() if rel.last_interaction else "",
            "evidence_reference": rel.evidence_reference or "",
        }
        await graph_client.upsert_relationship(
            rel_id=rel.id,
            source_id=rel.source_id,
            target_id=rel.target_id,
            rel_type=rel.relationship_type,
            properties=properties,
        )

    @staticmethod
    async def remove_relationship(rel_id: str) -> None:
        await graph_client.delete_relationship(rel_id)


graph_sync = GraphSyncService()
