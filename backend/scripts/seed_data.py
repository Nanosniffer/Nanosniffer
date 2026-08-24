import asyncio
import json
import os
import sys
from datetime import datetime, timedelta, timezone

# Add backend directory to sys.path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import select
from app.core.security import get_password_hash
from app.db.base import Base
from app.db.session import SessionLocal, engine
from app.graph.client import graph_client
from app.graph.sync_service import graph_sync
from app.models.alert import Alert
from app.models.case import CaseEntityLink, CaseTimelineEvent, InvestigationCase
from app.models.entity import Entity
from app.models.relationship import Relationship
from app.models.report import GeneratedReport
from app.models.user import User


async def seed_database():
    print("❖ Initializing Criminal Intelligence Database Seeding...")

    # Create tables
    Base.metadata.create_all(bind=engine)
    await graph_client.connect()

    session = SessionLocal()
    try:
        # 1. Seed Users
        print("  → Seeding intelligence agents & operators...")
        users_data = [
            {
                "id": "usr-001",
                "email": "agent.vance@interpol.gov",
                "hashed_password": get_password_hash("Password123!"),
                "name": "Agent Marcus Vance",
                "badge_number": "AGY-7701",
                "role": "INVESTIGATOR",
                "clearance_level": "TOP SECRET // SCI",
                "agency": "Interpol Counter-Syndicate Cyber Task Force",
                "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            },
            {
                "id": "usr-002",
                "email": "admin@interpol.gov",
                "hashed_password": get_password_hash("AdminPass2026!"),
                "name": "Director Sarah Sterling",
                "badge_number": "AGY-0001",
                "role": "ADMIN",
                "clearance_level": "TOP SECRET // SCI",
                "agency": "Global Counter-Organized Crime Command",
                "avatar_url": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
            },
            {
                "id": "usr-003",
                "email": "analyst.chen@interpol.gov",
                "hashed_password": get_password_hash("Password123!"),
                "name": "Senior Analyst David Chen",
                "badge_number": "AGY-3402",
                "role": "ANALYST",
                "clearance_level": "SECRET",
                "agency": "Financial Crimes Telemetry Section",
                "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
            },
        ]

        for u in users_data:
            existing = session.execute(select(User).where(User.email == u["email"])).scalars().first()
            if not existing:
                session.add(User(**u))

        session.commit()

        # 2. Seed Entities
        print("  → Seeding criminal entities & suspect profiles...")
        entities_data = [
            {
                "id": "ent-001",
                "entity_id": "CR-8942",
                "name": "Elena Rostova",
                "alias": "La Sombra",
                "type": "person",
                "sub_type": "Syndicate Kingpin",
                "crime_category": "Drug Trafficking",
                "risk_score": 94.5,
                "risk_level": "CRITICAL",
                "status": "WANTED",
                "photo_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
                "age": "39",
                "gender": "Female",
                "nationality": "Russian / Colombian",
                "biography": "High-ranking kingpin directing transnational maritime cocaine corridors and encrypted logistics channels across the Atlantic.",
                "ai_threat_summary": "Critical tier threat. Directs 45+ armed operatives, orchestrates multi-million dollar money laundering loops, and maintains corrupt customs ties.",
                "address": "Terminal 4 Waterfront Blvd",
                "city": "Miami",
                "state": "FL",
                "country": "USA",
                "latitude": 25.7781,
                "longitude": -80.1773,
                "active_warrants": "3",
                "tags_json": json.dumps(["Kingpin", "Viper-Cartel", "Armed", "Flight Risk"]),
                "personal_details_json": json.dumps({
                    "dob": "1987-04-12",
                    "bloodGroup": "O-Positive",
                    "fingerprintId": "FP-8891-RUS",
                    "eyeColor": "Hazel",
                    "heightCm": 174,
                    "distinguishingMarks": ["Cobra tattoo on left shoulder blade", "Surgical scar right jaw"],
                }),
                "type_specific_data_json": json.dumps({
                    "knownAssociates": [
                        {"id": "ent-002", "name": "Viktor Kozlov", "alias": "The Broker", "role": "Financial Officer", "relationship": "Associate", "riskScore": 88.0},
                        {"id": "ent-004", "name": "Carlos Mendez", "alias": "El Martillo", "role": "Tactical Enforcer", "relationship": "Lieutenant", "riskScore": 91.0},
                    ],
                    "vehicles": [
                        {"id": "veh-101", "licensePlate": "FL-789-VIP", "make": "Mercedes-Benz", "model": "G63 AMG Armored", "year": 2024, "color": "Matte Black", "registeredOwner": "Blackstone Maritime LLC", "status": "SIGHTED", "lastSeenLocation": "Port Miami", "lastSeenTime": "2026-03-24T18:30:00Z"},
                    ],
                    "phoneNumbers": [
                        {"id": "ph-201", "phoneNumber": "+1-305-555-0199", "carrier": "SecureSatellite Mobile", "imei": "867530901234567", "ownerName": "Elena Rostova", "status": "TAPPED", "totalCallsLogged": 142, "lastActive": "2026-03-24T22:15:00Z", "frequentContacts": []},
                    ],
                    "financialAccounts": [
                        {"id": "acc-301", "accountNumber": "CH-8892-004", "bankName": "Credit Suisse Offshore", "accountType": "OFFSHORE", "balance": 14200000.0, "currency": "USD", "holderName": "Alpha Nautical Holdings", "flaggedTransactionsCount": 18, "status": "MONITORED"},
                    ],
                    "connectedOrganizations": [
                        {"id": "org-501", "name": "Viper Tactical Cartel", "role": "Supreme Commander", "threatLevel": "CRITICAL"}
                    ],
                }),
            },
            {
                "id": "ent-002",
                "entity_id": "CR-5519",
                "name": "Viktor Kozlov",
                "alias": "The Broker",
                "type": "person",
                "sub_type": "Financial Architect",
                "crime_category": "Money Laundering",
                "risk_score": 88.2,
                "risk_level": "CRITICAL",
                "status": "UNDER_SURVEILLANCE",
                "photo_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
                "age": "47",
                "gender": "Male",
                "nationality": "Cypriot / Russian",
                "biography": "Master financial engineer laundering narcotics and cyber extortion profits into real estate and crypto liquidity pools.",
                "ai_threat_summary": "High financial intelligence. Controls 12 shell companies across Panama, Cyprus, and UAE.",
                "address": "450 Wall Street",
                "city": "New York",
                "state": "NY",
                "country": "USA",
                "latitude": 40.7061,
                "longitude": -74.0089,
                "active_warrants": "1",
                "tags_json": json.dumps(["Money-Laundering", "Offshore", "Crypto-Hawala"]),
                "personal_details_json": json.dumps({
                    "dob": "1979-09-22",
                    "bloodGroup": "A-Positive",
                    "fingerprintId": "FP-4421-CYP",
                }),
                "type_specific_data_json": json.dumps({}),
            },
            {
                "id": "ent-003",
                "entity_id": "CR-7721",
                "name": "Nikolai Vane",
                "alias": "Ghost",
                "type": "person",
                "sub_type": "Cyber Operative",
                "crime_category": "Cybercrime",
                "risk_score": 86.4,
                "risk_level": "CRITICAL",
                "status": "WANTED",
                "photo_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
                "age": "31",
                "gender": "Male",
                "nationality": "Estonian",
                "biography": "Leader of Shadow Ghost ransomware cell. Targets critical infrastructure and launders crypto through decentralized mixers.",
                "ai_threat_summary": "Cyber threat tier 1. Highly adept at zero-day exploits, VPN chaining, and encrypted radio relays.",
                "address": "West Loop Industrial",
                "city": "Chicago",
                "state": "IL",
                "country": "USA",
                "latitude": 41.8818,
                "longitude": -87.6482,
                "active_warrants": "2",
                "tags_json": json.dumps(["Ransomware", "Shadow-Ghost", "Crypto-Mixer"]),
                "personal_details_json": json.dumps({"dob": "1995-11-04"}),
                "type_specific_data_json": json.dumps({}),
            },
            {
                "id": "ent-004",
                "entity_id": "CR-3304",
                "name": "Carlos Mendez",
                "alias": "El Martillo",
                "type": "person",
                "sub_type": "Tactical Enforcer",
                "crime_category": "Arms Smuggling",
                "risk_score": 91.0,
                "risk_level": "CRITICAL",
                "status": "WANTED",
                "photo_url": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80",
                "age": "42",
                "gender": "Male",
                "nationality": "Mexican",
                "biography": "Weapons distributor supplying military-grade firearms, MANPADS, and ballistic gear to cartel operational branches.",
                "ai_threat_summary": "Extremely dangerous and armed. Implicated in 4 violent border ambush incidents.",
                "address": "Corridor Bravo",
                "city": "El Paso",
                "state": "TX",
                "country": "USA",
                "latitude": 31.7619,
                "longitude": -106.4850,
                "active_warrants": "4",
                "tags_json": json.dumps(["Arms-Dealer", "Violent", "Armed-Dangerous"]),
                "personal_details_json": json.dumps({"dob": "1984-01-18"}),
                "type_specific_data_json": json.dumps({}),
            },
            {
                "id": "ent-005",
                "entity_id": "CR-1198",
                "name": "Samantha Reed",
                "alias": "Valkyrie",
                "type": "person",
                "sub_type": "Logistics Broker",
                "crime_category": "Drug Trafficking",
                "risk_score": 74.0,
                "risk_level": "HIGH",
                "status": "UNDER_SURVEILLANCE",
                "photo_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
                "age": "36",
                "gender": "Female",
                "nationality": "USA",
                "biography": "Port logistics supervisor suspected of providing access codes and manifest tampering for illicit container deliveries.",
                "ai_threat_summary": "Key logistical insider. Bridges legitimate port operations with criminal receiving cells.",
                "address": "Biscayne Bay Port Rd",
                "city": "Miami",
                "state": "FL",
                "country": "USA",
                "latitude": 25.7617,
                "longitude": -80.1918,
                "active_warrants": "0",
                "tags_json": json.dumps(["Insider-Threat", "Customs-Broker", "Logistics"]),
                "personal_details_json": json.dumps({"dob": "1990-06-15"}),
                "type_specific_data_json": json.dumps({}),
            },
            {
                "id": "ent-006",
                "entity_id": "CR-6642",
                "name": "Tariq Al-Qasimi",
                "alias": "The Banker",
                "type": "person",
                "sub_type": "Hawala Operator",
                "crime_category": "Money Laundering",
                "risk_score": 79.5,
                "risk_level": "HIGH",
                "status": "UNDER_SURVEILLANCE",
                "photo_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
                "age": "52",
                "gender": "Male",
                "nationality": "UAE / UK",
                "biography": "Informal value transfer system broker facilitating non-traceable cash settlement networks.",
                "ai_threat_summary": "Transfers up to $5M monthly via gold trade and mirror accounting.",
                "address": "Gold Souk & Exchange",
                "city": "Dubai",
                "country": "UAE",
                "latitude": 25.2048,
                "longitude": 55.2708,
                "active_warrants": "0",
                "tags_json": json.dumps(["Hawala", "Informal-Value", "Gold-Trade"]),
                "personal_details_json": json.dumps({"dob": "1974-03-30"}),
                "type_specific_data_json": json.dumps({}),
            },
            {
                "id": "ent-007",
                "entity_id": "ORG-501",
                "name": "Viper Tactical Syndicate",
                "alias": "Viper Cartel",
                "type": "organization",
                "sub_type": "Cartel",
                "crime_category": "Drug Trafficking",
                "risk_score": 98.0,
                "risk_level": "CRITICAL",
                "status": "ACTIVE",
                "city": "Miami",
                "country": "USA",
                "latitude": 25.7617,
                "longitude": -80.1918,
                "active_warrants": "0",
                "tags_json": json.dumps(["Cartel", "Transnational", "Violent"]),
                "personal_details_json": json.dumps({}),
                "type_specific_data_json": json.dumps({"estimatedMembers": 45, "illicitRevenueAnnualUSD": 38000000}),
            },
            {
                "id": "ent-008",
                "entity_id": "LOC-101",
                "name": "Port of Miami Terminal 4 Warehouse",
                "alias": "Dock 12 Consignment Bay",
                "type": "location",
                "sub_type": "Safehouse / Warehouse",
                "crime_category": "Drug Trafficking",
                "risk_score": 85.0,
                "risk_level": "CRITICAL",
                "status": "ACTIVE",
                "address": "Terminal 4, Dock 12",
                "city": "Miami",
                "state": "FL",
                "country": "USA",
                "latitude": 25.7781,
                "longitude": -80.1773,
                "active_warrants": "0",
                "tags_json": json.dumps(["Surveillance-Target", "Maritime-Drop", "Geofenced"]),
                "personal_details_json": json.dumps({}),
                "type_specific_data_json": json.dumps({}),
            },
            {
                "id": "ent-009",
                "entity_id": "BNK-901",
                "name": "Apex Global Shell Account",
                "alias": "Apex Cayman 449",
                "type": "bank",
                "sub_type": "Offshore Account",
                "crime_category": "Money Laundering",
                "risk_score": 89.0,
                "risk_level": "CRITICAL",
                "status": "MONITORED",
                "city": "George Town",
                "country": "Cayman Islands",
                "latitude": 19.2869,
                "longitude": -81.3674,
                "active_warrants": "0",
                "tags_json": json.dumps(["Shell-Company", "Layering-Account"]),
                "personal_details_json": json.dumps({}),
                "type_specific_data_json": json.dumps({}),
            },
        ]

        for e in entities_data:
            existing = session.execute(select(Entity).where(Entity.id == e["id"])).scalars().first()
            if not existing:
                ent_obj = Entity(**e)
                session.add(ent_obj)
                session.flush()
                await graph_sync.sync_entity(ent_obj)

        session.commit()

        # 3. Seed Relationships (Edges)
        print("  → Seeding graph relationship edges...")
        relationships_data = [
            {
                "id": "rel-001",
                "source_id": "ent-001",
                "target_id": "ent-002",
                "relationship_type": "MONEY_TRANSFER",
                "details": "Laundering monthly narcotics revenues of $1.8M through Cypriot front companies.",
                "amount": 1800000.0,
                "frequency": 12.0,
                "risk_level": "CRITICAL",
                "confidence_score": 0.96,
                "evidence_reference": "Wiretap Intercept #W-4410",
            },
            {
                "id": "rel-002",
                "source_id": "ent-001",
                "target_id": "ent-004",
                "relationship_type": "SUPPLIES",
                "details": "Arms shipments: 60 tactical assault rifles and secure radios dispatched to southern corridor.",
                "amount": 350000.0,
                "frequency": 4.0,
                "risk_level": "CRITICAL",
                "confidence_score": 0.92,
                "evidence_reference": "CCTV Footage Customs Gate 8",
            },
            {
                "id": "rel-003",
                "source_id": "ent-001",
                "target_id": "ent-005",
                "relationship_type": "CALLS",
                "details": "18 encrypted satellite calls logged regarding maritime container clearance times.",
                "frequency": 18.0,
                "risk_level": "HIGH",
                "confidence_score": 0.95,
                "evidence_reference": "Tower 9 CDR Records",
            },
            {
                "id": "rel-004",
                "source_id": "ent-002",
                "target_id": "ent-006",
                "relationship_type": "MONEY_TRANSFER",
                "details": "Hawala routing of $850k in cash reserves to Dubai precious metals exchange.",
                "amount": 850000.0,
                "frequency": 6.0,
                "risk_level": "HIGH",
                "confidence_score": 0.89,
                "evidence_reference": "FinCEN Telemetry Match",
            },
            {
                "id": "rel-005",
                "source_id": "ent-003",
                "target_id": "ent-002",
                "relationship_type": "ASSOCIATED_WITH",
                "details": "Crypto mixing service provided to clean Bitcoin ransom payments.",
                "amount": 4200000.0,
                "frequency": 8.0,
                "risk_level": "CRITICAL",
                "confidence_score": 0.94,
                "evidence_reference": "Blockchain Ledger Trace #TX-991",
            },
            {
                "id": "rel-006",
                "source_id": "ent-001",
                "target_id": "ent-008",
                "relationship_type": "LOCATED_AT",
                "details": "Suspect observed conducting physical inspection at Port Miami Terminal 4.",
                "risk_level": "HIGH",
                "confidence_score": 0.98,
                "evidence_reference": "Drone Reconnaissance Alpha",
            },
            {
                "id": "rel-007",
                "source_id": "ent-002",
                "target_id": "ent-009",
                "relationship_type": "OWNS",
                "details": "Beneficial owner of Cayman shell company account.",
                "amount": 9200000.0,
                "risk_level": "CRITICAL",
                "confidence_score": 0.99,
                "evidence_reference": "Panama Papers Subpoena",
            },
            {
                "id": "rel-008",
                "source_id": "ent-001",
                "target_id": "ent-007",
                "relationship_type": "OPERATES_IN",
                "details": "Commander and founder of the syndicate organization.",
                "risk_level": "CRITICAL",
                "confidence_score": 0.99,
                "evidence_reference": "Informant Testimony Alpha",
            },
        ]

        for r in relationships_data:
            existing = session.execute(select(Relationship).where(Relationship.id == r["id"])).scalars().first()
            if not existing:
                rel_obj = Relationship(
                    id=r["id"],
                    source_id=r["source_id"],
                    target_id=r["target_id"],
                    relationship_type=r["relationship_type"],
                    details=r["details"],
                    amount=r.get("amount"),
                    frequency=r.get("frequency", 1.0),
                    risk_level=r.get("risk_level", "MEDIUM"),
                    confidence_score=r["confidence_score"],
                    evidence_reference=r["evidence_reference"],
                    last_interaction=datetime.now(timezone.utc),
                )
                session.add(rel_obj)
                session.flush()
                await graph_sync.sync_relationship(rel_obj)

        session.commit()

        # 4. Seed Investigation Cases
        print("  → Seeding active investigation cases...")
        cases_data = [
            {
                "id": "cas-001",
                "case_number": "CAS-2026-891",
                "title": "Operation Viper Strike — Transnational Narcotics Corridor",
                "description": "Multi-jurisdiction operation tracking Elena Rostova's supply network between Miami, Colombia, and Rotterdam.",
                "status": "ACTIVE",
                "priority": "CRITICAL",
                "lead_officer": "Agent Marcus Vance",
                "lead_officer_badge": "AGY-7701",
                "target_syndicate": "Viper Tactical Syndicate",
                "progress_percent": 68,
                "estimated_risk_score": 94.5,
                "assigned_to_id": "usr-001",
                "created_by_id": "usr-002",
            },
            {
                "id": "cas-002",
                "case_number": "CAS-2026-442",
                "title": "Operation Shadow Phantom — Infrastructure Cyber Extortion",
                "description": "Targeting Nikolai Vane's ransomware cell and decentralized cryptocurrency laundering conduits.",
                "status": "ACTIVE",
                "priority": "HIGH",
                "lead_officer": "Senior Analyst David Chen",
                "lead_officer_badge": "AGY-3402",
                "target_syndicate": "Shadow Ghost Cyber Cell",
                "progress_percent": 45,
                "estimated_risk_score": 86.0,
                "assigned_to_id": "usr-003",
                "created_by_id": "usr-001",
            },
            {
                "id": "cas-003",
                "case_number": "CAS-2026-105",
                "title": "Operation Golden Hawala — Offshore Illicit Value Transfer",
                "description": "Investigating high-velocity Hawala cash pooling networks between Dubai, London, and New York.",
                "status": "UNDER_REVIEW",
                "priority": "HIGH",
                "lead_officer": "Director Sarah Sterling",
                "lead_officer_badge": "AGY-0001",
                "target_syndicate": "Apex Financial Syndicate",
                "progress_percent": 82,
                "estimated_risk_score": 78.5,
                "assigned_to_id": "usr-002",
                "created_by_id": "usr-002",
            },
        ]

        for c in cases_data:
            existing = session.execute(select(InvestigationCase).where(InvestigationCase.id == c["id"])).scalars().first()
            if not existing:
                case_obj = InvestigationCase(**c)
                session.add(case_obj)
                session.flush()
                link = CaseEntityLink(
                    case_id=case_obj.id,
                    entity_id="ent-001",
                    role_in_case="Primary Subject of Investigation",
                    notes="Direct target of federal indictment warrant.",
                )
                session.add(link)

        session.commit()

        # 5. Seed Timeline Events
        print("  → Seeding case timeline telemetry...")
        timeline_data = [
            {
                "id": "tl-001",
                "case_id": "cas-001",
                "entity_id": "ent-001",
                "title": "Encrypted Satellite Call Intercept",
                "event_type": "Phone Calls",
                "timestamp": datetime.now(timezone.utc) - timedelta(hours=2),
                "location": "Port of Miami Terminal 4",
                "latitude": 25.7781,
                "longitude": -80.1773,
                "description": "Satellite phone ping intercepted directing consignment drop at Dock 12.",
                "confidence_score": 98,
                "severity": "CRITICAL",
                "is_verified": 1,
            },
            {
                "id": "tl-002",
                "case_id": "cas-001",
                "entity_id": "ent-002",
                "title": "Offshore Wire Structuring Flagged",
                "event_type": "Wire Transfer",
                "timestamp": datetime.now(timezone.utc) - timedelta(hours=6),
                "location": "Credit Suisse Zurich Gateway",
                "latitude": 47.3769,
                "longitude": 8.5417,
                "description": "Three sequential transfers of $480k dispatched to Cayman shell entity.",
                "confidence_score": 94,
                "severity": "HIGH",
                "is_verified": 1,
            },
            {
                "id": "tl-003",
                "case_id": "cas-001",
                "entity_id": "ent-004",
                "title": "Weapons Cache Movement Sighting",
                "event_type": "Weapon Sighting",
                "timestamp": datetime.now(timezone.utc) - timedelta(days=1),
                "location": "El Paso Border Logistics Hub",
                "latitude": 31.7619,
                "longitude": -106.4850,
                "description": "Armored convoy sighted transferring heavy cases across secure warehouse perimeter.",
                "confidence_score": 91,
                "severity": "CRITICAL",
                "is_verified": 1,
            },
        ]

        for t in timeline_data:
            existing = session.execute(select(CaseTimelineEvent).where(CaseTimelineEvent.id == t["id"])).scalars().first()
            if not existing:
                session.add(CaseTimelineEvent(**t))

        session.commit()

        # 6. Seed Alerts
        print("  → Seeding live threat alerts...")
        alerts_data = [
            {
                "id": "alt-001",
                "alert_code": "ALT-7812",
                "title": "Geofence Perimeter Breach — Port Miami Terminal 4",
                "severity": "CRITICAL",
                "ai_confidence": 97.4,
                "description": "Satellite triangulation detected suspect Elena Rostova inside the restricted maritime customs enclosure.",
                "category": "Geofence Breach",
                "status": "NEW",
                "suggested_action": "Scramble tactical ground unit and seal exit gate checkpoints.",
                "location_name": "Port of Miami Terminal 4",
                "city": "Miami",
                "latitude": 25.7781,
                "longitude": -80.1773,
                "related_entity_id": "ent-001",
                "related_case_id": "cas-001",
                "is_read": False,
            },
            {
                "id": "alt-002",
                "alert_code": "ALT-9921",
                "title": "Encrypted Satellite Burst Call Surge",
                "severity": "HIGH",
                "ai_confidence": 92.0,
                "description": "Over 40 high-frequency burst messages routed between Miami safehouses and Chicago cyber cell.",
                "category": "Encrypted Call Surge",
                "status": "ACKNOWLEDGED",
                "suggested_action": "Enable continuous SIGINT packet capture on repeater node 14.",
                "location_name": "Chicago West Loop",
                "city": "Chicago",
                "latitude": 41.8818,
                "longitude": -87.6482,
                "related_entity_id": "ent-003",
                "related_case_id": "cas-002",
                "is_read": False,
            },
            {
                "id": "alt-003",
                "alert_code": "ALT-3382",
                "title": "Automated Hawala Structuring Detection",
                "severity": "HIGH",
                "ai_confidence": 91.5,
                "description": "14 micro-deposits of $9,850 each routed through shell front company accounts in Panama City.",
                "category": "Financial Anomaly",
                "status": "NEW",
                "suggested_action": "Issue emergency asset freeze warrant under Section 314(a).",
                "location_name": "Financial District Hub",
                "city": "New York",
                "latitude": 40.7061,
                "longitude": -74.0089,
                "related_entity_id": "ent-002",
                "related_case_id": "cas-003",
                "is_read": False,
            },
        ]

        for a in alerts_data:
            existing = session.execute(select(Alert).where(Alert.id == a["id"])).scalars().first()
            if not existing:
                session.add(Alert(**a))

        session.commit()

        # 7. Seed Reports
        print("  → Seeding sample intelligence reports...")
        reports_data = [
            {
                "id": "rpt-001",
                "report_number": "RPT-2026-041",
                "title": "Comprehensive Threat Dossier: Viper Tactical Syndicate",
                "type": "Network Summary",
                "status": "COMPLETED",
                "author": "Lead Intelligence Analyst Vance",
                "author_id": "usr-001",
                "target_entity": "Elena Rostova (CR-8942)",
                "target_entity_id": "ent-001",
                "target_case_id": "cas-001",
                "classification_level": "TOP SECRET // INTEL",
                "summary": "Multi-agency tactical assessment of the Viper syndicate supply chain and maritime corridors.",
                "key_findings_json": json.dumps([
                    "Direct command structure controlling 45+ armed operatives across 3 coastal hubs.",
                    "Over $14.2M in offshore liquid accounts identified in Cyprus and Switzerland.",
                    "Heavy armaments logistics route established from El Paso to south Florida.",
                ]),
                "ai_risk_score": 94.5,
                "metrics_json": json.dumps({
                    "Threat Score": "94.5 / 100",
                    "Direct Associates": 14,
                    "Laundered Capital": "$14,200,000 USD",
                    "Active Warrants": "3 Federal Warrants",
                }),
                "file_path": "reports/sample_report_041.pdf",
                "file_size_bytes": 142500,
            }
        ]

        for rep in reports_data:
            existing = session.execute(select(GeneratedReport).where(GeneratedReport.id == rep["id"])).scalars().first()
            if not existing:
                session.add(GeneratedReport(**rep))

        session.commit()

    finally:
        session.close()

    print("✔ Database and Graph seeding completed successfully!")


if __name__ == "__main__":
    asyncio.run(seed_database())
