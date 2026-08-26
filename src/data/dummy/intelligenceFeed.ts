import { IntelligenceFeedItem } from '../../types';

export const dummyIntelligenceFeed: IntelligenceFeedItem[] = [
  {
    id: 'int-01',
    timestamp: '2026-08-26T06:15:00Z',
    source: 'MUMBAI CRIME BRANCH UNIT 9',
    type: 'surveillance',
    priority: 'CRITICAL',
    title: 'Dongri Angadia Corridor: D-Company Hawala Courier Sighted',
    summary: 'High-frequency telemetry confirmed cash couriers transferring encrypted ledger envelopes linked to Tiger Memon and Chhota Shakeel command nodes.',
    coordinates: [18.9560, 72.8360],
    confidenceScore: 99,
    suspectsInvolved: [
      { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', alias: 'D-Company Chief / Bhai' },
      { id: 'crm-21', name: 'Chhota Shakeel', alias: 'Enforcer & Arms Chief' }
    ]
  },
  {
    id: 'int-02',
    timestamp: '2026-08-26T05:40:00Z',
    source: 'DELHI POLICE SPECIAL CELL',
    type: 'social_media',
    priority: 'CRITICAL',
    title: 'Tihar Central Jail: Virtual Spoofing Cellular Intercept Active',
    summary: 'Mandoli / Tihar high security perimeter logged virtual SIM routing spoofing Union Ministry landlines for corporate extortion compliance.',
    coordinates: [28.6250, 77.0980],
    confidenceScore: 98,
    suspectsInvolved: [
      { id: 'crm-14', name: 'Sukesh Chandrashekhar', alias: 'Balaji / Tihar Conman' }
    ]
  },
  {
    id: 'int-03',
    timestamp: '2026-08-26T04:20:00Z',
    source: 'KARNATAKA CID CYBER CRIME WING',
    type: 'financial_anomaly',
    priority: 'CRITICAL',
    title: 'Bengaluru Indiranagar: 120 BTC Darknet Liquidity Drain Flagged',
    summary: 'Automated on-chain forensics detected sudden unhosted wallet transfers hopping through decentralized tumbler protocols orchestrated by Sriki.',
    coordinates: [12.9784, 77.6408],
    confidenceScore: 96,
    suspectsInvolved: [
      { id: 'crm-07', name: 'Srikrishna Ramesh', alias: 'Sriki / Crypto Phantom' },
      { id: 'crm-08', name: 'Amit Bhardwaj', alias: 'GainBitcoin Kingpin' }
    ]
  },
  {
    id: 'int-04',
    timestamp: '2026-08-26T03:00:00Z',
    source: 'ANTI-NARCOTICS CELL (ANC) MUMBAI',
    type: 'weapon_purchase',
    priority: 'HIGH',
    title: 'Worli Sea Face Slums: Synthetic Mephedrone Supply Cache Raid',
    summary: 'Joint tactical raid intercepted chemical tanker dispatch arriving from Ankleshwar GIDC and seized 120 kg high-purity Mephedrone.',
    coordinates: [19.0060, 72.8180],
    confidenceScore: 97,
    suspectsInvolved: [
      { id: 'crm-23', name: 'Shashikala Patankar', alias: 'Baby Patankar' },
      { id: 'crm-24', name: 'Dharmesh Patel', alias: 'Chemical Don' }
    ]
  },
  {
    id: 'int-05',
    timestamp: '2026-08-26T01:30:00Z',
    source: 'ENFORCEMENT DIRECTORATE (ED)',
    type: 'unknown_meeting',
    priority: 'HIGH',
    title: 'BKC Diamond Bourse: Circular Export Invoicing Cluster Traced',
    summary: 'Forensic financial intelligence identified overseas shell entities issuing inflated invoices for synthetic gemstone parcels linked to Firestar Diamond network.',
    coordinates: [19.0674, 72.8687],
    confidenceScore: 94,
    suspectsInvolved: [
      { id: 'crm-15', name: 'Nirav Deepak Modi', alias: 'Firestar Diamond' }
    ]
  }
];
