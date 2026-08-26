import { PhoneRecord } from '../../types';

export const dummyPhoneRecords: PhoneRecord[] = [
  {
    id: 'ph-01',
    phoneNumber: '+971 50 998 1100',
    carrier: 'Thuraya Satellite Encrypted',
    imei: '864920048192014',
    suspectId: 'crm-01',
    ownerName: 'Dawood Ibrahim Kaskar',
    status: 'TAPPED',
    totalCallsLogged: 840,
    lastActive: '2026-08-26 01:10 IST',
    frequentContacts: [
      { phoneNumber: '+971 55 771 9022', contactName: 'Tiger Memon', callCount: 142 },
      { phoneNumber: '+971 50 882 1099', contactName: 'Chhota Shakeel', callCount: 218 }
    ]
  },
  {
    id: 'ph-02',
    phoneNumber: '+91 98110 99401',
    carrier: 'Airtel Spoofed Virtual VoIP',
    imei: '869102948172019',
    suspectId: 'crm-14',
    ownerName: 'Sukesh Chandrashekhar (Tihar Cell)',
    status: 'TAPPED',
    totalCallsLogged: 920,
    lastActive: '2026-08-26 03:30 IST',
    frequentContacts: [
      { phoneNumber: '+91 98200 44919', contactName: 'Hawala Courier Mumbai', callCount: 94 },
      { phoneNumber: '+91 99102 88401', contactName: 'Corporate Target Legal Counsel', callCount: 45 }
    ]
  },
  {
    id: 'ph-03',
    phoneNumber: '+91 98800 11920',
    carrier: 'Jio 5G Encrypted Darknet Node',
    imei: '864920048192033',
    suspectId: 'crm-07',
    ownerName: 'Srikrishna Ramesh (Sriki)',
    status: 'TAPPED',
    totalCallsLogged: 580,
    lastActive: '2026-08-26 02:15 IST',
    frequentContacts: [
      { phoneNumber: '+91 98220 44102', contactName: 'Amit Bhardwaj (GainBitcoin)', callCount: 78 }
    ]
  },
  {
    id: 'ph-04',
    phoneNumber: '+91 98201 88410',
    carrier: 'Vodafone Idea Encrypted Line',
    imei: '864920049210941',
    suspectId: 'crm-23',
    ownerName: 'Shashikala "Baby" Patankar',
    status: 'TAPPED',
    totalCallsLogged: 680,
    lastActive: '2026-08-26 01:05 IST',
    frequentContacts: [
      { phoneNumber: '+91 99250 14920', contactName: 'Dharmesh Patel (Chemical Don)', callCount: 88 },
      { phoneNumber: '+254 722 990184', contactName: 'Vicky Goswami (Mombasa)', callCount: 52 }
    ]
  }
];
