import { NetworkGraphData } from '../../types';

export const dummyNetworkGraph: NetworkGraphData = {
  nodes: [
    // 1. Person Nodes
    {
      id: 'node-crm-01',
      type: 'personNode',
      position: { x: 380, y: 150 },
      data: {
        label: 'Vikram Singhania',
        type: 'person',
        subType: 'Syndicate Don (D-Boss)',
        riskScore: 98,
        riskLevel: 'CRITICAL',
        entityId: 'crm-01',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 10,
        centralityScore: 0.98,
        metadata: {
          alias: 'D-Boss / Don',
          crimeCategory: 'Extortion',
          warrants: 8,
          activePhones: 2,
        }
      }
    },
    {
      id: 'node-crm-02',
      type: 'personNode',
      position: { x: 80, y: 380 },
      data: {
        label: 'Suresh Patel',
        type: 'person',
        subType: 'Chief Hawala Banker',
        riskScore: 92,
        riskLevel: 'CRITICAL',
        entityId: 'crm-02',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        status: 'UNDER_SURVEILLANCE',
        connectionsCount: 9,
        centralityScore: 0.92,
        metadata: {
          alias: 'Kuber / S-Bhai',
          crimeCategory: 'Money Laundering',
          warrants: 4,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-03',
      type: 'personNode',
      position: { x: 420, y: 460 },
      data: {
        label: 'Kabir Deshmukh',
        type: 'person',
        subType: 'Weapons & Hit-squad Chief',
        riskScore: 95,
        riskLevel: 'CRITICAL',
        entityId: 'crm-03',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 7,
        centralityScore: 0.88,
        metadata: {
          alias: 'K-47 / Bhai',
          crimeCategory: 'Arms Smuggling',
          warrants: 9,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-04',
      type: 'personNode',
      position: { x: 680, y: 180 },
      data: {
        label: 'Ananya Roy',
        type: 'person',
        subType: 'Mahadev Betting & Crypto Lead',
        riskScore: 91,
        riskLevel: 'CRITICAL',
        entityId: 'crm-04',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 8,
        centralityScore: 0.85,
        metadata: {
          alias: 'ZeroByte / Queenpin',
          crimeCategory: 'Cybercrime',
          warrants: 6,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-05',
      type: 'personNode',
      position: { x: 120, y: 120 },
      data: {
        label: 'Devendra Rawat',
        type: 'person',
        subType: 'NCR Extortion Bahubali',
        riskScore: 93,
        riskLevel: 'CRITICAL',
        entityId: 'crm-05',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 8,
        centralityScore: 0.89,
        metadata: {
          alias: 'NCR Bahubali / Lala',
          crimeCategory: 'Extortion',
          warrants: 11,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-07',
      type: 'personNode',
      position: { x: 280, y: 320 },
      data: {
        label: 'Farooq Ansari',
        type: 'person',
        subType: 'JNPT Port Maritime Smuggler',
        riskScore: 89,
        riskLevel: 'HIGH',
        entityId: 'crm-07',
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        status: 'UNDER_SURVEILLANCE',
        connectionsCount: 7,
        centralityScore: 0.82,
        metadata: {
          alias: 'The Port Shadow',
          crimeCategory: 'Drug Trafficking',
          warrants: 4,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-08',
      type: 'personNode',
      position: { x: 220, y: 520 },
      data: {
        label: 'Ashok Gupta',
        type: 'person',
        subType: 'Customs CHA & Shell Architect',
        riskScore: 82,
        riskLevel: 'HIGH',
        entityId: 'crm-08',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        status: 'UNDER_SURVEILLANCE',
        connectionsCount: 5,
        centralityScore: 0.74,
        metadata: {
          alias: 'Dalal / CA Sahab',
          crimeCategory: 'Money Laundering',
          warrants: 2,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-09',
      type: 'personNode',
      position: { x: 860, y: 260 },
      data: {
        label: 'Gaurav Sharma',
        type: 'person',
        subType: 'OTP & APK Phishing Dev',
        riskScore: 84,
        riskLevel: 'HIGH',
        entityId: 'crm-09',
        avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        status: 'UNDER_SURVEILLANCE',
        connectionsCount: 4,
        centralityScore: 0.70,
        metadata: {
          alias: 'ByteLord',
          crimeCategory: 'Cybercrime',
          warrants: 3,
          activePhones: 1,
        }
      }
    },

    // 2. Organization Nodes
    {
      id: 'node-org-01',
      type: 'organizationNode',
      position: { x: 240, y: 200 },
      data: {
        label: 'Western Underworld Syndicate',
        type: 'organization',
        riskLevel: 'CRITICAL',
        riskScore: 98,
        entityId: 'org-01',
        connectionsCount: 140,
        metadata: {
          territory: 'Mumbai, Thane, Pune',
          revenue: '₹450 Cr/yr'
        }
      }
    },
    {
      id: 'node-org-03',
      type: 'organizationNode',
      position: { x: 150, y: 440 },
      data: {
        label: 'Surat-Mumbai Angadia Network',
        type: 'organization',
        riskLevel: 'CRITICAL',
        riskScore: 92,
        entityId: 'org-03',
        connectionsCount: 220,
        metadata: {
          territory: 'Zaveri Bazaar, Surat Bourse',
          revenue: '₹1,200 Cr/yr'
        }
      }
    },
    {
      id: 'node-org-04',
      type: 'organizationNode',
      position: { x: 740, y: 100 },
      data: {
        label: 'Eastern Cyber & Mahadev Cartel',
        type: 'organization',
        riskLevel: 'HIGH',
        riskScore: 91,
        entityId: 'org-04',
        connectionsCount: 110,
        metadata: {
          territory: 'Kolkata, Cyberabad, Dubai',
          revenue: '₹320 Cr/yr'
        }
      }
    },

    // 3. Location Nodes
    {
      id: 'node-loc-01',
      type: 'locationNode',
      position: { x: 420, y: 320 },
      data: {
        label: 'JNPT Port Terminal 2',
        type: 'location',
        riskLevel: 'CRITICAL',
        riskScore: 95,
        entityId: 'loc-01',
        metadata: {
          city: 'Navi Mumbai',
          facility: 'Container Terminal'
        }
      }
    },
    {
      id: 'node-loc-02',
      type: 'locationNode',
      position: { x: 40, y: 260 },
      data: {
        label: 'Zaveri Bazaar Angadia Vault',
        type: 'location',
        riskLevel: 'CRITICAL',
        riskScore: 94,
        entityId: 'loc-02',
        metadata: {
          city: 'Mumbai',
          facility: 'Cash Vault Hub'
        }
      }
    },
    {
      id: 'node-loc-04',
      type: 'locationNode',
      position: { x: 30, y: 40 },
      data: {
        label: 'Cyber City Gurugram Complex',
        type: 'location',
        riskLevel: 'CRITICAL',
        riskScore: 93,
        entityId: 'loc-04',
        metadata: {
          city: 'Gurugram',
          facility: 'Extortion Office'
        }
      }
    },

    // 4. Financial Nodes
    {
      id: 'node-fin-01',
      type: 'financialNode',
      position: { x: 320, y: 80 },
      data: {
        label: 'Singhania Star Logistics (HDFC)',
        type: 'bank',
        riskLevel: 'CRITICAL',
        riskScore: 96,
        entityId: 'fin-01',
        metadata: {
          balance: '₹28.5 Cr',
          status: 'MONITORED'
        }
      }
    },
    {
      id: 'node-fin-02',
      type: 'financialNode',
      position: { x: 600, y: 300 },
      data: {
        label: 'ZeroByte USDT Liquidity Pool',
        type: 'bank',
        riskLevel: 'CRITICAL',
        riskScore: 94,
        entityId: 'fin-02',
        metadata: {
          balance: '₹34.0 Cr',
          status: 'ACTIVE'
        }
      }
    },

    // 5. Phone Nodes
    {
      id: 'node-ph-01',
      type: 'phoneNode',
      position: { x: 500, y: 110 },
      data: {
        label: '+91 98201 54910 (Singhania)',
        type: 'phone',
        riskLevel: 'CRITICAL',
        riskScore: 97,
        entityId: 'ph-01',
        metadata: {
          status: 'TAPPED',
          carrier: 'Jio 5G Encrypted'
        }
      }
    },
    {
      id: 'node-ph-02',
      type: 'phoneNode',
      position: { x: -40, y: 380 },
      data: {
        label: '+91 98220 11988 (Patel Hawala)',
        type: 'phone',
        riskLevel: 'HIGH',
        riskScore: 91,
        entityId: 'ph-02',
        metadata: {
          status: 'TAPPED',
          carrier: 'Airtel Enterprise'
        }
      }
    }
  ],
  edges: [
    {
      id: 'edge-01',
      source: 'node-crm-01',
      target: 'node-org-01',
      data: { relationshipType: 'Owns', details: 'Supreme Don', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-02',
      source: 'node-crm-01',
      target: 'node-crm-02',
      data: { relationshipType: 'Money Transfer', details: 'Hawala Transfers (₹22 Cr)', amount: 224000000, riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-03',
      source: 'node-crm-01',
      target: 'node-crm-03',
      data: { relationshipType: 'Associate', details: 'Armed Wing Chief', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-04',
      source: 'node-crm-01',
      target: 'node-crm-07',
      data: { relationshipType: 'Associate', details: 'JNPT Port Clearing', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-05',
      source: 'node-crm-02',
      target: 'node-org-03',
      data: { relationshipType: 'Owns', details: 'Angadia Master', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-06',
      source: 'node-crm-02',
      target: 'node-loc-02',
      data: { relationshipType: 'Operates In', details: 'Cash Bunker', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-07',
      source: 'node-crm-07',
      target: 'node-loc-01',
      data: { relationshipType: 'Operates In', details: 'Cargo Terminal 2', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-08',
      source: 'node-crm-04',
      target: 'node-org-04',
      data: { relationshipType: 'Owns', details: 'Managing Director', riskLevel: 'HIGH' }
    },
    {
      id: 'edge-09',
      source: 'node-crm-04',
      target: 'node-crm-09',
      data: { relationshipType: 'Associate', details: 'Phishing Team Lead', riskLevel: 'HIGH' }
    },
    {
      id: 'edge-10',
      source: 'node-crm-04',
      target: 'node-crm-02',
      data: { relationshipType: 'Money Transfer', details: 'Crypto-Hawala Bridge', amount: 180000000, riskLevel: 'HIGH' }
    },
    {
      id: 'edge-11',
      source: 'node-crm-05',
      target: 'node-crm-03',
      data: { relationshipType: 'Supplies', details: 'Arms Intermediary', riskLevel: 'HIGH' }
    },
    {
      id: 'edge-12',
      source: 'node-crm-05',
      target: 'node-loc-04',
      data: { relationshipType: 'Operates In', details: 'Extortion HQ', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-13',
      source: 'node-crm-01',
      target: 'node-fin-01',
      data: { relationshipType: 'Owns', details: 'Shell Account', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-14',
      source: 'node-crm-04',
      target: 'node-fin-02',
      data: { relationshipType: 'Owns', details: 'USDT Mixer', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-15',
      source: 'node-crm-01',
      target: 'node-ph-01',
      data: { relationshipType: 'Calls', details: 'Tapped Jio Line', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-16',
      source: 'node-crm-02',
      target: 'node-ph-02',
      data: { relationshipType: 'Calls', details: 'Tapped Airtel Line', riskLevel: 'HIGH' }
    }
  ],
  metrics: {
    degreeCentralityTopNodes: [
      { id: 'node-crm-01', name: 'Vikram Singhania', score: 0.98 },
      { id: 'node-crm-02', name: 'Suresh Patel', score: 0.92 },
      { id: 'node-crm-04', name: 'Ananya Roy', score: 0.85 },
      { id: 'node-crm-05', name: 'Devendra Rawat', score: 0.89 }
    ],
    betweennessCentralityTopNodes: [
      { id: 'node-crm-02', name: 'Suresh Patel (Hawala)', score: 0.924 },
      { id: 'node-crm-01', name: 'Vikram Singhania', score: 0.880 },
      { id: 'node-crm-07', name: 'Farooq Ansari (JNPT)', score: 0.742 }
    ],
    communityClustersCount: 4,
    highestInfluenceLeader: { id: 'node-crm-01', name: 'Vikram Singhania', score: 0.98 },
    totalConnections: 36,
    averageConnectionsPerNode: 4.2
  }
};
