import { Alert } from '../../types';

export const dummyAlerts: Alert[] = [
  {
    id: 'alt-01',
    alertCode: 'ALT-MUM-8819',
    title: 'High-Priority Hawala Transfer: D-Company Mumbai-Dubai Link',
    alertLevel: 'CRITICAL',
    aiConfidence: 99,
    description: 'Intercepted satellite telemetry confirms ₹45 Crore illegal hawala transit routed from Dongri / Nagpada Angadia couriers to Karachi command accounts via Dubai.',
    relatedCriminals: [
      { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', alias: 'D-Company Chief / Bhai', riskScore: 99 },
      { id: 'crm-21', name: 'Chhota Shakeel', alias: 'Enforcer & Arms Chief', riskScore: 98 }
    ],
    location: {
      name: 'Dongri Angadia Corridor',
      city: 'Mumbai',
      coordinates: [18.9560, 72.8360]
    },
    timestamp: '2026-08-26T04:15:00Z',
    category: 'Financial Anomaly',
    status: 'NEW',
    suggestedAction: 'Deploy Crime Branch Unit 9 & NIA tactical units to seize Angadia ledgers and freeze linked offshore nodes.'
  },
  {
    id: 'alt-02',
    alertCode: 'ALT-DEL-2201',
    title: 'Tihar High-Security Ward: VoIP Spoofing Extortion Call Intercepted',
    alertLevel: 'CRITICAL',
    aiConfidence: 97,
    description: 'Special Cell intercepted a virtual spoofed international call originating from Mandoli / Tihar Jail Ward demanding ₹50 Crore from a prominent corporate industrialist.',
    relatedCriminals: [
      { id: 'crm-14', name: 'Sukesh Chandrashekhar', alias: 'Balaji / Tihar Conman', riskScore: 97 }
    ],
    location: {
      name: 'Tihar & Mandoli Jail Complex',
      city: 'New Delhi',
      coordinates: [28.6250, 77.0980]
    },
    timestamp: '2026-08-26T03:40:00Z',
    category: 'High-Risk Meeting',
    status: 'NEW',
    suggestedAction: 'Notify Delhi Police Special Cell and Enforcement Directorate for immediate cellular jammer sweeps.'
  },
  {
    id: 'alt-03',
    alertCode: 'ALT-BLR-4019',
    title: 'Bengaluru Crypto Drain: 120 BTC Tumbler Cascade Flagged',
    alertLevel: 'CRITICAL',
    aiConfidence: 96,
    description: 'Cyber Crime Unit detected 120 Bitcoin ($7.8M) being washed through decentralized smart contract mixers linked to the GainBitcoin & Darknet exploit pools.',
    relatedCriminals: [
      { id: 'crm-07', name: 'Srikrishna Ramesh', alias: 'Sriki / Crypto Phantom', riskScore: 94 },
      { id: 'crm-08', name: 'Amit Bhardwaj', alias: 'GainBitcoin Kingpin', riskScore: 91 }
    ],
    location: {
      name: 'Indiranagar Tech Hub',
      city: 'Bengaluru',
      coordinates: [12.9784, 77.6408]
    },
    timestamp: '2026-08-26T02:30:00Z',
    category: 'Financial Anomaly',
    status: 'ACKNOWLEDGED',
    suggestedAction: 'Issue emergency on-chain blacklisting requests to international centralized crypto exchanges.'
  },
  {
    id: 'alt-04',
    alertCode: 'ALT-WOR-9920',
    title: 'Worli-Gujarat Synthetic Mephedrone (MD) Chemical Pipeline',
    alertLevel: 'CRITICAL',
    aiConfidence: 95,
    description: 'NCB Gujarat & Mumbai ANC intercepted a 300kg Ephedrine precursor tanker dispatched from Ankleshwar GIDC en route to Worli sea-face processing safehouse.',
    relatedCriminals: [
      { id: 'crm-23', name: 'Shashikala Patankar', alias: 'Baby Patankar', riskScore: 94 },
      { id: 'crm-24', name: 'Dharmesh Patel', alias: 'Chemical Don', riskScore: 92 },
      { id: 'crm-22', name: 'Vijaygiri Goswami', alias: 'Vicky Goswami', riskScore: 97 }
    ],
    location: {
      name: 'Worli Dairy Slum Distribution Hub',
      city: 'Mumbai',
      coordinates: [19.0060, 72.8180]
    },
    timestamp: '2026-08-26T01:10:00Z',
    category: 'Weapon Sighting',
    status: 'ESCALATED',
    suggestedAction: 'Execute joint highway interdiction on NH-48 and seal Ankleshwar chemical warehouse.'
  },
  {
    id: 'alt-05',
    alertCode: 'ALT-PNB-5510',
    title: 'Offshore Diamond Round-Tripping & Shell Transfer Alert',
    alertLevel: 'HIGH',
    aiConfidence: 93,
    description: 'Financial Intelligence Unit (FIU-IND) logged circular diamond export invoices of ₹140 Crore between BKC Diamond Bourse and Mayfair London shell entities.',
    relatedCriminals: [
      { id: 'crm-15', name: 'Nirav Deepak Modi', alias: 'Firestar Diamond', riskScore: 96 }
    ],
    location: {
      name: 'Bharat Diamond Bourse BKC',
      city: 'Mumbai',
      coordinates: [19.0674, 72.8687]
    },
    timestamp: '2026-08-25T22:45:00Z',
    category: 'Financial Anomaly',
    status: 'ACKNOWLEDGED',
    suggestedAction: 'Notify Serious Fraud Investigation Office (SFIO) and attach bank guarantee collateral.'
  }
];
