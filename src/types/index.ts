// Core Data Types for Criminal Network Analysis System

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

export type RelationshipType = 
  | 'Calls' 
  | 'Money Transfer' 
  | 'Meeting' 
  | 'Family' 
  | 'Associate' 
  | 'Travel'
  | 'Owns'
  | 'Operates In'
  | 'Supplies';

export interface Criminal {
  id: string;
  criminalId: string; // e.g., "CR-8942"
  name: string;
  alias: string;
  photoUrl: string;
  age: number;
  gender: string;
  nationality: string;
  crimeCategory: CrimeCategory;
  riskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  status: SuspectStatus;
  lastKnownLocation: {
    address: string;
    city: string;
    state?: string;
    country: string;
    coordinates: [number, number]; // [lat, lng]
  };
  lastActivity: string; // ISO date string
  knownAssociatesCount: number;
  activeWarrants: number;
  biography: string;
  aiThreatSummary: string;
  
  // Detailed associations for profile drawer
  personalDetails: {
    dob: string;
    bloodGroup?: string;
    fingerprintId?: string;
    eyeColor?: string;
    heightCm?: number;
    distinguishingMarks?: string[];
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
  vehicles: Vehicle[];
  phoneNumbers: PhoneRecord[];
  financialAccounts: FinancialAccount[];
  timeline: TimelineEvent[];
  connectedOrganizations: Array<{
    id: string;
    name: string;
    role: string;
    threatLevel: RiskLevel;
  }>;
  tags: string[];
}

export interface Vehicle {
  id: string;
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  color: string;
  registeredOwner: string;
  suspectId?: string;
  status: 'ACTIVE' | 'IMPOUNDED' | 'SIGHTED' | 'SEARCHED';
  lastSeenLocation: string;
  lastSeenTime: string;
}

export interface PhoneRecord {
  id: string;
  phoneNumber: string;
  carrier: string;
  imei: string;
  suspectId?: string;
  ownerName: string;
  status: 'ACTIVE' | 'TAPPED' | 'DISCONNECTED' | 'BURNER';
  totalCallsLogged: number;
  lastActive: string;
  frequentContacts: Array<{
    phoneNumber: string;
    contactName: string;
    callCount: number;
  }>;
}

export interface FinancialAccount {
  id: string;
  accountNumber: string;
  bankName: string;
  accountType: 'SAVINGS' | 'CHECKING' | 'OFFSHORE' | 'CRYPTO_WALLET' | 'SHELL_CORP';
  balance: number;
  currency: string;
  holderName: string;
  suspectId?: string;
  flaggedTransactionsCount: number;
  status: 'FROZEN' | 'MONITORED' | 'ACTIVE';
}

export interface FinancialTransaction {
  id: string;
  transactionId: string;
  sourceAccount: string;
  sourceName: string;
  destinationAccount: string;
  destinationName: string;
  amount: number;
  currency: string;
  timestamp: string;
  category: 'Wire' | 'Crypto' | 'Cash Deposit' | 'Hawala' | 'Shell Entity';
  isSuspicious: boolean;
  riskScore: number;
  notes?: string;
}

export interface Organization {
  id: string;
  name: string;
  codeName?: string;
  type: 'Cartel' | 'Syndicate' | 'Cyber Syndicate' | 'Smuggling Ring' | 'Front Company' | 'Extortion Gang';
  headquarters: string;
  coordinates: [number, number];
  estimatedMembers: number;
  threatLevel: RiskLevel;
  leaderName: string;
  leaderId: string;
  knownOperations: string[];
  illicitRevenueAnnualUSD: number;
}

export interface LocationEntity {
  id: string;
  name: string;
  type: 'Safehouse' | 'Crime Scene' | 'Warehouse' | 'Meeting Point' | 'Port / Terminal' | 'Surveillance Zone';
  address: string;
  city: string;
  coordinates: [number, number];
  riskLevel: RiskLevel;
  associatedSuspectsCount: number;
  surveillanceCameraInstalled: boolean;
  lastIncidentDate?: string;
}

export type TimelineEventType = 
  | 'Phone Calls'
  | 'ATM Withdrawal'
  | 'CCTV Sighting'
  | 'Vehicle Movement'
  | 'FIR Filed'
  | 'Arrest'
  | 'Meeting'
  | 'Wire Transfer'
  | 'Border Crossing'
  | 'Weapon Sighting';

export interface TimelineEvent {
  id: string;
  title: string;
  eventType: TimelineEventType;
  timestamp: string;
  criminalId?: string;
  criminalName?: string;
  location: string;
  coordinates?: [number, number];
  description: string;
  confidenceScore: number; // 0 - 100
  evidenceFiles?: Array<{
    fileName: string;
    fileType: 'image' | 'audio' | 'pdf' | 'video';
    fileUrl?: string;
  }>;
  severity: RiskLevel;
  isVerified: boolean;
}

export interface Alert {
  id: string;
  alertCode: string;
  title: string;
  alertLevel: RiskLevel;
  aiConfidence: number; // 0 - 100%
  description: string;
  relatedCriminals: Array<{
    id: string;
    name: string;
    alias: string;
    riskScore: number;
  }>;
  location: {
    name: string;
    city: string;
    coordinates: [number, number];
  };
  timestamp: string;
  category: 'Geofence Breach' | 'Financial Anomaly' | 'Encrypted Call Surge' | 'Weapon Sighting' | 'High-Risk Meeting' | 'Travel Pattern';
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
  suspectsInvolved: Array<{
    id: string;
    name: string;
    alias: string;
  }>;
  location?: string;
  coordinates?: [number, number];
  priority: RiskLevel;
  interceptSnippet?: string;
  isBookmarked?: boolean;
}

export interface Investigation {
  id: string;
  caseNumber: string;
  title: string;
  leadOfficer: string;
  leadOfficerBadge: string;
  status: 'ACTIVE' | 'UNDER_REVIEW' | 'CLOSED' | 'ESCALATED';
  priority: RiskLevel;
  startDate: string;
  targetSyndicate: string;
  totalSuspects: number;
  totalEvidenceItems: number;
  progressPercent: number;
  estimatedRiskScore: number;
}

export interface InvestigationReport {
  id: string;
  reportNumber: string;
  title: string;
  type: 'Network Summary' | 'Timeline Report' | 'Financial Analysis' | 'Communication Analysis' | 'Location Heatmap' | 'AI Recommendation';
  dateGenerated: string;
  author: string;
  targetEntity: string;
  summary: string;
  classificationLevel: 'TOP SECRET // INTEL' | 'SECRET' | 'CONFIDENTIAL' | 'RESTRICTED';
  keyFindings: string[];
  aiRiskScore: number;
  metrics: Record<string, string | number>;
  fileSizeBytes: number;
}

export interface NetworkNodeData {
  label: string;
  type: NodeType;
  subType?: string;
  riskScore?: number;
  riskLevel?: RiskLevel;
  entityId: string;
  avatarUrl?: string;
  status?: string;
  metadata: Record<string, any>;
  connectionsCount?: number;
  centralityScore?: number;
}

export interface NetworkEdgeData {
  relationshipType: RelationshipType;
  details: string;
  amount?: number;
  frequency?: number;
  riskLevel?: RiskLevel;
  lastInteraction?: string;
}

export interface NetworkGraphData {
  nodes: Array<{
    id: string;
    type: string;
    position: { x: number; y: number };
    data: NetworkNodeData;
    style?: Record<string, any>;
  }>;
  edges: Array<{
    id: string;
    source: string;
    target: string;
    label?: string;
    animated?: boolean;
    data?: NetworkEdgeData;
    style?: Record<string, any>;
  }>;
  metrics: {
    degreeCentralityTopNodes: Array<{ id: string; name: string; score: number }>;
    betweennessCentralityTopNodes: Array<{ id: string; name: string; score: number }>;
    communityClustersCount: number;
    highestInfluenceLeader: { id: string; name: string; score: number };
    totalConnections: number;
    averageConnectionsPerNode: number;
  };
}

export interface DashboardSummary {
  totalSuspects: number;
  suspectsTrend: number;
  activeInvestigations: number;
  investigationsTrend: number;
  highRiskIndividuals: number;
  highRiskTrend: number;
  locationsUnderSurveillance: number;
  locationsTrend: number;
  aiRiskScore: number;
  aiRiskTrend: number;
  recentAlertsCount: number;
  alertsTrend: number;
  
  crimesPerMonth: Array<{ month: string; total: number; resolved: number; drugTrafficking: number; cybercrime: number; extortion: number }>;
  crimeCategoryDistribution: Array<{ name: CrimeCategory; value: number; color: string }>;
  highRiskZones: Array<{ zone: string; threatLevel: number; activeSuspects: number; incidents: number }>;
  financialActivityTrend: Array<{ date: string; volumeUSD: number; flaggedVolumeUSD: number }>;
  communicationFrequency: Array<{ timeSlot: string; voiceCalls: number; encryptedMessages: number; interceptedRadio: number }>;
  
  recentInvestigations: Investigation[];
  recentActivityFeed: Array<{
    id: string;
    timestamp: string;
    message: string;
    type: 'alert' | 'update' | 'surveillance' | 'arrest';
    actor: string;
  }>;
}

export interface GenericEntity {
  id: string;
  name: string;
  type: NodeType;
  subType?: string;
  riskScore: number;
  location?: string;
  lastSeen?: string;
  identifiers: string[];
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  isFallback?: boolean;
}
