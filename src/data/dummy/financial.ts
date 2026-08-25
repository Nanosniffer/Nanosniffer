import { FinancialTransaction } from '../../types';

export const dummyTransactions: FinancialTransaction[] = [
  {
    id: 'tx-01',
    transactionId: 'TX-IN-2026-8819',
    sourceAccount: 'HDFC000192847192',
    sourceName: 'Singhania Star Logistics LLP',
    destinationAccount: 'SBIN000849102941',
    destinationName: 'Kuber Global Exports (Suresh Patel)',
    amount: 224000000,
    currency: 'INR',
    timestamp: '2026-08-25T02:15:00Z',
    category: 'Hawala',
    isSuspicious: true,
    riskScore: 98,
    notes: 'Unaccounted ₹22.4 Crore Angadia courier cash transfer matching JNPT port heroin consignment settlement schedule.'
  },
  {
    id: 'tx-02',
    transactionId: 'TX-IN-2026-4419',
    sourceAccount: '0x98fa83bca9214710bc2819',
    sourceName: 'D-Vault Cold Storage',
    destinationAccount: '0x71c0491829410cb9210492',
    destinationName: 'ZeroByte Mixer Pool (Ananya Roy)',
    amount: 180000000,
    currency: 'INR',
    timestamp: '2026-08-24T23:30:00Z',
    category: 'Crypto',
    isSuspicious: true,
    riskScore: 94,
    notes: 'Rapid P2P splitting of 2.15M USDT through 45 layered mule accounts flagged by FIU-IND.'
  },
  {
    id: 'tx-03',
    transactionId: 'TX-IN-2026-1192',
    sourceAccount: 'PUNB0001928471',
    sourceName: 'Rawat Infra Mining Corp',
    destinationAccount: 'ICIC000918274619',
    destinationName: 'Kabir Deshmukh Security Fund',
    amount: 14500000,
    currency: 'INR',
    timestamp: '2026-08-24T18:40:00Z',
    category: 'Shell Entity',
    isSuspicious: true,
    riskScore: 89,
    notes: 'Fake corporate security consultancy invoice masking payment for illegal automatic weapons shipment from Pune.'
  },
  {
    id: 'tx-04',
    transactionId: 'TX-IN-2026-7700',
    sourceAccount: 'KKBK0001928471',
    sourceName: 'Apex Capital Ventures LLP (Ashok Gupta)',
    destinationAccount: 'BOFA0001928471',
    destinationName: 'Ansari Container Freight Services',
    amount: 38000000,
    currency: 'INR',
    timestamp: '2026-08-24T14:10:00Z',
    category: 'Wire',
    isSuspicious: true,
    riskScore: 91,
    notes: 'Circular trading kickback between customs CHA broker and freight handling logistics front.'
  }
];

export const dummyFinancialTransactions = dummyTransactions;
