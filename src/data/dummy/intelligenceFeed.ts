import { IntelligenceFeedItem } from '../../types';

export const dummyIntelligenceFeed: IntelligenceFeedItem[] = [
  {
    id: 'int-01',
    timestamp: '2026-08-25T06:15:00Z',
    source: 'MUMBAI CRIME BRANCH UNIT 9',
    type: 'surveillance',
    priority: 'CRITICAL',
    title: 'Bandra-Worli Sea Link Toll: Convoy Tagged by ANPR Cameras',
    summary: 'High-speed convoy with bulletproof Land Cruiser (MH-01-EA-7711) logged traversing towards South Mumbai with active RF jammers.',
    coordinates: [19.0176, 72.8150],
    confidenceScore: 98,
    suspectsInvolved: [
      { id: 'crm-01', name: 'Vikram Singhania', alias: 'D-Boss' },
      { id: 'crm-03', name: 'Kabir Deshmukh', alias: 'Shooter' }
    ]
  },
  {
    id: 'int-02',
    timestamp: '2026-08-25T05:40:00Z',
    source: 'ENFORCEMENT DIRECTORATE (ED)',
    type: 'financial_anomaly',
    priority: 'CRITICAL',
    title: 'Zaveri Bazaar Angadia Vault: ₹30 Crore Cash Movement Flagged',
    summary: 'Informal couriers dispatched 4 armoured tempo vans loaded with unaccounted cash and bullion toward Gujarat highway corridor.',
    coordinates: [18.9515, 72.8317],
    confidenceScore: 94,
    suspectsInvolved: [
      { id: 'crm-02', name: 'Suresh Patel', alias: 'Kuber' },
      { id: 'crm-08', name: 'Ashok Gupta', alias: 'Broker' }
    ]
  },
  {
    id: 'int-03',
    timestamp: '2026-08-25T04:20:00Z',
    source: 'DELHI POLICE SPECIAL CELL',
    type: 'social_media',
    priority: 'HIGH',
    title: 'Cyber City Gurugram: Encrypted Satellite Call Intercepted',
    summary: 'Devendra Rawat syndicate issued ₹15 Crore extortion demand to corporate builder with 24-hour compliance deadline.',
    coordinates: [28.4905, 77.0894],
    confidenceScore: 95,
    suspectsInvolved: [
      { id: 'crm-05', name: 'Devendra Rawat', alias: 'NCR Bahubali' },
      { id: 'crm-06', name: 'Deepak Yadav', alias: 'Fauji' }
    ]
  },
  {
    id: 'int-04',
    timestamp: '2026-08-25T03:00:00Z',
    source: 'NARCOTICS CONTROL BUREAU (NCB)',
    type: 'weapon_purchase',
    priority: 'CRITICAL',
    title: 'JNPT Port Terminal 2: 250 kg Heroin Consignment Seized',
    summary: 'DRI & NCB joint tactical squad successfully intercepted container #MEDU-8819 hidden in marble slabs from Bandar Abbas.',
    coordinates: [18.9499, 72.9511],
    confidenceScore: 99,
    suspectsInvolved: [
      { id: 'crm-07', name: 'Farooq Ansari', alias: 'Port Shadow' },
      { id: 'crm-01', name: 'Vikram Singhania', alias: 'D-Boss' }
    ]
  },
  {
    id: 'int-05',
    timestamp: '2026-08-25T01:30:00Z',
    source: 'CBI CYBER CRIME CELL',
    type: 'unknown_meeting',
    priority: 'HIGH',
    title: 'Salt Lake Sector V: Mahadev Betting C2 Server Clustered',
    summary: 'Forensic telemetry pinpointed 40 offshore betting mirrors hosted on AWS Mumbai and Singapore routing illicit P2P stakes.',
    coordinates: [22.5804, 88.4378],
    confidenceScore: 91,
    suspectsInvolved: [
      { id: 'crm-04', name: 'Ananya Roy', alias: 'ZeroByte' },
      { id: 'crm-09', name: 'Gaurav Sharma', alias: 'ByteLord' }
    ]
  }
];
