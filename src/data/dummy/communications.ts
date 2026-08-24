import { PhoneRecord } from '../../types';

export const dummyPhoneRecords: PhoneRecord[] = [
  {
    id: 'ph-01',
    phoneNumber: '+40 721 899 432',
    carrier: 'Orange Romania (Encrypted SIM)',
    imei: '864920048192014',
    suspectId: 'crm-01',
    ownerName: 'Viktor Markov',
    status: 'TAPPED',
    totalCallsLogged: 420,
    lastActive: '2026-08-24 05:40',
    frequentContacts: [
      { phoneNumber: '+971 50 882 1099', contactName: 'Tariq Mansoor', callCount: 48 },
      { phoneNumber: '+49 171 902188', contactName: 'Helena Vance', callCount: 36 },
      { phoneNumber: '+46 8 555 901 22', contactName: 'Astrid Lindqvist', callCount: 29 }
    ]
  },
  {
    id: 'ph-02',
    phoneNumber: '+507 6821 9901',
    carrier: 'Cable & Wireless Panama (Burner)',
    imei: '869018239019283',
    suspectId: 'crm-02',
    ownerName: 'Mateo Silva',
    status: 'TAPPED',
    totalCallsLogged: 530,
    lastActive: '2026-08-23 21:00',
    frequentContacts: [
      { phoneNumber: '+49 171 902188', contactName: 'Helena Vance', callCount: 64 },
      { phoneNumber: '+30 694 201 8899', contactName: 'Dimitri Costa', callCount: 41 },
      { phoneNumber: '+57 310 889 2011', contactName: 'Carlos Ortiz', callCount: 88 }
    ]
  },
  {
    id: 'ph-03',
    phoneNumber: '+49 171 902188',
    carrier: 'Deutsche Telekom Enterprise',
    imei: '351982001928471',
    suspectId: 'crm-03',
    ownerName: 'Helena Vance',
    status: 'TAPPED',
    totalCallsLogged: 710,
    lastActive: '2026-08-24 08:20',
    frequentContacts: [
      { phoneNumber: '+30 694 201 8899', contactName: 'Dimitri Costa', callCount: 39 },
      { phoneNumber: '+507 6821 9901', contactName: 'Mateo Silva', callCount: 64 },
      { phoneNumber: '+40 721 899 432', contactName: 'Viktor Markov', callCount: 36 },
      { phoneNumber: '+39 02 8821 990', contactName: 'Luigi Moretti', callCount: 27 }
    ]
  },
  {
    id: 'ph-04',
    phoneNumber: '+30 694 201 8899',
    carrier: 'Cosmote Greece (Tapped Node)',
    imei: '359019284910293',
    suspectId: 'crm-06',
    ownerName: 'Dimitri Costa',
    status: 'TAPPED',
    totalCallsLogged: 410,
    lastActive: '2026-08-24 07:05',
    frequentContacts: [
      { phoneNumber: '+49 171 902188', contactName: 'Helena Vance', callCount: 39 },
      { phoneNumber: '+381 64 901 2289', contactName: 'Goran Dragovic', callCount: 33 },
      { phoneNumber: '+995 599 123 889', contactName: 'Nikolai Voronin', callCount: 45 }
    ]
  },
  {
    id: 'ph-05',
    phoneNumber: '+971 50 882 1099',
    carrier: 'Etisalat UAE VIP Encrypted',
    imei: '352910293840192',
    suspectId: 'crm-07',
    ownerName: 'Tariq Mansoor',
    status: 'TAPPED',
    totalCallsLogged: 840,
    lastActive: '2026-08-24 08:10',
    frequentContacts: [
      { phoneNumber: '+40 721 899 432', contactName: 'Viktor Markov', callCount: 48 },
      { phoneNumber: '+852 9123 4567', contactName: 'Raymond Leung', callCount: 31 },
      { phoneNumber: '+961 3 889 012', contactName: 'Fatima Al-Zahra', callCount: 22 }
    ]
  }
];
