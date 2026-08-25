import { PhoneRecord } from '../../types';

export const dummyPhoneRecords: PhoneRecord[] = [
  {
    id: 'ph-01',
    phoneNumber: '+91 98201 54910',
    carrier: 'Jio 5G (Encrypted eSIM)',
    imei: '864920048192014',
    suspectId: 'crm-01',
    ownerName: 'Vikram "D-Boss" Singhania',
    status: 'TAPPED',
    totalCallsLogged: 540,
    lastActive: '2026-08-25 03:45',
    frequentContacts: [
      { phoneNumber: '+91 98220 11988', contactName: 'Suresh Patel (Hawala)', callCount: 68 },
      { phoneNumber: '+91 98211 44920', contactName: 'Farooq Ansari (JNPT)', callCount: 42 }
    ]
  },
  {
    id: 'ph-02',
    phoneNumber: '+91 98220 11988',
    carrier: 'Airtel Enterprise Private',
    imei: '869102948172019',
    suspectId: 'crm-02',
    ownerName: 'Suresh "Hawala" Patel',
    status: 'TAPPED',
    totalCallsLogged: 920,
    lastActive: '2026-08-25 06:15',
    frequentContacts: [
      { phoneNumber: '+91 98201 54910', contactName: 'Vikram Singhania', callCount: 68 },
      { phoneNumber: '+91 98310 99401', contactName: 'Ananya Roy', callCount: 29 }
    ]
  },
  {
    id: 'ph-03',
    phoneNumber: '+91 98110 33819',
    carrier: 'Airtel Delhi NCR VIP',
    imei: '864920048192033',
    suspectId: 'crm-05',
    ownerName: 'Devendra "Don" Rawat',
    status: 'TAPPED',
    totalCallsLogged: 480,
    lastActive: '2026-08-25 01:20',
    frequentContacts: [
      { phoneNumber: '+91 99102 44910', contactName: 'Deepak Yadav (Fauji)', callCount: 54 }
    ]
  },
  {
    id: 'ph-04',
    phoneNumber: '+91 98310 99401',
    carrier: 'Jio Fiber VoIP Encrypted',
    imei: '864920049210941',
    suspectId: 'crm-04',
    ownerName: 'Ananya "Crypto" Roy',
    status: 'TAPPED',
    totalCallsLogged: 680,
    lastActive: '2026-08-25 05:15',
    frequentContacts: [
      { phoneNumber: '+91 94401 22910', contactName: 'Gaurav Sharma', callCount: 44 }
    ]
  }
];
