import { Alert } from '../../types';

export const dummyAlerts: Alert[] = [
  {
    id: 'alt-01',
    alertCode: 'ALT-MUM-8819',
    title: 'High-Priority Extortion Threat: Worli Sea Face Developers',
    alertLevel: 'CRITICAL',
    aiConfidence: 98,
    description: 'Intercepted satellite telemetry confirms Vikram Singhania gang issued ₹25 Crore extortion demand to Worli sea-facing tower developers with 48h deadline.',
    relatedCriminals: [
      { id: 'crm-01', name: 'Vikram "D-Boss" Singhania', alias: 'Don', riskScore: 98 },
      { id: 'crm-03', name: 'Kabir "Shooter" Deshmukh', alias: 'K-47', riskScore: 95 }
    ],
    location: {
      name: 'Worli Sea Face',
      city: 'Mumbai',
      coordinates: [19.0176, 72.8150]
    },
    timestamp: '2026-08-25T04:15:00Z',
    category: 'High-Risk Meeting',
    status: 'NEW',
    suggestedAction: 'Deploy Crime Branch Unit 9 armed tactical perimeter and initiate FIR under MCOCA.'
  },
  {
    id: 'alt-02',
    alertCode: 'ALT-ZAV-4410',
    title: 'Massive Angadia Hawala Cash Dispatch Detected: Zaveri Bazaar',
    alertLevel: 'HIGH',
    aiConfidence: 94,
    description: 'Surveillance cameras at Kalbadevi logged 4 courier vans loading ₹35 Crore in untraceable cash destined for Surat Diamond Bourse transit depot.',
    relatedCriminals: [
      { id: 'crm-02', name: 'Suresh "Hawala" Patel', alias: 'Kuber', riskScore: 92 },
      { id: 'crm-08', name: 'Ashok "Broker" Gupta', alias: 'Dalal', riskScore: 82 }
    ],
    location: {
      name: 'Zaveri Bazaar',
      city: 'Mumbai',
      coordinates: [18.9515, 72.8317]
    },
    timestamp: '2026-08-25T03:40:00Z',
    category: 'Financial Anomaly',
    status: 'NEW',
    suggestedAction: 'Notify Enforcement Directorate (ED) & Income Tax Quick Response Team for highway interdiction.'
  },
  {
    id: 'alt-03',
    alertCode: 'ALT-NCR-3390',
    title: 'Assault Weapon Cache Moving Towards NCR Toll Plazas',
    alertLevel: 'CRITICAL',
    aiConfidence: 96,
    description: 'Telemetry indicates Mahindra Scorpio (UP-16-BX-1122) carrying automated weapons and Deepak Yadav hitmen moving towards DND Flyway.',
    relatedCriminals: [
      { id: 'crm-05', name: 'Devendra "Don" Rawat', alias: 'NCR Bahubali', riskScore: 93 },
      { id: 'crm-06', name: 'Deepak "Shooter" Yadav', alias: 'Fauji', riskScore: 88 }
    ],
    location: {
      name: 'Cyber City Toll Corridor',
      city: 'Gurugram',
      coordinates: [28.4905, 77.0894]
    },
    timestamp: '2026-08-25T02:10:00Z',
    category: 'Weapon Sighting',
    status: 'ACKNOWLEDGED',
    suggestedAction: 'Alert Delhi Special Cell and UP STF for high-speed barricade deployment.'
  },
  {
    id: 'alt-04',
    alertCode: 'ALT-KOL-9901',
    title: 'Decentralized Mahadev Betting App Token Laundering Surge',
    alertLevel: 'HIGH',
    aiConfidence: 91,
    description: 'FIU-IND alert: Over ₹18 Crore in illicit betting deposits routed through smart contract mixers in Salt Lake Sector V server cluster.',
    relatedCriminals: [
      { id: 'crm-04', name: 'Ananya "Crypto" Roy', alias: 'ZeroByte', riskScore: 91 },
      { id: 'crm-09', name: 'Gaurav "Cyber" Sharma', alias: 'ByteLord', riskScore: 84 }
    ],
    location: {
      name: 'Sector V, Salt Lake',
      city: 'Kolkata',
      coordinates: [22.5804, 88.4378]
    },
    timestamp: '2026-08-25T01:30:00Z',
    category: 'Financial Anomaly',
    status: 'ESCALATED',
    suggestedAction: 'Execute emergency bank account freezes under PMLA Section 17.'
  }
];
