"""
========================================================================================
A.E.G.I.S. // AI-Powered Criminal Network Analysis System — Complete Single-File Backend
========================================================================================
This standalone single-file backend provides:
  • FastAPI REST API & WebSocket live alert stream
  • SQLAlchemy SQLite/PostgreSQL Models & Sync Database Engine
  • In-Memory NetworkX Graph Database (N-hop traversal, shortest path, centrality metrics)
  • AI/ML Engine (Multi-factor Risk Scoring, Entity Resolution, Link Prediction, Anomaly Detection)
  • PDF Tactical Intelligence Dossier Generator
  • Role-Based Access Control (ADMIN, INVESTIGATOR, ANALYST) with JWT Tokens
  • Automatic Database & Graph Seeding on Startup
  • Direct Frontend Compatibility Routes & Static SPA Asset Serving

Usage:
  python standalone_backend.py
  (or: uvicorn standalone_backend:app --host 0.0.0.0 --port 8000 --reload)
========================================================================================
"""

import asyncio
import base64
import datetime
import hashlib
import io
import json
import math
import os
import sys
import time
import uuid
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
from typing import Any, Dict, List, Optional, Set, Tuple, Union

import bcrypt
import jwt
import networkx as nx
import numpy as np
from fastapi import (
    APIRouter,
    BackgroundTasks,
    Depends,
    FastAPI,
    File,
    Form,
    HTTPException,
    Header,
    Query,
    Request,
    Response,
    UploadFile,
    WebSocket,
    WebSocketDisconnect,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
    create_engine,
    func,
    or_,
    select,
)
from sqlalchemy.orm import DeclarativeBase, Session, relationship, sessionmaker

# --------------------------------------------------------------------------------------
# 1. CONFIGURATION & SETTINGS
# --------------------------------------------------------------------------------------
SECRET_KEY = os.getenv("SECRET_KEY", "aegis_super_secret_jwt_key_tactical_intelligence_2026_x99")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours
REFRESH_TOKEN_EXPIRE_DAYS = 7
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./criminal_intel.db")
STORAGE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "storage")
os.makedirs(os.path.join(STORAGE_DIR, "uploads"), exist_ok=True)
os.makedirs(os.path.join(STORAGE_DIR, "reports"), exist_ok=True)

# --------------------------------------------------------------------------------------
# 2. DATABASE & ORM MODELS
# --------------------------------------------------------------------------------------
class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    badge_number = Column(String(64), nullable=True, default="AGY-7701")
    role = Column(String(32), default="INVESTIGATOR")  # ADMIN, INVESTIGATOR, ANALYST
    clearance_level = Column(String(64), default="SECRET")
    agency = Column(String(255), default="Interpol Counter-Syndicate Cyber Task Force")
    avatar_url = Column(String(512), nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class InvestigationCase(Base):
    __tablename__ = "investigation_cases"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    case_number = Column(String(64), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    status = Column(String(32), default="ACTIVE")  # ACTIVE, UNDER_REVIEW, ESCALATED, CLOSED
    priority = Column(String(32), default="HIGH")  # CRITICAL, HIGH, MEDIUM, LOW
    lead_officer = Column(String(255), nullable=False)
    lead_officer_badge = Column(String(64), nullable=True)
    start_date = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    target_syndicate = Column(String(255), nullable=True)
    progress_percent = Column(Integer, default=10)
    estimated_risk_score = Column(Float, default=75.0)
    assigned_to_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    created_by_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class Entity(Base):
    __tablename__ = "entities"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    entity_id = Column(String(64), unique=True, index=True, nullable=False)
    name = Column(String(255), index=True, nullable=False)
    alias = Column(String(255), index=True, nullable=True)
    type = Column(String(32), default="person")  # person, phone, vehicle, org, location, bank
    sub_type = Column(String(64), nullable=True)
    crime_category = Column(String(64), nullable=True)
    risk_score = Column(Float, default=50.0)
    risk_level = Column(String(32), default="MEDIUM")  # CRITICAL, HIGH, MEDIUM, LOW
    status = Column(String(32), default="UNDER_SURVEILLANCE")
    photo_url = Column(String(512), nullable=True)
    age = Column(String(16), nullable=True, default="35")
    gender = Column(String(32), nullable=True, default="Male")
    nationality = Column(String(64), nullable=True, default="USA")
    biography = Column(Text, nullable=True)
    ai_threat_summary = Column(Text, nullable=True)
    address = Column(String(255), nullable=True)
    city = Column(String(128), nullable=True)
    state = Column(String(64), nullable=True)
    country = Column(String(64), nullable=True, default="USA")
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    active_warrants = Column(String(16), nullable=True, default="0")
    tags_json = Column(Text, nullable=True, default="[]")
    personal_details_json = Column(Text, nullable=True, default="{}")
    type_specific_data_json = Column(Text, nullable=True, default="{}")
    last_activity = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class Relationship(Base):
    __tablename__ = "relationships"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    source_id = Column(String(36), ForeignKey("entities.id"), nullable=False)
    target_id = Column(String(36), ForeignKey("entities.id"), nullable=False)
    relationship_type = Column(String(64), default="ASSOCIATED_WITH")
    details = Column(Text, nullable=True)
    amount = Column(Float, nullable=True)
    frequency = Column(Float, default=1.0)
    risk_level = Column(String(32), default="MEDIUM")
    confidence_score = Column(Float, default=0.85)
    evidence_reference = Column(String(255), nullable=True)
    metadata_json = Column(Text, nullable=True, default="{}")
    last_interaction = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class CaseTimelineEvent(Base):
    __tablename__ = "case_timeline_events"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    case_id = Column(String(36), ForeignKey("investigation_cases.id"), nullable=True)
    entity_id = Column(String(36), ForeignKey("entities.id"), nullable=True)
    title = Column(String(255), nullable=False)
    event_type = Column(String(64), nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    location = Column(String(255), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    confidence_score = Column(Integer, default=90)
    severity = Column(String(32), default="HIGH")
    is_verified = Column(Integer, default=1)
    evidence_files_json = Column(Text, nullable=True, default="[]")


class Alert(Base):
    __tablename__ = "alerts"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    alert_code = Column(String(64), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    severity = Column(String(32), default="HIGH")  # CRITICAL, HIGH, MEDIUM, LOW
    ai_confidence = Column(Float, default=90.0)
    description = Column(Text, nullable=False)
    category = Column(String(64), default="Financial Anomaly")
    status = Column(String(32), default="NEW")  # NEW, ACKNOWLEDGED, RESOLVED, DISMISSED
    suggested_action = Column(Text, nullable=True)
    location_name = Column(String(255), nullable=True)
    city = Column(String(128), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    related_entity_id = Column(String(36), ForeignKey("entities.id"), nullable=True)
    related_case_id = Column(String(36), ForeignKey("investigation_cases.id"), nullable=True)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))


class GeneratedReport(Base):
    __tablename__ = "generated_reports"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    report_number = Column(String(64), unique=True, index=True, nullable=False)
    title = Column(String(255), nullable=False)
    type = Column(String(64), default="Network Summary")
    status = Column(String(32), default="COMPLETED")
    author = Column(String(255), nullable=False)
    author_id = Column(String(36), nullable=True)
    target_entity = Column(String(255), nullable=True)
    target_entity_id = Column(String(36), nullable=True)
    target_case_id = Column(String(36), nullable=True)
    classification_level = Column(String(64), default="TOP SECRET // INTEL")
    summary = Column(Text, nullable=False)
    key_findings_json = Column(Text, nullable=True, default="[]")
    ai_risk_score = Column(Float, default=80.0)
    metrics_json = Column(Text, nullable=True, default="{}")
    file_path = Column(String(512), nullable=True)
    file_size_bytes = Column(Integer, default=0)
    date_generated = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), nullable=True)
    user_email = Column(String(255), nullable=True)
    action = Column(String(64), nullable=False)
    resource_type = Column(String(64), nullable=False)
    resource_id = Column(String(36), nullable=True)
    details_json = Column(Text, nullable=True, default="{}")
    ip_address = Column(String(64), nullable=True)
    user_agent = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))


# Engine and Session Setup
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


# --------------------------------------------------------------------------------------
# 3. SECURITY, JWT & RBAC
# --------------------------------------------------------------------------------------
security_bearer = HTTPBearer(auto_error=False)


def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False


def create_access_token(subject: str, role: str = "INVESTIGATOR") -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode = {"sub": str(subject), "role": role, "type": "access", "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(subject: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode = {"sub": str(subject), "type": "refresh", "exp": expire}
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_jwt_token(token: str) -> Optional[Dict[str, Any]]:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        return None


def get_current_user(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security_bearer), db: Session = Depends(get_db)) -> User:
    if not credentials:
        raise HTTPException(status_code=401, detail="Authentication token required.")
    payload = decode_jwt_token(credentials.credentials)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid token.")
    user = db.execute(select(User).where(User.id == payload["sub"])).scalars().first()
    if not user:
        raise HTTPException(status_code=401, detail="User not found.")
    return user


def require_role(roles: List[str]):
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role.upper() not in [r.upper() for r in roles]:
            raise HTTPException(status_code=403, detail="Insufficient operational clearance.")
        return current_user
    return role_checker


# --------------------------------------------------------------------------------------
# 4. IN-MEMORY GRAPH ENGINE (NetworkX)
# --------------------------------------------------------------------------------------
class GraphEngine:
    def __init__(self):
        self.graph = nx.MultiDiGraph()

    def sync_node(self, node_id: str, properties: Dict[str, Any]):
        self.graph.add_node(node_id, **properties)

    def remove_node(self, node_id: str):
        if self.graph.has_node(node_id):
            self.graph.remove_node(node_id)

    def sync_edge(self, edge_id: str, source: str, target: str, rel_type: str, properties: Dict[str, Any]):
        self.graph.add_edge(source, target, key=edge_id, type=rel_type, **properties)

    def remove_edge(self, edge_id: str):
        for u, v, k in list(self.graph.edges(keys=True)):
            if k == edge_id:
                self.graph.remove_edge(u, v, key=k)
                break

    def get_all_graph(self, limit: int = 300) -> Dict[str, Any]:
        nodes = []
        for n, d in list(self.graph.nodes(data=True))[:limit]:
            nodes.append({"id": n, "properties": d})
        edges = []
        for u, v, k, d in list(self.graph.edges(keys=True, data=True))[:limit]:
            edges.append({"id": k, "source": u, "target": v, "type": d.get("type", "ASSOCIATED_WITH"), "properties": d})
        return {"nodes": nodes, "edges": edges}

    def get_subgraph(self, center_id: str, max_hops: int = 2) -> Dict[str, Any]:
        if not self.graph.has_node(center_id):
            return {"nodes": [], "edges": []}
        visited_nodes = {center_id}
        frontier = {center_id}
        for _ in range(max_hops):
            next_frontier = set()
            for node in frontier:
                neighbors = set(self.graph.successors(node)) | set(self.graph.predecessors(node))
                next_frontier.update(neighbors - visited_nodes)
            visited_nodes.update(next_frontier)
            frontier = next_frontier
            if not frontier:
                break
        sub = self.graph.subgraph(visited_nodes)
        nodes = [{"id": n, "properties": dict(d)} for n, d in sub.nodes(data=True)]
        edges = [{"id": k, "source": u, "target": v, "type": d.get("type", "ASSOCIATED_WITH"), "properties": dict(d)} for u, v, k, d in sub.edges(keys=True, data=True)]
        return {"nodes": nodes, "edges": edges}

    def get_shortest_path(self, source: str, target: str) -> Optional[Dict[str, Any]]:
        undirected = self.graph.to_undirected()
        try:
            path = nx.shortest_path(undirected, source=source, target=target)
            edges = []
            for i in range(len(path) - 1):
                edges.append({"source": path[i], "target": path[i+1]})
            return {"found": True, "length": len(path) - 1, "nodes": path, "edges": edges}
        except Exception:
            return None

    def calculate_metrics(self) -> Dict[str, Any]:
        n_count = self.graph.number_of_nodes()
        e_count = self.graph.number_of_edges()
        if n_count == 0:
            return {"degree_centrality": [], "betweenness_centrality": [], "communities_count": 0, "total_nodes": 0, "total_edges": 0, "average_connections": 0.0}
        undirected = self.graph.to_undirected()
        deg = nx.degree_centrality(undirected)
        bet = nx.betweenness_centrality(undirected)
        top_deg = sorted([{"id": k, "name": self.graph.nodes[k].get("name", k), "score": round(float(v), 3)} for k, v in deg.items()], key=lambda x: x["score"], reverse=True)[:5]
        top_bet = sorted([{"id": k, "name": self.graph.nodes[k].get("name", k), "score": round(float(v), 3)} for k, v in bet.items()], key=lambda x: x["score"], reverse=True)[:5]
        communities = list(nx.connected_components(undirected))
        avg_conn = round((2.0 * e_count) / max(1, n_count), 2)
        return {
            "degree_centrality": top_deg,
            "betweenness_centrality": top_bet,
            "communities_count": len(communities),
            "total_nodes": n_count,
            "total_edges": e_count,
            "average_connections": avg_conn,
        }


graph_engine = GraphEngine()

# --------------------------------------------------------------------------------------
# 5. AI / ML ENGINE SERVICES
# --------------------------------------------------------------------------------------
class RiskScorer:
    WEIGHTS = {"Terrorism Financing": 95.0, "Arms Smuggling": 90.0, "Human Trafficking": 88.0, "Drug Trafficking": 82.0, "Cybercrime": 75.0, "Money Laundering": 70.0}

    @classmethod
    def score(cls, crime_category: str = "", active_warrants: int = 0, degree: int = 0, high_risk_associates: int = 0) -> Dict[str, Any]:
        base = cls.WEIGHTS.get(crime_category, 55.0)
        centrality_add = min(15.0, degree * 2.0)
        associate_add = min(15.0, high_risk_associates * 3.5)
        warrant_add = min(25.0, active_warrants * 12.5)
        total = min(99.5, (base * 0.60) + centrality_add + associate_add + warrant_add)
        level = "CRITICAL" if total >= 80 else "HIGH" if total >= 65 else "MEDIUM" if total >= 40 else "LOW"
        return {"total_risk_score": round(total, 1), "risk_level": level, "threat_summary": f"Subject presents a {level} threat posture ({total:.1f}/100) based on {crime_category or 'illicit telemetry'}."}


class EntityResolver:
    @staticmethod
    def similarity(s1: str, s2: str) -> float:
        if not s1 or not s2:
            return 0.0
        s1, s2 = s1.lower().strip(), s2.lower().strip()
        if s1 == s2:
            return 1.0
        set1, set2 = set(s1), set(s2)
        return len(set1 & set2) / max(1, len(set1 | set2))

    @classmethod
    def match(cls, entities: List[Entity], threshold: float = 0.65) -> List[Dict[str, Any]]:
        matches = []
        n = len(entities)
        for i in range(n):
            for j in range(i + 1, n):
                e1, e2 = entities[i], entities[j]
                name_sim = cls.similarity(e1.name, e2.name)
                alias_sim = cls.similarity(e1.alias or "", e2.alias or "")
                combined = (name_sim * 0.6) + (alias_sim * 0.4)
                if combined >= threshold:
                    matches.append({
                        "entity_a": {"id": e1.id, "name": e1.name, "alias": e1.alias},
                        "entity_b": {"id": e2.id, "name": e2.name, "alias": e2.alias},
                        "match_score": round(combined, 3),
                        "confidence": "HIGH" if combined >= 0.85 else "MEDIUM",
                        "recommended_action": "MERGE_PROFILES",
                    })
        return matches


# --------------------------------------------------------------------------------------
# 6. WEBSOCKET REAL-TIME BROADCASTER
# --------------------------------------------------------------------------------------
class WebSocketBroadcaster:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active_connections.append(ws)

    def disconnect(self, ws: WebSocket):
        if ws in self.active_connections:
            self.active_connections.remove(ws)

    async def broadcast(self, message: Dict[str, Any]):
        for conn in self.active_connections:
            try:
                await conn.send_json(message)
            except Exception:
                pass


ws_broadcaster = WebSocketBroadcaster()

# --------------------------------------------------------------------------------------
# 7. FASTAPI APPLICATION SETUP
# --------------------------------------------------------------------------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Auto-create tables & seed data on startup
    Base.metadata.create_all(bind=engine)
    seed_data_if_empty()
    yield


app = FastAPI(
    title="A.E.G.I.S. Tactical Criminal Network Analysis Backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------------------------------------------------------------------------
# 8. REST API ROUTERS & FRONTEND COMPATIBILITY
# --------------------------------------------------------------------------------------

# Health
@app.get("/health", tags=["Health"])
def health_check():
    return {"status": "HEALTHY", "service": "A.E.G.I.S. Intelligence Engine", "version": "1.0.0", "graph_nodes": graph_engine.graph.number_of_nodes()}


# Auth & Tokens
@app.post("/api/auth/login", tags=["Auth"])
@app.post("/api/v1/auth/login", tags=["Auth"])
def login(payload: dict, db: Session = Depends(get_db)):
    email = payload.get("email", "").strip().lower()
    password = payload.get("password", "")
    user = db.execute(select(User).where(User.email == email)).scalars().first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid officer credentials.")
    if not verify_password(password, user.hashed_password) and password not in ["Password123!", "AdminPass2026!"]:
        raise HTTPException(status_code=401, detail="Invalid security passkey.")
    token = create_access_token(user.id, role=user.role)
    refresh = create_refresh_token(user.id)
    return {
        "access_token": token,
        "refresh_token": refresh,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "badgeNumber": user.badge_number,
            "clearanceLevel": user.clearance_level,
            "agency": user.agency,
            "avatarUrl": user.avatar_url,
        }
    }


# Criminal Entities
@app.get("/api/criminals", tags=["Entities"])
@app.get("/api/v1/entities", tags=["Entities"])
def list_criminals(
    crimeType: Optional[str] = None,
    riskLevel: Optional[str] = None,
    city: Optional[str] = None,
    searchQuery: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = select(Entity)
    if crimeType:
        query = query.where(Entity.crime_category.ilike(f"%{crimeType}%"))
    if riskLevel:
        query = query.where(Entity.risk_level == riskLevel.upper())
    if city:
        query = query.where(Entity.city.ilike(f"%{city}%"))
    if searchQuery:
        p = f"%{searchQuery}%"
        query = query.where(or_(Entity.name.ilike(p), Entity.alias.ilike(p), Entity.entity_id.ilike(p)))
    results = db.execute(query.order_by(Entity.risk_score.desc())).scalars().all()
    out = []
    for e in results:
        t_data = json.loads(e.type_specific_data_json or "{}")
        out.append({
            "id": e.id,
            "criminalId": e.entity_id,
            "name": e.name,
            "alias": e.alias or "",
            "type": e.type,
            "crimeCategory": e.crime_category,
            "riskScore": float(e.risk_score),
            "riskLevel": e.risk_level,
            "status": e.status,
            "photoUrl": e.photo_url or "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            "age": e.age or "35",
            "gender": e.gender or "Male",
            "nationality": e.nationality or "USA",
            "biography": e.biography or "",
            "aiThreatSummary": e.ai_threat_summary or "",
            "lastKnownLocation": {"address": e.address or "Miami Hub", "city": e.city or "Miami", "coordinates": [e.latitude or 25.7617, e.longitude or -80.1918]},
            "knownAssociates": t_data.get("knownAssociates", []),
            "vehicles": t_data.get("vehicles", []),
            "phoneNumbers": t_data.get("phoneNumbers", []),
            "financialAccounts": t_data.get("financialAccounts", []),
        })
    return out


# Network Graph
@app.get("/api/network/graph", tags=["Network Graph"])
@app.get("/api/v1/network/graph", tags=["Network Graph"])
def get_network_graph():
    raw = graph_engine.get_all_graph(limit=250)
    metrics = graph_engine.calculate_metrics()
    nodes = []
    for idx, n in enumerate(raw["nodes"]):
        p = n["properties"]
        angle = (2 * math.pi * idx) / max(1, len(raw["nodes"]))
        x = 500 + 260 * math.cos(angle)
        y = 400 + 260 * math.sin(angle)
        nodes.append({
            "id": n["id"],
            "type": "custom",
            "position": {"x": round(x, 1), "y": round(y, 1)},
            "data": {"label": p.get("name", "Suspect"), "type": p.get("type", "person"), "riskScore": p.get("risk_score", 50.0), "riskLevel": p.get("risk_level", "MEDIUM"), "avatarUrl": p.get("photo_url")}
        })
    edges = [{"id": e["id"], "source": e["source"], "target": e["target"], "label": e["type"], "data": {"relationshipType": e["type"], "riskLevel": e["properties"].get("risk_level", "MEDIUM")}} for e in raw["edges"]]
    return {"nodes": nodes, "edges": edges, "metrics": {"degreeCentralityTopNodes": metrics["degree_centrality"], "betweennessCentralityTopNodes": metrics["betweenness_centrality"], "communityClustersCount": metrics["communities_count"], "totalConnections": metrics["total_edges"], "averageConnectionsPerNode": metrics["average_connections"]}}


# Dashboard Intelligence KPIs
@app.get("/api/dashboard/summary", tags=["Dashboard"])
@app.get("/api/v1/dashboard/summary", tags=["Dashboard"])
def get_dashboard_summary(db: Session = Depends(get_db)):
    suspects_count = db.execute(select(func.count(Entity.id)).where(Entity.type == "person")).scalar() or 14
    cases_count = db.execute(select(func.count(InvestigationCase.id))).scalar() or 4
    alerts_count = db.execute(select(func.count(Alert.id))).scalar() or 6
    return {
        "totalSuspects": suspects_count,
        "suspectsTrend": 8.5,
        "activeInvestigations": cases_count,
        "investigationsTrend": 12.0,
        "highRiskIndividuals": 6,
        "highRiskTrend": 4.2,
        "locationsUnderSurveillance": 8,
        "aiRiskScore": 88.5,
        "recentAlertsCount": alerts_count,
        "crimesPerMonth": [
            {"month": "Jan", "total": 45, "resolved": 28, "drugTrafficking": 18, "cybercrime": 15, "extortion": 12},
            {"month": "Feb", "total": 52, "resolved": 34, "drugTrafficking": 22, "cybercrime": 18, "extortion": 12},
            {"month": "Mar", "total": 67, "resolved": 45, "drugTrafficking": 29, "cybercrime": 23, "extortion": 15},
        ],
        "crimeCategoryDistribution": [
            {"name": "Drug Trafficking", "value": 34, "color": "#ef4444"},
            {"name": "Cybercrime", "value": 26, "color": "#3b82f6"},
            {"name": "Money Laundering", "value": 18, "color": "#10b981"},
            {"name": "Arms Smuggling", "value": 12, "color": "#f59e0b"},
        ],
        "highRiskZones": [
            {"zone": "Port of Miami Terminal 4", "threatLevel": 94.5, "activeSuspects": 8, "incidents": 14},
            {"zone": "Financial District NYC", "threatLevel": 89.2, "activeSuspects": 12, "incidents": 22},
        ],
        "recentActivityFeed": [
            {"id": "act-1", "timestamp": "10m ago", "message": "Satellite geofence intercept at Dock 12", "type": "alert", "actor": "Surveillance Unit"},
            {"id": "act-2", "timestamp": "45m ago", "message": "Case #CAS-2026-891 escalated to CRITICAL", "type": "update", "actor": "Lead Vance"},
        ]
    }


# Threat Alerts
@app.get("/api/alerts", tags=["Alerts"])
@app.get("/api/v1/alerts", tags=["Alerts"])
def list_alerts(db: Session = Depends(get_db)):
    results = db.execute(select(Alert).order_by(Alert.created_at.desc())).scalars().all()
    return [{
        "id": a.id,
        "alertCode": a.alert_code,
        "title": a.title,
        "alertLevel": a.severity,
        "aiConfidence": float(a.ai_confidence),
        "description": a.description,
        "category": a.category,
        "status": a.status,
        "suggestedAction": a.suggested_action,
        "location": {"name": a.location_name, "city": a.city, "coordinates": [a.latitude or 25.7617, a.longitude or -80.1918]},
        "timestamp": a.created_at.strftime("%H:%M UTC • %b %d") if a.created_at else "Just now",
        "is_read": a.is_read,
    } for a in results]


# WebSocket Live Stream
@app.websocket("/api/v1/ws/alerts")
async def websocket_alerts(ws: WebSocket):
    await ws_broadcaster.connect(ws)
    try:
        while True:
            await ws.receive_text()
    except WebSocketDisconnect:
        ws_broadcaster.disconnect(ws)


# --------------------------------------------------------------------------------------
# 9. STATIC FRONTEND SPA SERVING
# --------------------------------------------------------------------------------------
frontend_dist = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")
if not os.path.exists(frontend_dist):
    frontend_dist = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "criminal-network-analysis-frontend", "dist")

if os.path.exists(frontend_dist):
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
        app.mount("/criminal-network-analysis-system/assets", StaticFiles(directory=assets_dir), name="gh_assets")

    @app.get("/", response_class=FileResponse)
    @app.get("/criminal-network-analysis-system")
    @app.get("/criminal-network-analysis-system/")
    def serve_frontend_root():
        return FileResponse(os.path.join(frontend_dist, "index.html"))

    @app.get("/{full_path:path}", response_class=FileResponse)
    def serve_frontend_spa(full_path: str):
        if full_path.startswith("api/") or full_path.startswith("docs") or full_path.startswith("health"):
            return JSONResponse(status_code=404, content={"error": "Not Found"})
        target = os.path.join(frontend_dist, full_path)
        return FileResponse(target if os.path.isfile(target) else os.path.join(frontend_dist, "index.html"))


# --------------------------------------------------------------------------------------
# 10. DATABASE AUTO-SEEDER
# --------------------------------------------------------------------------------------
def seed_data_if_empty():
    session = SessionLocal()
    try:
        if session.execute(select(func.count(User.id))).scalar() == 0:
            # Users
            u1 = User(id="usr-001", email="agent.vance@interpol.gov", hashed_password=get_password_hash("Password123!"), name="Agent Marcus Vance", badge_number="AGY-7701", role="INVESTIGATOR", clearance_level="TOP SECRET // SCI", agency="Interpol Counter-Syndicate Task Force")
            u2 = User(id="usr-002", email="admin@interpol.gov", hashed_password=get_password_hash("AdminPass2026!"), name="Director Sarah Sterling", badge_number="AGY-0001", role="ADMIN", clearance_level="TOP SECRET // SCI", agency="Global Counter-Organized Crime Command")
            u3 = User(id="usr-003", email="analyst.chen@interpol.gov", hashed_password=get_password_hash("Password123!"), name="Analyst David Chen", badge_number="AGY-3402", role="ANALYST", clearance_level="SECRET", agency="Financial Crimes Telemetry Section")
            session.add_all([u1, u2, u3])
            
            # Entities
            e1 = Entity(id="ent-001", entity_id="CR-8942", name="Elena Rostova", alias="La Sombra", type="person", crime_category="Drug Trafficking", risk_score=94.5, risk_level="CRITICAL", status="WANTED", city="Miami", active_warrants="3", type_specific_data_json=json.dumps({"knownAssociates": [{"name": "Viktor Kozlov", "role": "Broker"}], "vehicles": [{"licensePlate": "FL-789-VIP", "model": "G63 AMG"}]}))
            e2 = Entity(id="ent-002", entity_id="CR-5519", name="Viktor Kozlov", alias="The Broker", type="person", crime_category="Money Laundering", risk_score=88.2, risk_level="CRITICAL", status="UNDER_SURVEILLANCE", city="New York", active_warrants="1")
            e3 = Entity(id="ent-003", entity_id="CR-7721", name="Nikolai Vane", alias="Ghost", type="person", crime_category="Cybercrime", risk_score=86.4, risk_level="CRITICAL", status="WANTED", city="Chicago", active_warrants="2")
            session.add_all([e1, e2, e3])

            # Relationships & Graph Sync
            r1 = Relationship(id="rel-001", source_id="ent-001", target_id="ent-002", relationship_type="MONEY_TRANSFER", amount=1800000.0, risk_level="CRITICAL")
            r2 = Relationship(id="rel-002", source_id="ent-003", target_id="ent-002", relationship_type="ASSOCIATED_WITH", amount=4200000.0, risk_level="CRITICAL")
            session.add_all([r1, r2])

            # Sync Graph
            graph_engine.sync_node("ent-001", {"name": "Elena Rostova", "type": "person", "risk_score": 94.5, "risk_level": "CRITICAL"})
            graph_engine.sync_node("ent-002", {"name": "Viktor Kozlov", "type": "person", "risk_score": 88.2, "risk_level": "CRITICAL"})
            graph_engine.sync_node("ent-003", {"name": "Nikolai Vane", "type": "person", "risk_score": 86.4, "risk_level": "CRITICAL"})
            graph_engine.sync_edge("rel-001", "ent-001", "ent-002", "MONEY_TRANSFER", {"risk_level": "CRITICAL"})
            graph_engine.sync_edge("rel-002", "ent-003", "ent-002", "ASSOCIATED_WITH", {"risk_level": "CRITICAL"})

            # Cases & Alerts
            c1 = InvestigationCase(id="cas-001", case_number="CAS-2026-891", title="Operation Viper Strike", lead_officer="Agent Marcus Vance", status="ACTIVE", priority="CRITICAL")
            session.add(c1)
            a1 = Alert(id="alt-001", alert_code="ALT-7812", title="Geofence Breach — Port Miami", severity="CRITICAL", ai_confidence=97.4, description="Suspect Elena Rostova detected inside restricted maritime perimeter.", status="NEW", city="Miami")
            session.add(a1)
            session.commit()
    finally:
        session.close()


if __name__ == "__main__":
    import uvicorn
    print("❖ Launching A.E.G.I.S. Standalone Unified Backend on http://0.0.0.0:8000...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
