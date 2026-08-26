import { Criminal } from '../../types';

export const dummyCriminals: Criminal[] = [
  // =========================================================================
  // 1. TERRORISM & TERRORISM FINANCING (3 Subjects)
  // =========================================================================
  {
    id: 'crm-01',
    criminalId: 'CR-9001',
    name: 'Dawood Ibrahim Kaskar',
    alias: 'D-Company Chief / Bhai',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 69,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Terrorism Financing',
    riskScore: 99,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Clifton Area, Defense Housing Authority',
      city: 'Karachi / Mumbai',
      country: 'India',
      coordinates: [19.0176, 72.8150],
    },
    lastActivity: '2026-08-26T04:15:00Z',
    knownAssociatesCount: 28,
    activeWarrants: 14,
    biography: 'Designated global terrorist and supreme controller of the D-Company transnational syndicate. Masterminded the 1993 Bombay serial blasts resulting in 257 casualties. Controls multi-billion dollar narcotics conduits, arms trafficking, and hawala networks.',
    aiThreatSummary: 'AI Threat Index 99/100. High-frequency satellite VOIP intercepts indicate command directives routed through UAE financial shell nodes. Interception alert active on all maritime ports.',
    personalDetails: {
      dob: '1955-12-26',
      bloodGroup: 'O+',
      fingerprintId: 'FP-INTEL-D001',
      eyeColor: 'Dark Brown',
      heightCm: 173,
      distinguishingMarks: ['Prominent mustache mark', 'Surgical scar on right collarbone'],
    },
    knownAssociates: [
      { id: 'crm-02', name: 'Tiger Memon (Ibrahim Memon)', alias: 'Tiger', role: 'Operational Field Commander', relationship: '1993 Blasts Logistics', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-21', name: 'Chhota Shakeel', alias: 'Shakeel', role: 'Enforcer & Arms Chief', relationship: 'Syndicate Lieutenant', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-03', name: 'Yakub Abdul Razak Memon', alias: 'The Accountant', role: 'Chartered Accountant', relationship: 'Financial Custodian', riskScore: 95, avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-01', licensePlate: 'MH-01-BK-9999', make: 'Toyota', model: 'Land Cruiser V8 Armored', year: 2024, color: 'Obsidian Black', registeredOwner: 'D-Logistics Offshore Corp', status: 'ACTIVE', lastSeenLocation: 'South Mumbai Coastal Corridor', lastSeenTime: '2026-08-25 03:20' },
      { id: 'veh-02', licensePlate: 'MH-04-DX-7007', make: 'Mercedes-Benz', model: 'S680 Guard VR10', year: 2025, color: 'Midnight Blue', registeredOwner: 'Prime Real Estate Trust', status: 'SIGHTED', lastSeenLocation: 'Bandra West Promenade', lastSeenTime: '2026-08-24 22:15' }
    ],
    phoneNumbers: [
      { id: 'ph-01', phoneNumber: '+971 50 998 1100', carrier: 'Thuraya Satellite Encrypted', imei: '864920048192014', ownerName: 'Classified Proxy', status: 'TAPPED', totalCallsLogged: 840, lastActive: '2026-08-26 01:10', frequentContacts: [] },
      { id: 'ph-02', phoneNumber: '+91 98200 44919', carrier: 'Jio 5G eSIM (Encrypted Tunnel)', imei: '358920098716254', ownerName: 'Shell Identity', status: 'BURNER', totalCallsLogged: 412, lastActive: '2026-08-25 21:40', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-01', accountNumber: '0x99a81b2c4e6f8a9012cd', bankName: 'Tether USDT Cold Core', accountType: 'CRYPTO_WALLET', balance: 1450000000, currency: 'INR', holderName: 'D-Syndicate Treasury', flaggedTransactionsCount: 128, status: 'ACTIVE' },
      { id: 'fin-02', accountNumber: 'SWISS-UBP-990184', bankName: 'Union Bancaire Privee Geneva', accountType: 'OFFSHORE', balance: 3200000000, currency: 'INR', holderName: 'Al-Noor Trust Holding', flaggedTransactionsCount: 45, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-01', name: 'D-Company Global Syndicate', role: 'Supreme Chief', threatLevel: 'CRITICAL' },
      { id: 'org-02', name: 'Karachi-Dubai Maritime Hawala Ring', role: 'Beneficial Controller', threatLevel: 'CRITICAL' }
    ],
    tags: ['Terrorism', '1993 Blasts', 'Red Corner Alert', 'UN Sanctioned', 'D-Company', 'MCOCA']
  },
  {
    id: 'crm-02',
    criminalId: 'CR-9002',
    name: 'Ibrahim Mushtaq Memon',
    alias: 'Tiger Memon',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    age: 65,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Terrorism Financing',
    riskScore: 98,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Al-Hussaini Building, Mahim / Dubai',
      city: 'Mumbai',
      country: 'India',
      coordinates: [19.0350, 72.8400],
    },
    lastActivity: '2026-08-25T18:30:00Z',
    knownAssociatesCount: 22,
    activeWarrants: 9,
    biography: 'Prime coordinator and operational architect of the 1993 Mumbai serial bombings. Facilitated the landing of RDX and AK-56 consignments on the Raigad coast (Shekhadi port). Evaded capture and coordinates covert funding pipelines.',
    aiThreatSummary: 'Interpol Red Notice active. Neural cross-matching detected active wire transfers linked to real estate investments in Sharjah and Thane industrial sector.',
    personalDetails: {
      dob: '1960-11-24',
      bloodGroup: 'B+',
      fingerprintId: 'FP-INTEL-TM02',
      eyeColor: 'Black',
      heightCm: 175,
      distinguishingMarks: ['Scar on chin', 'Birthmark on neck'],
    },
    knownAssociates: [
      { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', alias: 'D-Company Chief', role: 'Supreme Commander', relationship: 'Conspiracy Co-Mastermind', riskScore: 99, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-03', name: 'Yakub Abdul Razak Memon', alias: 'The Accountant', role: 'Financial Manager', relationship: 'Brother', riskScore: 95, avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-03', licensePlate: 'MH-02-TM-1993', make: 'Toyota', model: 'Fortuner GR-S Bulletproof', year: 2023, color: 'Silver Metallic', registeredOwner: 'Mahim Freight Forwarders', status: 'ACTIVE', lastSeenLocation: 'Mahim Causeway Bridge', lastSeenTime: '2026-08-24 14:10' }
    ],
    phoneNumbers: [
      { id: 'ph-03', phoneNumber: '+971 55 771 9022', carrier: 'Du UAE Encrypted Line', imei: '869201948102948', ownerName: 'Dubai Logistics Agency', status: 'TAPPED', totalCallsLogged: 390, lastActive: '2026-08-25 18:20', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-03', accountNumber: 'HABIB-UAE-881920', bankName: 'Habib Bank AG Zurich Dubai', accountType: 'OFFSHORE', balance: 520000000, currency: 'INR', holderName: 'Al-Memon Holdings LLC', flaggedTransactionsCount: 64, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-01', name: 'D-Company Global Syndicate', role: 'Operations Chief', threatLevel: 'CRITICAL' }
    ],
    tags: ['Terrorism', '1993 Blasts', 'RDX Landing', 'Interpol Red Corner', 'Mahim Network']
  },
  {
    id: 'crm-03',
    criminalId: 'CR-9003',
    name: 'Yakub Abdul Razak Memon',
    alias: 'The Chartered Accountant',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    age: 53,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Terrorism Financing',
    riskScore: 95,
    riskLevel: 'CRITICAL',
    status: 'INACTIVE',
    lastKnownLocation: {
      address: 'Central Prison Ward',
      city: 'Nagpur / Mumbai',
      country: 'India',
      coordinates: [21.1458, 79.0882],
    },
    lastActivity: '2015-07-30T07:00:00Z',
    knownAssociatesCount: 15,
    activeWarrants: 0,
    biography: 'Chartered accountant who managed the financial architecture, bank accounts, international currency laundering, and air ticket distribution for terror operatives in the 1993 Mumbai attacks. Convicted by TADA court and executed in 2015.',
    aiThreatSummary: 'Historical Dossier: Forensic financial audit established ₹2.1 Crore offshore terror funding footprint across Karachi, Dubai, and Mumbai bank accounts.',
    personalDetails: {
      dob: '1962-07-30',
      bloodGroup: 'A+',
      fingerprintId: 'FP-INTEL-YM03',
      eyeColor: 'Brown',
      heightCm: 170,
      distinguishingMarks: ['Mole on left cheek'],
    },
    knownAssociates: [
      { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', alias: 'D-Company Chief', role: 'Syndicate Leader', relationship: 'Conspiracy Benefactor', riskScore: 99, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-02', name: 'Tiger Memon', alias: 'Tiger', role: 'Operations Leader', relationship: 'Brother', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [],
    phoneNumbers: [],
    financialAccounts: [
      { id: 'fin-04', accountNumber: 'ANZ-GRINDLAYS-9901', bankName: 'ANZ Grindlays Bank Mumbai', accountType: 'SHELL_CORP', balance: 0, currency: 'INR', holderName: 'Memon Financial Consultants', flaggedTransactionsCount: 52, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-01', name: 'D-Company Global Syndicate', role: 'Chartered Accountant', threatLevel: 'CRITICAL' }
    ],
    tags: ['Terrorism', '1993 Blasts', 'TADA Convicted', 'Financial Audit', 'Historical Record']
  },

  // =========================================================================
  // 2. MURDER, EXTORTION & SERIAL HOMICIDE (3 Subjects)
  // =========================================================================
  {
    id: 'crm-04',
    criminalId: 'CR-9004',
    name: 'Charles Gurmukh Sobhraj',
    alias: 'The Serpent / Bikini Killer',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    age: 80,
    gender: 'Male',
    nationality: 'French-Vietnamese-Indian',
    crimeCategory: 'Extortion',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    status: 'IN_CUSTODY',
    lastKnownLocation: {
      address: 'Special Cell Ward, Tihar Jail / Paris',
      city: 'New Delhi',
      country: 'India',
      coordinates: [28.6139, 77.2090],
    },
    lastActivity: '2026-08-20T11:00:00Z',
    knownAssociatesCount: 18,
    activeWarrants: 6,
    biography: 'Notorious serial killer, gemstone fraudster, and master of disguise who murdered dozens of international tourists along the Asian Hippie Trail in the 1970s. Famous for orchestrating daring prison escapes from Tihar Jail.',
    aiThreatSummary: 'Threat level maintained at 96/100 due to extensive international network of gemstone smugglers, fraudulent passport rings, and psychological manipulation capabilities.',
    personalDetails: {
      dob: '1944-04-06',
      bloodGroup: 'AB+',
      fingerprintId: 'FP-INTEL-CS04',
      eyeColor: 'Hazel',
      heightCm: 176,
      distinguishingMarks: ['Sharp facial features', 'Slight scar near left jaw'],
    },
    knownAssociates: [
      { id: 'crm-14', name: 'Sukesh Chandrashekhar', alias: 'Tihar Conman', role: 'Prison Network Contact', relationship: 'Tihar Cell Inmate Network', riskScore: 97, avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-04', licensePlate: 'DL-01-CS-7777', make: 'Mercedes-Benz', model: 'Vintage W123 280E', year: 1982, color: 'Ivory White', registeredOwner: 'Gemstone Export Agency', status: 'SEARCHED', lastSeenLocation: 'Connaught Place Outer Circle', lastSeenTime: 'Historical Archive' }
    ],
    phoneNumbers: [
      { id: 'ph-04', phoneNumber: '+33 6 49 10 29 38', carrier: 'Orange France (VoIP Routed)', imei: '359018471092837', ownerName: 'Alain Gautier (Alias)', status: 'TAPPED', totalCallsLogged: 120, lastActive: '2026-08-20 10:45', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-05', accountNumber: 'BNP-PARIS-881920', bankName: 'BNP Paribas International', accountType: 'OFFSHORE', balance: 84000000, currency: 'INR', holderName: 'Sobhraj Gemstone Trust', flaggedTransactionsCount: 18, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-04', name: 'Southeast Asian Gemstone Smuggling Ring', role: 'Mastermind', threatLevel: 'CRITICAL' }
    ],
    tags: ['Serial Killer', 'Gemstone Smuggling', 'Tihar Escapee', 'Interpol Target', 'Psychological Manipulator']
  },
  {
    id: 'crm-05',
    criminalId: 'CR-9005',
    name: 'Raman Raghav',
    alias: 'Psycho Raman / Sindhi Dalwai',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80',
    age: 67,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 97,
    riskLevel: 'CRITICAL',
    status: 'INACTIVE',
    lastKnownLocation: {
      address: 'Central Railway Slum Corridor',
      city: 'Mumbai',
      country: 'India',
      coordinates: [19.0760, 72.8777],
    },
    lastActivity: '1995-04-12T00:00:00Z',
    knownAssociatesCount: 4,
    activeWarrants: 0,
    biography: 'Notorious serial killer who terrorized Mumbai in the mid-1960s, bludgeoning over 41 pavement dwellers and slum residents to death with an iron rod along railway tracks between Kurla and Malad. Captured by CID DCP Ramakant Kulkarni.',
    aiThreatSummary: 'Historical Criminal Topology: Profile categorized under Lone Serial Homicide. Behavioral forensic patterns archived in ACN Criminology Model.',
    personalDetails: {
      dob: '1929-05-15',
      bloodGroup: 'B-',
      fingerprintId: 'FP-INTEL-RR05',
      eyeColor: 'Dark Brown',
      heightCm: 172,
      distinguishingMarks: ['Bent nose bridge', 'Heavy facial scarring'],
    },
    knownAssociates: [],
    vehicles: [],
    phoneNumbers: [],
    financialAccounts: [],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-05', name: 'Suburban Mumbai Lone Operative Network', role: 'Sole Perpetrator', threatLevel: 'CRITICAL' }
    ],
    tags: ['Serial Homicide', 'Mumbai CID Archive', 'Pavement Attacks', 'Historical Record']
  },
  {
    id: 'crm-06',
    criminalId: 'CR-9006',
    name: 'Thug Behram',
    alias: 'King of Thugs / Bujharat',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    age: 75,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 92,
    riskLevel: 'HIGH',
    status: 'INACTIVE',
    lastKnownLocation: {
      address: 'Central Provinces Highway Route',
      city: 'Jabalpur / Awadh',
      country: 'India',
      coordinates: [23.1815, 79.9864],
    },
    lastActivity: '1840-04-21T00:00:00Z',
    knownAssociatesCount: 80,
    activeWarrants: 0,
    biography: 'Leader of the historical Thuggee cult operating across central India in the late 18th and early 19th century. Credited in historical police archives with using a weighted yellow silk rumal (ceremonial kerchief) to assassinate caravan travelers.',
    aiThreatSummary: 'Historical Syndicate Architecture: Early archetype of coordinated highway banditry and multi-tiered extortion syndicates in Indian sub-continental history.',
    personalDetails: {
      dob: '1765-01-01',
      bloodGroup: 'O+',
      fingerprintId: 'FP-HIST-TB06',
      eyeColor: 'Black',
      heightCm: 168,
      distinguishingMarks: ['Historical cult insignia tattoo'],
    },
    knownAssociates: [],
    vehicles: [],
    phoneNumbers: [],
    financialAccounts: [],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-06', name: 'Central Provinces Thuggee Guild', role: 'Grand Jemadar (Leader)', threatLevel: 'HIGH' }
    ],
    tags: ['Historical Syndicate', 'Highway Banditry', 'Thuggee Cult', 'Archived Forensic Case']
  },

  // =========================================================================
  // 3. CYBERCRIME & DIGITAL CONDUITS (3 Subjects)
  // =========================================================================
  {
    id: 'crm-07',
    criminalId: 'CR-9007',
    name: 'Srikrishna Ramesh',
    alias: 'Sriki / Crypto Phantom',
    photoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
    age: 31,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Cybercrime',
    riskScore: 94,
    riskLevel: 'CRITICAL',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Indiranagar 100ft Road',
      city: 'Bengaluru',
      country: 'India',
      coordinates: [12.9716, 77.5946],
    },
    lastActivity: '2026-08-26T06:10:00Z',
    knownAssociatesCount: 19,
    activeWarrants: 4,
    biography: 'Elite hacker and cyber syndicate mastermind who compromised the Karnataka Government e-procurement portal for ₹11.5 Crore, and breached international cryptocurrency exchanges (Bitfinex / BTC Tumblers) laundering hundreds of Bitcoin through darknet mixing nodes.',
    aiThreatSummary: 'AI Threat Index 94/100. High risk of automated algorithmic cryptocurrency draining. Multiple Monero (XMR) and Bitcoin lightning channels currently monitored by Cyber Crime Cell CID.',
    personalDetails: {
      dob: '1995-03-12',
      bloodGroup: 'B+',
      fingerprintId: 'FP-CYBER-SR07',
      eyeColor: 'Dark Brown',
      heightCm: 174,
      distinguishingMarks: ['Small mole on right temple', 'Slight spectacles impression'],
    },
    knownAssociates: [
      { id: 'crm-08', name: 'Amit Bhardwaj', alias: 'GainBitcoin Kingpin', role: 'Crypto Ponzi Orchestrator', relationship: 'Darknet Liquidity Partner', riskScore: 91, avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-14', name: 'Sukesh Chandrashekhar', alias: 'Tihar Conman', role: 'Digital Spoofer Collaborator', relationship: 'VoIP Spoofing Consultant', riskScore: 97, avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-05', licensePlate: 'KA-01-MJ-4004', make: 'Audi', model: 'RS5 Sportback Turbo', year: 2024, color: 'Nardo Grey', registeredOwner: 'Bengaluru Tech Innovations LLP', status: 'ACTIVE', lastSeenLocation: 'Koramangala 4th Block Signal', lastSeenTime: '2026-08-25 19:40' }
    ],
    phoneNumbers: [
      { id: 'ph-05', phoneNumber: '+91 99018 77201', carrier: 'Airtel 5G (Hardware Tor Bound)', imei: '869201948109923', ownerName: 'Proxy Developer', status: 'TAPPED', totalCallsLogged: 920, lastActive: '2026-08-26 05:45', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-06', accountNumber: 'bc1q98fa83bca9214710bc28194a', bankName: 'Bitcoin Core Multi-Sig Cold Vault', accountType: 'CRYPTO_WALLET', balance: 890000000, currency: 'INR', holderName: 'Sriki Anon Cluster', flaggedTransactionsCount: 310, status: 'MONITORED' },
      { id: 'fin-07', accountNumber: '0x71C2834b9281740bca8192837', bankName: 'Ethereum Tornado Smart Contract', accountType: 'CRYPTO_WALLET', balance: 340000000, currency: 'INR', holderName: 'Tumbler Node Alpha', flaggedTransactionsCount: 180, status: 'ACTIVE' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-07', name: 'Dark Web Zero-Day Syndicate', role: 'Core Lead Exploiter', threatLevel: 'CRITICAL' },
      { id: 'org-08', name: 'Karnataka e-Procurement Hacker Cell', role: 'Chief Penetration Architect', threatLevel: 'HIGH' }
    ],
    tags: ['Cybercrime', 'Bitcoin Draining', 'E-Procurement Breach', 'Darknet Mixer', 'CID Karnataka Case']
  },
  {
    id: 'crm-08',
    criminalId: 'CR-9008',
    name: 'Amit Bhardwaj',
    alias: 'GainBitcoin Kingpin',
    photoUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&auto=format&fit=crop&q=80',
    age: 46,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Cybercrime',
    riskScore: 91,
    riskLevel: 'HIGH',
    status: 'INACTIVE',
    lastKnownLocation: {
      address: 'Kalyani Nagar Luxury Suites',
      city: 'Pune / Delhi',
      country: 'India',
      coordinates: [18.5204, 73.8567],
    },
    lastActivity: '2022-01-15T00:00:00Z',
    knownAssociatesCount: 24,
    activeWarrants: 5,
    biography: 'Architect of India’s largest multi-level marketing cryptocurrency Ponzi scheme (GainBitcoin / Variabletech Pte Ltd), which defrauded over 100,000 investors of ₹20,000+ Crore ($2.5 Billion) worth of Bitcoins across India, Dubai, and Hong Kong.',
    aiThreatSummary: 'Enforcement Directorate attached multiple international properties under PMLA. Active blockchain wallet tracing continues to recover hidden Bitcoin clusters.',
    personalDetails: {
      dob: '1976-06-18',
      bloodGroup: 'O-',
      fingerprintId: 'FP-CYBER-AB08',
      eyeColor: 'Brown',
      heightCm: 178,
      distinguishingMarks: ['Gold rim spectacles', 'Fair complexion'],
    },
    knownAssociates: [
      { id: 'crm-07', name: 'Srikrishna Ramesh', alias: 'Sriki', role: 'Cryptographic Hacker', relationship: 'Crypto Tumbler Consultant', riskScore: 94, avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-06', licensePlate: 'MH-12-AB-0001', make: 'Rolls-Royce', model: 'Ghost Extended Wheelbase', year: 2021, color: 'Diamond Black', registeredOwner: 'Variabletech Solutions India', status: 'IMPOUNDED', lastSeenLocation: 'ED Zonal Office Pune', lastSeenTime: 'Seized' }
    ],
    phoneNumbers: [
      { id: 'ph-06', phoneNumber: '+91 98209 11094', carrier: 'Vodafone Idea Encrypted', imei: '358920194810293', ownerName: 'GainBitcoin Corp', status: 'DISCONNECTED', totalCallsLogged: 450, lastActive: '2022-01-14', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-08', accountNumber: 'HSBC-HK-9901847', bankName: 'HSBC Commercial Hong Kong', accountType: 'OFFSHORE', balance: 980000000, currency: 'INR', holderName: 'Variabletech Pte Ltd', flaggedTransactionsCount: 140, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-09', name: 'GainBitcoin Multi-Level Network', role: 'Founder & CEO', threatLevel: 'HIGH' }
    ],
    tags: ['Cybercrime', 'Bitcoin Ponzi', 'PMLA Investigation', 'ED Attachment', 'Cryptocurrency Fraud']
  },
  {
    id: 'crm-09',
    criminalId: 'CR-9009',
    name: 'Ketan Parekh',
    alias: 'KP / Circular Trade Architect',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
    age: 61,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Cybercrime',
    riskScore: 89,
    riskLevel: 'HIGH',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Nariman Point Financial Chambers',
      city: 'Mumbai',
      country: 'India',
      coordinates: [18.9256, 72.8242],
    },
    lastActivity: '2026-08-25T15:20:00Z',
    knownAssociatesCount: 20,
    activeWarrants: 2,
    biography: 'Stockbroker and algorithmic market rigging architect behind the 2001 Indian stock market crash. Orchestrated circular trading loops and fraudulent credit lines from Madhavpura Mercantile Co-operative Bank, siphoning ₹1,200 Crore.',
    aiThreatSummary: 'SEBI and CBI Intelligence surveillance active. Automated algorithm monitors suspected front-entity accounts operating across Mumbai and GIFT City IFSC exchanges.',
    personalDetails: {
      dob: '1963-04-18',
      bloodGroup: 'A+',
      fingerprintId: 'FP-FIN-KP09',
      eyeColor: 'Dark Brown',
      heightCm: 172,
      distinguishingMarks: ['Receding hairline', 'Specs with black frames'],
    },
    knownAssociates: [
      { id: 'crm-13', name: 'Hasan Ali Khan', alias: 'Swiss Vault King', role: 'Offshore Wealth Conduit', relationship: 'Overseas Funds Facilitation', riskScore: 93, avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-07', licensePlate: 'MH-01-KP-2001', make: 'BMW', model: '740Li M-Sport', year: 2024, color: 'Carbon Black', registeredOwner: 'Triumph Securities Pvt Ltd', status: 'ACTIVE', lastSeenLocation: 'Marine Drive Promenade', lastSeenTime: '2026-08-25 11:30' }
    ],
    phoneNumbers: [
      { id: 'ph-07', phoneNumber: '+91 98210 55192', carrier: 'Jio Corporate 5G', imei: '869201948109384', ownerName: 'K Parekh Advisory', status: 'TAPPED', totalCallsLogged: 610, lastActive: '2026-08-25 14:50', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-09', accountNumber: 'MMCB0001928471', bankName: 'Madhavpura Mercantile Bank', accountType: 'SHELL_CORP', balance: 410000000, currency: 'INR', holderName: 'Classic Credit Trading LLP', flaggedTransactionsCount: 95, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-10', name: 'K-10 Stock Rigging Syndicate', role: 'Chief Market Manipulator', threatLevel: 'HIGH' }
    ],
    tags: ['Cyber Financial Rigging', 'Stock Crash', 'SEBI Banned', 'Circular Trading', 'CBI Case']
  },

  // =========================================================================
  // 4. HEINOUS CRIMES & SPECIAL OFFENSES (3 Subjects)
  // =========================================================================
  {
    id: 'crm-10',
    criminalId: 'CR-9010',
    name: 'Bharat Yadav (Akku Yadav)',
    alias: 'Nagpur Terror / Akku',
    photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80',
    age: 32,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 95,
    riskLevel: 'CRITICAL',
    status: 'INACTIVE',
    lastKnownLocation: {
      address: 'Kasturba Nagar Slum, Jaripatka',
      city: 'Nagpur',
      country: 'India',
      coordinates: [21.1458, 79.0882],
    },
    lastActivity: '2004-08-13T10:00:00Z',
    knownAssociatesCount: 12,
    activeWarrants: 0,
    biography: 'Notorious gangster, serial rapist, and extortionist who terrorized the Kasturba Nagar locality of Nagpur for over a decade. Lynched inside Nagpur District Court No. 7 by a collective of 200+ local women in August 2004.',
    aiThreatSummary: 'Historical Case File: Extreme high-violence neighborhood gangland model. Case archived under Special Offenses & Vigilante Justice Research Archive.',
    personalDetails: {
      dob: '1972-01-01',
      bloodGroup: 'B+',
      fingerprintId: 'FP-CRIM-AY10',
      eyeColor: 'Black',
      heightCm: 175,
      distinguishingMarks: ['Scar across right hand', 'Sword mark on forearm'],
    },
    knownAssociates: [],
    vehicles: [],
    phoneNumbers: [],
    financialAccounts: [],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-11', name: 'Nagpur Jaripatka Slum Extortion Gang', role: 'Gang Leader', threatLevel: 'CRITICAL' }
    ],
    tags: ['Violent Extortion', 'Nagpur Court Case', 'Slum Racketeering', 'Historical Record']
  },
  {
    id: 'crm-11',
    criminalId: 'CR-9011',
    name: 'Gurmeet Ram Rahim Singh',
    alias: 'MSG Chief / Dera Head',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    age: 57,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Human Trafficking',
    riskScore: 90,
    riskLevel: 'HIGH',
    status: 'IN_CUSTODY',
    lastKnownLocation: {
      address: 'Sunaria High Security Jail',
      city: 'Rohtak / Sirsa',
      country: 'India',
      coordinates: [28.8955, 76.6066],
    },
    lastActivity: '2026-08-15T09:00:00Z',
    knownAssociatesCount: 30,
    activeWarrants: 2,
    biography: 'Head of the Dera Sacha Sauda sect convicted by Special CBI Court in 2017 for sexual assault of female followers, journalist murder, and human rights abuses. Serving a 20-year rigorous imprisonment sentence.',
    aiThreatSummary: 'High-alert security monitoring on parole and visitor logs. Intelligence surveillance maintained across Sirsa headquarters to prevent public order disruption.',
    personalDetails: {
      dob: '1967-08-15',
      bloodGroup: 'O+',
      fingerprintId: 'FP-CBI-GR11',
      eyeColor: 'Dark Brown',
      heightCm: 180,
      distinguishingMarks: ['Dense beard and hair', 'Wrist injury mark'],
    },
    knownAssociates: [
      { id: 'crm-12', name: 'Kuldeep Singh Sengar', alias: 'Unnao Nexus', role: 'High-Profile Inmate', relationship: 'Prison Security Coordination', riskScore: 88, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-08', licensePlate: 'HR-24-MSG-0001', make: 'Lexus', model: 'LX570 Armored Custom', year: 2017, color: 'Custom Chameleon Purple', registeredOwner: 'Dera Sacha Sauda Trust', status: 'IMPOUNDED', lastSeenLocation: 'Sirsa Ashram Complex', lastSeenTime: 'Impounded' }
    ],
    phoneNumbers: [],
    financialAccounts: [
      { id: 'fin-10', accountNumber: 'SBI-SIRSA-9901847', bankName: 'State Bank of India Sirsa', accountType: 'SHELL_CORP', balance: 1850000000, currency: 'INR', holderName: 'Shah Satnam Ji Research Trust', flaggedTransactionsCount: 88, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-12', name: 'Dera Sacha Sauda Financial Grid', role: 'Chief Patron', threatLevel: 'HIGH' }
    ],
    tags: ['CBI Convicted', 'Human Exploitation', 'Sunaria Jail', 'Sirsa Network', 'Public Security Risk']
  },
  {
    id: 'crm-12',
    criminalId: 'CR-9012',
    name: 'Kuldeep Singh Sengar',
    alias: 'Unnao Syndicate Leader',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    age: 58,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 88,
    riskLevel: 'HIGH',
    status: 'IN_CUSTODY',
    lastKnownLocation: {
      address: 'Tihar High Security Jail Ward',
      city: 'Unnao / New Delhi',
      country: 'India',
      coordinates: [26.5393, 80.4878],
    },
    lastActivity: '2026-08-10T12:00:00Z',
    knownAssociatesCount: 16,
    activeWarrants: 1,
    biography: 'Former four-time Member of the Legislative Assembly (MLA) convicted by Delhi Tis Hazari Court for the 2017 Unnao minor assault, custodial murder, and witness intimidation conspiracy. Serving life imprisonment.',
    aiThreatSummary: 'Active monitoring of political proxy networks, illegal sand mining conduits, and land registry holdings across Unnao and Kanpur districts.',
    personalDetails: {
      dob: '1966-08-10',
      bloodGroup: 'A+',
      fingerprintId: 'FP-CBI-KS12',
      eyeColor: 'Brown',
      heightCm: 175,
      distinguishingMarks: ['Scar on left shoulder'],
    },
    knownAssociates: [
      { id: 'crm-14', name: 'Sukesh Chandrashekhar', alias: 'Tihar Conman', role: 'Tihar Inmate', relationship: 'Tihar Jail Network', riskScore: 97, avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-09', licensePlate: 'UP-35-KS-0001', make: 'Toyota', model: 'Fortuner 4x4 Bulletproof', year: 2018, color: 'White', registeredOwner: 'Makhi Mining Logistics', status: 'IMPOUNDED', lastSeenLocation: 'Unnao Town Center', lastSeenTime: 'Impounded' }
    ],
    phoneNumbers: [],
    financialAccounts: [
      { id: 'fin-11', accountNumber: 'PNB-UNNAO-991823', bankName: 'Punjab National Bank Unnao', accountType: 'SAVINGS', balance: 35000000, currency: 'INR', holderName: 'Sengar Infrastructure LLP', flaggedTransactionsCount: 32, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-13', name: 'Unnao Sand & Real Estate Syndicate', role: 'Mastermind', threatLevel: 'HIGH' }
    ],
    tags: ['CBI Convicted', 'Tihar Jail', 'Witness Intimidation', 'Mining Syndicate', 'Life Imprisonment']
  },

  // =========================================================================
  // 5. MONEY LAUNDERING & BANKING FRAUD (3 Subjects)
  // =========================================================================
  {
    id: 'crm-13',
    criminalId: 'CR-9013',
    name: 'Hasan Ali Khan',
    alias: 'Swiss Vault King / Horse Baron',
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&auto=format&fit=crop&q=80',
    age: 71,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Money Laundering',
    riskScore: 93,
    riskLevel: 'HIGH',
    status: 'INACTIVE',
    lastKnownLocation: {
      address: 'Koregaon Park Stud Farm Estate',
      city: 'Pune',
      country: 'India',
      coordinates: [18.5362, 73.8940],
    },
    lastActivity: '2023-11-20T00:00:00Z',
    knownAssociatesCount: 26,
    activeWarrants: 0,
    biography: 'Pune-based stud farm owner and central target of Enforcement Directorate’s massive PMLA investigation. Alleged to have laundered over $8 Billion (₹39,000 Crore) through UBS Zurich and offshore Caribbean bank accounts.',
    aiThreatSummary: 'Historical ED Case File: Pioneer of multi-layered Swiss banking wire routing, stud farm cash injections, and hawala bullion transactions.',
    personalDetails: {
      dob: '1953-12-14',
      bloodGroup: 'O+',
      fingerprintId: 'FP-ED-HK13',
      eyeColor: 'Dark Brown',
      heightCm: 172,
      distinguishingMarks: ['Gold tooth on upper jaw', 'Prominent mustache'],
    },
    knownAssociates: [
      { id: 'crm-09', name: 'Ketan Parekh', alias: 'KP', role: 'Stock Market Manipulator', relationship: 'Financial Routing Associate', riskScore: 89, avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-15', name: 'Nirav Deepak Modi', alias: 'Firestar Diamond', role: 'Offshore Diamond Trader', relationship: 'Swiss Vault Co-Consultant', riskScore: 96, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-10', licensePlate: 'MH-12-HK-0007', make: 'Bentley', model: 'Continental Flying Spur', year: 2008, color: 'Metallic Silver', registeredOwner: 'Hasan Ali Stud Farms', status: 'IMPOUNDED', lastSeenLocation: 'Pune Race Course', lastSeenTime: 'Impounded' }
    ],
    phoneNumbers: [],
    financialAccounts: [
      { id: 'fin-12', accountNumber: 'UBS-ZURICH-800192', bankName: 'UBS Switzerland AG', accountType: 'OFFSHORE', balance: 9400000000, currency: 'INR', holderName: 'Khan International Equestrian Trust', flaggedTransactionsCount: 210, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-14', name: 'Swiss-Pune Offshore Laundering Ring', role: 'Prime Beneficiary', threatLevel: 'HIGH' }
    ],
    tags: ['Money Laundering', 'UBS Swiss Account', 'ED PMLA', 'Stud Farm Hawala', 'Historical Investigation']
  },
  {
    id: 'crm-14',
    criminalId: 'CR-9014',
    name: 'Sukesh Chandrashekhar',
    alias: 'Balaji / Tihar Conman',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
    age: 36,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Money Laundering',
    riskScore: 97,
    riskLevel: 'CRITICAL',
    status: 'IN_CUSTODY',
    lastKnownLocation: {
      address: 'Mandoli High Security Jail Ward 11',
      city: 'New Delhi',
      country: 'India',
      coordinates: [28.7041, 77.1025],
    },
    lastActivity: '2026-08-25T17:00:00Z',
    knownAssociatesCount: 35,
    activeWarrants: 18,
    biography: 'Master conman who ran a ₹200-Crore ($25M) extortion and money laundering racket from inside Tihar Jail using virtual numbers, VoIP call spoofing software impersonating Union Law Secretary and Home Ministry officials. Laundered proceeds through luxury cars and Bollywood proxies.',
    aiThreatSummary: 'AI Threat Index 97/100. High risk of remote digital impersonation and deepfake voice clone extortion. Strict biometric communication jamming enforced in Mandoli Jail.',
    personalDetails: {
      dob: '1989-10-22',
      bloodGroup: 'B+',
      fingerprintId: 'FP-ED-SC14',
      eyeColor: 'Dark Brown',
      heightCm: 176,
      distinguishingMarks: ['Arm tattoo with initials', 'Slight beard line'],
    },
    knownAssociates: [
      { id: 'crm-07', name: 'Srikrishna Ramesh', alias: 'Sriki', role: 'Cyber Exploiter', relationship: 'VoIP Spoofing Support', riskScore: 94, avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-15', name: 'Nirav Deepak Modi', alias: 'Firestar Diamond', role: 'Offshore Banker', relationship: 'Hawala Channel Associate', riskScore: 96, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-11', licensePlate: 'DL-01-SC-0001', make: 'Lamborghini', model: 'Urus Pearl Capsule', year: 2021, color: 'Giallo Inti Yellow', registeredOwner: 'Leena Paulose Holdings', status: 'IMPOUNDED', lastSeenLocation: 'South Delhi Farmhouse', lastSeenTime: 'ED Seized' },
      { id: 'veh-12', licensePlate: 'TN-09-SC-7777', make: 'Ferrari', model: '458 Italia', year: 2020, color: 'Rosso Corsa Red', registeredOwner: 'Apex Luxury Fleet Chennai', status: 'IMPOUNDED', lastSeenLocation: 'Chennai Harbor Yard', lastSeenTime: 'ED Seized' }
    ],
    phoneNumbers: [
      { id: 'ph-08', phoneNumber: '+91 98110 99014', carrier: 'Spoofed Ministry Line (VoIP)', imei: '864920048102914', ownerName: 'Spoofed: Home Secretary Office', status: 'TAPPED', totalCallsLogged: 740, lastActive: '2026-08-25 16:30', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-13', accountNumber: 'HDFC-DELHI-9920194', bankName: 'HDFC Bank Green Park', accountType: 'SHELL_CORP', balance: 480000000, currency: 'INR', holderName: 'Super Car Trading LLP', flaggedTransactionsCount: 165, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-15', name: 'Tihar-Dubai Extortion & Hawala Cartel', role: 'Chief Con Mastermind', threatLevel: 'CRITICAL' }
    ],
    tags: ['Extortion', 'VoIP Spoofing', 'Tihar Jail Racket', 'ED Money Laundering', 'High-Profile Fraud']
  },
  {
    id: 'crm-15',
    criminalId: 'CR-9015',
    name: 'Nirav Deepak Modi',
    alias: 'Firestar Diamond / Diamantaire',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 55,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Money Laundering',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Centre Point Luxury Tower / Wandsworth Prison',
      city: 'London / Mumbai',
      country: 'India',
      coordinates: [18.9220, 72.8340],
    },
    lastActivity: '2026-08-26T03:00:00Z',
    knownAssociatesCount: 32,
    activeWarrants: 8,
    biography: 'Fugitive diamantaire who engineered the ₹13,500-Crore ($2 Billion) Punjab National Bank (PNB) Letters of Undertaking (LoU) fraud via Brady House branch in Mumbai. Siphoned illicit bank credit into shell companies across Dubai, Hong Kong, and New York.',
    aiThreatSummary: 'Extradition proceeding under UK High Court review. CBI and ED attached luxury properties in London, New York, and Mumbai worth ₹2,600 Crore.',
    personalDetails: {
      dob: '1971-02-27',
      bloodGroup: 'B+',
      fingerprintId: 'FP-CBI-NM15',
      eyeColor: 'Brown',
      heightCm: 174,
      distinguishingMarks: ['Specs', 'Clean shaven', 'Receding hairline'],
    },
    knownAssociates: [
      { id: 'crm-13', name: 'Hasan Ali Khan', alias: 'Swiss Vault King', role: 'Offshore Wealth Partner', relationship: 'Offshore Structuring', riskScore: 93, avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-14', name: 'Sukesh Chandrashekhar', alias: 'Tihar Conman', role: 'Hawala Collaborator', relationship: 'Offshore Liquidity Conduit', riskScore: 97, avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-13', licensePlate: 'MH-01-NM-1001', make: 'Rolls-Royce', model: 'Phantom VII Drophead', year: 2017, color: 'Arctic White', registeredOwner: 'Firestar International Pvt Ltd', status: 'IMPOUNDED', lastSeenLocation: 'Bandra Kurla Complex (BKC)', lastSeenTime: 'Auctioned' }
    ],
    phoneNumbers: [
      { id: 'ph-09', phoneNumber: '+44 7911 123456', carrier: 'Vodafone UK Encrypted VIP', imei: '358920194819284', ownerName: 'London Legal Counsel', status: 'TAPPED', totalCallsLogged: 520, lastActive: '2026-08-26 02:45', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-14', accountNumber: 'PNB-BRADY-99018471', bankName: 'Punjab National Bank - Brady House', accountType: 'SHELL_CORP', balance: 13500000000, currency: 'INR', holderName: 'Solar Exports / Stellar Diamond', flaggedTransactionsCount: 290, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-16', name: 'Firestar Diamond Global Syndicate', role: 'Chairman & Promoter', threatLevel: 'CRITICAL' }
    ],
    tags: ['PNB Scam', 'Money Laundering', 'CBI Most Wanted', 'Interpol Red Corner', 'Extradition Target']
  },

  // =========================================================================
  // 6. HEISTS & HIGH-VALUE ROBBERIES (3 Subjects)
  // =========================================================================
  {
    id: 'crm-16',
    criminalId: 'CR-9016',
    name: 'Joseph Babu (Jaison)',
    alias: 'Chelembra Tunnel Master / Babu',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    age: 52,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Organized Heist',
    riskScore: 93,
    riskLevel: 'CRITICAL',
    status: 'IN_CUSTODY',
    lastKnownLocation: {
      address: 'Central Prison Viyyur',
      city: 'Malappuram / Kozhikode',
      country: 'India',
      coordinates: [11.0732, 75.9898],
    },
    lastActivity: '2026-08-18T14:00:00Z',
    knownAssociatesCount: 14,
    activeWarrants: 2,
    biography: 'Kingpin behind the 2007 Chelembra South Malabar Gramin Bank heist in Kerala, considered one of India’s largest bank robberies. Rented a ground-floor hotel, drilled a tunnel through the reinforced concrete floor, and looted 80 kilograms of gold and ₹5 Million cash.',
    aiThreatSummary: 'Kerala Police Special Investigation Team tracked the syndicate via CDR cross-matching of burner phones purchased at Kozhikode railway station.',
    personalDetails: {
      dob: '1974-05-10',
      bloodGroup: 'AB+',
      fingerprintId: 'FP-POL-JB16',
      eyeColor: 'Brown',
      heightCm: 173,
      distinguishingMarks: ['Scar on right forearm from drill blast'],
    },
    knownAssociates: [
      { id: 'crm-17', name: 'Dhananjay Chhatrapati', alias: 'Dhanu', role: 'Heist Strategist', relationship: 'Vault Breach Co-conspirator', riskScore: 89, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-14', licensePlate: 'KL-10-JB-2007', make: 'Mahindra', model: 'Bolero Camper 4WD', year: 2007, color: 'Desert Tan', registeredOwner: 'Chelembra Hotel Renovations', status: 'IMPOUNDED', lastSeenLocation: 'Kozhikode Hideout', lastSeenTime: 'Impounded' }
    ],
    phoneNumbers: [
      { id: 'ph-10', phoneNumber: '+91 98470 19284', carrier: 'BSNL Mobile (Burner SIM)', imei: '864920194810294', ownerName: 'Shaji Kumar (Fake ID)', status: 'DISCONNECTED', totalCallsLogged: 180, lastActive: '2007-12-31', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-15', accountNumber: 'SBM-KERALA-881920', bankName: 'State Bank of Travancore', accountType: 'SAVINGS', balance: 1200000, currency: 'INR', holderName: 'Babu Real Estate Malappuram', flaggedTransactionsCount: 14, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-17', name: 'Chelembra Tunnel Heist Crew', role: 'Mastermind & Planner', threatLevel: 'CRITICAL' }
    ],
    tags: ['Bank Heist', 'Tunnel Robbery', 'Kerala Police Landmark', 'Gold Bullion Loot', 'Special Investigation']
  },
  {
    id: 'crm-17',
    criminalId: 'CR-9017',
    name: 'Dhananjay Chhatrapati',
    alias: 'Dhanu / Opera House Mastermind',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    age: 63,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Organized Heist',
    riskScore: 89,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Opera House Jewelry District',
      city: 'Mumbai',
      country: 'India',
      coordinates: [18.9553, 72.8187],
    },
    lastActivity: '2026-08-22T08:30:00Z',
    knownAssociatesCount: 16,
    activeWarrants: 4,
    biography: 'Mastermind of the legendary 1987 Opera House fake CBI raid heist. Posing as a senior CBI officer (Monoj Kumar), hired 26 innocent job applicants through newspaper ads, led a staged search of Tribhovandas Bhimji Zaveri (TBZ) jewelry store, and walked away with ₹35 Lakhs of gold and diamonds.',
    aiThreatSummary: 'Intelligence Cold Case Model: Subject remains an unsolved fugitive legend in Mumbai Police Crime Branch archives with periodic sightings reported in Dubai and Kolkata.',
    personalDetails: {
      dob: '1961-09-14',
      bloodGroup: 'O+',
      fingerprintId: 'FP-MUM-DC17',
      eyeColor: 'Black',
      heightCm: 176,
      distinguishingMarks: ['Refined speaking accent', 'Immaculate safari suit demeanor'],
    },
    knownAssociates: [
      { id: 'crm-18', name: 'Mithlesh Kumar Srivastava', alias: 'Natwarlal', role: 'Impersonation Advisor', relationship: 'Master Con Ideology', riskScore: 88, avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-15', licensePlate: 'MH-01-TB-1987', make: 'Premier', model: 'Padmini Deluxe (Fake Gov Plate)', year: 1987, color: 'Ambassador White', registeredOwner: 'Government Inspection Unit (Fake)', status: 'SEARCHED', lastSeenLocation: 'Taj Intercontinental Mumbai', lastSeenTime: 'Historical Archive' }
    ],
    phoneNumbers: [],
    financialAccounts: [],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-18', name: 'Fake CBI Heist Syndicate', role: 'Ring Leader', threatLevel: 'HIGH' }
    ],
    tags: ['Fake CBI Raid', 'Opera House Heist', 'TBZ Jewelry Loot', 'Mumbai Crime Branch Legend', 'Master Con']
  },
  {
    id: 'crm-18',
    criminalId: 'CR-9018',
    name: 'Mithlesh Kumar Srivastava',
    alias: 'Natwarlal / Master Forger',
    photoUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=300&auto=format&fit=crop&q=80',
    age: 97,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Organized Heist',
    riskScore: 88,
    riskLevel: 'HIGH',
    status: 'INACTIVE',
    lastKnownLocation: {
      address: 'Bangra Village / New Delhi Railway Station',
      city: 'Siwan / Kolkata',
      country: 'India',
      coordinates: [26.2196, 84.3567],
    },
    lastActivity: '1996-06-24T00:00:00Z',
    knownAssociatesCount: 30,
    activeWarrants: 0,
    biography: 'India’s most legendary con artist who repeatedly "sold" the Taj Mahal, the Red Fort, the Rashtrapati Bhavan, and the Parliament House of India to wealthy foreign tourists with forged government transfer deeds. Escaped from custody over 8 times.',
    aiThreatSummary: 'Archived Master Forgery Matrix: Subject created master forged signatures of Dr. Rajendra Prasad and Dhirubhai Ambani. Forensic document analysis standards derived from his cases.',
    personalDetails: {
      dob: '1912-04-03',
      bloodGroup: 'B+',
      fingerprintId: 'FP-HIST-NL18',
      eyeColor: 'Dark Brown',
      heightCm: 169,
      distinguishingMarks: ['Master of 50+ disguises', 'Distinct lawyer penmanship'],
    },
    knownAssociates: [],
    vehicles: [],
    phoneNumbers: [],
    financialAccounts: [],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-19', name: 'All-India Document Forgery Network', role: 'Founder & Master Con', threatLevel: 'HIGH' }
    ],
    tags: ['Master Forger', 'Sold Taj Mahal', 'Natwarlal', '8 Jailbreaks', 'Historical Criminology']
  },

  // =========================================================================
  // 7. ARMS SMUGGLING & INTERDICTION (3 Subjects)
  // =========================================================================
  {
    id: 'crm-19',
    criminalId: 'CR-9019',
    name: 'Niels Holck',
    alias: 'Kim Davy / Purulia Drop Mastermind',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 63,
    gender: 'Male',
    nationality: 'Danish',
    crimeCategory: 'Arms Smuggling',
    riskScore: 96,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Hillerød District / Purulia Drop Zone',
      city: 'Purulia / Copenhagen',
      country: 'India',
      coordinates: [23.3322, 86.3652],
    },
    lastActivity: '2026-08-25T08:00:00Z',
    knownAssociatesCount: 22,
    activeWarrants: 4,
    biography: 'Prime mastermind of the infamous December 1995 Purulia arms drop in West Bengal. Chartered an Antonov An-26 aircraft to air-drop over 2,500 AK-47 assault rifles, 1.5 million rounds of ammunition, rocket launchers, and anti-tank weapons over Purulia fields before escaping Mumbai airport.',
    aiThreatSummary: 'CBI Extradition Red Notice active. Cross-border ballistic telemetry links consignment to international covert arms trafficking networks in Eastern Europe and South Asia.',
    personalDetails: {
      dob: '1961-12-16',
      bloodGroup: 'O+',
      fingerprintId: 'FP-CBI-KD19',
      eyeColor: 'Blue',
      heightCm: 184,
      distinguishingMarks: ['Nordic features', 'High forehead'],
    },
    knownAssociates: [
      { id: 'crm-20', name: 'Peter Bleach', alias: 'Border Operative', role: 'AN-26 Flight Weapons Broker', relationship: 'Purulia Arms Co-conspirator', riskScore: 91, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-21', name: 'Chhota Shakeel', alias: 'Shakeel', role: 'Underworld Weapons Procurement', relationship: 'Black Market Arms Conduit', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-16', licensePlate: 'WB-02-KD-1995', make: 'Antonov', model: 'An-26 Cargo Aircraft (Reg: UN-26496)', year: 1995, color: 'Aviation Silver / Blue Stripe', registeredOwner: 'Carol Air Logistics Bulgaria', status: 'IMPOUNDED', lastSeenLocation: 'Kolkata International Airport', lastSeenTime: 'Impounded' }
    ],
    phoneNumbers: [
      { id: 'ph-11', phoneNumber: '+45 20 91 82 73', carrier: 'Telenor Denmark Encrypted', imei: '359018294810294', ownerName: 'Danish Engineering Consultant', status: 'TAPPED', totalCallsLogged: 290, lastActive: '2026-08-25 07:30', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-16', accountNumber: 'DANSKE-CPH-990184', bankName: 'Danske Bank Copenhagen', accountType: 'OFFSHORE', balance: 340000000, currency: 'INR', holderName: 'Nordic Humanitarian Logistics (Decoy)', flaggedTransactionsCount: 42, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-20', name: 'Purulia Aerial Arms Smuggling Network', role: 'Supreme Coordinator', threatLevel: 'CRITICAL' }
    ],
    tags: ['Purulia Arms Drop', 'AK-47 Smuggling', 'Antonov An-26', 'CBI Most Wanted', 'Interpol Red Corner']
  },
  {
    id: 'crm-20',
    criminalId: 'CR-9020',
    name: 'Peter Bleach',
    alias: 'Border Operative / Arms Broker',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    age: 74,
    gender: 'Male',
    nationality: 'British',
    crimeCategory: 'Arms Smuggling',
    riskScore: 91,
    riskLevel: 'HIGH',
    status: 'INACTIVE',
    lastKnownLocation: {
      address: 'Alipore Central Jail / North Yorkshire',
      city: 'Kolkata',
      country: 'India',
      coordinates: [22.5726, 88.3639],
    },
    lastActivity: '2004-02-04T00:00:00Z',
    knownAssociatesCount: 16,
    activeWarrants: 0,
    biography: 'Former British intelligence operative and international arms broker convicted and sentenced to life imprisonment for supplying 2,500 assault rifles in the 1995 Purulia arms drop case. Pardoned and released in 2004 after diplomatic intervention.',
    aiThreatSummary: 'Historical Arms Intelligence Dossier: Full procurement trail traced through Bulgarian military surplus depot and transnational cargo routing.',
    personalDetails: {
      dob: '1951-11-27',
      bloodGroup: 'A+',
      fingerprintId: 'FP-CBI-PB20',
      eyeColor: 'Grey',
      heightCm: 181,
      distinguishingMarks: ['Military posture', 'Scar on right hand'],
    },
    knownAssociates: [
      { id: 'crm-19', name: 'Niels Holck', alias: 'Kim Davy', role: 'Air-drop Pilot & Mastermind', relationship: 'Arms Consignment Partner', riskScore: 96, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [],
    phoneNumbers: [],
    financialAccounts: [],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-20', name: 'Purulia Aerial Arms Smuggling Network', role: 'Arms Procurement Broker', threatLevel: 'HIGH' }
    ],
    tags: ['Arms Smuggling', 'Purulia Case', 'British Operative', 'CBI Conviction', 'Historical Dossier']
  },
  {
    id: 'crm-21',
    criminalId: 'CR-9021',
    name: 'Shakeel Babumiya Shaikh',
    alias: 'Chhota Shakeel / D-Company Enforcer',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    age: 68,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Arms Smuggling',
    riskScore: 98,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Clifton Enclave / Karachi Ports',
      city: 'Mumbai / Karachi',
      country: 'India',
      coordinates: [19.0176, 72.8150],
    },
    lastActivity: '2026-08-26T02:00:00Z',
    knownAssociatesCount: 30,
    activeWarrants: 12,
    biography: 'Chief enforcer and arms procurement commander of the D-Company underworld syndicate. Coordinates contract shootings, automatic weapon trafficking across the Arabian Sea, extortion calls to Mumbai builders, and hawala logistics.',
    aiThreatSummary: 'AI Threat Index 98/100. Intercepted encrypted VOIP phone audio confirms ongoing weapon shipment coordination into Western India coastal belt.',
    personalDetails: {
      dob: '1958-08-15',
      bloodGroup: 'B+',
      fingerprintId: 'FP-INTEL-CS21',
      eyeColor: 'Dark Brown',
      heightCm: 172,
      distinguishingMarks: ['Scar on left side of neck', 'Prominent mustache'],
    },
    knownAssociates: [
      { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', alias: 'D-Company Chief', role: 'Syndicate Leader', relationship: 'Right-Hand Enforcer', riskScore: 99, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-02', name: 'Tiger Memon', alias: 'Tiger', role: 'Operations Chief', relationship: 'D-Company Tactical Ally', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-17', licensePlate: 'MH-04-CS-9999', make: 'Toyota', model: 'Hilux Armored Interceptor', year: 2024, color: 'Gunmetal Grey', registeredOwner: 'Western Freight Transit Corp', status: 'ACTIVE', lastSeenLocation: 'Navi Mumbai JNPT Corridor', lastSeenTime: '2026-08-25 04:30' }
    ],
    phoneNumbers: [
      { id: 'ph-12', phoneNumber: '+971 50 192 8472', carrier: 'Etisalat UAE Encrypted Satellite', imei: '864920194819204', ownerName: 'Classified D-Node', status: 'TAPPED', totalCallsLogged: 680, lastActive: '2026-08-26 01:45', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-17', accountNumber: 'HABIB-KHI-8819204', bankName: 'Habib Metropolitan Bank Karachi', accountType: 'SHELL_CORP', balance: 640000000, currency: 'INR', holderName: 'Shaikh International Trade LLC', flaggedTransactionsCount: 110, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-01', name: 'D-Company Global Syndicate', role: 'Chief Enforcer & Weapons Head', threatLevel: 'CRITICAL' }
    ],
    tags: ['Arms Smuggling', 'D-Company', 'Extortion', 'MCOCA', 'Red Corner Notice', 'Underworld Enforcer']
  },

  // =========================================================================
  // 8. DRUG TRAFFICKING & NARCOTICS CARTELS (3 Subjects)
  // =========================================================================
  {
    id: 'crm-22',
    criminalId: 'CR-9022',
    name: 'Vijaygiri Anandgiri Goswami',
    alias: 'Vicky Goswami / Meth Kingpin',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    age: 64,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Drug Trafficking',
    riskScore: 97,
    riskLevel: 'CRITICAL',
    status: 'IN_CUSTODY',
    lastKnownLocation: {
      address: 'DEA Federal Custody Ward / Mombasa Port',
      city: 'Ahmedabad / Mombasa',
      country: 'India',
      coordinates: [23.0225, 72.5714],
    },
    lastActivity: '2026-08-24T20:00:00Z',
    knownAssociatesCount: 34,
    activeWarrants: 7,
    biography: 'International narcotics kingpin originating from Ahmedabad who expanded drug cartels across Dubai, South Africa, and Kenya. Masterminded multi-ton synthetic Methaqualone (Mandrax) and Ephedrine smuggling before being arrested by DEA in Kenya and extradited to the US.',
    aiThreatSummary: 'DEA & NCB Intelligence: Multi-continent precursor chemical network linking chemical manufacturing hubs in Gujarat and Maharashtra to African maritime cartels.',
    personalDetails: {
      dob: '1961-07-25',
      bloodGroup: 'O+',
      fingerprintId: 'FP-NCB-VG22',
      eyeColor: 'Dark Brown',
      heightCm: 178,
      distinguishingMarks: ['Scar on left temple', 'Heavy gold jewelry wearer in past'],
    },
    knownAssociates: [
      { id: 'crm-23', name: 'Shashikala Patankar', alias: 'Baby Patankar', role: 'Western India Narcotics Distributor', relationship: 'Mephedrone Distribution Nexus', riskScore: 94, avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-24', name: 'Dharmesh Patel', alias: 'Chemical Don', role: 'Precursor Chemical Supplier', relationship: 'Gujarat Industrial Lab Supplier', riskScore: 92, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-18', licensePlate: 'GJ-01-VG-9000', make: 'Mercedes-Benz', model: 'Maybach S580 Guard', year: 2022, color: 'Obsidian Black', registeredOwner: 'Goswami Petrochem Exports', status: 'IMPOUNDED', lastSeenLocation: 'Ahmedabad SG Highway', lastSeenTime: 'NCB Seized' }
    ],
    phoneNumbers: [
      { id: 'ph-13', phoneNumber: '+254 700 192847', carrier: 'Safaricom Kenya Encrypted', imei: '864920194810299', ownerName: 'Mombasa Port Import Trust', status: 'TAPPED', totalCallsLogged: 580, lastActive: '2026-08-24 19:30', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-18', accountNumber: 'BARCLAYS-NBO-990184', bankName: 'Barclays Bank of Kenya', accountType: 'OFFSHORE', balance: 1120000000, currency: 'INR', holderName: 'Goswami International Logistics Ltd', flaggedTransactionsCount: 198, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-21', name: 'Trans-Indian Ocean Narcotics Cartel', role: 'Kingpin & Mastermind', threatLevel: 'CRITICAL' }
    ],
    tags: ['Drug Trafficking', 'Mandrax Cartel', 'DEA Extradited', 'NCB Target', 'International Drug Baron']
  },
  {
    id: 'crm-23',
    criminalId: 'CR-9023',
    name: 'Shashikala Patankar',
    alias: 'Baby Patankar / Meow Meow Queen',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    age: 59,
    gender: 'Female',
    nationality: 'Indian',
    crimeCategory: 'Drug Trafficking',
    riskScore: 94,
    riskLevel: 'CRITICAL',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Siddharth Nagar, Worli Dairy Road',
      city: 'Mumbai',
      country: 'India',
      coordinates: [19.0060, 72.8180],
    },
    lastActivity: '2026-08-26T05:30:00Z',
    knownAssociatesCount: 25,
    activeWarrants: 3,
    biography: 'Notorious drug queenpin who dominated Mumbai’s synthetic narcotics trade for decades. Rose from milk selling to amassing ₹100+ Crore in real estate while commanding the distribution of Mephedrone (MD / "Meow Meow") across Maharashtra and Goa.',
    aiThreatSummary: 'AI Threat Index 94/100. Anti-Narcotics Cell (ANC) Mumbai tracking active synthetic MD distribution channels operating via slum logistics and couriers in Worli and Dharavi.',
    personalDetails: {
      dob: '1966-03-18',
      bloodGroup: 'A+',
      fingerprintId: 'FP-ANC-BP23',
      eyeColor: 'Black',
      heightCm: 160,
      distinguishingMarks: ['Gold earrings and necklace signature', 'Mole on left cheek'],
    },
    knownAssociates: [
      { id: 'crm-22', name: 'Vijaygiri Goswami', alias: 'Vicky Goswami', role: 'Global Synthetic Drug Kingpin', relationship: 'Precursor Chemical Syndicate', riskScore: 97, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-24', name: 'Dharmesh Patel', alias: 'Chemical Don', role: 'Industrial Lab Chemist', relationship: 'Mephedrone Precursor Source', riskScore: 92, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-19', licensePlate: 'MH-01-BP-5555', make: 'Toyota', model: 'Innova Crysta ZX Luxury', year: 2023, color: 'Pearl White', registeredOwner: 'Patankar Dairy & Properties', status: 'ACTIVE', lastSeenLocation: 'Worli Naka Junction', lastSeenTime: '2026-08-26 04:15' }
    ],
    phoneNumbers: [
      { id: 'ph-14', phoneNumber: '+91 98204 88192', carrier: 'Jio 5G Prepaid (Encrypted WhatsApp)', imei: '869201948102910', ownerName: 'Decoy Dairy Assistant', status: 'TAPPED', totalCallsLogged: 890, lastActive: '2026-08-26 05:10', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-19', accountNumber: 'BOI-WORLI-9901847', bankName: 'Bank of India Worli', accountType: 'SAVINGS', balance: 145000000, currency: 'INR', holderName: 'Shashikala Real Estate Enterprises', flaggedTransactionsCount: 78, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-22', name: 'Mumbai Mephedrone Distribution Cartel', role: 'Supreme Queenpin', threatLevel: 'CRITICAL' }
    ],
    tags: ['Drug Trafficking', 'Mephedrone MD', 'Baby Patankar', 'ANC Mumbai', 'NDPS Act Registered', 'Worli Syndicate']
  },
  {
    id: 'crm-24',
    criminalId: 'CR-9024',
    name: 'Dharmesh Patel',
    alias: 'Chemical Don / Precursor King',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 49,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Drug Trafficking',
    riskScore: 92,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'GIDC Industrial Estate, Chemical Zone',
      city: 'Ankleshwar / Surat',
      country: 'India',
      coordinates: [21.6264, 73.0035],
    },
    lastActivity: '2026-08-26T01:40:00Z',
    knownAssociatesCount: 20,
    activeWarrants: 4,
    biography: 'Industrial chemist who diverted thousands of liters of regulated precursor chemicals (Ephedrine, Acetic Anhydride, Alpha-PVP) from licensed pharmaceutical manufacturing units in Gujarat GIDC into clandestine super-labs producing synthetic narcotics.',
    aiThreatSummary: 'NCB Gujarat Zonal Unit tracking illicit chemical shipments via inter-state freight tankers heading towards Mumbai, Goa, and Punjab.',
    personalDetails: {
      dob: '1976-10-05',
      bloodGroup: 'B+',
      fingerprintId: 'FP-NCB-DP24',
      eyeColor: 'Brown',
      heightCm: 175,
      distinguishingMarks: ['Chemical burn mark on left palm', 'Spectacles'],
    },
    knownAssociates: [
      { id: 'crm-22', name: 'Vijaygiri Goswami', alias: 'Vicky Goswami', role: 'International Narcotics Kingpin', relationship: 'Bulk Chemical Consignee', riskScore: 97, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-23', name: 'Shashikala Patankar', alias: 'Baby Patankar', role: 'Mumbai Narcotics Queen', relationship: 'Direct MD Product Supplier', riskScore: 94, avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-20', licensePlate: 'GJ-16-DP-4400', make: 'Mahindra', model: 'Scorpio-N Z8 4WD', year: 2024, color: 'Napoli Black', registeredOwner: 'Ankleshwar Specialty Chemical Corp', status: 'ACTIVE', lastSeenLocation: 'Surat-Navsari Toll Plaza', lastSeenTime: '2026-08-26 00:55' }
    ],
    phoneNumbers: [
      { id: 'ph-15', phoneNumber: '+91 99250 14920', carrier: 'Airtel 5G Corporate Tunnel', imei: '864920194810283', ownerName: 'Patel Chemical Trading', status: 'TAPPED', totalCallsLogged: 490, lastActive: '2026-08-26 01:20', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-20', accountNumber: 'ICICI-ANKLESHWAR-9901', bankName: 'ICICI Bank Chemical Zone', accountType: 'SHELL_CORP', balance: 280000000, currency: 'INR', holderName: 'Gujarat Pharma Precursors LLP', flaggedTransactionsCount: 92, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-23', name: 'Gujarat GIDC Precursor Chemical Syndicate', role: 'Lead Chemical Diverter', threatLevel: 'HIGH' }
    ],
    tags: ['Precursor Chemicals', 'NDPS Act', 'GIDC Lab Diverter', 'NCB Most Wanted', 'Synthetic Narcotics']
  }
];
