import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  NodeProps,
  EdgeProps,
  getBezierPath,
  EdgeLabelRenderer,
  ReactFlowProvider,
  useReactFlow,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  LayoutDashboard,
  Users,
  Share2,
  Radio,
  ShieldAlert,
  FileText,
  Clock,
  Settings as SettingsIcon,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Shield,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  MapPin,
  Cpu,
  User,
  Phone,
  Car,
  Landmark,
  Building2,
  Calendar,
  CreditCard,
  Camera,
  ShieldCheck,
  CheckCircle2,
  Printer,
  FileCode,
  Eye,
  EyeOff,
  Lock,
  Mail,
  KeyRound,
  X,
  ExternalLink,
  Route,
  RotateCcw,
  CheckCheck,
  Trash2,
  Lightbulb,
  AlertTriangle,
  ArrowUpDown,
  Filter,
  Terminal,
  Bookmark,
  BookmarkCheck,
  DollarSign,
  Crosshair,
  Compass,
  Menu,
} from 'lucide-react';
import nanoSnifferLogo from './assets/nanosniffer_logo.png';

/* =========================================================================
   1. TYPES & INTERFACES
   ========================================================================= */

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type SuspectStatus = 'WANTED' | 'UNDER_SURVEILLANCE' | 'IN_CUSTODY' | 'INACTIVE' | 'BAIL';
export type CrimeCategory =
  | 'Drug Trafficking'
  | 'Cybercrime'
  | 'Money Laundering'
  | 'Arms Smuggling'
  | 'Extortion'
  | 'Organized Heist'
  | 'Human Trafficking'
  | 'Terrorism Financing';

export type NodeType = 'person' | 'phone' | 'vehicle' | 'bank' | 'location' | 'event' | 'organization';

export interface Criminal {
  id: string;
  criminalId: string;
  name: string;
  alias: string;
  photoUrl: string;
  age: number;
  gender: string;
  nationality: string;
  crimeCategory: CrimeCategory;
  riskScore: number;
  riskLevel: RiskLevel;
  status: SuspectStatus;
  lastKnownLocation: {
    address: string;
    city: string;
    country: string;
    coordinates: [number, number];
  };
  lastActivity: string;
  biography: string;
  aiThreatSummary: string;
  personalDetails: {
    dob: string;
    bloodGroup?: string;
    fingerprintId?: string;
    eyeColor?: string;
    heightCm?: number;
  };
  knownAssociates: Array<{
    id: string;
    name: string;
    alias: string;
    role: string;
    relationship: string;
    riskScore: number;
    avatarUrl?: string;
  }>;
  vehicles: Array<{
    id: string;
    licensePlate: string;
    make: string;
    model: string;
    year: number;
    color: string;
    registeredOwner: string;
    status: string;
    lastSeenLocation: string;
    lastSeenTime: string;
  }>;
  phoneNumbers: Array<{
    id: string;
    phoneNumber: string;
    carrier: string;
    imei: string;
    status: string;
    totalCallsLogged: number;
    lastActive: string;
  }>;
  financialAccounts: Array<{
    id: string;
    accountNumber: string;
    bankName: string;
    accountType: string;
    balance: number;
    currency: string;
    flaggedTransactionsCount: number;
  }>;
  connectedOrganizations: Array<{
    id: string;
    name: string;
    role: string;
    threatLevel: RiskLevel;
  }>;
  tags: string[];
}

export interface Alert {
  id: string;
  alertCode: string;
  title: string;
  alertLevel: RiskLevel;
  aiConfidence: number;
  description: string;
  relatedCriminals: Array<{ id: string; name: string; alias: string }>;
  location: { name: string; city: string; coordinates: [number, number] };
  timestamp: string;
  category: string;
  status: 'NEW' | 'ACKNOWLEDGED' | 'ESCALATED' | 'RESOLVED';
  suggestedAction: string;
}

export interface IntelligenceFeedItem {
  id: string;
  type: 'surveillance' | 'financial_anomaly' | 'suspicious_travel' | 'social_media' | 'weapon_purchase' | 'unknown_meeting';
  title: string;
  source: string;
  timestamp: string;
  confidenceScore: number;
  summary: string;
  suspectsInvolved: Array<{ id: string; name: string; alias: string }>;
  location?: string;
  priority: RiskLevel;
  interceptSnippet?: string;
  isBookmarked?: boolean;
}

export interface TimelineEvent {
  id: string;
  title: string;
  eventType: string;
  timestamp: string;
  criminalId?: string;
  criminalName?: string;
  location: string;
  description: string;
  confidenceScore: number;
  severity: RiskLevel;
  isVerified: boolean;
}

export interface InvestigationReport {
  id: string;
  reportNumber: string;
  title: string;
  type: string;
  dateGenerated: string;
  author: string;
  targetEntity: string;
  summary: string;
  classificationLevel: string;
  keyFindings: string[];
  metrics: Record<string, string | number>;
}

/* =========================================================================
   2. RICH INTERCONNECTED DUMMY DATASET
   ========================================================================= */

const DUMMY_CRIMINALS: Criminal[] = [
  {
    id: 'crm-01',
    criminalId: 'CR-8942',
    name: 'Viktor Markov',
    alias: 'NullPointer / Spectre',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 38,
    gender: 'Male',
    nationality: 'Romanian / Russian',
    crimeCategory: 'Cybercrime',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: { address: 'Strada Lipscani 14', city: 'Bucharest', country: 'Romania', coordinates: [44.4323, 26.1011] },
    lastActivity: '2026-08-24T06:12:00Z',
    biography: 'Mastermind behind the Vanguard Cyber Syndicate. Directs NATO defense contractor ransomware campaigns and SWIFT wire intercept networks.',
    aiThreatSummary: 'High probability of upcoming cyber offensive against critical energy grids. Intercepted PGP keys link to arms broker Dimitri Costa.',
    personalDetails: { dob: '1988-04-12', bloodGroup: 'A+', fingerprintId: 'FP-RO-992140', eyeColor: 'Blue', heightCm: 182 },
    knownAssociates: [
      { id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker', role: 'Money Launderer', relationship: 'Crypto Washing', riskScore: 88 },
      { id: 'crm-03', name: 'Helena Vance', alias: 'The Architect', role: 'Logistics Handler', relationship: 'Hardware Smuggling', riskScore: 91 },
      { id: 'crm-09', name: 'Astrid Lindqvist', alias: 'Zero', role: 'DevSecOps', relationship: 'Darknet Hosting', riskScore: 74 }
    ],
    vehicles: [{ id: 'veh-01', licensePlate: 'B-77-VNG', make: 'Audi', model: 'RS7 Black Edition', year: 2024, color: 'Matte Black', registeredOwner: 'Vanguard Cyber Tech', status: 'ACTIVE', lastSeenLocation: 'Bucharest Sector 1', lastSeenTime: '2026-08-23 23:45' }],
    phoneNumbers: [{ id: 'ph-01', phoneNumber: '+40 721 899 432', carrier: 'Orange Romania (Encrypted SIM)', imei: '864920048192014', status: 'TAPPED', totalCallsLogged: 420, lastActive: '2026-08-24 05:40' }],
    financialAccounts: [
      { id: 'fin-01', accountNumber: 'RO49BTRL9940129401', bankName: 'Banca Transilvania Shell', accountType: 'SHELL_CORP', balance: 4250000, currency: 'EUR', flaggedTransactionsCount: 14 },
      { id: 'fin-02', accountNumber: 'bc1q9x0283mzk28941kzl02941', bankName: 'Spectre Bitcoin Native Cluster', accountType: 'CRYPTO_WALLET', balance: 18450000, currency: 'USD', flaggedTransactionsCount: 88 }
    ],
    connectedOrganizations: [{ id: 'org-01', name: 'Vanguard Cyber Syndicate', role: 'Founding Commander', threatLevel: 'CRITICAL' }],
    tags: ['Cyber Warfare', 'Ransomware', 'Wanted Interpol Red', 'Zero-Day Trader']
  },
  {
    id: 'crm-02',
    criminalId: 'CR-4109',
    name: 'Mateo Silva',
    alias: 'El Serpiente / The Viper',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    age: 49,
    gender: 'Male',
    nationality: 'Colombian / Panamanian',
    crimeCategory: 'Drug Trafficking',
    riskScore: 98,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: { address: 'Howard Boulevard Bldg 302', city: 'Panama City', country: 'Panama', coordinates: [8.9500, -79.5997] },
    lastActivity: '2026-08-23T22:15:00Z',
    biography: 'Directs maritime transit pipelines for multi-ton narcotics shipments originating from Valle del Cauca into Rotterdam and Antwerp via GPS-guided submersibles.',
    aiThreatSummary: 'Recent shipment of 4.2 tons flagged entering Antwerp. Financial trail shows large escrow released to Helena Vance for Rotterdam port security override.',
    personalDetails: { dob: '1977-09-03', bloodGroup: 'O+', fingerprintId: 'FP-CO-881920', eyeColor: 'Dark Brown', heightCm: 176 },
    knownAssociates: [
      { id: 'crm-03', name: 'Helena Vance', alias: 'The Architect', role: 'Port Freight Handler', relationship: 'Rotterdam Ingress', riskScore: 91 },
      { id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker', role: 'Financial Mixer', relationship: 'Escrow Layering', riskScore: 88 }
    ],
    vehicles: [{ id: 'veh-02', licensePlate: 'PAN-9941', make: 'Toyota', model: 'Land Cruiser 300 Armored', year: 2024, color: 'Midnight Bronze', registeredOwner: 'Pacific Maritime Holdings', status: 'ACTIVE', lastSeenLocation: 'Panama Pacifico', lastSeenTime: '2026-08-23 18:20' }],
    phoneNumbers: [{ id: 'ph-02', phoneNumber: '+507 6821 9901', carrier: 'Cable & Wireless Panama', imei: '869018239019283', status: 'TAPPED', totalCallsLogged: 530, lastActive: '2026-08-23 21:00' }],
    financialAccounts: [{ id: 'fin-03', accountNumber: 'PA92BG60192830192', bankName: 'Banco General Panama', accountType: 'OFFSHORE', balance: 32000000, currency: 'USD', flaggedTransactionsCount: 32 }],
    connectedOrganizations: [{ id: 'org-02', name: 'Cali-Medellin Maritime Coalition', role: 'High Commander', threatLevel: 'CRITICAL' }],
    tags: ['Cartel Leader', 'Maritime Smuggling', 'Submersible Operations', 'DEA Priority 1']
  },
  {
    id: 'crm-03',
    criminalId: 'CR-1048',
    name: 'Helena Vance',
    alias: 'The Architect / Iron Lady',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    age: 44,
    gender: 'Female',
    nationality: 'German / Swiss',
    crimeCategory: 'Money Laundering',
    riskScore: 91,
    riskLevel: 'CRITICAL',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: { address: 'Am Sandtorkai 64', city: 'Hamburg', country: 'Germany', coordinates: [53.5413, 9.9882] },
    lastActivity: '2026-08-24T08:30:00Z',
    biography: 'Elite logistics architect operating out of Hamburg and Rotterdam. Coordinates illicit customs manifests, high-value port clearances, and trade-based money laundering.',
    aiThreatSummary: 'Surveillance spotted meeting at Club Obsidian Lisbon with arms dealer Dimitri Costa. Multiple freight transfers registered under Eurasian Logistics.',
    personalDetails: { dob: '1982-11-19', bloodGroup: 'B-', fingerprintId: 'FP-DE-391028', eyeColor: 'Green', heightCm: 174 },
    knownAssociates: [
      { id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer', role: 'Cyber Financier', relationship: 'Server Leasing', riskScore: 96 },
      { id: 'crm-02', name: 'Mateo Silva', alias: 'El Serpiente', role: 'Cartel Boss', relationship: 'Freight Consignment', riskScore: 98 },
      { id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer', role: 'Arms Smuggler', relationship: 'Cargo Manifest Masking', riskScore: 89 }
    ],
    vehicles: [{ id: 'veh-03', licensePlate: 'HH-HV-8800', make: 'Mercedes-Benz', model: 'S680 Maybach', year: 2025, color: 'Obsidian Black', registeredOwner: 'Eurasian Logistics GmbH', status: 'ACTIVE', lastSeenLocation: 'Hamburg HafenCity', lastSeenTime: '2026-08-24 07:15' }],
    phoneNumbers: [{ id: 'ph-03', phoneNumber: '+49 171 902188', carrier: 'Deutsche Telekom Enterprise', imei: '351982001928471', status: 'TAPPED', totalCallsLogged: 710, lastActive: '2026-08-24 08:20' }],
    financialAccounts: [{ id: 'fin-04', accountNumber: 'DE89200800001892019283', bankName: 'Deutsche Bank Commercial', accountType: 'CHECKING', balance: 14200000, currency: 'EUR', flaggedTransactionsCount: 19 }],
    connectedOrganizations: [{ id: 'org-03', name: 'Eurasian Logistics & Metals GmbH', role: 'Managing Director', threatLevel: 'HIGH' }],
    tags: ['Logistics Architect', 'Port Corruption', 'Trade-Based Laundering', 'Under Active Wiretap']
  },
  {
    id: 'crm-04',
    criminalId: 'CR-5521',
    name: 'Chen Wei',
    alias: 'The Chemist / Tiger Claw',
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&auto=format&fit=crop&q=80',
    age: 52,
    gender: 'Male',
    nationality: 'Chinese / Thai',
    crimeCategory: 'Arms Smuggling',
    riskScore: 94,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: { address: 'Charoen Krung Rd', city: 'Bangkok', country: 'Thailand', coordinates: [13.7029, 100.4998] },
    lastActivity: '2026-08-24T03:45:00Z',
    biography: 'Chief chemical synthesis supplier and automated drone guidance component smuggler across the Mekong river corridor.',
    aiThreatSummary: 'Bulk shipment of optical drone guidance modules traced from Shenzhen to Bangkok port warehouse B7.',
    personalDetails: { dob: '1974-06-28', bloodGroup: 'AB+', heightCm: 168 },
    knownAssociates: [
      { id: 'crm-05', name: 'Raymond Leung', alias: 'Red Dragon', role: 'Triad Enforcer', relationship: 'Hong Kong Distribution', riskScore: 86 },
      { id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer', role: 'Arms Smuggler', relationship: 'Electronic Triggers', riskScore: 89 }
    ],
    vehicles: [{ id: 'veh-04', licensePlate: 'BKK-8899', make: 'Lexus', model: 'LX600 Armored', year: 2024, color: 'Pearl White', registeredOwner: 'Siam Golden Import', status: 'ACTIVE', lastSeenLocation: 'Bangkok Riverside', lastSeenTime: '2026-08-23 20:10' }],
    phoneNumbers: [{ id: 'ph-04', phoneNumber: '+66 81 902 4432', carrier: 'AIS Thailand (Satellite)', imei: '862019284019284', status: 'TAPPED', totalCallsLogged: 340, lastActive: '2026-08-24 02:30' }],
    financialAccounts: [{ id: 'fin-05', accountNumber: 'TH020088192019481', bankName: 'Bangkok Bank International', accountType: 'SHELL_CORP', balance: 19800000, currency: 'USD', flaggedTransactionsCount: 27 }],
    connectedOrganizations: [{ id: 'org-04', name: 'Shadow Viper Syndicate', role: 'Chief Chemist', threatLevel: 'CRITICAL' }],
    tags: ['Precursor Chemicals', 'Drone Guidance Smuggling', 'Golden Triangle Nexus']
  },
  {
    id: 'crm-05',
    criminalId: 'CR-3390',
    name: 'Raymond Leung',
    alias: 'Red Dragon / Uncle Ray',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    age: 58,
    gender: 'Male',
    nationality: 'Hong Kong (SAR)',
    crimeCategory: 'Extortion',
    riskScore: 86,
    riskLevel: 'HIGH',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: { address: 'Canton Road 88', city: 'Hong Kong', country: 'Hong Kong', coordinates: [22.3022, 114.1685] },
    lastActivity: '2026-08-24T05:00:00Z',
    biography: 'Controls Kowloon Waterfront Brotherhood gaming junkets, shipping protection rings, and underground VIP gaming chips washing.',
    aiThreatSummary: 'Transferred $4.5M in casino markers to Tariq Mansoor for laundering.',
    personalDetails: { dob: '1968-02-14', bloodGroup: 'O-', heightCm: 172 },
    knownAssociates: [
      { id: 'crm-04', name: 'Chen Wei', alias: 'The Chemist', role: 'Syndicate Chemist', relationship: 'Mekong Supply Line', riskScore: 94 },
      { id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker', role: 'Crypto Mixer', relationship: 'Macau Chip Washing', riskScore: 88 }
    ],
    vehicles: [{ id: 'veh-05', licensePlate: 'HK-9999', make: 'Rolls-Royce', model: 'Phantom VIII', year: 2024, color: 'Imperial Blue', registeredOwner: 'Dragon Ocean Holdings', status: 'ACTIVE', lastSeenLocation: 'The Peninsula HK', lastSeenTime: '2026-08-23 21:30' }],
    phoneNumbers: [{ id: 'ph-05', phoneNumber: '+852 9123 4567', carrier: 'SmarTone HK', imei: '861029384918274', status: 'TAPPED', totalCallsLogged: 490, lastActive: '2026-08-24 04:50' }],
    financialAccounts: [{ id: 'fin-06', accountNumber: 'HK0891029381928', bankName: 'HSBC Offshore Trust', accountType: 'SAVINGS', balance: 28500000, currency: 'USD', flaggedTransactionsCount: 15 }],
    connectedOrganizations: [{ id: 'org-05', name: 'Kowloon Waterfront Brotherhood', role: 'Chairman', threatLevel: 'HIGH' }],
    tags: ['Triad Dragon Head', 'Extortion Racket', 'Casino Laundering']
  },
  {
    id: 'crm-06',
    criminalId: 'CR-7712',
    name: 'Dimitri Costa',
    alias: 'The Armorer / Spartan',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    age: 47,
    gender: 'Male',
    nationality: 'Greek / Cypriot',
    crimeCategory: 'Arms Smuggling',
    riskScore: 89,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: { address: 'Akti Miaouli 10', city: 'Piraeus', country: 'Greece', coordinates: [37.9402, 23.6385] },
    lastActivity: '2026-08-24T07:10:00Z',
    biography: 'Illicit arms broker supplying military hardware and modified drones across Mediterranean corridors.',
    aiThreatSummary: 'Manifest intercepted showing 120 guided surface units diverted from Port of Piraeus.',
    personalDetails: { dob: '1979-05-10', heightCm: 185, eyeColor: 'Hazel' },
    knownAssociates: [
      { id: 'crm-03', name: 'Helena Vance', alias: 'The Architect', role: 'Logistics Handler', relationship: 'Cargo Manifest Masking', riskScore: 91 }
    ],
    vehicles: [{ id: 'veh-06', licensePlate: 'GR-PIR-4421', make: 'BMW', model: 'X7 M60i Armored', year: 2024, color: 'Carbon Black', registeredOwner: 'Aegean Maritime', status: 'ACTIVE', lastSeenLocation: 'Piraeus Gate 4', lastSeenTime: '2026-08-24 06:45' }],
    phoneNumbers: [{ id: 'ph-06', phoneNumber: '+30 694 201 8899', carrier: 'Cosmote Greece', imei: '359019284910293', status: 'TAPPED', totalCallsLogged: 410, lastActive: '2026-08-24 07:05' }],
    financialAccounts: [{ id: 'fin-07', accountNumber: 'CY89002019283019283', bankName: 'Bank of Cyprus Trust', accountType: 'OFFSHORE', balance: 11400000, currency: 'EUR', flaggedTransactionsCount: 22 }],
    connectedOrganizations: [{ id: 'org-06', name: 'Aegean Arms & Charter Group', role: 'Chief Executive', threatLevel: 'HIGH' }],
    tags: ['Military Arms Broker', 'Maritime Logistics', 'Interpol Orange Notice']
  },
  {
    id: 'crm-07',
    criminalId: 'CR-9081',
    name: 'Tariq Mansoor',
    alias: 'The Broker / Al-Muhandis',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    age: 41,
    gender: 'Male',
    nationality: 'Emirati / British',
    crimeCategory: 'Money Laundering',
    riskScore: 88,
    riskLevel: 'HIGH',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: { address: 'Dubai Marina Yacht Club', city: 'Dubai', country: 'UAE', coordinates: [25.0805, 55.1403] },
    lastActivity: '2026-08-24T08:15:00Z',
    biography: 'Architect of decentralized crypto mixers and luxury real estate layering networks across Dubai and London.',
    aiThreatSummary: 'Layered over $85M in crypto assets in the last 90 days connecting Viktor Markov and Mateo Silva.',
    personalDetails: { dob: '1985-08-22', heightCm: 180, eyeColor: 'Amber Brown' },
    knownAssociates: [
      { id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer', role: 'Cyber Commander', relationship: 'Liquidity Provider', riskScore: 96 },
      { id: 'crm-02', name: 'Mateo Silva', alias: 'El Serpiente', role: 'Cartel Boss', relationship: 'Escrow Structuring', riskScore: 98 }
    ],
    vehicles: [{ id: 'veh-07', licensePlate: 'DXB-K-77', make: 'Bentley', model: 'Flying Spur', year: 2025, color: 'Glacier White', registeredOwner: 'Apex Trust FZE', status: 'ACTIVE', lastSeenLocation: 'DIFC Gate', lastSeenTime: '2026-08-24 07:30' }],
    phoneNumbers: [{ id: 'ph-07', phoneNumber: '+971 50 882 1099', carrier: 'Etisalat VIP Encrypted', imei: '352910293840192', status: 'TAPPED', totalCallsLogged: 840, lastActive: '2026-08-24 08:10' }],
    financialAccounts: [{ id: 'fin-08', accountNumber: 'AE820330001928301928301', bankName: 'Emirates NBD Corporate', accountType: 'OFFSHORE', balance: 54000000, currency: 'USD', flaggedTransactionsCount: 45 }],
    connectedOrganizations: [{ id: 'org-07', name: 'Apex Crypto Yield Trust', role: 'Managing Partner', threatLevel: 'HIGH' }],
    tags: ['Crypto Laundering Master', 'Hawala Operator', 'High-Frequency Layering']
  }
];

const DUMMY_ALERTS: Alert[] = [
  {
    id: 'alt-01',
    alertCode: 'ALT-202601',
    title: 'Surge in Encrypted Satellite Comms (Rotterdam - Panama Channel)',
    alertLevel: 'CRITICAL',
    aiConfidence: 97,
    category: 'Encrypted Call Surge',
    relatedCriminals: [
      { id: 'crm-02', name: 'Mateo Silva', alias: 'El Serpiente' },
      { id: 'crm-03', name: 'Helena Vance', alias: 'The Architect' }
    ],
    location: { name: 'Port of Rotterdam Terminal 4', city: 'Rotterdam', coordinates: [51.9244, 4.4777] },
    timestamp: '2026-08-24T08:12:00Z',
    description: 'AI pattern detection intercepted 34 burst-encrypted satellite communications between Panama and Rotterdam matching narcotics submersible arrival window.',
    status: 'NEW',
    suggestedAction: 'Dispatch Tactical Interdiction Unit & initiate thermal harbor scan.',
  },
  {
    id: 'alt-02',
    alertCode: 'ALT-202602',
    title: 'Offshore Escrow Liquidation ($18.4M Crypto Dispersal)',
    alertLevel: 'CRITICAL',
    aiConfidence: 94,
    category: 'Financial Anomaly',
    relatedCriminals: [
      { id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer' },
      { id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker' }
    ],
    location: { name: 'Bucharest Underground Facility', city: 'Bucharest', coordinates: [44.4323, 26.1011] },
    timestamp: '2026-08-24T06:40:00Z',
    description: 'Spectre Vault wallet executed high-velocity split into 400 ephemeral sub-wallets via decentralized privacy protocol.',
    status: 'ACKNOWLEDGED',
    suggestedAction: 'Notify Financial Intelligence Unit and freeze flagged offshore gateway nodes.',
  },
  {
    id: 'alt-03',
    alertCode: 'ALT-202603',
    title: 'Weaponized Drone Guidance Sensor Divergence',
    alertLevel: 'HIGH',
    aiConfidence: 92,
    category: 'Weapon Sighting',
    relatedCriminals: [
      { id: 'crm-04', name: 'Chen Wei', alias: 'The Chemist' },
      { id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer' }
    ],
    location: { name: 'Piraeus Heavy Container Depot', city: 'Piraeus', coordinates: [37.9402, 23.6385] },
    timestamp: '2026-08-24T05:22:00Z',
    description: 'Optical guidance gyro units falsely manifested as civilian agricultural equipment intercepted in transit manifest to Aegean Charter.',
    status: 'ESCALATED',
    suggestedAction: 'Hold container #EU-99214 at customs security inspection gate 4.',
  }
];

const DUMMY_FEED: IntelligenceFeedItem[] = [
  {
    id: 'feed-01',
    type: 'surveillance',
    title: 'Visual Confirmation: Helena Vance & Dimitri Costa at Club Obsidian Lisbon',
    source: 'FIELD-UNIT-LIS-04 (High-Gain Optical & Audio)',
    timestamp: '2026-08-24T08:14:00Z',
    confidenceScore: 96,
    priority: 'CRITICAL',
    summary: 'Subject Vance handed over an encrypted Panasonic Toughbook to Costa inside private booth #3. Audio intercept recovered snippets mentioning "Battenberg cargo clearance".',
    suspectsInvolved: [
      { id: 'crm-03', name: 'Helena Vance', alias: 'The Architect' },
      { id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer' }
    ],
    location: 'Lisbon, Portugal',
    interceptSnippet: 'VANCE: "...the customs seals are pre-cloned in Hamburg. Dimitri, charter at Slip 14 before 0300."',
    isBookmarked: true,
  },
  {
    id: 'feed-02',
    type: 'financial_anomaly',
    title: 'Flash Dispersion of $18.4M USDT across 400 Ghost Wallets',
    source: 'BLOCKCHAIN-ANALYTICS-ENGINE // AEGIS-FIN',
    timestamp: '2026-08-24T06:40:00Z',
    confidenceScore: 99,
    priority: 'CRITICAL',
    summary: 'Spectre Vault initiated a multi-hop mixer dispersal. Over 65% recombined into accounts managed by Tariq Mansoor.',
    suspectsInvolved: [
      { id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer' },
      { id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker' }
    ],
    location: 'Bucharest / Dubai Gateway',
    interceptSnippet: 'TX: 0x98fa...11c2 -> 400 hops -> Escrow Contract #AE-DIFC-8819',
    isBookmarked: true,
  }
];

const DUMMY_TIMELINE: TimelineEvent[] = [
  {
    id: 'tl-01',
    title: 'Intercepted Encrypted Call: Viktor Markov to Helena Vance',
    eventType: 'Phone Calls',
    timestamp: '2026-08-24T08:20:00Z',
    criminalId: 'crm-01',
    criminalName: 'Viktor Markov',
    location: 'Bucharest / Hamburg Link',
    description: 'Tapped Orange RO SIM logged 8m 45s VoIP session coordinating server lease payments.',
    confidenceScore: 98,
    severity: 'CRITICAL',
    isVerified: true,
  },
  {
    id: 'tl-02',
    title: 'Submersible Offload Detected: Port of Rotterdam Slip 42',
    eventType: 'Border Crossing',
    timestamp: '2026-08-24T04:15:00Z',
    criminalId: 'crm-02',
    criminalName: 'Mateo Silva',
    location: 'Port of Rotterdam',
    description: 'Underwater acoustic hydrophones detected low-RPM electric submersible docking at Pier 42.',
    confidenceScore: 95,
    severity: 'CRITICAL',
    isVerified: true,
  },
  {
    id: 'tl-03',
    title: 'High-Value ATM Cash Extraction: Dubai Marina',
    eventType: 'ATM Withdrawal',
    timestamp: '2026-08-24T01:30:00Z',
    criminalId: 'crm-07',
    criminalName: 'Tariq Mansoor',
    location: 'Dubai Marina',
    description: 'Cloned bearer cards utilized to extract maximum cash thresholds across 4 sequential ATMs.',
    confidenceScore: 92,
    severity: 'HIGH',
    isVerified: true,
  }
];

const DUMMY_REPORTS: InvestigationReport[] = [
  {
    id: 'rep-01',
    reportNumber: 'AEGIS-RPT-2026-094',
    title: 'Comprehensive Syndicate Network & Asset Topology',
    type: 'Network Summary',
    dateGenerated: '2026-08-24T08:00:00Z',
    author: 'Special Agent Marcus Vance (Lead Analyst)',
    targetEntity: 'Vanguard Cyber Syndicate & Cali-Medellin Axis',
    summary: 'A holistic threat matrix mapping 20 primary targets, 7 shell holding entities, 8 offshore banking vectors, and 12 tactical safehouses.',
    classificationLevel: 'TOP SECRET // INTEL',
    keyFindings: [
      'Viktor Markov (CR-8942) and Mateo Silva (CR-4109) identified as central liquidity anchors.',
      'Helena Vance operates as single-point-of-failure bridge connecting South American cargo to European port clearance.',
      'Tariq Mansoor has laundered in excess of $180M USD in FY2026.'
    ],
    metrics: { 'Identified Targets': 20, 'Illicit Capital': '$420M USD', 'Bridge Nodes': 2 }
  }
];

const DUMMY_CHART_MONTHLY = [
  { month: 'Jan', total: 42, resolved: 31 },
  { month: 'Feb', total: 58, resolved: 40 },
  { month: 'Mar', total: 64, resolved: 45 },
  { month: 'Apr', total: 79, resolved: 52 },
  { month: 'May', total: 86, resolved: 60 },
  { month: 'Jun', total: 104, resolved: 72 },
  { month: 'Jul', total: 118, resolved: 81 },
  { month: 'Aug', total: 135, resolved: 94 },
];

const DUMMY_CHART_CATEGORIES = [
  { name: 'Drug Trafficking', value: 34, color: '#ef4444' },
  { name: 'Cybercrime', value: 28, color: '#06b6d4' },
  { name: 'Money Laundering', value: 22, color: '#8b5cf6' },
  { name: 'Arms Smuggling', value: 18, color: '#f59e0b' },
  { name: 'Extortion', value: 14, color: '#ec4899' },
];

const DUMMY_GRAPH_NODES = [
  {
    id: 'node-crm-01',
    type: 'personNode',
    position: { x: 380, y: 120 },
    data: { label: 'Viktor Markov', type: 'person', riskScore: 96, riskLevel: 'CRITICAL', entityId: 'crm-01', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', metadata: { alias: 'NullPointer', category: 'Cybercrime' } }
  },
  {
    id: 'node-crm-02',
    type: 'personNode',
    position: { x: 100, y: 320 },
    data: { label: 'Mateo Silva', type: 'person', riskScore: 98, riskLevel: 'CRITICAL', entityId: 'crm-02', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150', metadata: { alias: 'El Serpiente', category: 'Drug Trafficking' } }
  },
  {
    id: 'node-crm-03',
    type: 'personNode',
    position: { x: 420, y: 400 },
    data: { label: 'Helena Vance', type: 'person', riskScore: 91, riskLevel: 'CRITICAL', entityId: 'crm-03', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', metadata: { alias: 'The Architect', category: 'Money Laundering' } }
  },
  {
    id: 'node-crm-07',
    type: 'personNode',
    position: { x: 720, y: 160 },
    data: { label: 'Tariq Mansoor', type: 'person', riskScore: 88, riskLevel: 'HIGH', entityId: 'crm-07', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', metadata: { alias: 'The Broker', category: 'Money Laundering' } }
  },
  {
    id: 'node-bank-01',
    type: 'bankNode',
    position: { x: 540, y: 20 },
    data: { label: 'Spectre BTC Cluster', type: 'bank', riskScore: 98, riskLevel: 'CRITICAL', entityId: 'fin-02', metadata: { balance: '$18.4M USD', bank: 'Bitcoin Cluster' } }
  },
  {
    id: 'node-ph-01',
    type: 'phoneNode',
    position: { x: 220, y: 220 },
    data: { label: '+40 721 899 432', type: 'phone', riskScore: 90, riskLevel: 'HIGH', entityId: 'ph-01', metadata: { carrier: 'Orange RO Encrypted', status: 'TAPPED' } }
  },
  {
    id: 'node-loc-01',
    type: 'locationNode',
    position: { x: 260, y: 520 },
    data: { label: 'Port of Rotterdam Pier 42', type: 'location', riskScore: 98, riskLevel: 'CRITICAL', entityId: 'loc-01', metadata: { city: 'Rotterdam, Netherlands', cctv: 'ACTIVE' } }
  }
];

const DUMMY_GRAPH_EDGES = [
  { id: 'e-1', source: 'node-crm-01', target: 'node-crm-07', label: 'Crypto Wash ($18.4M)', animated: true, data: { relationshipType: 'Money Transfer' } },
  { id: 'e-2', source: 'node-crm-01', target: 'node-crm-03', label: 'Server Leasing', animated: true, data: { relationshipType: 'Associate' } },
  { id: 'e-3', source: 'node-crm-02', target: 'node-crm-03', label: 'Rotterdam Freight', animated: true, data: { relationshipType: 'Associate' } },
  { id: 'e-4', source: 'node-crm-01', target: 'node-bank-01', label: 'Controls Master Key', animated: true, data: { relationshipType: 'Owns' } },
  { id: 'e-5', source: 'node-crm-01', target: 'node-ph-01', label: 'Primary Encrypted Node', data: { relationshipType: 'Owns' } },
  { id: 'e-6', source: 'node-crm-03', target: 'node-loc-01', label: 'Customs Clearances', animated: true, data: { relationshipType: 'Operates In' } },
];

/* =========================================================================
   3. UTILITY FUNCTIONS & STYLES
   ========================================================================= */

const formatCurrency = (amt: number) => `$${(amt / 1000000).toFixed(1)}M USD`;

const getRiskColor = (level: RiskLevel) => {
  switch (level) {
    case 'CRITICAL':
      return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50', badge: 'bg-red-950/80 text-red-400 border-red-500/50' };
    case 'HIGH':
      return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/50', badge: 'bg-amber-950/80 text-amber-400 border-amber-500/50' };
    case 'MEDIUM':
      return { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/50', badge: 'bg-yellow-950/80 text-yellow-400 border-yellow-500/50' };
    default:
      return { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/50', badge: 'bg-cyan-950/80 text-cyan-400 border-cyan-500/50' };
  }
};

/* =========================================================================
   4. REACT FLOW CUSTOM NODES
   ========================================================================= */

const CustomHandles = () => (
  <>
    <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !bg-cyan-400 !border-slate-950" />
    <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-purple-400 !border-slate-950" />
  </>
);

const PersonGraphNode = memo(({ data, selected }: NodeProps<any>) => (
  <div className={`min-w-[170px] p-3 rounded-xl bg-slate-900/95 border backdrop-blur-md shadow-lg ${selected ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-105' : 'border-slate-700 hover:border-slate-500'}`}>
    <CustomHandles />
    <div className="flex items-center gap-2.5">
      <img src={data.avatarUrl} alt={data.label} className="w-10 h-10 rounded-full object-cover border border-slate-600" />
      <div className="min-w-0 flex-1">
        <div className="text-xs font-bold text-slate-100 truncate">{data.label}</div>
        <div className="text-[10px] text-cyan-400 font-mono">{data.metadata?.alias}</div>
        <div className="text-[9px] text-slate-400 font-mono">{data.metadata?.category}</div>
      </div>
    </div>
  </div>
));

const BankGraphNode = memo(({ data, selected }: NodeProps<any>) => (
  <div className={`min-w-[150px] p-2.5 rounded-lg bg-blue-950/90 border ${selected ? 'border-blue-400 ring-2 ring-blue-400/50 scale-105' : 'border-blue-500/40'}`}>
    <CustomHandles />
    <div className="flex items-center gap-2">
      <Landmark className="w-4 h-4 text-blue-400" />
      <div>
        <div className="text-xs font-semibold text-blue-200 truncate">{data.label}</div>
        <div className="text-[10px] text-blue-400 font-mono font-bold">{data.metadata?.balance}</div>
      </div>
    </div>
  </div>
));

const PhoneGraphNode = memo(({ data, selected }: NodeProps<any>) => (
  <div className={`min-w-[150px] p-2.5 rounded-lg bg-emerald-950/90 border ${selected ? 'border-emerald-400 ring-2 ring-emerald-400/50 scale-105' : 'border-emerald-500/40'}`}>
    <CustomHandles />
    <div className="flex items-center gap-2">
      <Phone className="w-4 h-4 text-emerald-400" />
      <div>
        <div className="text-xs font-mono font-semibold text-emerald-200 truncate">{data.label}</div>
        <div className="text-[9px] text-emerald-400/80 font-mono">{data.metadata?.status}</div>
      </div>
    </div>
  </div>
));

const LocationGraphNode = memo(({ data, selected }: NodeProps<any>) => (
  <div className={`min-w-[160px] p-2.5 rounded-lg bg-amber-950/90 border ${selected ? 'border-amber-400 ring-2 ring-amber-400/50 scale-105' : 'border-amber-500/40'}`}>
    <CustomHandles />
    <div className="flex items-center gap-2">
      <MapPin className="w-4 h-4 text-amber-400" />
      <div>
        <div className="text-xs font-semibold text-amber-200 truncate">{data.label}</div>
        <div className="text-[9px] text-amber-400/80 font-mono">{data.metadata?.city}</div>
      </div>
    </div>
  </div>
));

const graphNodeTypes = {
  personNode: PersonGraphNode,
  bankNode: BankGraphNode,
  phoneNode: PhoneGraphNode,
  locationNode: LocationGraphNode,
};

/* =========================================================================
   5. MASTER SINGLE-FILE APP COMPONENT
   ========================================================================= */

export const StandaloneCriminalNetworkSystem: React.FC = () => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'criminals' | 'network' | 'feed' | 'alerts' | 'reports' | 'timeline' | 'settings'>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loginEmail, setLoginEmail] = useState('agent.vance@interpol.gov');
  const [loginPassword, setLoginPassword] = useState('Delta-Strike-7701');

  // Selected Dossier Drawer State
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);
  const [previewReport, setPreviewReport] = useState<InvestigationReport | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');

  // Clock (Indian Standard Time)
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const opts: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat('en-IN', opts).format(now) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Global Search results
  const searchResults = useMemo(() => {
    if (!globalSearchQuery.trim()) return [];
    const q = globalSearchQuery.toLowerCase();
    return DUMMY_CRIMINALS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.alias.toLowerCase().includes(q) || c.crimeCategory.toLowerCase().includes(q)
    );
  }, [globalSearchQuery]);

  // LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4 relative cyber-grid">
        <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 p-8 rounded-2xl shadow-2xl glass-panel space-y-6">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-white/95 p-1.5 flex items-center justify-center shadow-lg border border-slate-700">
              <img src={nanoSnifferLogo} alt="NanoSniffer Logo" className="w-16 h-16 object-contain" />
            </div>
            <h1 className="text-xl font-bold text-slate-100 uppercase tracking-wider">
              Nano<span className="text-cyan-400">Sniffer</span> Command
            </h1>
            <p className="text-xs font-mono text-slate-400">Criminal Network & Threat Intelligence Grid</p>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-slate-300 block mb-1">INTERPOL OFFICER EMAIL</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-slate-300 block mb-1">PASSKEY TOKEN</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition shadow-lg"
            >
              INITIALIZE COMMAND SESSION
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex font-sans ${isDarkMode ? 'dark' : ''}`}>
      {/* SIDEBAR */}
      <aside className={`fixed top-0 left-0 bottom-0 z-40 bg-slate-950/95 border-r border-slate-800 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} flex flex-col`}>
        {/* Brand */}
        <div className="h-16 px-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-slate-950" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <div className="text-sm font-bold text-slate-100 flex items-center gap-1">A.E.G.I.S. <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-500/20 text-cyan-400 font-mono">INTEL</span></div>
                <div className="text-[10px] text-slate-400 font-mono">CRIMINAL NETWORKS</div>
              </div>
            )}
          </div>
          <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="text-slate-400 hover:text-slate-200">
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {[
            { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
            { id: 'criminals', label: 'Criminal Profiles', icon: Users, badge: '20' },
            { id: 'network', label: 'Network Analysis', icon: Share2, highlight: true },
            { id: 'feed', label: 'Intelligence Feed', icon: Radio, pulse: true },
            { id: 'alerts', label: 'AI Risk Detection', icon: ShieldAlert, badge: '30', badgeColor: 'bg-red-500' },
            { id: 'reports', label: 'Investigation Reports', icon: FileText },
            { id: 'timeline', label: 'Evidence Timeline', icon: Clock, badge: '100' },
            { id: 'settings', label: 'System Settings', icon: SettingsIcon },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${item.highlight ? 'text-cyan-400' : ''}`} />
                {!sidebarCollapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
                {!sidebarCollapsed && item.badge && (
                  <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono text-white ${item.badgeColor || 'bg-slate-800'}`}>{item.badge}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* User Footer */}
        <div className="p-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-8 h-8 rounded-full object-cover border border-cyan-400 shrink-0" alt="Avatar" />
            {!sidebarCollapsed && (
              <div className="truncate">
                <div className="text-xs font-semibold text-slate-200 truncate">Agent Marcus Vance</div>
                <div className="text-[10px] text-cyan-400 font-mono truncate">AGY-7701 • TOP SECRET</div>
              </div>
            )}
          </div>
          {!sidebarCollapsed && (
            <button onClick={() => setIsAuthenticated(false)} title="Logout" className="text-slate-400 hover:text-red-400 p-1">
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarCollapsed ? 'pl-20' : 'pl-64'}`}>
        {/* TOP NAVBAR */}
        <header className="h-16 sticky top-0 z-30 bg-slate-950/85 border-b border-slate-800 backdrop-blur-md px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-md">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-400 hover:text-slate-200 text-xs transition"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <span>Search suspects, phones, accounts (Cmd + K)...</span>
              </div>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-950 border border-slate-700 rounded text-slate-400">⌘K</kbd>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-200">
              <span className="text-xs">🇮🇳</span>
              <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span className="font-bold text-slate-100">{currentTime}</span>
            </div>
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>NEURAL ACTIVE</span>
            </div>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900">
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-cyan-400" />}
            </button>
          </div>
        </header>

        {/* PAGE CONTENT ROUTER */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
          {/* 1. COMMAND CENTER DASHBOARD */}
          {currentPage === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">TACTICAL COMMAND CENTER</span>
                  <h1 className="text-2xl font-extrabold text-slate-100">Intelligence Overview</h1>
                </div>
                <button onClick={() => setCurrentPage('network')} className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                  <Zap className="w-3.5 h-3.5" /> Open Relationship Graph
                </button>
              </div>

              {/* 6 Top Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 font-mono">
                {[
                  { label: 'TOTAL SUSPECTS', val: '20', trend: '+8%', color: 'text-cyan-400', icon: Users },
                  { label: 'INVESTIGATIONS', val: '8', trend: '+12%', color: 'text-purple-400', icon: Activity },
                  { label: 'HIGH RISK TARGETS', val: '7', trend: 'DEFCON 2', color: 'text-red-400', icon: ShieldAlert },
                  { label: 'SURVEILLANCE SITES', val: '15', trend: 'ACTIVE', color: 'text-amber-400', icon: MapPin },
                  { label: 'AI RISK SCORE', val: '94/100', trend: 'CRITICAL', color: 'text-red-400', icon: Cpu },
                  { label: 'RECENT AI ALERTS', val: '30', trend: '+18%', color: 'text-emerald-400', icon: Bell },
                ].map((s, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 glass-panel space-y-1">
                    <span className="text-[10px] text-slate-400 block">{s.label}</span>
                    <div className={`text-xl font-extrabold ${s.color}`}>{s.val}</div>
                    <span className="text-[10px] text-slate-500 block">{s.trend}</span>
                  </div>
                ))}
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 p-5 rounded-xl bg-slate-900/90 border border-slate-800 glass-panel space-y-3">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400" /> Monthly Incident Rate & Resolution Telemetry
                  </h3>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={DUMMY_CHART_MONTHLY}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                        <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#06b6d4', color: '#fff', fontSize: '11px' }} />
                        <Area type="monotone" dataKey="total" name="Total Incidents" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} />
                        <Area type="monotone" dataKey="resolved" name="Resolved / Interdicted" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-4 p-5 rounded-xl bg-slate-900/90 border border-slate-800 glass-panel space-y-3">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-purple-400" /> Threat Category Split
                  </h3>
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={DUMMY_CHART_CATEGORIES} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value">
                          {DUMMY_CHART_CATEGORIES.map((e, i) => <Cell key={i} fill={e.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#020617', borderColor: '#8b5cf6', color: '#fff', fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. CRIMINAL PROFILES */}
          {currentPage === 'criminals' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">INTERPOL DOSSIERS</span>
                  <h1 className="text-2xl font-extrabold text-slate-100">Criminal Profiles Database</h1>
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900/90 glass-panel overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3 px-4">ID</th>
                      <th className="py-3 px-4">Suspect & Alias</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Risk Score</th>
                      <th className="py-3 px-4">Location</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {DUMMY_CRIMINALS.map((c) => (
                      <tr key={c.id} onClick={() => setSelectedCriminal(c)} className="hover:bg-slate-800/40 cursor-pointer transition">
                        <td className="py-3 px-4 font-mono font-bold text-cyan-400">{c.criminalId}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={c.photoUrl} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                            <div>
                              <div className="font-semibold text-slate-100">{c.name}</div>
                              <div className="text-[11px] font-mono text-slate-400 italic">"{c.alias}"</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-300">{c.crimeCategory}</td>
                        <td className="py-3 px-4 font-mono font-bold text-red-400">{c.riskScore}/100</td>
                        <td className="py-3 px-4 font-mono text-slate-300">{c.lastKnownLocation.city}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-950 text-red-400 border border-red-500/40">{c.status}</span>
                        </td>
                        <td className="py-3 px-4 text-right text-cyan-400">View Dossier →</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. NETWORK ANALYSIS (REACT FLOW) */}
          {currentPage === 'network' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">RELATIONSHIP TOPOLOGY</span>
                  <h1 className="text-2xl font-extrabold text-slate-100">Interactive Entity Graph</h1>
                </div>
              </div>

              <div className="w-full h-[650px] rounded-2xl border border-slate-800 bg-slate-950 relative overflow-hidden shadow-2xl">
                <ReactFlowProvider>
                  <ReactFlow
                    nodes={DUMMY_GRAPH_NODES as any}
                    edges={DUMMY_GRAPH_EDGES as any}
                    nodeTypes={graphNodeTypes}
                    fitView
                  >
                    <Background color="#1e293b" gap={20} />
                    <Controls className="!bg-slate-900 !border-slate-700" />
                    <MiniMap maskColor="rgba(2,6,23,0.8)" className="!bg-slate-950 !border-slate-800" />
                  </ReactFlow>
                </ReactFlowProvider>
              </div>
            </div>
          )}

          {/* 4. AI RISK ALERTS */}
          {currentPage === 'alerts' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-red-400 font-semibold uppercase">REALTIME THREAT ENGINE</span>
                  <h1 className="text-2xl font-extrabold text-slate-100">AI Risk Detection Alerts</h1>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {DUMMY_ALERTS.map((alert) => (
                  <div key={alert.id} className="p-5 rounded-xl bg-slate-900/90 border border-red-500/40 glass-panel space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">{alert.alertCode}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40 font-bold">{alert.alertLevel}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">{alert.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{alert.description}</p>
                    <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-1.5 text-amber-400"><MapPin className="w-3.5 h-3.5" /> {alert.location.name}</div>
                      <div className="mt-1 text-cyan-400">AI Confidence: {alert.aiConfidence}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. INTELLIGENCE FEED */}
          {currentPage === 'feed' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">LIVE STREAM TICKER</span>
                <h1 className="text-2xl font-extrabold text-slate-100">Intelligence Intercept Stream</h1>
              </div>
              <div className="space-y-4">
                {DUMMY_FEED.map((feed) => (
                  <div key={feed.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 glass-panel space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-400 font-bold">{feed.source}</span>
                      <span className="text-slate-500">{feed.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{feed.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{feed.summary}</p>
                    {feed.interceptSnippet && (
                      <div className="p-2 rounded bg-slate-950 font-mono text-xs text-cyan-300 border border-slate-800">{feed.interceptSnippet}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. INVESTIGATION REPORTS */}
          {currentPage === 'reports' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">EXECUTIVE BRIEFS</span>
                <h1 className="text-2xl font-extrabold text-slate-100">Investigation Reports</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {DUMMY_REPORTS.map((rep) => (
                  <div key={rep.id} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 glass-panel space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-400">{rep.reportNumber}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40">{rep.classificationLevel}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-100">{rep.title}</h3>
                    <p className="text-xs text-slate-400">{rep.summary}</p>
                    <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
                      <button onClick={() => setPreviewReport(rep)} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200">Preview</button>
                      <button onClick={() => window.print()} className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono">Print PDF</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. EVIDENCE TIMELINE */}
          {currentPage === 'timeline' && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">CHRONOLOGY</span>
                <h1 className="text-2xl font-extrabold text-slate-100">Evidence Timeline</h1>
              </div>
              <div className="border-l-2 border-slate-800 pl-6 space-y-6 ml-4">
                {DUMMY_TIMELINE.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 glass-panel space-y-1.5 relative">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-cyan-400 font-bold">{t.eventType}</span>
                      <span className="text-slate-400">{t.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-100">{t.title}</h4>
                    <p className="text-xs text-slate-300">{t.description}</p>
                    <div className="text-[11px] font-mono text-amber-300">{t.location}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. SETTINGS */}
          {currentPage === 'settings' && (
            <div className="space-y-4 max-w-xl animate-in fade-in">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase">CONFIGURATION</span>
                <h1 className="text-2xl font-extrabold text-slate-100">System Settings</h1>
              </div>
              <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 glass-panel space-y-4 text-xs font-mono">
                <div>
                  <label className="text-slate-300 block mb-1">AI Risk Sensitivity Threshold: 85%</label>
                  <input type="range" min="50" max="99" defaultValue="85" className="w-full accent-cyan-400" />
                </div>
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span>FastAPI Endpoint: http://localhost:8000/api</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/40">Fallback Ready</span>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CRIMINAL PROFILE DRAWER */}
      {selectedCriminal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-lg bg-slate-950 border-l border-slate-800 p-6 overflow-y-auto space-y-5 animate-in slide-in-from-right duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={selectedCriminal.photoUrl} alt={selectedCriminal.name} className="w-14 h-14 rounded-xl object-cover border-2 border-cyan-400" />
                <div>
                  <div className="text-xs font-mono text-cyan-400">{selectedCriminal.criminalId}</div>
                  <h3 className="text-lg font-bold text-slate-100">{selectedCriminal.name}</h3>
                  <div className="text-xs font-mono text-slate-400 italic">"{selectedCriminal.alias}"</div>
                </div>
              </div>
              <button onClick={() => setSelectedCriminal(null)} className="text-slate-400 hover:text-slate-200"><X className="w-5 h-5" /></button>
            </div>

            <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-500/40 text-xs space-y-1">
              <div className="text-red-400 font-bold font-mono">AI Threat Assessment ({selectedCriminal.riskScore}/100)</div>
              <p className="text-slate-300">{selectedCriminal.aiThreatSummary}</p>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <span className="text-slate-400 block uppercase">Personal Details</span>
              <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-slate-900 border border-slate-800">
                <div>DOB: {selectedCriminal.personalDetails.dob}</div>
                <div>Nationality: {selectedCriminal.nationality}</div>
                <div>Height: {selectedCriminal.personalDetails.heightCm} cm</div>
                <div>Blood: {selectedCriminal.personalDetails.bloodGroup}</div>
              </div>
            </div>

            <button onClick={() => window.print()} className="w-full py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition">
              Print Dossier
            </button>
          </div>
        </div>
      )}

      {/* REPORT PREVIEW MODAL */}
      {previewReport && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400">{previewReport.reportNumber}</span>
                <h3 className="text-lg font-bold text-slate-100">{previewReport.title}</h3>
              </div>
              <button onClick={() => setPreviewReport(null)} className="text-slate-400 hover:text-slate-200"><X className="w-5 h-5" /></button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{previewReport.summary}</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => window.print()} className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold">Print PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL SEARCH MODAL */}
      {searchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center pt-20 p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-cyan-500/50 rounded-2xl p-4 space-y-3 glass-panel">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Search className="w-4 h-4 text-cyan-400" />
              <input
                autoFocus
                placeholder="Search suspects across intelligence databases..."
                value={globalSearchQuery}
                onChange={(e) => setGlobalSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-100 focus:outline-none"
              />
              <button onClick={() => setSearchModalOpen(false)} className="text-slate-400 hover:text-slate-200"><X className="w-4 h-4" /></button>
            </div>
            <div className="max-h-60 overflow-y-auto space-y-1">
              {searchResults.map((c) => (
                <div
                  key={c.id}
                  onClick={() => { setSelectedCriminal(c); setSearchModalOpen(false); }}
                  className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 cursor-pointer flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-slate-200">{c.name} ({c.alias})</span>
                  <span className="text-cyan-400 font-mono">{c.crimeCategory}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StandaloneCriminalNetworkSystem;
