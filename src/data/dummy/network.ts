import { NetworkGraphData } from '../../types';

export const dummyNetworkGraph: NetworkGraphData = {
  nodes: [
    // 1. Person Nodes
    {
      id: 'node-crm-01',
      type: 'personNode',
      position: { x: 380, y: 150 },
      data: {
        label: 'Dawood Ibrahim Kaskar',
        type: 'person',
        subType: 'D-Company Chief / Bhai',
        riskScore: 99,
        riskLevel: 'CRITICAL',
        entityId: 'crm-01',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 28,
        centralityScore: 0.99,
        metadata: {
          alias: 'D-Company Chief / Bhai',
          crimeCategory: 'Terrorism Financing',
          warrants: 14,
          activePhones: 2,
        }
      }
    },
    {
      id: 'node-crm-02',
      type: 'personNode',
      position: { x: 120, y: 320 },
      data: {
        label: 'Tiger Memon',
        type: 'person',
        subType: 'Operational Commander',
        riskScore: 98,
        riskLevel: 'CRITICAL',
        entityId: 'crm-02',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 22,
        centralityScore: 0.96,
        metadata: {
          alias: 'Tiger Memon',
          crimeCategory: 'Terrorism Financing',
          warrants: 9,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-21',
      type: 'personNode',
      position: { x: 480, y: 380 },
      data: {
        label: 'Chhota Shakeel',
        type: 'person',
        subType: 'Enforcer & Arms Chief',
        riskScore: 98,
        riskLevel: 'CRITICAL',
        entityId: 'crm-21',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 24,
        centralityScore: 0.95,
        metadata: {
          alias: 'Chhota Shakeel',
          crimeCategory: 'Arms Smuggling',
          warrants: 12,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-14',
      type: 'personNode',
      position: { x: 740, y: 140 },
      data: {
        label: 'Sukesh Chandrashekhar',
        type: 'person',
        subType: 'Tihar Conman / Master Extortionist',
        riskScore: 97,
        riskLevel: 'CRITICAL',
        entityId: 'crm-14',
        avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        status: 'IN_CUSTODY',
        connectionsCount: 18,
        centralityScore: 0.94,
        metadata: {
          alias: 'Balaji / Tihar Conman',
          crimeCategory: 'Money Laundering',
          warrants: 16,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-15',
      type: 'personNode',
      position: { x: 620, y: 440 },
      data: {
        label: 'Nirav Deepak Modi',
        type: 'person',
        subType: 'Firestar Diamond Magnate',
        riskScore: 96,
        riskLevel: 'CRITICAL',
        entityId: 'crm-15',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 16,
        centralityScore: 0.92,
        metadata: {
          alias: 'Firestar Diamond',
          crimeCategory: 'Money Laundering',
          warrants: 8,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-07',
      type: 'personNode',
      position: { x: 880, y: 320 },
      data: {
        label: 'Srikrishna Ramesh (Sriki)',
        type: 'person',
        subType: 'Darknet Crypto Hacker',
        riskScore: 94,
        riskLevel: 'CRITICAL',
        entityId: 'crm-07',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: 'BAIL',
        connectionsCount: 12,
        centralityScore: 0.88,
        metadata: {
          alias: 'Sriki / Crypto Phantom',
          crimeCategory: 'Cybercrime',
          warrants: 7,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-23',
      type: 'personNode',
      position: { x: 260, y: 460 },
      data: {
        label: 'Shashikala Patankar',
        type: 'person',
        subType: 'Worli Mephedrone Queen',
        riskScore: 94,
        riskLevel: 'CRITICAL',
        entityId: 'crm-23',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        status: 'BAIL',
        connectionsCount: 14,
        centralityScore: 0.90,
        metadata: {
          alias: 'Baby Patankar',
          crimeCategory: 'Drug Trafficking',
          warrants: 5,
          activePhones: 1,
        }
      }
    },
    {
      id: 'node-crm-22',
      type: 'personNode',
      position: { x: 180, y: 600 },
      data: {
        label: 'Vijaygiri Goswami (Vicky)',
        type: 'person',
        subType: 'Transnational Meth King',
        riskScore: 97,
        riskLevel: 'CRITICAL',
        entityId: 'crm-22',
        avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        status: 'WANTED',
        connectionsCount: 15,
        centralityScore: 0.91,
        metadata: {
          alias: 'Vicky Goswami',
          crimeCategory: 'Drug Trafficking',
          warrants: 10,
          activePhones: 1,
        }
      }
    },

    // 2. Organization Nodes
    {
      id: 'node-org-01',
      type: 'organizationNode',
      position: { x: 280, y: 220 },
      data: {
        label: 'D-Company Global Syndicate',
        type: 'organization',
        riskLevel: 'CRITICAL',
        riskScore: 99,
        entityId: 'org-01',
        connectionsCount: 450,
        metadata: {
          territory: 'Mumbai, Karachi, Dubai',
          revenue: '₹45,000 Cr/yr'
        }
      }
    },
    {
      id: 'node-org-05',
      type: 'organizationNode',
      position: { x: 540, y: 560 },
      data: {
        label: 'Firestar Diamond Global Syndicate',
        type: 'organization',
        riskLevel: 'CRITICAL',
        riskScore: 96,
        entityId: 'org-05',
        connectionsCount: 75,
        metadata: {
          territory: 'BKC Mumbai, Mayfair London',
          revenue: '₹13,500 Cr PNB Fraud'
        }
      }
    },
    {
      id: 'node-org-04',
      type: 'organizationNode',
      position: { x: 220, y: 380 },
      data: {
        label: 'Worli Mephedrone Cartel',
        type: 'organization',
        riskLevel: 'CRITICAL',
        riskScore: 94,
        entityId: 'org-04',
        connectionsCount: 160,
        metadata: {
          territory: 'Worli Dairy Slums, Mumbai',
          revenue: '₹450 Cr/yr'
        }
      }
    },

    // 3. Location Nodes
    {
      id: 'node-loc-01',
      type: 'locationNode',
      position: { x: 420, y: 20 },
      data: {
        label: 'Dongri & Nagpada HQ',
        type: 'location',
        riskLevel: 'CRITICAL',
        riskScore: 99,
        entityId: 'loc-01',
        metadata: {
          city: 'Mumbai',
          facility: 'D-Company Core'
        }
      }
    },
    {
      id: 'node-loc-02',
      type: 'locationNode',
      position: { x: 800, y: 40 },
      data: {
        label: 'Tihar Jail Special Ward',
        type: 'location',
        riskLevel: 'CRITICAL',
        riskScore: 97,
        entityId: 'loc-02',
        metadata: {
          city: 'New Delhi',
          facility: 'High Security Complex'
        }
      }
    },
    {
      id: 'node-loc-03',
      type: 'locationNode',
      position: { x: 680, y: 520 },
      data: {
        label: 'Bharat Diamond Bourse BKC',
        type: 'location',
        riskLevel: 'HIGH',
        riskScore: 94,
        entityId: 'loc-03',
        metadata: {
          city: 'Mumbai',
          facility: 'Diamond Hub'
        }
      }
    },

    // 4. Financial Nodes
    {
      id: 'node-fin-01',
      type: 'financialNode',
      position: { x: 180, y: 80 },
      data: {
        label: 'D-Syndicate Tether USDT Vault',
        type: 'bank',
        riskLevel: 'CRITICAL',
        riskScore: 98,
        entityId: 'fin-01',
        metadata: {
          balance: '₹145.0 Cr',
          status: 'ACTIVE'
        }
      }
    },
    {
      id: 'node-fin-02',
      type: 'financialNode',
      position: { x: 920, y: 460 },
      data: {
        label: 'Darknet Tumbler Cold Core',
        type: 'bank',
        riskLevel: 'CRITICAL',
        riskScore: 95,
        entityId: 'fin-02',
        metadata: {
          balance: '₹38.0 Cr',
          status: 'ACTIVE'
        }
      }
    }
  ],
  edges: [
    {
      id: 'edge-01',
      source: 'node-crm-01',
      target: 'node-org-01',
      data: { relationshipType: 'Owns', details: 'Supreme Commander', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-02',
      source: 'node-crm-01',
      target: 'node-crm-02',
      data: { relationshipType: 'Associate', details: '1993 Blasts Logistics', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-03',
      source: 'node-crm-01',
      target: 'node-crm-21',
      data: { relationshipType: 'Associate', details: 'Arms & Enforcement Chief', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-04',
      source: 'node-crm-01',
      target: 'node-loc-01',
      data: { relationshipType: 'Operates In', details: 'Command Ground Zero', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-05',
      source: 'node-crm-01',
      target: 'node-fin-01',
      data: { relationshipType: 'Owns', details: 'USDT Crypto Treasury', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-06',
      source: 'node-crm-14',
      target: 'node-loc-02',
      data: { relationshipType: 'Operates In', details: 'Extortion Call Operations', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-07',
      source: 'node-crm-15',
      target: 'node-org-05',
      data: { relationshipType: 'Owns', details: 'PNB LoU Beneficiary', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-08',
      source: 'node-crm-15',
      target: 'node-loc-03',
      data: { relationshipType: 'Operates In', details: 'Diamond Trading Front', riskLevel: 'HIGH' }
    },
    {
      id: 'edge-09',
      source: 'node-crm-07',
      target: 'node-fin-02',
      data: { relationshipType: 'Owns', details: 'Crypto Mixer Pool', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-10',
      source: 'node-crm-23',
      target: 'node-org-04',
      data: { relationshipType: 'Owns', details: 'Worli MD Cartel Queen', riskLevel: 'CRITICAL' }
    },
    {
      id: 'edge-11',
      source: 'node-crm-23',
      target: 'node-crm-22',
      data: { relationshipType: 'Associate', details: 'Transnational Narcotics Ingress', riskLevel: 'CRITICAL' }
    }
  ],
  metrics: {
    degreeCentralityTopNodes: [
      { id: 'node-crm-01', name: 'Dawood Ibrahim Kaskar', score: 0.99 },
      { id: 'node-crm-02', name: 'Tiger Memon', score: 0.96 },
      { id: 'node-crm-21', name: 'Chhota Shakeel', score: 0.95 },
      { id: 'node-crm-14', name: 'Sukesh Chandrashekhar', score: 0.94 }
    ],
    betweennessCentralityTopNodes: [
      { id: 'node-crm-01', name: 'Dawood Ibrahim Kaskar', score: 0.992 },
      { id: 'node-crm-21', name: 'Chhota Shakeel', score: 0.945 },
      { id: 'node-crm-15', name: 'Nirav Deepak Modi', score: 0.912 }
    ],
    communityClustersCount: 5,
    highestInfluenceLeader: { id: 'node-crm-01', name: 'Dawood Ibrahim Kaskar', score: 0.99 },
    totalConnections: 48,
    averageConnectionsPerNode: 5.2
  }
};
