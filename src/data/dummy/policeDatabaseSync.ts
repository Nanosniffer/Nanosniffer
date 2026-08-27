import { Criminal } from '../../types';

export interface PoliceGatewayInfo {
  id: string;
  name: string;
  shortCode: string;
  agency: string;
  jurisdiction: string;
  endpointUrl: string;
  securityProtocol: string;
  status: 'ONLINE' | 'STANDBY' | 'DEGRADED';
  latencyMs: number;
  availableRecords: number;
  description: string;
  badgeColor: string;
}

export const POLICE_GATEWAYS: PoliceGatewayInfo[] = [
  {
    id: 'CCTNS_NCRB',
    name: 'CCTNS National Crime Grid',
    shortCode: 'CCTNS // NCRB',
    agency: 'National Crime Records Bureau (MHA)',
    jurisdiction: 'Pan-India Police Network (16,000+ Police Stations)',
    endpointUrl: 'https://gateway.cctns.gov.in/v3/classified/fed-sync',
    securityProtocol: 'TLS 1.3 / AES-256-GCM / NIC Govt VPN',
    status: 'ONLINE',
    latencyMs: 38,
    availableRecords: 4892014,
    description: 'Central FIR, Chargesheet, and Non-Bailable Warrant (NBW) repository across all Indian States & UTs.',
    badgeColor: 'emerald',
  },
  {
    id: 'ICJS_CENTRAL',
    name: 'ICJS Federated Justice Grid',
    shortCode: 'ICJS // Central',
    agency: 'Ministry of Home Affairs & e-Courts',
    jurisdiction: 'Police, Courts, Prisons, Forensic Labs & Prosecution',
    endpointUrl: 'https://icjs.nic.in/api/v2/secure-exchange',
    securityProtocol: 'SHA-384 PKI Digital Certificate',
    status: 'ONLINE',
    latencyMs: 44,
    availableRecords: 7210940,
    description: 'Inter-operable Criminal Justice System linking state police stations directly to High Courts and Central Prisons.',
    badgeColor: 'blue',
  },
  {
    id: 'NATGRID_NODE',
    name: 'NATGRID Intelligence Relay',
    shortCode: 'NATGRID // MHA',
    agency: 'National Intelligence Grid',
    jurisdiction: 'Counter-Terrorism & High-Risk National Security Syndicates',
    endpointUrl: 'https://relay.natgrid.gov.in/intel/node-09',
    securityProtocol: 'Air-Gapped Sovereign VPN / DEFCON 2 Auth',
    status: 'ONLINE',
    latencyMs: 29,
    availableRecords: 194820,
    description: 'Federated big-data intelligence grid connecting 21 central agencies (IB, RAW, ED, DRI, CBI, FIU-IND).',
    badgeColor: 'purple',
  },
  {
    id: 'SCRB_STATE',
    name: 'SCRB State Police Crime Bureaus',
    shortCode: 'SCRB // State CID',
    agency: 'State Police CIDs (Maharashtra, Delhi, Gujarat, Punjab)',
    jurisdiction: 'State Crime Investigation Departments',
    endpointUrl: 'https://scrb.mahapolice.gov.in/api/v1/dossiers',
    securityProtocol: 'TLS 1.3 / State Secured Leased Line',
    status: 'ONLINE',
    latencyMs: 52,
    availableRecords: 1240500,
    description: 'Direct live synchronization with state Crime Branch dossiers, gangster history-sheets, and local informant tips.',
    badgeColor: 'amber',
  },
  {
    id: 'INTERPOL_NCB',
    name: 'Interpol I-24/7 Gateway',
    shortCode: 'INTERPOL // CBI NCB',
    agency: 'Central Bureau of Investigation (CBI New Delhi)',
    jurisdiction: 'Transnational & Extradition Fugitives',
    endpointUrl: 'https://interpol.cbi.gov.in/i247/red-notices',
    securityProtocol: 'Interpol IPsec Encrypted Global Pipe',
    status: 'ONLINE',
    latencyMs: 82,
    availableRecords: 38400,
    description: 'Global Red Notices, Blue Notices, and extradition warrants for fugitives operating from Dubai, Canada, Europe.',
    badgeColor: 'red',
  },
  {
    id: 'NAFIS_BIOMETRICS',
    name: 'NAFIS Fingerprint & Biometric Grid',
    shortCode: 'NAFIS // NCRB',
    agency: 'National Automated Fingerprint Identification System',
    jurisdiction: 'Pan-India Biometric Database',
    endpointUrl: 'https://nafis.ncrb.gov.in/api/v4/match-server',
    securityProtocol: 'NIST Biometric WSQ Standard / AES-256',
    status: 'ONLINE',
    latencyMs: 65,
    availableRecords: 10420000,
    description: 'Automated 10-digit fingerprint matching and facial recognition correlation across all arrested offenders.',
    badgeColor: 'cyan',
  },
  {
    id: 'VAHAN_REGISTRY',
    name: 'VAHAN & Fastag Toll Telemetry',
    shortCode: 'VAHAN // MoRTH',
    agency: 'Ministry of Road Transport & Highways',
    jurisdiction: 'National Vehicle & Driving License Registry',
    endpointUrl: 'https://vahan.parivahan.gov.in/api/v2/fleet-track',
    securityProtocol: 'Govt API Gateway / JWT Bearer',
    status: 'ONLINE',
    latencyMs: 41,
    availableRecords: 340000000,
    description: 'Real-time vehicle registration lookup, ownership chains, and National Highway Fastag toll booth pass logs.',
    badgeColor: 'slate',
  }
];

export const POLICE_DATABASE_RECORDS: Criminal[] = [
  {
    id: 'crm-25',
    criminalId: 'CR-9025',
    name: 'Goldy Brar',
    alias: 'Doctor, Satinderjit Singh',
    photoUrl: './images/criminals/goldy_brar.jpg',
    age: 31,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Brampton / Fresno Safe Zone (Transnational Route)',
      city: 'Fresno',
      state: 'California / Ontario',
      country: 'Canada / USA',
      coordinates: [36.7468, -119.7726],
    },
    lastActivity: '2026-08-27T08:15:00+05:30',
    knownAssociatesCount: 28,
    activeWarrants: 9,
    biography: 'Transnational organized crime operative running the offshore operational wing of the Lawrence Bishnoi cartel. Masterminded multiple high-profile contract killings and extortion networks across Punjab, Delhi, and Rajasthan using encrypted VoIP numbers and local recruited shooters.',
    aiThreatSummary: 'AI Threat Analysis: Subject coordinates cross-border extortion via VoIP spoofed nodes. High probability of weapon dispatch through drone deliveries along the Punjab-Pakistan border. Active Interpol Red Corner Notice issued by CBI New Delhi.',
    personalDetails: {
      dob: '1994-04-11',
      bloodGroup: 'B+',
      fingerprintId: 'NAFIS-PB-2022-99014',
      heightCm: 178,
      distinguishingMarks: ['Scar on left temple', 'Tattoo on right forearm'],
    },
    knownAssociates: [
      {
        id: 'assoc-25-1',
        name: 'Lawrence Bishnoi',
        alias: 'The Don of Tihar',
        role: 'Cartel Commander & Ideological Leader',
        relationship: 'Co-Offender / Gang Boss',
        riskScore: 98,
      },
      {
        id: 'assoc-25-2',
        name: 'Anmol Bishnoi',
        alias: 'Bhanu',
        role: 'Logistics & Safe Haven Overseer',
        relationship: 'Lieutenant',
        riskScore: 92,
      },
      {
        id: 'assoc-25-3',
        name: 'Rohit Godara',
        alias: 'Godara',
        role: 'Rajasthan & Dubai Extortion Operator',
        relationship: 'Shooter Coordinator',
        riskScore: 89,
      }
    ],
    vehicles: [
      {
        id: 'veh-25-1',
        licensePlate: 'PB-10-CZ-9911',
        make: 'Mahindra',
        model: 'Scorpio-N Armored',
        year: 2023,
        color: 'Midnight Black',
        registeredOwner: 'Front Logistics Punjab Ltd',
        status: 'IMPOUNDED',
        lastSeenLocation: 'Mansa Police Station Yard',
        lastSeenTime: '2026-08-20T14:30:00+05:30',
      }
    ],
    phoneNumbers: [
      {
        id: 'ph-25-1',
        phoneNumber: '+1 (416) 555-0194',
        carrier: 'Rogers Virtual SIM (VoIP)',
        imei: '864920048192001',
        ownerName: 'Satinderjit Singh (Spoofed)',
        status: 'TAPPED',
        totalCallsLogged: 412,
        lastActive: '2026-08-26T23:10:00+05:30',
        frequentContacts: [
          { phoneNumber: '+91 98110 99014', contactName: 'Lawrence Inner Circle', callCount: 88 },
          { phoneNumber: '+971 50 119 4820', contactName: 'Dubai Hawala Node', callCount: 34 },
        ]
      }
    ],
    financialAccounts: [
      {
        id: 'fin-25-1',
        accountNumber: 'CA-RBC-90412099',
        bankName: 'Royal Bank of Canada',
        accountType: 'CHECKING',
        balance: 485000,
        currency: 'CAD',
        holderName: 'Front Logistics International Corp',
        flaggedTransactionsCount: 14,
        status: 'MONITORED',
      }
    ],
    timeline: [
      {
        id: 'tl-25-1',
        timestamp: '2022-06-02T10:00:00+05:30',
        eventType: 'Arrest',
        title: 'Interpol Red Corner Notice Issued',
        description: 'CBI NCB New Delhi transmitted Red Corner Notice #A-11029/6-2022 to all member nations.',
        location: 'New Delhi / Lyon',
        confidenceScore: 98,
        severity: 'CRITICAL',
        isVerified: true,
      },
      {
        id: 'tl-25-2',
        timestamp: '2026-08-15T18:30:00+05:30',
        eventType: 'Phone Calls',
        title: 'Intercepted Extortion Threat Audio',
        description: 'Delhi Police Special Cell intercepted virtual conference call originating from Canada server.',
        location: 'Delhi Special Cell HQ',
        confidenceScore: 94,
        severity: 'HIGH',
        isVerified: true,
      }
    ],
    connectedOrganizations: [
      {
        id: 'org-25-1',
        name: 'Lawrence Bishnoi Syndicate',
        role: 'Chief Overseas Operational Commander',
        threatLevel: 'CRITICAL',
      }
    ],
    tags: ['CCTNS Verified', 'Interpol Red Notice', 'Extortion Racket', 'VoIP Spoofing', 'Bishnoi Syndicate'],
  },
  {
    id: 'crm-26',
    criminalId: 'CR-9026',
    name: 'Vikas Dubey Syndicate Dossier',
    alias: 'Pandit Ji, Bikru Don',
    photoUrl: './images/criminals/vikas_dubey.jpg',
    age: 52,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 94,
    riskLevel: 'CRITICAL',
    status: 'INACTIVE',
    lastKnownLocation: {
      address: 'Bikru Village, Chaubepur Block',
      city: 'Kanpur',
      state: 'Uttar Pradesh',
      country: 'India',
      coordinates: [26.4499, 80.3319],
    },
    lastActivity: '2026-08-20T11:00:00+05:30',
    knownAssociatesCount: 34,
    activeWarrants: 62,
    biography: 'Notorious gangster of Kanpur dehat who ran an armed criminal syndicate controlling government contracts, sand mining, and local extortion. Infamous for the July 2020 ambush in Bikru village that resulted in the sacrifice of eight police officers.',
    aiThreatSummary: 'AI Historical Analysis: High-density rural syndicate network with extensive political patronage and weapon stockpiles. Topology reveals 14 local arms couriers and 6 shell bank accounts across Kanpur cooperative societies.',
    personalDetails: {
      dob: '1968-12-26',
      bloodGroup: 'O+',
      fingerprintId: 'NAFIS-UP-1992-00412',
      heightCm: 175,
      distinguishingMarks: ['Deep scar on right abdomen', 'Mole on collarbone'],
    },
    knownAssociates: [
      {
        id: 'assoc-26-1',
        name: 'Amar Dubey',
        alias: 'Right Hand',
        role: 'Personal Bodyguard & Weapons Keeper',
        relationship: 'Cousin / Enforcer',
        riskScore: 91,
      },
      {
        id: 'assoc-26-2',
        name: 'Prabhat Mishra',
        alias: 'Kartooz',
        role: 'Ammunition Logistics',
        relationship: 'Shooter',
        riskScore: 88,
      }
    ],
    vehicles: [
      {
        id: 'veh-26-1',
        licensePlate: 'UP-78-BK-0001',
        make: 'Toyota',
        model: 'Fortuner 4x4',
        year: 2019,
        color: 'Pearl White',
        registeredOwner: 'Bikru Infrastructure Developers',
        status: 'IMPOUNDED',
        lastSeenLocation: 'Kanpur Police Lines',
        lastSeenTime: '2026-08-10T12:00:00+05:30',
      }
    ],
    phoneNumbers: [
      {
        id: 'ph-26-1',
        phoneNumber: '+91 94150 88201',
        carrier: 'BSNL UP West',
        imei: '354890048192004',
        ownerName: 'Vikas Dubey (Deceased / Historical Dossier)',
        status: 'DISCONNECTED',
        totalCallsLogged: 1840,
        lastActive: '2026-08-15T09:00:00+05:30',
        frequentContacts: [
          { phoneNumber: '+91 98390 11994', contactName: 'Chaubepur Front Office', callCount: 140 }
        ]
      }
    ],
    financialAccounts: [
      {
        id: 'fin-26-1',
        accountNumber: 'UP-COOP-KAN-4091',
        bankName: 'Kanpur District Cooperative Bank',
        accountType: 'SAVINGS',
        balance: 14200000,
        currency: 'INR',
        holderName: 'Bikru Construction Co',
        flaggedTransactionsCount: 29,
        status: 'FROZEN',
      }
    ],
    timeline: [
      {
        id: 'tl-26-1',
        timestamp: '2020-07-03T01:30:00+05:30',
        eventType: 'FIR Filed',
        title: 'Bikru Ambush FIR Registered',
        description: 'FIR #192/2020 registered at Chaubepur Police Station under IPC 302, 307, and Criminal Law Amendment Act.',
        location: 'Chaubepur Police Station, Kanpur',
        confidenceScore: 99,
        severity: 'CRITICAL',
        isVerified: true,
      }
    ],
    connectedOrganizations: [
      {
        id: 'org-26-1',
        name: 'Vikas Dubey Bikru Syndicate',
        role: 'Founder & Supreme Boss',
        threatLevel: 'CRITICAL',
      }
    ],
    tags: ['CCTNS UP Record', 'Gangster Act', 'Contract Racket', 'Bikru Dossier', 'NAFIS Verified'],
  },
  {
    id: 'crm-27',
    criminalId: 'CR-9027',
    name: 'Ketan Parekh Syndicate',
    alias: 'KP, Pied Piper of Dalal Street',
    photoUrl: './images/criminals/ketan_parekh.jpg',
    age: 62,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Money Laundering',
    riskScore: 84,
    riskLevel: 'HIGH',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Nariman Point Financial Hub',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      coordinates: [18.9256, 72.8242],
    },
    lastActivity: '2026-08-27T09:40:00+05:30',
    knownAssociatesCount: 19,
    activeWarrants: 4,
    biography: 'Former chartered accountant and institutional stockbroker convicted in the ₹1,200 Crore 2001 Stock Market Rigging & Madhavpura Mercantile Cooperative Bank fraud. CBI Economic Offences Wing and Enforcement Directorate maintain active surveillance on suspected proxy front companies.',
    aiThreatSummary: 'AI Financial Flow Analysis: Subject operates through multi-tiered shell corporate structures in Mauritius, Cyprus, and GIFT City to bypass SEBI capital market debarments. High betweenness centrality in corporate shadow banking.',
    personalDetails: {
      dob: '1963-03-18',
      bloodGroup: 'A+',
      fingerprintId: 'CBI-EOW-MUM-0182',
      heightCm: 172,
    },
    knownAssociates: [
      {
        id: 'assoc-27-1',
        name: 'Ramesh Parekh',
        alias: 'Director',
        role: 'Shell Corporation Signatory',
        relationship: 'Brother / Front Entity',
        riskScore: 78,
      }
    ],
    vehicles: [
      {
        id: 'veh-27-1',
        licensePlate: 'MH-01-CP-0007',
        make: 'Mercedes-Benz',
        model: 'S-Class 450 Maybach',
        year: 2022,
        color: 'Cavansite Blue',
        registeredOwner: 'Vipul Securities Private Ltd',
        status: 'ACTIVE',
        lastSeenLocation: 'BKC Financial Center, Mumbai',
        lastSeenTime: '2026-08-26T16:15:00+05:30',
      }
    ],
    phoneNumbers: [
      {
        id: 'ph-27-1',
        phoneNumber: '+91 98200 44910',
        carrier: 'Vodafone Idea Postpaid (Encrypted)',
        imei: '864920088192009',
        ownerName: 'Vipul Tech Corporate Account',
        status: 'TAPPED',
        totalCallsLogged: 920,
        lastActive: '2026-08-27T08:30:00+05:30',
        frequentContacts: [
          { phoneNumber: '+230 542 9901', contactName: 'Mauritius FPI Nominee', callCount: 42 }
        ]
      }
    ],
    financialAccounts: [
      {
        id: 'fin-27-1',
        accountNumber: 'MAUR-SBM-9004128',
        bankName: 'State Bank of Mauritius (Offshore)',
        accountType: 'OFFSHORE',
        balance: 18400000,
        currency: 'USD',
        holderName: 'Panther FPI Holdings Mauritius',
        flaggedTransactionsCount: 18,
        status: 'MONITORED',
      }
    ],
    timeline: [
      {
        id: 'tl-27-1',
        timestamp: '2001-03-30T10:00:00+05:30',
        eventType: 'FIR Filed',
        title: 'CBI EOW Chargesheet Filed',
        description: 'Chargesheet filed in Madhavpura Mercantile Cooperative Bank ₹1,200 Cr siphoning scam.',
        location: 'CBI Special Court, Mumbai',
        confidenceScore: 96,
        severity: 'HIGH',
        isVerified: true,
      }
    ],
    connectedOrganizations: [
      {
        id: 'org-27-1',
        name: 'K-10 Stock Rigging Syndicate',
        role: 'Chief Financial Architect',
        threatLevel: 'HIGH',
      }
    ],
    tags: ['CBI EOW Record', 'SEBI Debarred', 'Dalal Street Scam', 'Circular Trading', 'Hawala FPI'],
  }
];

export const searchPoliceDatabaseRecords = (query: string): Criminal[] => {
  if (!query || query.trim().length === 0) return POLICE_DATABASE_RECORDS;
  const q = query.toLowerCase().trim();
  return POLICE_DATABASE_RECORDS.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.alias.toLowerCase().includes(q) ||
    c.criminalId.toLowerCase().includes(q) ||
    c.crimeCategory.toLowerCase().includes(q) ||
    c.lastKnownLocation.city.toLowerCase().includes(q) ||
    c.tags.some(t => t.toLowerCase().includes(q))
  );
};
