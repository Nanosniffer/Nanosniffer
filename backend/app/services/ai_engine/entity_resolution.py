import difflib
import json
from typing import Any, Dict, List, Tuple
from app.models.entity import Entity
from app.schemas.ai import EntityResolutionMatch


class EntityResolutionEngine:
    """Multi-modal entity deduplication and record linkage engine."""

    @staticmethod
    def _string_similarity(str1: str, str2: str) -> float:
        if not str1 or not str2:
            return 0.0
        s1 = str1.strip().lower()
        s2 = str2.strip().lower()
        if s1 == s2:
            return 1.0
        return difflib.SequenceMatcher(None, s1, s2).ratio()

    @classmethod
    def compare_entities(cls, e1: Entity, e2: Entity) -> Tuple[float, List[str]]:
        """Compare two entities across names, aliases, IDs, DOB, phone, plate, and biometrics."""
        if e1.id == e2.id:
            return 0.0, []

        features = []
        score_components = []

        # 1. Primary Name & Alias similarity
        name_sim = cls._string_similarity(e1.name, e2.name)
        if name_sim > 0.85:
            score_components.append(name_sim * 0.40)
            features.append(f"High name match ({e1.name} ~ {e2.name}, {int(name_sim*100)}%)")

        # Alias cross-matching
        alias_sim = cls._string_similarity(e1.alias or "", e2.alias or "")
        if alias_sim > 0.85 and (e1.alias and e2.alias):
            score_components.append(alias_sim * 0.35)
            features.append(f"Alias correlation ({e1.alias} ~ {e2.alias})")
        elif (e1.alias and cls._string_similarity(e1.alias, e2.name) > 0.85) or (e2.alias and cls._string_similarity(e2.alias, e1.name) > 0.85):
            score_components.append(0.40)
            features.append("Cross alias-to-name match detected")

        # 2. Personal Details (DOB, Fingerprint)
        p1 = json.loads(e1.personal_details_json or "{}")
        p2 = json.loads(e2.personal_details_json or "{}")

        if p1.get("fingerprintId") and p2.get("fingerprintId"):
            if p1["fingerprintId"] == p2["fingerprintId"]:
                score_components.append(0.60)
                features.append(f"Exact biometric fingerprint ID match ({p1['fingerprintId']})")

        if p1.get("dob") and p2.get("dob"):
            if p1["dob"] == p2["dob"]:
                score_components.append(0.30)
                features.append(f"Matching Date of Birth ({p1['dob']})")

        # 3. Type-specific Data (Phone / IMEI / License Plate)
        d1 = json.loads(e1.type_specific_data_json or "{}")
        d2 = json.loads(e2.type_specific_data_json or "{}")

        # Phone numbers list or plate check
        phones1 = {p.get("phoneNumber") for p in d1.get("phoneNumbers", []) if p.get("phoneNumber")}
        phones2 = {p.get("phoneNumber") for p in d2.get("phoneNumbers", []) if p.get("phoneNumber")}
        shared_phones = phones1.intersection(phones2)
        if shared_phones:
            score_components.append(0.50)
            features.append(f"Shared active phone line: {', '.join(shared_phones)}")

        plates1 = {v.get("licensePlate") for v in d1.get("vehicles", []) if v.get("licensePlate")}
        plates2 = {v.get("licensePlate") for v in d2.get("vehicles", []) if v.get("licensePlate")}
        shared_plates = plates1.intersection(plates2)
        if shared_plates:
            score_components.append(0.45)
            features.append(f"Shared registered vehicle plate: {', '.join(shared_plates)}")

        # 4. Location Proximity
        if e1.city and e2.city and e1.city.lower() == e2.city.lower():
            score_components.append(0.10)
            features.append(f"Operating in identical jurisdiction ({e1.city})")

        # Calculate final match score
        total_score = min(1.0, sum(score_components))
        return round(total_score, 3), features

    @classmethod
    def find_all_matches(cls, entities: List[Entity], min_threshold: float = 0.70) -> List[EntityResolutionMatch]:
        """Scan a list of entities and return all pairs exceeding the similarity threshold."""
        matches = []
        n = len(entities)
        for i in range(n):
            for j in range(i + 1, n):
                score, features = cls.compare_entities(entities[i], entities[j])
                if score >= min_threshold:
                    matches.append(
                        EntityResolutionMatch(
                            source_entity_id=entities[i].id,
                            source_name=entities[i].name,
                            target_entity_id=entities[j].id,
                            target_name=entities[j].name,
                            match_score=score,
                            matched_features=features,
                            recommended_action="MERGE_CANDIDATE" if score >= 0.85 else "INVESTIGATE_TIE",
                        )
                    )
        return sorted(matches, key=lambda m: m.match_score, reverse=True)


entity_resolution_engine = EntityResolutionEngine()
