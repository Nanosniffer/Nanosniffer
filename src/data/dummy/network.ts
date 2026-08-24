import { NetworkGraphData } from '../../types';

export const dummyNetworkGraph: NetworkGraphData = {
  nodes: [
    // 1. Person Nodes
    {
      id: 'node-crm-01',
      type: 'personNode',
      position: { x: 380, y: 150 },
      data: {
        label: 'Viktor Markov',
        type: 'person',
        subType: 'Syndicate Cyber Lead',
        riskScore: 96,
        riskLevel: 'CRITICAL',
        entityId: 'crm-01',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 8,
        centralityScore: 0.94,
        metadata: {
          alias: 'NullPointer',
          crimeCategory: 'Cybercrime',
          warrants: 5,
          activePhones: 2,
        }
      }
    },
    {
      id: 'node-crm-02',
      type: 'personNode',
      position: { x: 80, y: 380 },
      data: {
        label: 'Mateo Silva',
        type: 'person',
        subType: 'Cartel Commander',
        riskScore: 98,
        riskLevel: 'CRITICAL',
        entityId: 'crm-02',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 9,
        centralityScore: 0.98,
        metadata: {
          alias: 'El Serpiente',
          crimeCategory: 'Drug Trafficking',
          warrants: 8,
        }
      }
    },
    {
      id: 'node-crm-03',
      type: 'personNode',
      position: { x: 420, y: 460 },
      data: {
        label: 'Helena Vance',
        type: 'person',
        subType: 'Logistics Architect',
        riskScore: 91,
        riskLevel: 'CRITICAL',
        entityId: 'crm-03',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        status: 'UNDER_SURVEILLANCE',
        connectionsCount: 11,
        centralityScore: 0.99,
        metadata: {
          alias: 'The Architect',
          crimeCategory: 'Money Laundering',
          warrants: 2,
        }
      }
    },
    {
      id: 'node-crm-04',
      type: 'personNode',
      position: { x: 1050, y: 340 },
      data: {
        label: 'Chen Wei',
        type: 'person',
        subType: 'Precursor Chemist',
        riskScore: 94,
        riskLevel: 'CRITICAL',
        entityId: 'crm-04',
        avatarUrl: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 6,
        centralityScore: 0.81,
        metadata: {
          alias: 'The Chemist',
          crimeCategory: 'Arms Smuggling',
          warrants: 6,
        }
      }
    },
    {
      id: 'node-crm-05',
      type: 'personNode',
      position: { x: 1080, y: 620 },
      data: {
        label: 'Raymond Leung',
        type: 'person',
        subType: 'Triad Dragon Head',
        riskScore: 86,
        riskLevel: 'HIGH',
        entityId: 'crm-05',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        status: 'UNDER_SURVEILLANCE',
        connectionsCount: 5,
        centralityScore: 0.74,
        metadata: {
          alias: 'Red Dragon',
          crimeCategory: 'Extortion',
        }
      }
    },
    {
      id: 'node-crm-06',
      type: 'personNode',
      position: { x: 740, y: 480 },
      data: {
        label: 'Dimitri Costa',
        type: 'person',
        subType: 'Arms Broker',
        riskScore: 89,
        riskLevel: 'HIGH',
        entityId: 'crm-06',
        avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 8,
        centralityScore: 0.87,
        metadata: {
          alias: 'The Armorer',
          crimeCategory: 'Arms Smuggling',
        }
      }
    },
    {
      id: 'node-crm-07',
      type: 'personNode',
      position: { x: 700, y: 190 },
      data: {
        label: 'Tariq Mansoor',
        type: 'person',
        subType: 'Crypto Laundering Master',
        riskScore: 88,
        riskLevel: 'HIGH',
        entityId: 'crm-07',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        status: 'UNDER_SURVEILLANCE',
        connectionsCount: 9,
        centralityScore: 0.92,
        metadata: {
          alias: 'The Broker',
          crimeCategory: 'Money Laundering',
        }
      }
    },
    {
      id: 'node-crm-08',
      type: 'personNode',
      position: { x: 740, y: 760 },
      data: {
        label: 'Goran Dragovic',
        type: 'person',
        subType: 'Balkan Convoy Lead',
        riskScore: 78,
        riskLevel: 'MEDIUM',
        entityId: 'crm-08',
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        status: 'UNDER_SURVEILLANCE',
        connectionsCount: 4,
        centralityScore: 0.65,
        metadata: {
          alias: 'Iron Fist',
          crimeCategory: 'Organized Heist',
        }
      }
    },
    {
      id: 'node-crm-09',
      type: 'personNode',
      position: { x: 120, y: 150 },
      data: {
        label: 'Astrid Lindqvist',
        type: 'person',
        subType: 'DevSecOps Specialist',
        riskScore: 74,
        riskLevel: 'MEDIUM',
        entityId: 'crm-09',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: 'UNDER_SURVEILLANCE',
        connectionsCount: 3,
        centralityScore: 0.58,
        metadata: {
          alias: 'Zero',
          crimeCategory: 'Cybercrime',
        }
      }
    },
    {
      id: 'node-crm-10',
      type: 'personNode',
      position: { x: 80, y: 680 },
      data: {
        label: 'Youssef Kabbaj',
        type: 'person',
        subType: 'Desert Transit Boss',
        riskScore: 82,
        riskLevel: 'HIGH',
        entityId: 'crm-10',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 4,
        centralityScore: 0.62,
        metadata: {
          alias: 'Sandstorm',
          crimeCategory: 'Human Trafficking',
        }
      }
    },

    // 2. Organization Nodes
    {
      id: 'node-org-01',
      type: 'organizationNode',
      position: { x: 260, y: -20 },
      data: {
        label: 'Vanguard Cyber Syndicate',
        type: 'organization',
        riskScore: 95,
        riskLevel: 'CRITICAL',
        entityId: 'org-01',
        metadata: {
          headquarters: 'Bucharest / Darknet',
          members: 45,
          annualIllicitUSD: '$85,000,000',
        }
      }
    },
    {
      id: 'node-org-02',
      type: 'organizationNode',
      position: { x: -160, y: 480 },
      data: {
        label: 'Cali-Medellin Maritime Coalition',
        type: 'organization',
        riskScore: 98,
        riskLevel: 'CRITICAL',
        entityId: 'org-02',
        metadata: {
          headquarters: 'Buenaventura, Colombia',
          members: 220,
          annualIllicitUSD: '$140,000,000',
        }
      }
    },
    {
      id: 'node-org-03',
      type: 'organizationNode',
      position: { x: 380, y: 720 },
      data: {
        label: 'Eurasian Logistics GmbH',
        type: 'organization',
        riskScore: 90,
        riskLevel: 'HIGH',
        entityId: 'org-03',
        metadata: {
          headquarters: 'Hamburg, Germany',
          members: 18,
          annualIllicitUSD: '$42,000,000',
        }
      }
    },
    {
      id: 'node-org-06',
      type: 'organizationNode',
      position: { x: 920, y: 560 },
      data: {
        label: 'Aegean Arms & Charter Group',
        type: 'organization',
        riskScore: 89,
        riskLevel: 'HIGH',
        entityId: 'org-06',
        metadata: {
          headquarters: 'Piraeus, Greece',
          members: 35,
          annualIllicitUSD: '$28,000,000',
        }
      }
    },
    {
      id: 'node-org-07',
      type: 'organizationNode',
      position: { x: 860, y: 60 },
      data: {
        label: 'Apex Crypto Yield Trust',
        type: 'organization',
        riskScore: 88,
        riskLevel: 'HIGH',
        entityId: 'org-07',
        metadata: {
          headquarters: 'Dubai, UAE',
          members: 12,
          annualIllicitUSD: '$60,000,000',
        }
      }
    },

    // 3. Bank Account Nodes
    {
      id: 'node-bank-01',
      type: 'bankNode',
      position: { x: 540, y: 30 },
      data: {
        label: 'Spectre Bitcoin Cluster',
        type: 'bank',
        riskScore: 98,
        riskLevel: 'CRITICAL',
        entityId: 'fin-02',
        metadata: {
          balance: '$18,450,000 USD',
          accountType: 'CRYPTO_WALLET',
          bank: 'Bitcoin Native Cluster',
          status: 'ACTIVE',
        }
      }
    },
    {
      id: 'node-bank-02',
      type: 'bankNode',
      position: { x: -80, y: 260 },
      data: {
        label: 'Banco General PA #6019',
        type: 'bank',
        riskScore: 92,
        riskLevel: 'CRITICAL',
        entityId: 'fin-03',
        metadata: {
          balance: '$32,000,000 USD',
          accountType: 'OFFSHORE',
          bank: 'Banco General Panama',
          status: 'ACTIVE',
        }
      }
    },
    {
      id: 'node-bank-03',
      type: 'bankNode',
      position: { x: 700, y: -40 },
      data: {
        label: 'Emirates NBD Trust #9283',
        type: 'bank',
        riskScore: 86,
        riskLevel: 'HIGH',
        entityId: 'fin-08',
        metadata: {
          balance: '$54,000,000 USD',
          accountType: 'OFFSHORE',
          bank: 'Emirates NBD',
          status: 'MONITORED',
        }
      }
    },

    // 4. Phone Nodes
    {
      id: 'node-ph-01',
      type: 'phoneNode',
      position: { x: 500, y: 280 },
      data: {
        label: '+40 721 899 432 (Markov)',
        type: 'phone',
        riskScore: 90,
        riskLevel: 'HIGH',
        entityId: 'ph-01',
        metadata: {
          carrier: 'Orange Romania Encrypted',
          status: 'TAPPED',
          loggedCalls: 420,
        }
      }
    },
    {
      id: 'node-ph-02',
      type: 'phoneNode',
      position: { x: 260, y: 360 },
      data: {
        label: '+49 171 902188 (Vance)',
        type: 'phone',
        riskScore: 88,
        riskLevel: 'HIGH',
        entityId: 'ph-04',
        metadata: {
          carrier: 'Deutsche Telekom Enterprise',
          status: 'TAPPED',
          loggedCalls: 710,
        }
      }
    },
    {
      id: 'node-ph-03',
      type: 'phoneNode',
      position: { x: 800, y: 340 },
      data: {
        label: '+971 50 882 1099 (Mansoor)',
        type: 'phone',
        riskScore: 85,
        riskLevel: 'HIGH',
        entityId: 'ph-08',
        metadata: {
          carrier: 'Etisalat VIP Encrypted',
          status: 'TAPPED',
          loggedCalls: 840,
        }
      }
    },

    // 5. Vehicle Nodes
    {
      id: 'node-veh-01',
      type: 'vehicleNode',
      position: { x: 220, y: 240 },
      data: {
        label: 'Audi RS7 (B-77-VNG)',
        type: 'vehicle',
        riskScore: 78,
        riskLevel: 'MEDIUM',
        entityId: 'veh-01',
        metadata: {
          model: 'Audi RS7 Black Edition 2024',
          owner: 'Vanguard Cyber Logistics',
          lastSeen: 'Bucharest Sector 1',
        }
      }
    },
    {
      id: 'node-veh-02',
      type: 'vehicleNode',
      position: { x: -80, y: 560 },
      data: {
        label: 'Land Cruiser B7 (PAN-9941)',
        type: 'vehicle',
        riskScore: 85,
        riskLevel: 'HIGH',
        entityId: 'veh-03',
        metadata: {
          model: 'Toyota Land Cruiser 300 Armored',
          owner: 'Pacific Maritime Holdings',
          lastSeen: 'Panama Pacifico',
        }
      }
    },
    {
      id: 'node-veh-03',
      type: 'vehicleNode',
      position: { x: 540, y: 640 },
      data: {
        label: 'Maybach S680 (HH-HV-8800)',
        type: 'vehicle',
        riskScore: 80,
        riskLevel: 'HIGH',
        entityId: 'veh-04',
        metadata: {
          model: 'Mercedes Maybach 2025',
          owner: 'Eurasian Logistics GmbH',
          lastSeen: 'Hamburg HafenCity',
        }
      }
    },

    // 6. Location Nodes
    {
      id: 'node-loc-01',
      type: 'locationNode',
      position: { x: 220, y: 520 },
      data: {
        label: 'Port of Rotterdam Pier 42',
        type: 'location',
        riskScore: 98,
        riskLevel: 'CRITICAL',
        entityId: 'loc-01',
        metadata: {
          city: 'Rotterdam, Netherlands',
          cctvActive: true,
          associatedSuspects: 6,
        }
      }
    },
    {
      id: 'node-loc-02',
      type: 'locationNode',
      position: { x: 620, y: 600 },
      data: {
        label: 'Club Obsidian VIP Lounge',
        type: 'location',
        riskScore: 82,
        riskLevel: 'HIGH',
        entityId: 'loc-06',
        metadata: {
          city: 'Lisbon, Portugal',
          cctvActive: false,
          associatedSuspects: 8,
        }
      }
    },
    {
      id: 'node-loc-03',
      type: 'locationNode',
      position: { x: 1020, y: 170 },
      data: {
        label: 'Dubai Marina Slip 49',
        type: 'location',
        riskScore: 88,
        riskLevel: 'HIGH',
        entityId: 'loc-03',
        metadata: {
          city: 'Dubai, UAE',
          cctvActive: true,
          associatedSuspects: 5,
        }
      }
    },

    // 7. Event Nodes
    {
      id: 'node-evt-01',
      type: 'eventNode',
      position: { x: 560, y: 380 },
      data: {
        label: 'Lisbon Briefcase Handover',
        type: 'event',
        riskScore: 92,
        riskLevel: 'CRITICAL',
        entityId: 'tl-007',
        metadata: {
          eventType: 'Meeting',
          date: '2026-08-24 08:14',
          interceptConfidence: '96%',
        }
      }
    },
    {
      id: 'node-evt-02',
      type: 'eventNode',
      position: { x: 50, y: 240 },
      data: {
        label: 'Submersible Drop Window #4',
        type: 'event',
        riskScore: 97,
        riskLevel: 'CRITICAL',
        entityId: 'tl-002',
        metadata: {
          eventType: 'Border Crossing',
          date: '2026-08-23 21:00',
          interceptConfidence: '98%',
        }
      }
    }
  ],

  edges: [
    // 1. Criminal to Criminal Associate Edges
    { id: 'e-crm01-crm07', source: 'node-crm-01', target: 'node-crm-07', label: 'Crypto Washing', animated: true, data: { relationshipType: 'Money Transfer', details: '$18.4M Crypto Dispersal', amount: 18450000, riskLevel: 'CRITICAL' } },
    { id: 'e-crm01-crm03', source: 'node-crm-01', target: 'node-crm-03', label: 'Server Leasing', animated: true, data: { relationshipType: 'Associate', details: 'Hardware Ingress Masking', riskLevel: 'HIGH' } },
    { id: 'e-crm01-crm09', source: 'node-crm-01', target: 'node-crm-09', label: 'DevSecOps', animated: false, data: { relationshipType: 'Associate', details: 'Darknet Server Hosting', riskLevel: 'MEDIUM' } },
    { id: 'e-crm02-crm03', source: 'node-crm-02', target: 'node-crm-03', label: 'Rotterdam Freight', animated: true, data: { relationshipType: 'Associate', details: 'Maritime Consignment Clearance', riskLevel: 'CRITICAL' } },
    { id: 'e-crm02-crm10', source: 'node-crm-02', target: 'node-crm-10', label: 'Transit Corridor', animated: false, data: { relationshipType: 'Associate', details: 'West Africa Route', riskLevel: 'HIGH' } },
    { id: 'e-crm03-crm06', source: 'node-crm-03', target: 'node-crm-06', label: 'Cargo Masking', animated: true, data: { relationshipType: 'Associate', details: 'Weapons Manifest Overrides', riskLevel: 'HIGH' } },
    { id: 'e-crm06-crm08', source: 'node-crm-06', target: 'node-crm-08', label: 'Overland Route', animated: false, data: { relationshipType: 'Supplies', details: 'Munitions Escort', riskLevel: 'HIGH' } },
    { id: 'e-crm04-crm05', source: 'node-crm-04', target: 'node-crm-05', label: 'Distribution', animated: true, data: { relationshipType: 'Supplies', details: 'Hong Kong Precursors Line', riskLevel: 'CRITICAL' } },
    { id: 'e-crm04-crm06', source: 'node-crm-04', target: 'node-crm-06', label: 'Triggers Supply', animated: false, data: { relationshipType: 'Supplies', details: 'Drone Guidance Modules', riskLevel: 'HIGH' } },
    { id: 'e-crm05-crm07', source: 'node-crm-05', target: 'node-crm-07', label: 'Chip Washing', animated: true, data: { relationshipType: 'Money Transfer', details: 'Macau Junket Wires', amount: 4500000, riskLevel: 'HIGH' } },

    // 2. Person to Organization Edges
    { id: 'e-crm01-org01', source: 'node-crm-01', target: 'node-org-01', label: 'Commands', data: { relationshipType: 'Operates In', details: 'Founder & Cyber Commander', riskLevel: 'CRITICAL' } },
    { id: 'e-crm02-org02', source: 'node-crm-02', target: 'node-org-02', label: 'Directs', data: { relationshipType: 'Operates In', details: 'Cartel High Commander', riskLevel: 'CRITICAL' } },
    { id: 'e-crm03-org03', source: 'node-crm-03', target: 'node-org-03', label: 'Manages', data: { relationshipType: 'Operates In', details: 'Managing Director', riskLevel: 'HIGH' } },
    { id: 'e-crm06-org06', source: 'node-crm-06', target: 'node-org-06', label: 'Directs', data: { relationshipType: 'Operates In', details: 'Chief Executive', riskLevel: 'HIGH' } },
    { id: 'e-crm07-org07', source: 'node-crm-07', target: 'node-org-07', label: 'Controls', data: { relationshipType: 'Operates In', details: 'Managing Partner', riskLevel: 'HIGH' } },

    // 3. Person to Financial Account Edges
    { id: 'e-crm01-bank01', source: 'node-crm-01', target: 'node-bank-01', label: 'Controls Key', animated: true, data: { relationshipType: 'Owns', details: 'Multi-Sig PGP Master Wallet', amount: 18450000, riskLevel: 'CRITICAL' } },
    { id: 'e-crm02-bank02', source: 'node-crm-02', target: 'node-bank-02', label: 'Beneficiary', data: { relationshipType: 'Owns', details: 'Offshore Escrow Holder', amount: 32000000, riskLevel: 'CRITICAL' } },
    { id: 'e-crm07-bank03', source: 'node-crm-07', target: 'node-bank-03', label: 'Corporate Trust', animated: true, data: { relationshipType: 'Owns', details: 'Dubai Trust Account', amount: 54000000, riskLevel: 'HIGH' } },
    { id: 'e-bank01-bank03', source: 'node-bank-01', target: 'node-bank-03', label: '$5.1M Wash Wire', animated: true, data: { relationshipType: 'Money Transfer', details: 'Decentralized Bridge Mixer Transfer', amount: 5100000, riskLevel: 'CRITICAL' } },

    // 4. Person to Phone Records Edges
    { id: 'e-crm01-ph01', source: 'node-crm-01', target: 'node-ph-01', label: 'Primary Encrypted', data: { relationshipType: 'Owns', details: 'Orange RO SIM', riskLevel: 'HIGH' } },
    { id: 'e-crm03-ph02', source: 'node-crm-03', target: 'node-ph-02', label: 'Enterprise Line', data: { relationshipType: 'Owns', details: 'Telekom DE SIM', riskLevel: 'HIGH' } },
    { id: 'e-crm07-ph03', source: 'node-crm-07', target: 'node-ph-03', label: 'VIP Satellite', data: { relationshipType: 'Owns', details: 'Etisalat VIP', riskLevel: 'HIGH' } },
    { id: 'e-ph01-ph02', source: 'node-ph-01', target: 'node-ph-02', label: '36 Encrypted Calls', animated: true, data: { relationshipType: 'Calls', details: 'Duration: 184m', frequency: 36, riskLevel: 'CRITICAL' } },
    { id: 'e-ph01-ph03', source: 'node-ph-01', target: 'node-ph-03', label: '48 Encrypted Calls', animated: true, data: { relationshipType: 'Calls', details: 'Duration: 312m', frequency: 48, riskLevel: 'CRITICAL' } },
    { id: 'e-ph02-ph03', source: 'node-ph-02', target: 'node-ph-03', label: '27 Encrypted Calls', data: { relationshipType: 'Calls', details: 'Duration: 140m', frequency: 27, riskLevel: 'HIGH' } },

    // 5. Person to Vehicle Edges
    { id: 'e-crm01-veh01', source: 'node-crm-01', target: 'node-veh-01', label: 'Operates', data: { relationshipType: 'Owns', details: 'Audi RS7', riskLevel: 'MEDIUM' } },
    { id: 'e-crm02-veh02', source: 'node-crm-02', target: 'node-veh-02', label: 'Armored Transport', data: { relationshipType: 'Owns', details: 'Land Cruiser B7', riskLevel: 'HIGH' } },
    { id: 'e-crm03-veh03', source: 'node-crm-03', target: 'node-veh-03', label: 'Chauffeured', data: { relationshipType: 'Owns', details: 'Maybach S680', riskLevel: 'HIGH' } },

    // 6. Person to Location Edges
    { id: 'e-crm03-loc01', source: 'node-crm-03', target: 'node-loc-01', label: 'Clearance Hub', data: { relationshipType: 'Operates In', details: 'Pier 42 Customs Access', riskLevel: 'CRITICAL' } },
    { id: 'e-crm02-loc01', source: 'node-crm-02', target: 'node-loc-01', label: 'Ingress Destination', animated: true, data: { relationshipType: 'Travel', details: 'Submersible Delivery Pier', riskLevel: 'CRITICAL' } },
    { id: 'e-crm03-loc02', source: 'node-crm-03', target: 'node-loc-02', label: 'Meeting Site', data: { relationshipType: 'Travel', details: 'Lisbon VIP Lounge Visits', riskLevel: 'HIGH' } },
    { id: 'e-crm06-loc02', source: 'node-crm-06', target: 'node-loc-02', label: 'Meeting Site', data: { relationshipType: 'Travel', details: 'Lisbon VIP Lounge Visits', riskLevel: 'HIGH' } },
    { id: 'e-crm07-loc03', source: 'node-crm-07', target: 'node-loc-03', label: 'Yacht Mooring', data: { relationshipType: 'Travel', details: 'Dubai Marina Slip 49', riskLevel: 'HIGH' } },

    // 7. Person / Edge to Event Nodes
    { id: 'e-evt01-crm03', source: 'node-crm-03', target: 'node-evt-01', label: 'Present At', data: { relationshipType: 'Meeting', details: 'Briefcase Exchange', riskLevel: 'CRITICAL' } },
    { id: 'e-evt01-crm06', source: 'node-crm-06', target: 'node-evt-01', label: 'Present At', data: { relationshipType: 'Meeting', details: 'Briefcase Exchange', riskLevel: 'CRITICAL' } },
    { id: 'e-evt02-crm02', source: 'node-crm-02', target: 'node-evt-02', label: 'Coordinated Drop', animated: true, data: { relationshipType: 'Travel', details: 'Submersible Ingress', riskLevel: 'CRITICAL' } },
    { id: 'e-evt02-loc01', source: 'node-evt-02', target: 'node-loc-01', label: 'Offloaded At', data: { relationshipType: 'Operates In', details: 'Pier 42 Dock', riskLevel: 'CRITICAL' } }
  ],

  metrics: {
    degreeCentralityTopNodes: [
      { id: 'crm-03', name: 'Helena Vance', score: 0.99 },
      { id: 'crm-02', name: 'Mateo Silva', score: 0.98 },
      { id: 'crm-01', name: 'Viktor Markov', score: 0.94 },
      { id: 'crm-07', name: 'Tariq Mansoor', score: 0.92 },
      { id: 'crm-06', name: 'Dimitri Costa', score: 0.87 }
    ],
    betweennessCentralityTopNodes: [
      { id: 'crm-03', name: 'Helena Vance (Bridge Node)', score: 0.98 },
      { id: 'crm-07', name: 'Tariq Mansoor (Finance Gateway)', score: 0.91 },
      { id: 'crm-06', name: 'Dimitri Costa (Arms Router)', score: 0.84 },
      { id: 'crm-01', name: 'Viktor Markov (Cyber Tech)', score: 0.81 }
    ],
    communityClustersCount: 4,
    highestInfluenceLeader: { id: 'crm-02', name: 'Mateo Silva', score: 0.98 },
    totalConnections: 58,
    averageConnectionsPerNode: 4.8
  }
};
