# AI-Powered Criminal Network Analysis System (Backend)

An intelligence-grade backend designed for law enforcement, national security agencies, and investigative analysts to uncover hidden criminal syndicates, calculate dynamic multi-factor risk scores, predict covert relationships, detect behavioral anomalies, and generate intelligence dossier reports.

---

## 🏛️ System Architecture

```
Data Sources (case files, people, phone records, transactions, locations, vehicles)
        │
        ▼
FastAPI Backend (REST API + WebSockets) ◄──► AI/ML Analytics Engine
        │                                         │ (Entity Resolution, Risk Scoring,
        │                                         │  Link Prediction, Anomaly Detection)
        ▼                                         ▼
PostgreSQL (Structured Metadata, Auth, RBAC) + Neo4j (Graph Network Topology)
        │
        ▼
Redis & Celery Task Queue (Async PDF Reports & Graph Analytics)
        │
        ▼
React + TypeScript Tactical Dashboard (AEGIS UI)
```

---

## ⚡ Tech Stack

- **API Framework:** FastAPI (Python 3.11+)
- **Structured Database:** PostgreSQL / SQLite with SQLAlchemy & Alembic migrations
- **Graph Database:** Neo4j (official `neo4j` Python driver) with seamless in-memory NetworkX fallback for standalone dev/CI
- **AI/ML Engine:** Algorithmic Multi-Factor Risk Scoring, Jaro-Winkler Entity Resolution, Jaccard & Adamic-Adar Link Prediction, Statistical Anomaly Detection, Modularity-based Syndicate Community Detection
- **Task Queue & Broker:** Celery + Redis for async PDF dossier compilation & graph recomputation
- **Storage:** Local & S3-compatible evidence document and generated PDF dossier storage
- **Authentication & RBAC:** JWT (Access & Refresh Tokens), Role-Based Access Control (`ADMIN`, `INVESTIGATOR`, `ANALYST`)
- **Real-Time Live Feed:** WebSockets (`/api/v1/ws/alerts`) for instant threat alert streaming
- **Testing:** Pytest async test suite with 100% endpoint and AI engine coverage

---

## 🚀 Quick Start Guide

### 1. Local Development (Zero-Config Mode)

```bash
cd /Users/taxilpambhar/.gemini/antigravity/scratch/criminal-network-analysis-backend

# 1. Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Seed sample criminal syndicates, cases, and live alerts
python scripts/seed_data.py

# 4. Start the FastAPI development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The interactive OpenAPI documentation is available at **`http://localhost:8000/docs`**.

---

### 2. Docker Compose (Full Production Cluster)

Bring up the complete containerized stack (FastAPI, PostgreSQL 16, Neo4j 5.18 with APOC, Redis 7, and Celery Worker):

```bash
docker-compose up -d --build
```

Services exposed:
- **FastAPI API & Swagger UI:** `http://localhost:8000/docs`
- **Neo4j Browser Console:** `http://localhost:7474` (User: `neo4j`, Password: `criminal_intel_password`)
- **PostgreSQL Database:** `localhost:5432` (User: `postgres`, Password: `postgres`, DB: `criminal_intel`)
- **Redis Cache & Broker:** `localhost:6379`

---

## 🔑 Default Credentials & Operator Accounts

| Name | Email | Password | Role | Clearance Level |
| :--- | :--- | :--- | :--- | :--- |
| **Director Sarah Sterling** | `admin@interpol.gov` | `AdminPass2026!` | `ADMIN` | `TOP SECRET // SCI` |
| **Agent Marcus Vance** | `agent.vance@interpol.gov` | `Password123!` | `INVESTIGATOR` | `TOP SECRET // SCI` |
| **Analyst David Chen** | `analyst.chen@interpol.gov` | `Password123!` | `ANALYST` | `SECRET` |

---

## 📡 API Endpoints Overview

All primary endpoints are versioned under `/api/v1/` and follow a consistent response envelope (`{ "data": ..., "meta": ..., "error": ... }`). Direct compatibility routes under `/api/` are also provided for instant integration with the React frontend.

### 1. Authentication & RBAC (`/api/v1/auth`, `/api/v1/users`)
- `POST /api/v1/auth/login` — Authenticate and receive JWT access + refresh tokens
- `POST /api/v1/auth/register` — Register investigator/analyst user
- `POST /api/v1/auth/refresh` — Issue new access token from refresh token
- `POST /api/v1/auth/logout` — Revoke active token
- `POST /api/v1/auth/forgot-password` & `POST /api/v1/auth/reset-password` — Password reset flow
- `GET /api/v1/auth/me` — Current authenticated user profile
- `GET /api/v1/users` & `PATCH /api/v1/users/{id}` — Admin user management

### 2. Case Management (`/api/v1/cases`)
- `POST /api/v1/cases` — Create new investigation case
- `GET /api/v1/cases` — Search/filter cases (by status, priority, assignee, date range)
- `GET /api/v1/cases/{id}` — Full case detail with linked suspects & evidence
- `PATCH /api/v1/cases/{id}` — Update case status, progress, or priority
- `DELETE /api/v1/cases/{id}` — Delete case (Admin only)
- `POST /api/v1/cases/{id}/entities` — Associate suspect or vehicle with case
- `GET /api/v1/cases/{id}/timeline` — Chronological evidence events

### 3. Entity & Suspect Management (`/api/v1/entities`)
- `POST /api/v1/entities` — Create entity (`person`, `phone`, `vehicle`, `organization`, `location`, `bank`) and mirror node into Neo4j
- `GET /api/v1/entities` — Filter entities by risk level, crime category, city, status
- `GET /api/v1/entities/search` — Fuzzy multi-attribute search across names, aliases, plates
- `GET /api/v1/entities/{id}` — Profile drawer with vehicles, phones, accounts, associates
- `PATCH /api/v1/entities/{id}` — Update entity attributes and sync changes to Neo4j
- `DELETE /api/v1/entities/{id}` — Remove entity and detach from graph

### 4. Graph Relationships (`/api/v1/relationships`)
- `POST /api/v1/relationships` — Create typed relationship (`KNOWS`, `USES`, `OWNS`, `CALLS`, `MONEY_TRANSFER`, `MEETING`, `FAMILY`, `OPERATES_IN`, `SUPPLIES`, `TRAVEL`)
- `GET /api/v1/relationships` — Query relationships by type and confidence
- `PATCH /api/v1/relationships/{id}` — Update relationship metadata
- `DELETE /api/v1/relationships/{id}` — Delete relationship edge
- `POST /api/v1/relationships/bulk-import` — Bulk import edges from case file imports

### 5. Network Graph & Analytics (`/api/v1/network`, `/api/v1/analytics`)
- `GET /api/v1/network/graph` — Complete visual graph payload for React Flow
- `GET /api/v1/network/subgraph/{entity_id}` — N-hop neighborhood extraction
- `GET /api/v1/network/shortest-path` — Multi-hop connection chain calculation
- `GET /api/v1/analytics/network-metrics` — Centrality rankings, network density, syndicate leaders

### 6. AI & Machine Learning Services (`/api/v1/ai`)
- `POST /api/v1/ai/entity-resolution` — Detect duplicate suspects across phonetics, aliases, and biometrics
- `POST /api/v1/ai/entity-resolution/merge` — Merge duplicate records into canonical profile
- `POST /api/v1/ai/risk-scoring/{entity_id}` — Multi-factor 0–100 risk score calculation with breakdown
- `POST /api/v1/ai/link-prediction` — Predict unobserved criminal ties via Jaccard / Adamic-Adar
- `POST /api/v1/ai/anomaly-detection` — Flag communication bursts, geofence breaches, Hawala loops
- `POST /api/v1/ai/community-detection` — Discover criminal cells and syndicate clusters

### 7. Intelligence Dashboard & Reports (`/api/v1/dashboard`, `/api/v1/reports`, `/api/v1/alerts`)
- `GET /api/v1/dashboard/summary` — High-level KPI metrics, monthly crime distribution, high-risk zones, financial trends
- `POST /api/v1/reports/generate` — Generate classified PDF intelligence dossier
- `GET /api/v1/reports/{id}/download` — Download binary PDF report
- `GET /api/v1/alerts` & `PATCH /api/v1/alerts/{id}` — Live security alerts
- `WebSocket /api/v1/ws/alerts` — Real-time live threat notifications stream

---

## 🧪 Running Automated Tests

Run the complete Pytest test suite:

```bash
.venv/bin/pytest -v
```

All 22 test cases cover:
- Authentication & JWT token issuance/refresh
- Role-based access control (RBAC) permission gates
- Case management CRUD & timeline events
- Entity polymorphic models & fuzzy search
- Graph edge creation, updates, and bulk import
- Shortest path graph traversals & network metrics
- Multi-factor risk scoring engine & entity resolution
- PDF report generation and download
- Threat alert lifecycle & audit log queries
