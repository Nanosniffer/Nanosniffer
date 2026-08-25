import { Criminal } from '../../types';

export const dummyCriminals: Criminal[] = [
  {
    id: 'crm-01',
    criminalId: 'CR-8942',
    name: 'Vikram "D-Boss" Singhania',
    alias: 'The Mastermind / Don',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 48,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 98,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Sea Face Road, Worli',
      city: 'Mumbai',
      country: 'India',
      coordinates: [19.0176, 72.8150],
    },
    lastActivity: '2026-08-25T04:15:00Z',
    knownAssociatesCount: 16,
    activeWarrants: 8,
    biography: 'Key kingpin orchestrating transnational extortion, real-estate land grabbing, and port-side smuggling conduits across the Mumbai-Thane-Navi Mumbai industrial belt. Coordinates operations via encrypted satellite channels from offshore hideouts.',
    aiThreatSummary: 'AI Threat Index 98/100. High probability of imminent extortion payout collection via South Mumbai Angadia network. Known ties with hawala operator Suresh Patel and maritime handler Farooq Ansari.',
    personalDetails: {
      dob: '1978-02-14',
      bloodGroup: 'B+',
      fingerprintId: 'FP-MH-881904',
      eyeColor: 'Dark Brown',
      heightCm: 178,
      distinguishingMarks: ['Deep scar on left eyebrow', 'Dragon emblem tattoo on right shoulder'],
    },
    knownAssociates: [
      { id: 'crm-02', name: 'Suresh "Hawala" Patel', alias: 'Kuber', role: 'Chief Hawala Banker', relationship: 'Angadia & Foreign Routing', riskScore: 92, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-03', name: 'Kabir "Shooter" Deshmukh', alias: 'Bhai / K-47', role: 'Enforcer & Logistics', relationship: 'Armed Wing Chief', riskScore: 94, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-07', name: 'Farooq "Customs" Ansari', alias: 'The Port Shadow', role: 'Maritime Smuggler', relationship: 'JNPT Port Conduit', riskScore: 89, avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
    ],
    vehicles: [
      { id: 'veh-01', licensePlate: 'MH-01-EA-7711', make: 'Toyota', model: 'Land Cruiser V8 Armour', year: 2024, color: 'Obsidian Black', registeredOwner: 'Singhania Maritime Logistics Pvt Ltd', status: 'ACTIVE', lastSeenLocation: 'Bandra-Worli Sea Link Toll', lastSeenTime: '2026-08-25 02:30' },
      { id: 'veh-02', licensePlate: 'MH-04-DX-9900', make: 'Mercedes-Benz', model: 'G63 AMG Bulletproof', year: 2025, color: 'Matte Grey', registeredOwner: 'Apex Realty Developers', status: 'SIGHTED', lastSeenLocation: 'Hiranandani Estate, Thane', lastSeenTime: '2026-08-24 19:15' }
    ],
    phoneNumbers: [
      { id: 'ph-01', phoneNumber: '+91 98201 54910', carrier: 'Jio 5G (Encrypted eSIM)', imei: '864920048192014', ownerName: 'Decoy Name: Vinod Sharma', status: 'TAPPED', totalCallsLogged: 540, lastActive: '2026-08-25 03:45', frequentContacts: [{ phoneNumber: '+91 98220 11988', contactName: 'Suresh Patel', callCount: 68 }] },
      { id: 'ph-02', phoneNumber: '+971 50 882 1099', carrier: 'Etisalat UAE Encrypted', imei: '358920098716254', ownerName: 'Offshore Proxy', status: 'BURNER', totalCallsLogged: 34, lastActive: '2026-08-24 23:10', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-01', accountNumber: 'HDFC000192847192', bankName: 'HDFC Bank - Fort Branch', accountType: 'SHELL_CORP', balance: 285000000, currency: 'INR', holderName: 'Singhania Star Logistics LLP', flaggedTransactionsCount: 26, status: 'MONITORED' },
      { id: 'fin-02', accountNumber: '0x98fa83bca9214710bc2819', bankName: 'Tron USDT Network', accountType: 'CRYPTO_WALLET', balance: 640000000, currency: 'INR', holderName: 'D-Vault Cold Storage', flaggedTransactionsCount: 94, status: 'ACTIVE' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-01', name: 'Western Underworld Syndicate (D-Group)', role: 'Supreme Chief', threatLevel: 'CRITICAL' },
      { id: 'org-03', name: 'Surat-Mumbai Angadia Network', role: 'Primary Beneficiary', threatLevel: 'HIGH' }
    ],
    tags: ['Organized Mafia', 'Extortion', 'MCOCA Registered', 'Red Corner Alert', 'JNPT Smuggling']
  },
  {
    id: 'crm-02',
    criminalId: 'CR-7719',
    name: 'Suresh "Hawala" Patel',
    alias: 'Kuber / S-Bhai',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    age: 52,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Money Laundering',
    riskScore: 92,
    riskLevel: 'CRITICAL',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Zaveri Bazaar, Kalbadevi',
      city: 'Mumbai',
      country: 'India',
      coordinates: [18.9515, 72.8317],
    },
    lastActivity: '2026-08-25T06:40:00Z',
    knownAssociatesCount: 19,
    activeWarrants: 4,
    biography: 'Operates India\'s largest informal Angadia and Hawala cash-settlement networks between Mumbai, Surat, Ahmedabad, and Dubai. Routes over ₹50 Crore monthly in untraceable cash and stablecoins for real estate and smuggling syndicates.',
    aiThreatSummary: 'Enforcement Directorate (ED) PMLA investigation active. Telemetry indicates massive cash dispatch scheduled for Surat Diamond Bourse transit hubs tonight.',
    personalDetails: {
      dob: '1974-11-20',
      bloodGroup: 'O+',
      fingerprintId: 'FP-GJ-449120',
      eyeColor: 'Brown',
      heightCm: 172,
      distinguishingMarks: ['Birthmark on right wrist', 'Gold tooth upper right'],
    },
    knownAssociates: [
      { id: 'crm-01', name: 'Vikram Singhania', alias: 'D-Boss', role: 'Syndicate Don', relationship: 'Client & Co-conspirator', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-04', name: 'Ananya "Crypto" Roy', alias: 'ZeroByte', role: 'Cyber Money Launderer', relationship: 'P2P Crypto Exchange Node', riskScore: 89, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-08', name: 'Ashok "Broker" Gupta', alias: 'Dalal', role: 'Shell Firm Director', relationship: 'Bogus Invoice Provider', riskScore: 82, avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
    ],
    vehicles: [
      { id: 'veh-03', licensePlate: 'GJ-01-KM-8822', make: 'Toyota', model: 'Fortuner Legender', year: 2024, color: 'Pearl White', registeredOwner: 'Shree Kuber Bullion Traders', status: 'ACTIVE', lastSeenLocation: 'Zaveri Bazaar bullion corridor', lastSeenTime: '2026-08-25 05:10' }
    ],
    phoneNumbers: [
      { id: 'ph-03', phoneNumber: '+91 98220 11988', carrier: 'Airtel Enterprise Private', imei: '869102948172019', ownerName: 'Suresh Patel', status: 'TAPPED', totalCallsLogged: 920, lastActive: '2026-08-25 06:15', frequentContacts: [{ phoneNumber: '+91 98201 54910', contactName: 'Vikram Singhania', callCount: 68 }] }
    ],
    financialAccounts: [
      { id: 'fin-03', accountNumber: 'SBIN000849102941', bankName: 'State Bank of India - Nariman Point', accountType: 'CHECKING', balance: 520000000, currency: 'INR', holderName: 'Kuber Global Exports', flaggedTransactionsCount: 42, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-03', name: 'Surat-Mumbai Angadia Network', role: 'Managing Director', threatLevel: 'CRITICAL' },
      { id: 'org-01', name: 'Western Underworld Syndicate (D-Group)', role: 'Finance Chief', threatLevel: 'CRITICAL' }
    ],
    tags: ['Hawala Kingpin', 'Money Laundering', 'ED Target', 'Angadia Network', 'Zaveri Bazaar']
  },
  {
    id: 'crm-03',
    criminalId: 'CR-6620',
    name: 'Kabir "Shooter" Deshmukh',
    alias: 'K-47 / Bhai',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    age: 36,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Arms Smuggling',
    riskScore: 95,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Pimpri-Chinchwad MIDC',
      city: 'Pune',
      country: 'India',
      coordinates: [18.6298, 73.7997],
    },
    lastActivity: '2026-08-24T22:15:00Z',
    knownAssociatesCount: 11,
    activeWarrants: 9,
    biography: 'Feared hitman and illegal arms distributor operating across Maharashtra and Gujarat. Sourced automated assault rifles and contraband weapons through MP and Bihar illegal ordinance corridors for the D-Boss syndicate.',
    aiThreatSummary: 'Intercepted encrypted chatter suggests assassination plot targeting key public prosecutor in MCOCA Special Court. Weapons cache stored near Pune outskirts.',
    personalDetails: {
      dob: '1990-08-15',
      bloodGroup: 'AB+',
      fingerprintId: 'FP-MH-771209',
      eyeColor: 'Black',
      heightCm: 185,
      distinguishingMarks: ['Bullet graze scar on left chest', 'Tattoo "MAHAKAAL" on neck'],
    },
    knownAssociates: [
      { id: 'crm-01', name: 'Vikram Singhania', alias: 'D-Boss', role: 'Syndicate Don', relationship: 'Contract Provider', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-05', name: 'Devendra "Don" Rawat', alias: 'NCR Bahubali', role: 'Northern Arms Handler', relationship: 'Weapons Supplier', riskScore: 93, avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-06', name: 'Deepak "Shooter" Yadav', alias: 'Fauji', role: 'Sharpshooter', relationship: 'Hit-squad Deputy', riskScore: 88, avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
    ],
    vehicles: [
      { id: 'veh-04', licensePlate: 'MH-12-RR-9090', make: 'Mahindra', model: 'Scorpio-N Z8 4x4', year: 2024, color: 'Midnight Black', registeredOwner: 'K.D. Security Services Pune', status: 'ACTIVE', lastSeenLocation: 'Mumbai-Pune Expressway Urse Toll', lastSeenTime: '2026-08-24 23:45' }
    ],
    phoneNumbers: [
      { id: 'ph-04', phoneNumber: '+91 97654 22100', carrier: 'Vi Maharashtra (Burner SIM)', imei: '861029481920194', ownerName: 'Unregistered', status: 'TAPPED', totalCallsLogged: 310, lastActive: '2026-08-24 21:50', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-04', accountNumber: 'ICIC000918274619', bankName: 'ICICI Bank - Pune Camp', accountType: 'SAVINGS', balance: 14500000, currency: 'INR', holderName: 'Kabir Deshmukh', flaggedTransactionsCount: 18, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-01', name: 'Western Underworld Syndicate (D-Group)', role: 'Enforcement Commander', threatLevel: 'CRITICAL' },
      { id: 'org-02', name: 'Northern Gangland Logistics', role: 'Arms Intermediary', threatLevel: 'HIGH' }
    ],
    tags: ['Hitman', 'Illegal Firearms', 'MCOCA', 'Arms Smuggling', 'High Lethality']
  },
  {
    id: 'crm-04',
    criminalId: 'CR-5541',
    name: 'Ananya "Crypto" Roy',
    alias: 'ZeroByte / Queenpin',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    age: 29,
    gender: 'Female',
    nationality: 'Indian',
    crimeCategory: 'Cybercrime',
    riskScore: 91,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Sector V, Salt Lake',
      city: 'Kolkata',
      country: 'India',
      coordinates: [22.5804, 88.4378],
    },
    lastActivity: '2026-08-25T05:30:00Z',
    knownAssociatesCount: 14,
    activeWarrants: 6,
    biography: 'Architect of high-yield illegal Mahadev betting app syndicates, fake crypto investment bots, and darknet carding portals. Operates decentralized call-center boilers across Salt Lake Kolkata and Cyber Towers Hyderabad.',
    aiThreatSummary: 'CBI Cyber Crime Cell & ED have frozen 40 bank accounts. Active Ethereum address laundering ₹18 Crore through decentralized mixers.',
    personalDetails: {
      dob: '1997-06-25',
      bloodGroup: 'O-',
      fingerprintId: 'FP-WB-991024',
      eyeColor: 'Hazel',
      heightCm: 168,
      distinguishingMarks: ['Binary code tattoo behind right ear'],
    },
    knownAssociates: [
      { id: 'crm-02', name: 'Suresh Patel', alias: 'Kuber', role: 'Hawala Chief', relationship: 'Crypto-Cash Off-ramp', riskScore: 92, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-09', name: 'Gaurav "Cyber" Sharma', alias: 'ByteLord', role: 'Phishing Developer', relationship: 'Technical Lead', riskScore: 84, avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-10', name: 'Rohan "Coder" Mehra', alias: 'RootAdmin', role: 'Exploit Dev', relationship: 'Ransomware Dev', riskScore: 79, avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80' },
    ],
    vehicles: [
      { id: 'veh-05', licensePlate: 'WB-02-AK-4433', make: 'BMW', model: 'M340i xDrive', year: 2024, color: 'Tanzanite Blue', registeredOwner: 'CloudMatrix Analytics Kolkata', status: 'ACTIVE', lastSeenLocation: 'New Town Expressway, Kolkata', lastSeenTime: '2026-08-25 04:20' }
    ],
    phoneNumbers: [
      { id: 'ph-05', phoneNumber: '+91 98310 99401', carrier: 'Jio Fiber VoIP Encrypted', imei: '864920049210941', ownerName: 'Ananya Roy', status: 'TAPPED', totalCallsLogged: 680, lastActive: '2026-08-25 05:15', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-05', accountNumber: '0x71c0491829410cb9210492', bankName: 'Ethereum DeFi Liquidity Vault', accountType: 'CRYPTO_WALLET', balance: 340000000, currency: 'INR', holderName: 'ZeroByte Mixer Pool', flaggedTransactionsCount: 112, status: 'ACTIVE' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-04', name: 'Eastern Cyber & Mahadev Betting Cartel', role: 'Managing Director & CTO', threatLevel: 'CRITICAL' },
      { id: 'org-03', name: 'Surat-Mumbai Angadia Network', role: 'Off-ramp Partner', threatLevel: 'HIGH' }
    ],
    tags: ['Cyber Crime', 'Illegal Betting', 'Crypto Laundering', 'CBI Red Alert', 'Dark Web']
  },
  {
    id: 'crm-05',
    criminalId: 'CR-4419',
    name: 'Devendra "Don" Rawat',
    alias: 'NCR Bahubali / Lala',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&auto=format&fit=crop&q=80',
    age: 44,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 93,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Cyber City, Phase 2',
      city: 'Gurugram',
      country: 'India',
      coordinates: [28.4905, 77.0894],
    },
    lastActivity: '2026-08-25T01:40:00Z',
    knownAssociatesCount: 18,
    activeWarrants: 11,
    biography: 'Dominates the real estate extortion, illegal sand mining, and toll booth syndicate across Delhi NCR, Gurugram, and Noida. Operates armed extortion gangs issuing threats to prominent corporate developers.',
    aiThreatSummary: 'Special Cell Delhi Police interception revealed ₹15 Crore extortion demand sent to DLF Phase 5 builder. Heavy weapons armed escort suspected.',
    personalDetails: {
      dob: '1982-01-19',
      bloodGroup: 'B-',
      fingerprintId: 'FP-HR-881029',
      eyeColor: 'Dark Brown',
      heightCm: 188,
      distinguishingMarks: ['Thick mustache', 'Gold chain with lion pendant'],
    },
    knownAssociates: [
      { id: 'crm-03', name: 'Kabir Deshmukh', alias: 'Shooter', role: 'Arms Handler', relationship: 'Weapons Supplier', riskScore: 95, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-06', name: 'Deepak Yadav', alias: 'Fauji', role: 'Field Commander', relationship: 'NCR Operation Head', riskScore: 88, avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-11', name: 'Vijay "Bahubali" Tiwari', alias: 'Panditji', role: 'Mining Mafia Chief', relationship: 'Inter-state Partner', riskScore: 86, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
    ],
    vehicles: [
      { id: 'veh-06', licensePlate: 'HR-26-DQ-0001', make: 'Toyota', model: 'Fortuner 4x4 Bulletproof', year: 2024, color: 'Phantom Black', registeredOwner: 'Rawat Mining & Infrastructure', status: 'ACTIVE', lastSeenLocation: 'Golf Course Road Gurugram', lastSeenTime: '2026-08-25 00:50' }
    ],
    phoneNumbers: [
      { id: 'ph-06', phoneNumber: '+91 98110 33819', carrier: 'Airtel Delhi NCR VIP', imei: '864920048192033', ownerName: 'Devendra Rawat', status: 'TAPPED', totalCallsLogged: 480, lastActive: '2026-08-25 01:20', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-06', accountNumber: 'PUNB0001928471', bankName: 'Punjab National Bank - Connaught Place', accountType: 'CHECKING', balance: 195000000, currency: 'INR', holderName: 'Rawat Infra Mining Corp', flaggedTransactionsCount: 31, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-02', name: 'Northern Gangland Logistics', role: 'Supreme Chief', threatLevel: 'CRITICAL' },
      { id: 'org-01', name: 'Western Underworld Syndicate (D-Group)', role: 'NCR Strategic Ally', threatLevel: 'HIGH' }
    ],
    tags: ['Extortion', 'Land Mafia', 'Delhi Special Cell', 'MCOCA Equivalent', 'Sand Mining']
  },
  {
    id: 'crm-06',
    criminalId: 'CR-3390',
    name: 'Deepak "Shooter" Yadav',
    alias: 'Fauji / 302',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    age: 32,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 88,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Sector 62, Expressway',
      city: 'Noida',
      country: 'India',
      coordinates: [28.6280, 77.3649],
    },
    lastActivity: '2026-08-24T18:20:00Z',
    knownAssociatesCount: 8,
    activeWarrants: 7,
    biography: 'Sharp-shooter trained in rogue paramilitary camps. Executed high-profile extortion hits for the Devendra Rawat syndicate across Western UP and Delhi NCR.',
    aiThreatSummary: 'Wanted in 3 murder cases under IPC 302 (now BNS 103). Last seen travelling in unregistered dark grey Scorpio towards Greater Noida expressway.',
    personalDetails: {
      dob: '1994-09-10',
      bloodGroup: 'A+',
      fingerprintId: 'FP-UP-339102',
      eyeColor: 'Black',
      heightCm: 181,
      distinguishingMarks: ['Cut mark on chin', 'Spider tattoo on left arm'],
    },
    knownAssociates: [
      { id: 'crm-05', name: 'Devendra Rawat', alias: 'NCR Bahubali', role: 'Gang Boss', relationship: 'Commander', riskScore: 93, avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-03', name: 'Kabir Deshmukh', alias: 'Shooter', role: 'Pune Contact', relationship: 'Weapons Supplier', riskScore: 95, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    ],
    vehicles: [
      { id: 'veh-07', licensePlate: 'UP-16-BX-1122', make: 'Mahindra', model: 'Scorpio Classic S11', year: 2023, color: 'Steel Grey', registeredOwner: 'Decoy Lease Meerut', status: 'ACTIVE', lastSeenLocation: 'Noida-Greater Noida Expressway', lastSeenTime: '2026-08-24 17:40' }
    ],
    phoneNumbers: [
      { id: 'ph-07', phoneNumber: '+91 99102 44910', carrier: 'Jio UP West Burner', imei: '864920048192055', ownerName: 'Unregistered', status: 'TAPPED', totalCallsLogged: 190, lastActive: '2026-08-24 18:05', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-07', accountNumber: 'SBIN0004910294', bankName: 'State Bank of India - Noida Sector 18', accountType: 'SAVINGS', balance: 3800000, currency: 'INR', holderName: 'Deepak Yadav', flaggedTransactionsCount: 8, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-02', name: 'Northern Gangland Logistics', role: 'Enforcer', threatLevel: 'HIGH' }
    ],
    tags: ['Hitman', 'IPC 302', 'Delhi NCR', 'Noida Cell', 'Extortion']
  },
  {
    id: 'crm-07',
    criminalId: 'CR-2281',
    name: 'Farooq "Customs" Ansari',
    alias: 'The Port Shadow / Captain',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
    age: 50,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Drug Trafficking',
    riskScore: 89,
    riskLevel: 'HIGH',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'JNPT Port Container Terminal 2',
      city: 'Navi Mumbai',
      country: 'India',
      coordinates: [18.9499, 72.9511],
    },
    lastActivity: '2026-08-25T03:10:00Z',
    knownAssociatesCount: 15,
    activeWarrants: 4,
    biography: 'Controls maritime shipping container clearings and illicit cargo routing through Jawaharlal Nehru Port (JNPT) and Mundra Port. Facilitates multi-hundred kilogram heroin and gold bullion consignments hidden in scrap metal and marble containers.',
    aiThreatSummary: 'NCB and Directorate of Revenue Intelligence (DRI) live tap active. Suspected 250 kg contraband consignment arriving at JNPT Gate 4 aboard Iranian vessel.',
    personalDetails: {
      dob: '1976-05-12',
      bloodGroup: 'B+',
      fingerprintId: 'FP-MH-228190',
      eyeColor: 'Brown',
      heightCm: 175,
      distinguishingMarks: ['Anchor tattoo on left forearm'],
    },
    knownAssociates: [
      { id: 'crm-01', name: 'Vikram Singhania', alias: 'D-Boss', role: 'Syndicate Don', relationship: 'Consignment Client', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-08', name: 'Ashok Gupta', alias: 'Broker', role: 'Customs CHA Agent', relationship: 'Documentation Proxy', riskScore: 82, avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-12', name: 'Harpreet "Gold" Brar', alias: 'Sardarji', role: 'Bullion Smuggler', relationship: 'Gold Transshipment Ally', riskScore: 87, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
    ],
    vehicles: [
      { id: 'veh-08', licensePlate: 'MH-46-AR-8800', make: 'Toyota', model: 'Innova Hycross ZX', year: 2024, color: 'Super White', registeredOwner: 'Ansari Marine Freight Lines', status: 'ACTIVE', lastSeenLocation: 'JNPT Uran Bypass Road', lastSeenTime: '2026-08-25 02:00' }
    ],
    phoneNumbers: [
      { id: 'ph-08', phoneNumber: '+91 98211 44920', carrier: 'Jio Maharashtra Maritime', imei: '864920048192088', ownerName: 'Farooq Ansari', status: 'TAPPED', totalCallsLogged: 410, lastActive: '2026-08-25 02:45', frequentContacts: [{ phoneNumber: '+91 98201 54910', contactName: 'Vikram Singhania', callCount: 42 }] }
    ],
    financialAccounts: [
      { id: 'fin-08', accountNumber: 'BOFA0001928471', bankName: 'Bank of Baroda - Belapur Branch', accountType: 'CHECKING', balance: 88000000, currency: 'INR', holderName: 'Ansari Container Freight Services', flaggedTransactionsCount: 22, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-05', name: 'Gujarat-Maharashtra Maritime Cartel', role: 'Port In-Charge', threatLevel: 'CRITICAL' },
      { id: 'org-01', name: 'Western Underworld Syndicate (D-Group)', role: 'Maritime Logistics Lead', threatLevel: 'HIGH' }
    ],
    tags: ['JNPT Smuggling', 'NCB Target', 'DRI Watchlist', 'Narcotics', 'Gold Contraband']
  },
  {
    id: 'crm-08',
    criminalId: 'CR-1192',
    name: 'Ashok "Broker" Gupta',
    alias: 'Dalal / CA Sahab',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80',
    age: 49,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Money Laundering',
    riskScore: 82,
    riskLevel: 'HIGH',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Nariman Point Financial District',
      city: 'Mumbai',
      country: 'India',
      coordinates: [18.9256, 72.8242],
    },
    lastActivity: '2026-08-25T05:00:00Z',
    knownAssociatesCount: 12,
    activeWarrants: 2,
    biography: 'Chartered Accountant creating fake shell entities, bogus circular trading invoices, and offshore routing layers across Mauritius and Dubai to launder syndicate proceeds.',
    aiThreatSummary: 'ED PMLA investigation found 84 bogus shell companies registered at single addresses in Mumbai and Kolkata.',
    personalDetails: {
      dob: '1977-03-22',
      bloodGroup: 'O+',
      fingerprintId: 'FP-MH-119283',
      eyeColor: 'Black',
      heightCm: 170,
      distinguishingMarks: ['Spectacles with silver frame'],
    },
    knownAssociates: [
      { id: 'crm-02', name: 'Suresh Patel', alias: 'Kuber', role: 'Hawala Chief', relationship: 'Corporate Laundering Partner', riskScore: 92, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-07', name: 'Farooq Ansari', alias: 'Port Shadow', role: 'Smuggler', relationship: 'Customs CHA Liaison', riskScore: 89, avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
    ],
    vehicles: [
      { id: 'veh-09', licensePlate: 'MH-01-DK-3344', make: 'Skoda', model: 'Superb L&K', year: 2024, color: 'Graphite Grey', registeredOwner: 'Gupta Financial Advisory Services', status: 'ACTIVE', lastSeenLocation: 'Marine Drive Mumbai', lastSeenTime: '2026-08-25 04:10' }
    ],
    phoneNumbers: [
      { id: 'ph-09', phoneNumber: '+91 98200 88712', carrier: 'Airtel Mumbai Postpaid', imei: '864920048192099', ownerName: 'Ashok Gupta', status: 'TAPPED', totalCallsLogged: 520, lastActive: '2026-08-25 04:45', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-09', accountNumber: 'KKBK0001928471', bankName: 'Kotak Mahindra Bank - Nariman Point', accountType: 'CHECKING', balance: 142000000, currency: 'INR', holderName: 'Apex Capital Ventures LLP', flaggedTransactionsCount: 38, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-03', name: 'Surat-Mumbai Angadia Network', role: 'Auditor & Facilitator', threatLevel: 'HIGH' },
      { id: 'org-01', name: 'Western Underworld Syndicate (D-Group)', role: 'Shell Architect', threatLevel: 'HIGH' }
    ],
    tags: ['Shell Companies', 'ED Radar', 'Money Laundering', 'Bogus Invoices', 'PMLA']
  },
  {
    id: 'crm-09',
    criminalId: 'CR-0098',
    name: 'Gaurav "Cyber" Sharma',
    alias: 'ByteLord / PhishKing',
    photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&auto=format&fit=crop&q=80',
    age: 27,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Cybercrime',
    riskScore: 84,
    riskLevel: 'HIGH',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Hitech City, Madhapur',
      city: 'Hyderabad',
      country: 'India',
      coordinates: [17.4435, 78.3772],
    },
    lastActivity: '2026-08-25T06:00:00Z',
    knownAssociatesCount: 9,
    activeWarrants: 3,
    biography: 'Operates advanced OTP phishing engines, fake government electricity bill payment APK trojans, and SIM swapping networks that target senior citizen bank accounts across south India.',
    aiThreatSummary: 'Telangana Cyber Security Bureau (TGCSB) tracking 120 fraudulent mule accounts receiving over ₹4 Crore weekly.',
    personalDetails: {
      dob: '1999-12-04',
      bloodGroup: 'B+',
      fingerprintId: 'FP-TS-009821',
      eyeColor: 'Black',
      heightCm: 176,
      distinguishingMarks: ['Flame tattoo on left wrist'],
    },
    knownAssociates: [
      { id: 'crm-04', name: 'Ananya Roy', alias: 'ZeroByte', role: 'Cyber Syndicate Head', relationship: 'Project Overseer', riskScore: 91, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-10', name: 'Rohan Mehra', alias: 'RootAdmin', role: 'Malware Dev', relationship: 'APK Author', riskScore: 79, avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-10', licensePlate: 'TS-09-UB-7700', make: 'Volkswagen', model: 'Virtus GT', year: 2024, color: 'Wild Cherry Red', registeredOwner: 'Gaurav Sharma', status: 'ACTIVE', lastSeenLocation: 'Cyber Towers Junction', lastSeenTime: '2026-08-25 05:20' }
    ],
    phoneNumbers: [
      { id: 'ph-10', phoneNumber: '+91 94401 22910', carrier: 'Jio Cyberabad 5G', imei: '864920048192100', ownerName: 'Gaurav Sharma', status: 'TAPPED', totalCallsLogged: 340, lastActive: '2026-08-25 05:50', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-10', accountNumber: 'UTIB0001928471', bankName: 'Axis Bank - Jubilee Hills', accountType: 'SAVINGS', balance: 24000000, currency: 'INR', holderName: 'Gaurav Sharma', flaggedTransactionsCount: 29, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-04', name: 'Eastern Cyber & Mahadev Betting Cartel', role: 'Phishing Operations Lead', threatLevel: 'HIGH' }
    ],
    tags: ['Cyber Fraud', 'SIM Swapping', 'APK Trojan', 'TGCSB Radar', 'Mule Accounts']
  },
  {
    id: 'crm-10',
    criminalId: 'CR-9901',
    name: 'Rohan "Coder" Mehra',
    alias: 'RootAdmin / KernelPanic',
    photoUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=300&auto=format&fit=crop&q=80',
    age: 26,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Cybercrime',
    riskScore: 79,
    riskLevel: 'MEDIUM',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Koramangala 4th Block',
      city: 'Bengaluru',
      country: 'India',
      coordinates: [12.9352, 77.6245],
    },
    lastActivity: '2026-08-25T02:30:00Z',
    knownAssociatesCount: 6,
    activeWarrants: 2,
    biography: 'Elite reverse engineer writing custom ransomware and payload droppers deployed against Indian cooperative banks and healthcare servers.',
    aiThreatSummary: 'GitHub commit patterns link him to recently leaked Zero-Day targeting Indian banking APIs.',
    personalDetails: {
      dob: '2000-03-14',
      bloodGroup: 'A+',
      fingerprintId: 'FP-KA-990182',
      eyeColor: 'Black',
      heightCm: 174,
      distinguishingMarks: ['Glasses', 'Piercing on left ear'],
    },
    knownAssociates: [
      { id: 'crm-04', name: 'Ananya Roy', alias: 'ZeroByte', role: 'Syndicate Head', relationship: 'Client', riskScore: 91, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-09', name: 'Gaurav Sharma', alias: 'ByteLord', role: 'Phishing Lead', relationship: 'Collaborator', riskScore: 84, avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-11', licensePlate: 'KA-03-MB-4040', make: 'Ather', model: '450X Gen 3', year: 2024, color: 'Space Grey', registeredOwner: 'Rohan Mehra', status: 'ACTIVE', lastSeenLocation: 'Sony World Junction Koramangala', lastSeenTime: '2026-08-25 01:50' }
    ],
    phoneNumbers: [
      { id: 'ph-11', phoneNumber: '+91 98450 11920', carrier: 'Airtel Bengaluru 5G', imei: '864920048192111', ownerName: 'Rohan Mehra', status: 'TAPPED', totalCallsLogged: 180, lastActive: '2026-08-25 02:10', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-11', accountNumber: '0x88ba928174019284102', bankName: 'Monero Native Wallet', accountType: 'CRYPTO_WALLET', balance: 18500000, currency: 'INR', holderName: 'RootAdmin Vault', flaggedTransactionsCount: 19, status: 'ACTIVE' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-04', name: 'Eastern Cyber & Mahadev Betting Cartel', role: 'Exploit Engineer', threatLevel: 'HIGH' }
    ],
    tags: ['Ransomware', 'Darknet', 'Zero-Day', 'Bengaluru Cyber Cell']
  },
  {
    id: 'crm-11',
    criminalId: 'CR-8821',
    name: 'Vijay "Bahubali" Tiwari',
    alias: 'Panditji / Don of Purvanchal',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    age: 51,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Extortion',
    riskScore: 86,
    riskLevel: 'HIGH',
    status: 'IN_CUSTODY',
    lastKnownLocation: {
      address: 'Naini Central Jail',
      city: 'Prayagraj',
      country: 'India',
      coordinates: [25.4358, 81.8463],
    },
    lastActivity: '2026-08-24T14:00:00Z',
    knownAssociatesCount: 13,
    activeWarrants: 14,
    biography: 'Purvanchal ganglord controlling government railway contract tenders, illegal sand mining on the Ganges basin, and illicit weapons flow across UP and Bihar.',
    aiThreatSummary: 'Currently in high-security isolation. Intelligence reports confirm he runs syndicate operations using smuggled 5G smartphone from inside the barracks.',
    personalDetails: {
      dob: '1975-08-11',
      bloodGroup: 'O+',
      fingerprintId: 'FP-UP-882190',
      eyeColor: 'Dark Brown',
      heightCm: 180,
      distinguishingMarks: ['Tilak mark forehead', 'Scar on right shoulder'],
    },
    knownAssociates: [
      { id: 'crm-05', name: 'Devendra Rawat', alias: 'NCR Bahubali', role: 'Alliance Partner', relationship: 'Mining Cartel Partner', riskScore: 93, avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-03', name: 'Kabir Deshmukh', alias: 'Shooter', role: 'Arms Supplier', relationship: 'Weapons Conduit', riskScore: 95, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-12', licensePlate: 'UP-70-AA-0007', make: 'Toyota', model: 'Fortuner 4x4', year: 2023, color: 'White', registeredOwner: 'Tiwari Construction Prayagraj', status: 'IMPOUNDED', lastSeenLocation: 'Prayagraj Police Lines', lastSeenTime: '2026-08-20 12:00' }
    ],
    phoneNumbers: [
      { id: 'ph-12', phoneNumber: '+91 94150 99210', carrier: 'BSNL UP East (Jail Intercept)', imei: '864920048192122', ownerName: 'Clandestine Jail Line', status: 'TAPPED', totalCallsLogged: 95, lastActive: '2026-08-24 13:40', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-12', accountNumber: 'BARB0001928471', bankName: 'Bank of Baroda - Civil Lines Prayagraj', accountType: 'CHECKING', balance: 92000000, currency: 'INR', holderName: 'Purvanchal Minerals Pvt Ltd', flaggedTransactionsCount: 14, status: 'FROZEN' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-02', name: 'Northern Gangland Logistics', role: 'Purvanchal Syndicate Boss', threatLevel: 'HIGH' }
    ],
    tags: ['Purvanchal Don', 'Contract Mafia', 'UP Police STF', 'Jail Intercept']
  },
  {
    id: 'crm-12',
    criminalId: 'CR-7722',
    name: 'Harpreet "Gold" Brar',
    alias: 'Sardarji / Dubai King',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    age: 46,
    gender: 'Male',
    nationality: 'Indian',
    crimeCategory: 'Drug Trafficking',
    riskScore: 87,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Sector 17 Market',
      city: 'Chandigarh',
      country: 'India',
      coordinates: [30.7333, 76.7794],
    },
    lastActivity: '2026-08-25T01:10:00Z',
    knownAssociatesCount: 10,
    activeWarrants: 5,
    biography: 'Controls border drone drop narcotics networks across the Punjab international border and transnational gold bullion smuggling through Dubai flights arriving at Amritsar and Delhi airports.',
    aiThreatSummary: 'BSF & NCB joint operation seized 14 kg high-grade contraband and 8 kg 24K gold bars linked to his Chandigarh transit hub.',
    personalDetails: {
      dob: '1980-10-05',
      bloodGroup: 'B+',
      fingerprintId: 'FP-PB-772210',
      eyeColor: 'Dark Brown',
      heightCm: 184,
      distinguishingMarks: ['Turban', 'Flowing beard', 'Gold kada on right hand'],
    },
    knownAssociates: [
      { id: 'crm-07', name: 'Farooq Ansari', alias: 'Port Shadow', role: 'Maritime Handler', relationship: 'Gold Transshipment Ally', riskScore: 89, avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-02', name: 'Suresh Patel', alias: 'Kuber', role: 'Hawala Chief', relationship: 'Bullion-Hawala Settlement', riskScore: 92, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-13', licensePlate: 'CH-01-CB-9999', make: 'Mercedes-Benz', model: 'GLS 450d', year: 2024, color: 'Polar White', registeredOwner: 'Brar Transport Corp Chandigarh', status: 'ACTIVE', lastSeenLocation: 'Zirakpur Flyover Chandigarh', lastSeenTime: '2026-08-25 00:30' }
    ],
    phoneNumbers: [
      { id: 'ph-13', phoneNumber: '+91 98722 00192', carrier: 'Airtel Punjab VIP', imei: '864920048192133', ownerName: 'Harpreet Brar', status: 'TAPPED', totalCallsLogged: 290, lastActive: '2026-08-25 00:50', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-13', accountNumber: 'HDFC0004910294', bankName: 'HDFC Bank - Sector 35 Chandigarh', accountType: 'CHECKING', balance: 118000000, currency: 'INR', holderName: 'Brar Agro Trading LLP', flaggedTransactionsCount: 21, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-06', name: 'Punjab Border & Cross-Border Drone Syndicate', role: 'Supreme Chief', threatLevel: 'CRITICAL' }
    ],
    tags: ['Drone Smuggling', 'Gold Bullion', 'Punjab Police', 'NCB Radar', 'Border Corridor']
  }
];
