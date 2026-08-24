import { Criminal } from '../../types';

export const dummyCriminals: Criminal[] = [
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
    lastKnownLocation: {
      address: 'Strada Lipscani 14',
      city: 'Bucharest',
      country: 'Romania',
      coordinates: [44.4323, 26.1011],
    },
    lastActivity: '2026-08-24T06:12:00Z',
    knownAssociatesCount: 14,
    activeWarrants: 5,
    biography: 'Mastermind behind the Vanguard Cyber Syndicate. Specializes in infrastructure extortion, central bank wire interceptors, and high-frequency ransomware distribution across NATO defense contractors.',
    aiThreatSummary: 'High probability of upcoming cyber offensive against critical energy grids. Intercepted PGP keys indicate collaboration with arms broker Dimitri Costa for hardware acquisition.',
    personalDetails: {
      dob: '1988-04-12',
      bloodGroup: 'A+',
      fingerprintId: 'FP-RO-992140',
      eyeColor: 'Blue',
      heightCm: 182,
      distinguishingMarks: ['Scar on left temple', 'Circuit tattoo on right forearm'],
    },
    knownAssociates: [
      { id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker', role: 'Money Launderer', relationship: 'Crypto Washing Partner', riskScore: 88, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-03', name: 'Helena Vance', alias: 'The Architect', role: 'Logistics Handler', relationship: 'Hardware Smuggling Route', riskScore: 91, avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-09', name: 'Astrid Lindqvist', alias: 'Zero', role: 'DevSecOps Specialist', relationship: 'Darknet Server Custodian', riskScore: 74, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    ],
    vehicles: [
      { id: 'veh-01', licensePlate: 'B-77-VNG', make: 'Audi', model: 'RS7 Black Edition', year: 2024, color: 'Matte Black', registeredOwner: 'Vanguard Cyber Logistics SRL', status: 'ACTIVE', lastSeenLocation: 'Bucharest Sector 1', lastSeenTime: '2026-08-23 23:45' },
      { id: 'veh-02', licensePlate: 'ZH-90218', make: 'Porsche', model: 'Taycan Turbo S', year: 2025, color: 'Slate Grey', registeredOwner: 'Decoy Lease Zurich', status: 'SIGHTED', lastSeenLocation: 'Geneva Airport', lastSeenTime: '2026-08-19 14:10' }
    ],
    phoneNumbers: [
      { id: 'ph-01', phoneNumber: '+40 721 899 432', carrier: 'Orange Romania (Encrypted SIM)', imei: '864920048192014', ownerName: 'Viktor Markov', status: 'TAPPED', totalCallsLogged: 420, lastActive: '2026-08-24 05:40', frequentContacts: [{ phoneNumber: '+971 50 882 1099', contactName: 'Tariq Mansoor', callCount: 48 }] },
      { id: 'ph-02', phoneNumber: '+46 70 123 4567', carrier: 'Tele2 Ghost Burner', imei: '358920098716254', ownerName: 'Unknown', status: 'BURNER', totalCallsLogged: 15, lastActive: '2026-08-22 01:12', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-01', accountNumber: 'RO49BTRL9940129401', bankName: 'Banca Transilvania (Decoy Corp)', accountType: 'SHELL_CORP', balance: 4250000, currency: 'EUR', holderName: 'Vanguard Cyber Tech', flaggedTransactionsCount: 14, status: 'MONITORED' },
      { id: 'fin-02', accountNumber: 'bc1q9x0283mzk28941kzl02941', bankName: 'Bitcoin Native Cluster', accountType: 'CRYPTO_WALLET', balance: 18450000, currency: 'USD', holderName: 'Spectre Vault', flaggedTransactionsCount: 88, status: 'ACTIVE' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-01', name: 'Vanguard Cyber Syndicate', role: 'Founding Commander', threatLevel: 'CRITICAL' },
      { id: 'org-07', name: 'Apex Crypto Yield Trust', role: 'Shadow Beneficiary', threatLevel: 'HIGH' }
    ],
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
    lastKnownLocation: {
      address: 'Howard Boulevard Bldg 302',
      city: 'Panama City',
      country: 'Panama',
      coordinates: [8.9500, -79.5997],
    },
    lastActivity: '2026-08-23T22:15:00Z',
    knownAssociatesCount: 28,
    activeWarrants: 8,
    biography: 'Directs maritime transit pipelines for multi-ton narcotics shipments originating from Valle del Cauca into Rotterdam and Antwerp via automated GPS-guided submersibles.',
    aiThreatSummary: 'Recent shipment of 4.2 tons flagged entering Antwerp. Financial trail shows large escrow released to Helena Vance for Rotterdam port security override.',
    personalDetails: {
      dob: '1977-09-03',
      bloodGroup: 'O+',
      fingerprintId: 'FP-CO-881920',
      eyeColor: 'Dark Brown',
      heightCm: 176,
      distinguishingMarks: ['Jaguar claw tattoo across neck', 'Missing index fingertip'],
    },
    knownAssociates: [
      { id: 'crm-03', name: 'Helena Vance', alias: 'The Architect', role: 'Port Freight Handler', relationship: 'Rotterdam Ingress Partner', riskScore: 91, avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker', role: 'Financial Mixer', relationship: 'Panama Escrow Layering', riskScore: 88, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-10', name: 'Youssef Kabbaj', alias: 'Sandstorm', role: 'Transit Broker', relationship: 'West Africa Transit Route', riskScore: 82, avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-03', licensePlate: 'PAN-9941', make: 'Toyota', model: 'Land Cruiser 300 Armored B7', year: 2024, color: 'Midnight Bronze', registeredOwner: 'Pacific Maritime Holdings', status: 'ACTIVE', lastSeenLocation: 'Panama Pacifico', lastSeenTime: '2026-08-23 18:20' }
    ],
    phoneNumbers: [
      { id: 'ph-03', phoneNumber: '+507 6821 9901', carrier: 'Cable & Wireless Panama', imei: '869018239019283', ownerName: 'Mateo Silva', status: 'TAPPED', totalCallsLogged: 530, lastActive: '2026-08-23 21:00', frequentContacts: [{ phoneNumber: '+49 171 902188', contactName: 'Helena Vance', callCount: 64 }] }
    ],
    financialAccounts: [
      { id: 'fin-03', accountNumber: 'PA92BG60192830192', bankName: 'Banco General Panama', accountType: 'OFFSHORE', balance: 32000000, currency: 'USD', holderName: 'Blue Tide Maritime SA', flaggedTransactionsCount: 32, status: 'ACTIVE' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-02', name: 'Cali-Medellin Maritime Coalition', role: 'High Commander', threatLevel: 'CRITICAL' }
    ],
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
    lastKnownLocation: {
      address: 'Am Sandtorkai 64',
      city: 'Hamburg',
      country: 'Germany',
      coordinates: [53.5413, 9.9882],
    },
    lastActivity: '2026-08-24T08:30:00Z',
    knownAssociatesCount: 19,
    activeWarrants: 2,
    biography: 'Elite logistics architect operating out of Hamburg and Rotterdam. Coordinates illicit customs manifests, high-value port clearances, and complex trade-based money laundering schemes.',
    aiThreatSummary: 'Surveillance spotted meeting at Club Obsidian Lisbon with arms dealer Dimitri Costa. Multiple freight transfers registered under shell company Eurasian Logistics.',
    personalDetails: {
      dob: '1982-11-19',
      bloodGroup: 'B-',
      fingerprintId: 'FP-DE-391028',
      eyeColor: 'Green',
      heightCm: 174,
      distinguishingMarks: ['Platinum hair streak', 'Surgical scar right collarbone'],
    },
    knownAssociates: [
      { id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer', role: 'Cyber Financier', relationship: 'Decoy Server Leasing', riskScore: 96, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-02', name: 'Mateo Silva', alias: 'El Serpiente', role: 'Cartel Boss', relationship: 'Freight Consignment', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer', role: 'Arms Smuggler', relationship: 'Cargo Manifest Masking', riskScore: 89, avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-04', licensePlate: 'HH-HV-8800', make: 'Mercedes-Benz', model: 'S680 Maybach', year: 2025, color: 'Obsidian Black', registeredOwner: 'Eurasian Logistics GmbH', status: 'ACTIVE', lastSeenLocation: 'Hamburg HafenCity', lastSeenTime: '2026-08-24 07:15' }
    ],
    phoneNumbers: [
      { id: 'ph-04', phoneNumber: '+49 171 902188', carrier: 'Deutsche Telekom Enterprise', imei: '351982001928471', ownerName: 'Helena Vance', status: 'TAPPED', totalCallsLogged: 710, lastActive: '2026-08-24 08:20', frequentContacts: [{ phoneNumber: '+30 694 201 8899', contactName: 'Dimitri Costa', callCount: 39 }] }
    ],
    financialAccounts: [
      { id: 'fin-04', accountNumber: 'DE89200800001892019283', bankName: 'Deutsche Bank Commercial', accountType: 'CHECKING', balance: 14200000, currency: 'EUR', holderName: 'Eurasian Logistics GmbH', flaggedTransactionsCount: 19, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-03', name: 'Eurasian Logistics & Metals GmbH', role: 'Managing Director', threatLevel: 'HIGH' }
    ],
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
    lastKnownLocation: {
      address: 'Charoen Krung Rd, Bang Kho Laem',
      city: 'Bangkok',
      country: 'Thailand',
      coordinates: [13.7029, 100.4998],
    },
    lastActivity: '2026-08-24T03:45:00Z',
    knownAssociatesCount: 22,
    activeWarrants: 6,
    biography: 'Chief chemical synthesis supplier and automated drone component smuggler across the Mekong river corridor into South-East Asia and Europe.',
    aiThreatSummary: 'Bulk shipment of optical drone guidance modules traced from Shenzhen to Bangkok port warehouse B7. High threat of weaponized UAV assembly.',
    personalDetails: {
      dob: '1974-06-28',
      bloodGroup: 'AB+',
      fingerprintId: 'FP-TH-994012',
      eyeColor: 'Brown',
      heightCm: 168,
      distinguishingMarks: ['Dragon tattoo across back', 'Glasses with gold frames'],
    },
    knownAssociates: [
      { id: 'crm-05', name: 'Raymond Leung', alias: 'Red Dragon', role: 'Triad Enforcer', relationship: 'Hong Kong Distribution', riskScore: 86, avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer', role: 'Arms Smuggler', relationship: 'Electronic Triggers Supplier', riskScore: 89, avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-05', licensePlate: 'BKK-8899', make: 'Lexus', model: 'LX600 Bulletproof', year: 2024, color: 'Pearl White', registeredOwner: 'Siam Golden Phoenix Import', status: 'ACTIVE', lastSeenLocation: 'Bangkok Riverside', lastSeenTime: '2026-08-23 20:10' }
    ],
    phoneNumbers: [
      { id: 'ph-05', phoneNumber: '+66 81 902 4432', carrier: 'AIS Thailand (Satellite Encrypted)', imei: '862019284019284', ownerName: 'Chen Wei', status: 'TAPPED', totalCallsLogged: 340, lastActive: '2026-08-24 02:30', frequentContacts: [{ phoneNumber: '+852 9123 4567', contactName: 'Raymond Leung', callCount: 52 }] }
    ],
    financialAccounts: [
      { id: 'fin-05', accountNumber: 'TH020088192019481', bankName: 'Bangkok Bank International', accountType: 'SHELL_CORP', balance: 19800000, currency: 'USD', holderName: 'Siam Golden Chem Ltd', flaggedTransactionsCount: 27, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-04', name: 'Shadow Viper Syndicate', role: 'Chief Chemist & Logistics Leader', threatLevel: 'CRITICAL' }
    ],
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
    lastKnownLocation: {
      address: 'Canton Road 88, Tsim Sha Tsui',
      city: 'Hong Kong',
      country: 'Hong Kong',
      coordinates: [22.3022, 114.1685],
    },
    lastActivity: '2026-08-24T05:00:00Z',
    knownAssociatesCount: 31,
    activeWarrants: 3,
    biography: 'Long-standing elder of the Kowloon Waterfront Brotherhood. Controls casino junkets, maritime extortion protection rings, and underground VIP VIP gaming chips exchange.',
    aiThreatSummary: 'Recent extortion spike against shipping conglomerates in Victoria Harbour. Transferred $4.5M equivalent in casino markers to Tariq Mansoor for laundering.',
    personalDetails: {
      dob: '1968-02-14',
      bloodGroup: 'O-',
      fingerprintId: 'FP-HK-109283',
      eyeColor: 'Dark Brown',
      heightCm: 172,
      distinguishingMarks: ['Jade ring on thumb', 'Dragon claw scar across collar'],
    },
    knownAssociates: [
      { id: 'crm-04', name: 'Chen Wei', alias: 'The Chemist', role: 'Syndicate Chemist', relationship: 'Mekong Supply Line', riskScore: 94, avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker', role: 'Crypto Mixer', relationship: 'Macau Chip Washing', riskScore: 88, avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-06', licensePlate: 'HK-9999', make: 'Rolls-Royce', model: 'Phantom VIII', year: 2024, color: 'Imperial Blue', registeredOwner: 'Kowloon Dragon Holdings', status: 'ACTIVE', lastSeenLocation: 'The Peninsula HK', lastSeenTime: '2026-08-23 21:30' }
    ],
    phoneNumbers: [
      { id: 'ph-06', phoneNumber: '+852 9123 4567', carrier: 'SmarTone HK', imei: '861029384918274', ownerName: 'Raymond Leung', status: 'TAPPED', totalCallsLogged: 490, lastActive: '2026-08-24 04:50', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-06', accountNumber: 'HK0891029381928', bankName: 'HSBC Commercial (Offshore trust)', accountType: 'SAVINGS', balance: 28500000, currency: 'USD', holderName: 'Dragon Ocean Investment', flaggedTransactionsCount: 15, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-05', name: 'Kowloon Waterfront Brotherhood', role: 'Chairman / Dragon Head', threatLevel: 'HIGH' }
    ],
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
    lastKnownLocation: {
      address: 'Akti Miaouli 10',
      city: 'Piraeus',
      country: 'Greece',
      coordinates: [37.9402, 23.6385],
    },
    lastActivity: '2026-08-24T07:10:00Z',
    knownAssociatesCount: 16,
    activeWarrants: 4,
    biography: 'Specialized illicit arms broker supplying military hardware, anti-tank munitions, and modified reconnaissance drones across Mediterranean and Middle Eastern conflict corridors.',
    aiThreatSummary: 'Intercepted manifest shows 120 guided surface-to-surface units diverted from Port of Piraeus under fake agricultural equipment labels.',
    personalDetails: {
      dob: '1979-05-10',
      bloodGroup: 'A-',
      fingerprintId: 'FP-GR-883912',
      eyeColor: 'Hazel',
      heightCm: 185,
      distinguishingMarks: ['Anchor tattoo on neck', 'Burn scar left shoulder'],
    },
    knownAssociates: [
      { id: 'crm-03', name: 'Helena Vance', alias: 'The Architect', role: 'Logistics Handler', relationship: 'Vessel Charter Masking', riskScore: 91, avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-08', name: 'Goran Dragovic', alias: 'Iron Fist', role: 'Balkan Transporter', relationship: 'Overland Route Supplier', riskScore: 78, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-07', licensePlate: 'GR-PIR-4421', make: 'BMW', model: 'X7 M60i Armored', year: 2024, color: 'Carbon Black', registeredOwner: 'Aegean Maritime Charter Ltd', status: 'ACTIVE', lastSeenLocation: 'Piraeus Port Gate 4', lastSeenTime: '2026-08-24 06:45' }
    ],
    phoneNumbers: [
      { id: 'ph-07', phoneNumber: '+30 694 201 8899', carrier: 'Cosmote Greece', imei: '359019284910293', ownerName: 'Dimitri Costa', status: 'TAPPED', totalCallsLogged: 410, lastActive: '2026-08-24 07:05', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-07', accountNumber: 'CY89002019283019283', bankName: 'Bank of Cyprus (Offshore trust)', accountType: 'OFFSHORE', balance: 11400000, currency: 'EUR', holderName: 'Aegean Charter Assets', flaggedTransactionsCount: 22, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-06', name: 'Aegean Arms & Charter Group', role: 'Chief Executive', threatLevel: 'HIGH' }
    ],
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
    lastKnownLocation: {
      address: 'Dubai Marina Yacht Club, Al Marsa St',
      city: 'Dubai',
      country: 'UAE',
      coordinates: [25.0805, 55.1403],
    },
    lastActivity: '2026-08-24T08:15:00Z',
    knownAssociatesCount: 25,
    activeWarrants: 2,
    biography: 'Architect of decentralized crypto mixers and ultra-luxury real estate layering networks across Dubai, London, and the Caymans.',
    aiThreatSummary: 'Layered over $85M in crypto assets during the last 90 days. Key node connecting Viktor Markov, Mateo Silva, and Raymond Leung in unified wash network.',
    personalDetails: {
      dob: '1985-08-22',
      bloodGroup: 'B+',
      fingerprintId: 'FP-AE-901823',
      eyeColor: 'Amber Brown',
      heightCm: 180,
      distinguishingMarks: ['Patek Philippe custom tourbillon', 'Eagle tattoo on wrist'],
    },
    knownAssociates: [
      { id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer', role: 'Cyber Commander', relationship: 'Tether Liquidity Provider', riskScore: 96, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-02', name: 'Mateo Silva', alias: 'El Serpiente', role: 'Cartel Boss', relationship: 'Offshore Escrow Structuring', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' },
      { id: 'crm-05', name: 'Raymond Leung', alias: 'Red Dragon', role: 'Triad Head', relationship: 'Macau Junket Wire Integration', riskScore: 86, avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-08', licensePlate: 'DXB-K-77', make: 'Bentley', model: 'Flying Spur Mulliner', year: 2025, color: 'Glacier White', registeredOwner: 'Apex Crypto Trust FZE', status: 'ACTIVE', lastSeenLocation: 'DIFC Gate Precinct', lastSeenTime: '2026-08-24 07:30' }
    ],
    phoneNumbers: [
      { id: 'ph-08', phoneNumber: '+971 50 882 1099', carrier: 'Etisalat UAE VIP Encrypted', imei: '352910293840192', ownerName: 'Tariq Mansoor', status: 'TAPPED', totalCallsLogged: 840, lastActive: '2026-08-24 08:10', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-08', accountNumber: 'AE820330001928301928301', bankName: 'Emirates NBD Corporate', accountType: 'OFFSHORE', balance: 54000000, currency: 'USD', holderName: 'Apex Yield Holdings LLC', flaggedTransactionsCount: 45, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-07', name: 'Apex Crypto Yield Trust', role: 'Managing Partner', threatLevel: 'HIGH' }
    ],
    tags: ['Crypto Laundering Master', 'Hawala Operator', 'High-Frequency Layering']
  },
  {
    id: 'crm-08',
    criminalId: 'CR-6204',
    name: 'Goran Dragovic',
    alias: 'Iron Fist / Vuk',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
    age: 46,
    gender: 'Male',
    nationality: 'Serbian',
    crimeCategory: 'Organized Heist',
    riskScore: 78,
    riskLevel: 'MEDIUM',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Usce bb, New Belgrade',
      city: 'Belgrade',
      country: 'Serbia',
      coordinates: [44.8211, 20.4431],
    },
    lastActivity: '2026-08-23T19:40:00Z',
    knownAssociatesCount: 18,
    activeWarrants: 2,
    biography: 'Commander of the Balkan Transit Union. Manages armed overland convoy logistics, diamond heists, and contraband protection across the Pan-European Corridor X.',
    aiThreatSummary: 'Corridor reconnaissance detected near Austrian-Hungarian border. Possible coordination with Dimitri Costa for convoy escort.',
    personalDetails: {
      dob: '1980-03-17',
      bloodGroup: 'O+',
      fingerprintId: 'FP-RS-772810',
      eyeColor: 'Blue-Grey',
      heightCm: 191,
      distinguishingMarks: ['Wolf head tattoo on chest', 'Broken nose bridge'],
    },
    knownAssociates: [
      { id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer', role: 'Weapons Supplier', relationship: 'Overland Route Protection', riskScore: 89, avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-09', licensePlate: 'BG-992-IF', make: 'Mercedes-Benz', model: 'G63 AMG Armored', year: 2024, color: 'Obsidian Black', registeredOwner: 'Balkan Transit Union', status: 'ACTIVE', lastSeenLocation: 'Belgrade Waterfront', lastSeenTime: '2026-08-23 19:00' }
    ],
    phoneNumbers: [
      { id: 'ph-09', phoneNumber: '+381 64 901 2289', carrier: 'MTS Serbia', imei: '861920192847192', ownerName: 'Goran Dragovic', status: 'ACTIVE', totalCallsLogged: 290, lastActive: '2026-08-23 19:35', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-09', accountNumber: 'RS3516000019283019283', bankName: 'Banca Intesa Beograd', accountType: 'CHECKING', balance: 3400000, currency: 'EUR', holderName: 'Transit Union Logistics', flaggedTransactionsCount: 11, status: 'ACTIVE' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-08', name: 'Balkan Transit Union', role: 'Field Commander', threatLevel: 'MEDIUM' }
    ],
    tags: ['Armed Convoy Leader', 'Corridor X Control', 'Diamond Smuggler']
  },
  {
    id: 'crm-09',
    criminalId: 'CR-2210',
    name: 'Astrid Lindqvist',
    alias: 'Zero / Glitch',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    age: 31,
    gender: 'Female',
    nationality: 'Swedish',
    crimeCategory: 'Cybercrime',
    riskScore: 74,
    riskLevel: 'MEDIUM',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: {
      address: 'Kista Science City, Isafjordsgatan 22',
      city: 'Stockholm',
      country: 'Sweden',
      coordinates: [59.4042, 17.9506],
    },
    lastActivity: '2026-08-24T07:45:00Z',
    knownAssociatesCount: 9,
    activeWarrants: 1,
    biography: 'Elite infrastructure architect and zero-knowledge cryptography researcher. Maintains bulletproof VPS server farms and encrypted backup relays for Viktor Markov.',
    aiThreatSummary: 'Detected spin-up of 60 ephemeral Kubernetes clusters routing high-volume Tor hidden services. AI warns of imminent DDoS attack masking database exfiltration.',
    personalDetails: {
      dob: '1995-10-04',
      bloodGroup: 'A-',
      fingerprintId: 'FP-SE-448192',
      eyeColor: 'Ice Blue',
      heightCm: 170,
      distinguishingMarks: ['Binary tattoo behind left ear', 'Silver nose ring'],
    },
    knownAssociates: [
      { id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer', role: 'Syndicate Boss', relationship: 'Infrastructure Provider', riskScore: 96, avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-10', licensePlate: 'SWE-ZRO-01', make: 'Polestar', model: 'Polestar 4 Dual Motor', year: 2025, color: 'Snow White', registeredOwner: 'Nordic Sovereign Vault Ltd', status: 'ACTIVE', lastSeenLocation: 'Stockholm Central', lastSeenTime: '2026-08-24 06:30' }
    ],
    phoneNumbers: [
      { id: 'ph-10', phoneNumber: '+46 8 555 901 22', carrier: 'Telia Sweden (Signal Only)', imei: '351029384910293', ownerName: 'Astrid Lindqvist', status: 'TAPPED', totalCallsLogged: 180, lastActive: '2026-08-24 07:40', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-10', accountNumber: 'SE89500000000591029381', bankName: 'SEB Stockholm', accountType: 'SAVINGS', balance: 1850000, currency: 'SEK', holderName: 'Nordic Sovereign Vault', flaggedTransactionsCount: 6, status: 'ACTIVE' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-09', name: 'Nordic Sovereign Vault Ltd', role: 'Lead Cryptographer', threatLevel: 'MEDIUM' }
    ],
    tags: ['Bulletproof Hosting', 'Tor Operator', 'Zero-Knowledge Cryptography']
  },
  {
    id: 'crm-10',
    criminalId: 'CR-8830',
    name: 'Youssef Kabbaj',
    alias: 'Sandstorm / El Mirage',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 51,
    gender: 'Male',
    nationality: 'Moroccan / Nigerien',
    crimeCategory: 'Human Trafficking',
    riskScore: 82,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: {
      address: 'Route de Tahoua Km 12',
      city: 'Agadez',
      country: 'Niger',
      coordinates: [16.9754, 7.9890],
    },
    lastActivity: '2026-08-23T16:20:00Z',
    knownAssociatesCount: 20,
    activeWarrants: 4,
    biography: 'Controls Trans-Saharan illicit transport networks. Coordinates clandestine convoys transporting high-value contraband and illegal crossing corridors between West Africa and the Mediterranean.',
    aiThreatSummary: 'Satellite reconnaissance detected a 14-vehicle convoy leaving Agadez heading towards Libyan border corridor.',
    personalDetails: {
      dob: '1975-01-29',
      bloodGroup: 'B+',
      fingerprintId: 'FP-MA-881902',
      eyeColor: 'Brown',
      heightCm: 178,
      distinguishingMarks: ['Deep scar right cheek', 'Silver tuareg ring on index finger'],
    },
    knownAssociates: [
      { id: 'crm-02', name: 'Mateo Silva', alias: 'El Serpiente', role: 'Cartel Leader', relationship: 'Transit Point Facilitator', riskScore: 98, avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80' }
    ],
    vehicles: [
      { id: 'veh-11', licensePlate: 'NER-AGZ-99', make: 'Toyota', model: 'Land Cruiser 79 Series Offroad', year: 2023, color: 'Sand Beige', registeredOwner: 'Atlas Sahara Transport', status: 'ACTIVE', lastSeenLocation: 'Agadez Outpost', lastSeenTime: '2026-08-23 15:45' }
    ],
    phoneNumbers: [
      { id: 'ph-11', phoneNumber: '+227 90 12 34 56', carrier: 'Airtel Niger (Thuraya Satellite)', imei: '861029384910293', ownerName: 'Youssef Kabbaj', status: 'TAPPED', totalCallsLogged: 310, lastActive: '2026-08-23 16:15', frequentContacts: [] }
    ],
    financialAccounts: [
      { id: 'fin-11', accountNumber: 'NE88001019283019283', bankName: 'Bank of Africa Niger', accountType: 'CHECKING', balance: 2100000, currency: 'USD', holderName: 'Atlas Transport Agadez', flaggedTransactionsCount: 8, status: 'MONITORED' }
    ],
    timeline: [],
    connectedOrganizations: [
      { id: 'org-10', name: 'Atlas Sahara Transport', role: 'Master Navigator & Founder', threatLevel: 'HIGH' }
    ],
    tags: ['Trans-Sahara Corridor', 'Contraband Convoy', 'Satellite Phone User']
  },
  {
    id: 'crm-11',
    criminalId: 'CR-1102',
    name: 'Carlos "El Fuego" Ortiz',
    alias: 'El Fuego',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    age: 39,
    gender: 'Male',
    nationality: 'Mexican',
    crimeCategory: 'Drug Trafficking',
    riskScore: 84,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: { address: 'Calle 50 #12-45', city: 'Medellin', country: 'Colombia', coordinates: [6.2442, -75.5812] },
    lastActivity: '2026-08-24T01:10:00Z',
    knownAssociatesCount: 15,
    activeWarrants: 3,
    biography: 'Logistics coordinator for Cali-Medellin shipments through Central American air strips.',
    aiThreatSummary: 'Radio transmissions intercepted linking Ortiz to clandestine flight plans in Guatemala.',
    personalDetails: { dob: '1987-07-15', heightCm: 175, eyeColor: 'Brown' },
    knownAssociates: [{ id: 'crm-02', name: 'Mateo Silva', alias: 'El Serpiente', role: 'Cartel Leader', relationship: 'Direct Lieutenant', riskScore: 98 }],
    vehicles: [{ id: 'veh-12', licensePlate: 'MED-7711', make: 'Chevrolet', model: 'Tahoe Premier', year: 2024, color: 'Dark Grey', registeredOwner: 'Carlos Ortiz', status: 'ACTIVE', lastSeenLocation: 'Medellin Poblado', lastSeenTime: '2026-08-23 23:00' }],
    phoneNumbers: [{ id: 'ph-12', phoneNumber: '+57 310 889 2011', carrier: 'Claro Colombia', imei: '861920192847111', ownerName: 'Carlos Ortiz', status: 'TAPPED', totalCallsLogged: 210, lastActive: '2026-08-24 01:00', frequentContacts: [] }],
    financialAccounts: [{ id: 'fin-12', accountNumber: 'CO89102938192830', bankName: 'Bancolombia', accountType: 'CHECKING', balance: 1450000, currency: 'USD', holderName: 'Ortiz Agro Export', flaggedTransactionsCount: 9, status: 'MONITORED' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-02', name: 'Cali-Medellin Maritime Coalition', role: 'Operations Lieutenant', threatLevel: 'CRITICAL' }],
    tags: ['Aviation Smuggler', 'Cali Cartel', 'High Threat']
  },
  {
    id: 'crm-12',
    criminalId: 'CR-3349',
    name: 'Ekaterina Romanova',
    alias: 'The Fox / Tsarina',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    age: 36,
    gender: 'Female',
    nationality: 'Russian / Cypriot',
    crimeCategory: 'Money Laundering',
    riskScore: 79,
    riskLevel: 'MEDIUM',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: { address: 'Limassol Marina Block B', city: 'Limassol', country: 'Cyprus', coordinates: [34.6718, 33.0413] },
    lastActivity: '2026-08-24T06:40:00Z',
    knownAssociatesCount: 11,
    activeWarrants: 1,
    biography: 'Specializes in Cypriot shell corporate governance, trust re-incorporation, and real estate layering for Eastern European syndicates.',
    aiThreatSummary: 'Formed 8 new holding entities in Belize and Seychelles in the past 14 days.',
    personalDetails: { dob: '1990-12-05', heightCm: 177, eyeColor: 'Green' },
    knownAssociates: [{ id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer', role: 'Cyber Boss', relationship: 'Corporate Holding Agent', riskScore: 96 }],
    vehicles: [{ id: 'veh-13', licensePlate: 'CY-LIM-900', make: 'Porsche', model: 'Panamera GTS', year: 2025, color: 'Chalk White', registeredOwner: 'Romanova Consulting Ltd', status: 'ACTIVE', lastSeenLocation: 'Limassol Port', lastSeenTime: '2026-08-24 06:15' }],
    phoneNumbers: [{ id: 'ph-13', phoneNumber: '+357 99 123 456', carrier: 'Cyta Cyprus', imei: '351920192847122', ownerName: 'Ekaterina Romanova', status: 'TAPPED', totalCallsLogged: 390, lastActive: '2026-08-24 06:35', frequentContacts: [] }],
    financialAccounts: [{ id: 'fin-13', accountNumber: 'CY8900201928399182', bankName: 'Eurobank Cyprus', accountType: 'OFFSHORE', balance: 8900000, currency: 'EUR', holderName: 'Romanova Asset Management', flaggedTransactionsCount: 16, status: 'MONITORED' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-01', name: 'Vanguard Cyber Syndicate', role: 'Offshore Trustee', threatLevel: 'CRITICAL' }],
    tags: ['Shell Entity Master', 'Limassol Banking', 'Fiduciary Decoy']
  },
  {
    id: 'crm-13',
    criminalId: 'CR-9904',
    name: 'Marcus "Vulture" Kane',
    alias: 'The Vulture',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 48,
    gender: 'Male',
    nationality: 'American / Panamanian',
    crimeCategory: 'Terrorism Financing',
    riskScore: 93,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: { address: 'Brickell Avenue 1200', city: 'Miami', country: 'USA', coordinates: [25.7617, -80.1918] },
    lastActivity: '2026-08-23T20:50:00Z',
    knownAssociatesCount: 21,
    activeWarrants: 7,
    biography: 'Sanction evasion coordinator and shadow weapons financier operating covert charters across South Florida, Bahamas, and South America.',
    aiThreatSummary: 'High value wire of $4.8M routed via correspondent accounts in Curacao to Dimitri Costa.',
    personalDetails: { dob: '1978-08-11', heightCm: 186, eyeColor: 'Brown' },
    knownAssociates: [{ id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer', role: 'Arms Dealer', relationship: 'Funding Escrow', riskScore: 89 }],
    vehicles: [{ id: 'veh-14', licensePlate: 'FL-VLTR-01', make: 'Cadillac', model: 'Escalade V-Series', year: 2025, color: 'Raven Black', registeredOwner: 'Kane Global Securities LLC', status: 'ACTIVE', lastSeenLocation: 'Miami Biscayne Marina', lastSeenTime: '2026-08-23 20:00' }],
    phoneNumbers: [{ id: 'ph-14', phoneNumber: '+1 305 892 0192', carrier: 'AT&T Enterprise', imei: '861920192847133', ownerName: 'Marcus Kane', status: 'TAPPED', totalCallsLogged: 450, lastActive: '2026-08-23 20:45', frequentContacts: [] }],
    financialAccounts: [{ id: 'fin-14', accountNumber: 'US8920192830192830', bankName: 'Wells Fargo Commercial', accountType: 'SHELL_CORP', balance: 16800000, currency: 'USD', holderName: 'Kane International Trade', flaggedTransactionsCount: 28, status: 'FROZEN' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-06', name: 'Aegean Arms & Charter Group', role: 'Shadow Benefactor', threatLevel: 'HIGH' }],
    tags: ['Sanctions Evasion', 'Terror Financing', 'FBI Most Wanted']
  },
  {
    id: 'crm-14',
    criminalId: 'CR-6019',
    name: 'Jin-Woo Park',
    alias: 'Cipher',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    age: 33,
    gender: 'Male',
    nationality: 'South Korean',
    crimeCategory: 'Cybercrime',
    riskScore: 71,
    riskLevel: 'MEDIUM',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: { address: 'Gangnam-daero 390', city: 'Seoul', country: 'South Korea', coordinates: [37.4979, 127.0276] },
    lastActivity: '2026-08-24T04:15:00Z',
    knownAssociatesCount: 8,
    activeWarrants: 1,
    biography: 'DeFi smart contract exploit developer and flash loan manipulation architect.',
    aiThreatSummary: 'Simulated liquidity drain attack vector matching pattern of recent $32M DEX bridge hack.',
    personalDetails: { dob: '1993-04-18', heightCm: 178, eyeColor: 'Brown' },
    knownAssociates: [{ id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer', role: 'Cyber Boss', relationship: 'Smart Contract Auditor', riskScore: 96 }],
    vehicles: [{ id: 'veh-15', licensePlate: 'SEL-8822', make: 'Genesis', model: 'G90 Black Edition', year: 2025, color: 'Midnight Black', registeredOwner: 'Park Jin-Woo', status: 'ACTIVE', lastSeenLocation: 'Gangnam Station', lastSeenTime: '2026-08-24 03:50' }],
    phoneNumbers: [{ id: 'ph-15', phoneNumber: '+82 10 9821 4401', carrier: 'SK Telecom', imei: '861920192847144', ownerName: 'Jin-Woo Park', status: 'TAPPED', totalCallsLogged: 160, lastActive: '2026-08-24 04:10', frequentContacts: [] }],
    financialAccounts: [{ id: 'fin-15', accountNumber: 'KR89201928301928', bankName: 'Shinhan Bank', accountType: 'SAVINGS', balance: 3900000, currency: 'USD', holderName: 'Cipher Labs Seoul', flaggedTransactionsCount: 7, status: 'ACTIVE' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-01', name: 'Vanguard Cyber Syndicate', role: 'Exploit Research Lead', threatLevel: 'CRITICAL' }],
    tags: ['DeFi Exploiter', 'Smart Contract Auditor', 'Darknet Developer']
  },
  {
    id: 'crm-15',
    criminalId: 'CR-4478',
    name: 'Luigi "Il Falco" Moretti',
    alias: 'Il Falco / The Falcon',
    photoUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300&auto=format&fit=crop&q=80',
    age: 56,
    gender: 'Male',
    nationality: 'Italian',
    crimeCategory: 'Extortion',
    riskScore: 81,
    riskLevel: 'HIGH',
    status: 'UNDER_SURVEILLANCE',
    lastKnownLocation: { address: 'Via Montenapoleone 18', city: 'Milan', country: 'Italy', coordinates: [45.4690, 9.1960] },
    lastActivity: '2026-08-24T07:50:00Z',
    knownAssociatesCount: 17,
    activeWarrants: 2,
    biography: 'Controls commercial construction extortion and municipal waste disposal cartels across Lombardy and Liguria.',
    aiThreatSummary: 'Intercepted meeting transcript discusses sub-contract intimidation at Genoa port expansion project.',
    personalDetails: { dob: '1970-03-24', heightCm: 181, eyeColor: 'Brown' },
    knownAssociates: [{ id: 'crm-03', name: 'Helena Vance', alias: 'The Architect', role: 'Logistics Broker', relationship: 'Port Clearance Liaison', riskScore: 91 }],
    vehicles: [{ id: 'veh-16', licensePlate: 'MI-LM-770', make: 'Maserati', model: 'Quattroporte Trofeo', year: 2024, color: 'Nero Assoluto', registeredOwner: 'Moretti Costruzioni SpA', status: 'ACTIVE', lastSeenLocation: 'Milan Centro', lastSeenTime: '2026-08-24 07:20' }],
    phoneNumbers: [{ id: 'ph-16', phoneNumber: '+39 02 8821 990', carrier: 'TIM Italy Enterprise', imei: '351920192847155', ownerName: 'Luigi Moretti', status: 'TAPPED', totalCallsLogged: 520, lastActive: '2026-08-24 07:45', frequentContacts: [] }],
    financialAccounts: [{ id: 'fin-16', accountNumber: 'IT892019283019283019', bankName: 'Intesa Sanpaolo', accountType: 'CHECKING', balance: 9200000, currency: 'EUR', holderName: 'Moretti Holding SpA', flaggedTransactionsCount: 13, status: 'MONITORED' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-03', name: 'Eurasian Logistics & Metals GmbH', role: 'Italian Commercial Liaison', threatLevel: 'HIGH' }],
    tags: ['Ndrangheta Affiliation', 'Port Extortion', 'Waste Cartel']
  },
  {
    id: 'crm-16',
    criminalId: 'CR-7023',
    name: 'Fatima Al-Zahra',
    alias: 'The Mirage / Desert Rose',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    age: 35,
    gender: 'Female',
    nationality: 'Lebanese / French',
    crimeCategory: 'Terrorism Financing',
    riskScore: 85,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: { address: 'Hamra Street, Plaza 4', city: 'Beirut', country: 'Lebanon', coordinates: [33.8969, 35.4831] },
    lastActivity: '2026-08-23T17:10:00Z',
    knownAssociatesCount: 14,
    activeWarrants: 4,
    biography: 'Expert in informal value transfer systems (Hawala) and charitable foundation front organizations across the Levant.',
    aiThreatSummary: 'Traced $2.2M cash handoff in Istanbul disguised as medical relief procurement.',
    personalDetails: { dob: '1991-09-14', heightCm: 169, eyeColor: 'Brown' },
    knownAssociates: [{ id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker', role: 'Crypto Wash', relationship: 'Hawala Settlement Partner', riskScore: 88 }],
    vehicles: [{ id: 'veh-17', licensePlate: 'BEY-9912', make: 'Range Rover', model: 'Autobiography Armored', year: 2025, color: 'Santorini Black', registeredOwner: 'Al-Zahra Trade FZ', status: 'ACTIVE', lastSeenLocation: 'Beirut Central District', lastSeenTime: '2026-08-23 16:30' }],
    phoneNumbers: [{ id: 'ph-17', phoneNumber: '+961 3 889 012', carrier: 'Touch Lebanon', imei: '861920192847166', ownerName: 'Fatima Al-Zahra', status: 'TAPPED', totalCallsLogged: 290, lastActive: '2026-08-23 17:05', frequentContacts: [] }],
    financialAccounts: [{ id: 'fin-17', accountNumber: 'LB8900192830192830', bankName: 'Bank Audi', accountType: 'OFFSHORE', balance: 6400000, currency: 'USD', holderName: 'Levant Relief Trust', flaggedTransactionsCount: 18, status: 'MONITORED' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-07', name: 'Apex Crypto Yield Trust', role: 'Levant Hawala Representative', threatLevel: 'HIGH' }],
    tags: ['Hawala Network', 'Terror Financing Node', 'Interpol Red Alert']
  },
  {
    id: 'crm-17',
    criminalId: 'CR-8201',
    name: 'Nikolai Voronin',
    alias: 'The Bear / Grizzly',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    age: 54,
    gender: 'Male',
    nationality: 'Russian',
    crimeCategory: 'Arms Smuggling',
    riskScore: 90,
    riskLevel: 'CRITICAL',
    status: 'WANTED',
    lastKnownLocation: { address: 'Primorsky Boulevard 12', city: 'Batumi', country: 'Georgia', coordinates: [41.6168, 41.6367] },
    lastActivity: '2026-08-23T23:30:00Z',
    knownAssociatesCount: 23,
    activeWarrants: 5,
    biography: 'Former military logistics officer specializing in heavy ordnance, MANPADS routing, and Black Sea maritime clandestine offloading.',
    aiThreatSummary: 'Satellite tracking indicates cargo vessel "Sea Wolf" docked at Batumi under Voronin\'s proxy authority.',
    personalDetails: { dob: '1972-04-09', heightCm: 189, eyeColor: 'Grey' },
    knownAssociates: [{ id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer', role: 'Arms Broker', relationship: 'Black Sea Transshipment', riskScore: 89 }],
    vehicles: [{ id: 'veh-18', licensePlate: 'GEO-NV-888', make: 'Toyota', model: 'Land Cruiser Prado Armored', year: 2024, color: 'Graphite Grey', registeredOwner: 'Batumi Marine Agency', status: 'ACTIVE', lastSeenLocation: 'Batumi Port', lastSeenTime: '2026-08-23 23:00' }],
    phoneNumbers: [{ id: 'ph-18', phoneNumber: '+995 599 123 889', carrier: 'MagtiCom Georgia', imei: '861920192847177', ownerName: 'Nikolai Voronin', status: 'TAPPED', totalCallsLogged: 380, lastActive: '2026-08-23 23:25', frequentContacts: [] }],
    financialAccounts: [{ id: 'fin-18', accountNumber: 'GE890019283019283', bankName: 'Bank of Georgia', accountType: 'CHECKING', balance: 7800000, currency: 'USD', holderName: 'Black Sea Marine Charter', flaggedTransactionsCount: 21, status: 'MONITORED' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-06', name: 'Aegean Arms & Charter Group', role: 'Black Sea Operations Lead', threatLevel: 'HIGH' }],
    tags: ['Heavy Ordnance', 'Black Sea Route', 'Military Grade Weapons']
  },
  {
    id: 'crm-18',
    criminalId: 'CR-5190',
    name: 'Klaus Richter',
    alias: 'The Chemist II / Catalyst',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    age: 43,
    gender: 'Male',
    nationality: 'Austrian / Dutch',
    crimeCategory: 'Drug Trafficking',
    riskScore: 76,
    riskLevel: 'MEDIUM',
    status: 'IN_CUSTODY',
    lastKnownLocation: { address: 'Vught High Security Prison', city: 'Vught', country: 'Netherlands', coordinates: [51.6500, 5.2900] },
    lastActivity: '2026-08-22T10:00:00Z',
    knownAssociatesCount: 7,
    activeWarrants: 0,
    biography: 'Synthetics lab chemist incarcerated after Joint Task Force raid on Eindhoven mega-lab producing ecstasy and methamphetamine precursors.',
    aiThreatSummary: 'Monitored prison phone communications indicate ongoing advisory role for Chen Wei syndicate via coded letters.',
    personalDetails: { dob: '1983-05-30', heightCm: 180, eyeColor: 'Hazel' },
    knownAssociates: [{ id: 'crm-04', name: 'Chen Wei', alias: 'The Chemist', role: 'Syndicate Chemist', relationship: 'Technical Consultant', riskScore: 94 }],
    vehicles: [],
    phoneNumbers: [],
    financialAccounts: [{ id: 'fin-19', accountNumber: 'NL89INGB0001928301', bankName: 'ING Netherlands', accountType: 'SAVINGS', balance: 450000, currency: 'EUR', holderName: 'Klaus Richter (Frozen)', flaggedTransactionsCount: 12, status: 'FROZEN' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-04', name: 'Shadow Viper Syndicate', role: 'Former European Chief Chemist', threatLevel: 'CRITICAL' }],
    tags: ['Synthetic Narcotics', 'In Custody', 'Intelligence Asset Candidate']
  },
  {
    id: 'crm-19',
    criminalId: 'CR-9401',
    name: 'Gabriel "El Lobo" Mendoza',
    alias: 'El Lobo / The Wolf',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80',
    age: 45,
    gender: 'Male',
    nationality: 'Mexican',
    crimeCategory: 'Organized Heist',
    riskScore: 87,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: { address: 'Zona Rosa Suite 500', city: 'Mexico City', country: 'Mexico', coordinates: [19.4260, -99.1678] },
    lastActivity: '2026-08-24T02:00:00Z',
    knownAssociatesCount: 19,
    activeWarrants: 5,
    biography: 'Directs tactical armed heists on bullion transport convoys and customs freeport depositories across the Americas.',
    aiThreatSummary: 'CCTV facial recognition matched Mendoza entering Panama City with fake Chilean diplomatic passport.',
    personalDetails: { dob: '1981-12-01', heightCm: 184, eyeColor: 'Dark Brown' },
    knownAssociates: [{ id: 'crm-02', name: 'Mateo Silva', alias: 'El Serpiente', role: 'Cartel Boss', relationship: 'Security Contractor', riskScore: 98 }],
    vehicles: [{ id: 'veh-19', licensePlate: 'CDMX-901-LB', make: 'Ford', model: 'F-150 Raptor Armored', year: 2024, color: 'Lead Foot Grey', registeredOwner: 'Mendoza Seguridad SA', status: 'ACTIVE', lastSeenLocation: 'Mexico City Airport Area', lastSeenTime: '2026-08-24 01:30' }],
    phoneNumbers: [{ id: 'ph-19', phoneNumber: '+52 55 9821 0092', carrier: 'Telcel Mexico', imei: '861920192847188', ownerName: 'Gabriel Mendoza', status: 'TAPPED', totalCallsLogged: 330, lastActive: '2026-08-24 01:55', frequentContacts: [] }],
    financialAccounts: [{ id: 'fin-20', accountNumber: 'MX890019283019283', bankName: 'BBVA Mexico', accountType: 'CHECKING', balance: 5200000, currency: 'USD', holderName: 'Lobo Tactical Logistics', flaggedTransactionsCount: 17, status: 'MONITORED' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-02', name: 'Cali-Medellin Maritime Coalition', role: 'Tactical Operations Commander', threatLevel: 'CRITICAL' }],
    tags: ['Armed Heist Leader', 'Bullion Vault Specialist', 'Dangerous & Armed']
  },
  {
    id: 'crm-20',
    criminalId: 'CR-3829',
    name: 'Svetlana "Valkyrie" Ivanova',
    alias: 'Valkyrie',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    age: 37,
    gender: 'Female',
    nationality: 'Bulgarian / Russian',
    crimeCategory: 'Cybercrime',
    riskScore: 83,
    riskLevel: 'HIGH',
    status: 'WANTED',
    lastKnownLocation: { address: 'Vitosha Boulevard 44', city: 'Sofia', country: 'Bulgaria', coordinates: [42.6977, 23.3219] },
    lastActivity: '2026-08-24T05:30:00Z',
    knownAssociatesCount: 12,
    activeWarrants: 2,
    biography: 'Master of credential stuffing networks, banking trojan deployment, and voice cloning deepfake social engineering campaigns.',
    aiThreatSummary: 'Audio analysis identified AI-synthesized voice of CFO deployed in successful $8.4M wire fraud on European semiconductor firm.',
    personalDetails: { dob: '1989-09-20', heightCm: 173, eyeColor: 'Grey-Green' },
    knownAssociates: [{ id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer', role: 'Cyber Boss', relationship: 'Social Engineering Lead', riskScore: 96 }],
    vehicles: [{ id: 'veh-20', licensePlate: 'SO-9921-VK', make: 'Audi', model: 'e-tron GT RS', year: 2025, color: 'Daytona Grey', registeredOwner: 'Ivanova Tech Labs', status: 'ACTIVE', lastSeenLocation: 'Sofia Ring Mall', lastSeenTime: '2026-08-24 05:00' }],
    phoneNumbers: [{ id: 'ph-20', phoneNumber: '+359 88 901 2345', carrier: 'A1 Bulgaria', imei: '351920192847199', ownerName: 'Svetlana Ivanova', status: 'TAPPED', totalCallsLogged: 240, lastActive: '2026-08-24 05:25', frequentContacts: [] }],
    financialAccounts: [{ id: 'fin-21', accountNumber: 'BG89001928301928301', bankName: 'UniCredit Bulbank', accountType: 'SAVINGS', balance: 4100000, currency: 'EUR', holderName: 'Valkyrie Interactive', flaggedTransactionsCount: 11, status: 'MONITORED' }],
    timeline: [],
    connectedOrganizations: [{ id: 'org-01', name: 'Vanguard Cyber Syndicate', role: 'Social Engineering Director', threatLevel: 'CRITICAL' }],
    tags: ['Voice Clone Specialist', 'Deepfake Phishing', 'Banking Trojan Operator']
  }
];
