# ACN // AI-Powered Criminal Network Analysis System

An intelligence-grade, command-center web application built for law enforcement, task forces, and intelligence agencies to investigate, visualize, and dissect complex transnational criminal syndicates, suspect relationships, financial flows, intercepted communication logs, and real-time AI risk detection alerts.

---

## ⚡ Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS + Custom Intelligence Cyber Themes + Glassmorphism
- **Routing**: React Router DOM (v6) with Protected Authentication Routes
- **State & Data Fetching**: TanStack React Query (v5) + Axios Client
- **Data Visualizations**: Recharts (5 Analytics Charts)
- **Relationship Graph**: React Flow (Interactive 7-Node Topology Engine)
- **Geospatial Mapping**: Leaflet & React-Leaflet with Dark Tactical Tiles
- **Icons**: Lucide React
- **Animations**: Framer Motion & CSS Keyframe Radar Scanners

---

## 🗂️ Scalable Folder Structure

```
src/
├── api/                       # API Services (Axios + Fallback to Dummy data)
│   ├── axios.ts               # Axios instance (Base URL: http://localhost:8000/api)
│   ├── dashboard.ts           # Summary metrics & chart feeds
│   ├── criminals.ts           # Suspect roster & individual dossiers
│   ├── network.ts             # Relationship topology graph (React Flow)
│   ├── alerts.ts              # AI risk detection alerts & triage actions
│   ├── reports.ts             # Executive forensic reports & AI briefs
│   ├── timeline.ts            # Chronological evidence logs
│   ├── entities.ts            # Organizations, locations, transactions, phones
│   ├── intelligence.ts        # Live intercepted stream
│   └── index.ts
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx        # Collapsible intelligence sidebar
│   │   ├── Navbar.tsx         # Live UTC clock, Global Search, AI badge, Notifications
│   │   └── MainLayout.tsx     # Master layout shell
│   ├── ui/                    # Reusable glassmorphic UI primitives
│   ├── charts/                # 5 Recharts data widgets
│   ├── graph/                 # React Flow custom nodes, edges, shortest-path, centrality widgets
│   ├── cards/                 # StatCard, AlertCard, FeedCard, ReportCard
│   ├── tables/                # CriminalTable, RecentInvestigationsTable
│   ├── maps/                  # Tactical Surveillance Map (Leaflet)
│   ├── timeline/              # EvidenceTimelineView
│   ├── drawers/               # CriminalProfileDrawer (Dossier inspector)
│   └── common/                # GlobalSearchModal (Cmd+K), NotificationCenter, ErrorFallback
│
├── context/
│   ├── AuthContext.tsx        # Officer session state & demo login
│   ├── ThemeContext.tsx       # Tactical Dark / Light Mode manager
│   └── NotificationContext.tsx# Real-time incident notifications
│
├── data/dummy/                # 100% Interconnected realistic test datasets
│   ├── criminals.ts           # 20 Suspects with rich profiles & associations
│   ├── organizations.ts       # 10 Syndicates, cartels & front companies
│   ├── locations.ts           # 15 Global surveillance facilities
│   ├── alerts.ts              # 30 AI threat detection alerts
│   ├── timeline.ts            # 100 Chronological forensic events
│   ├── network.ts             # 7 Node types & 50+ relationship edges
│   ├── financial.ts           # Financial accounts & suspicious transactions
│   ├── communications.ts      # Tapped phone logs & IMEI records
│   ├── intelligenceFeed.ts    # Live intercepted stream items
│   ├── reports.ts             # 6 Executive forensic reports
│   └── dashboard.ts           # Summary metrics & chart feeds
│
├── pages/
│   ├── Login.tsx              # Tactical authentication screen
│   ├── Dashboard.tsx          # Command-center dashboard
│   ├── CriminalProfiles.tsx   # Searchable/filterable suspect directory
│   ├── NetworkAnalysis.tsx    # Interactive React Flow relationship graph
│   ├── IntelligenceFeed.tsx   # Live intercepted intelligence stream
│   ├── Alerts.tsx             # AI risk detection alert center
│   ├── InvestigationReports.tsx # Printable preview & JSON/PDF exports
│   ├── EvidenceTimeline.tsx   # Chronological evidence sequence
│   └── Settings.tsx           # AI sensitivity, API status & themes
│
├── routes/
│   └── index.tsx              # React Router DOM configuration
├── types/
│   └── index.ts               # Strict TypeScript interfaces
└── utils/
    ├── cn.ts                  # ClassName utility
    ├── formatters.ts          # Currency, date, risk badge styling
    └── exportUtils.ts         # PDF print & JSON download helpers
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🛡️ Backend Integration & Graceful Offline Fallback

The Axios client is pre-configured to connect with a Python FastAPI backend at:
```
http://localhost:8000/api
```

### Supported API Endpoints:
- `GET /dashboard/summary`
- `GET /criminals`
- `GET /criminals/:id`
- `GET /network/graph`
- `GET /alerts`
- `PATCH /alerts/:id`
- `GET /entities`
- `GET /reports`
- `GET /reports/:id`
- `GET /timeline`
- `GET /intelligence/feed`

> [!NOTE]
> **Zero Blank Pages Guarantee**: If the backend is offline, unreachable, or returns errors, every API function transparently falls back to the interconnected mock repository (`/src/data/dummy/`), while rendering loading skeletons and informative status badges. When your FastAPI backend is online, the frontend immediately connects without modifying any UI components.

---

## 🔍 Key Interactive Features

1. **Global Search (`Cmd + K` / `Ctrl + K`)**:
   - Searches across Suspects, Tapped Phone Numbers, Tracked Vehicles, Monitored Locations, and Syndicates in real-time.
2. **React Flow Relationship Explorer**:
   - 7 Custom Node types (`Person`, `Phone`, `Vehicle`, `Bank Account`, `Location`, `Event`, `Organization`).
   - Shortest Path Interceptor (Calculates and highlights optimal path between any two selected entities).
   - Degree & Betweenness Centrality metrics with animated gauges.
3. **Comprehensive Criminal Dossier Drawer**:
   - Complete personal details, known associates, registered vehicles, tapped phones, offshore accounts, and AI threat summaries.
4. **Investigation Reports**:
   - High-resolution modal preview with printable PDF view (`window.print()`) and JSON export.
