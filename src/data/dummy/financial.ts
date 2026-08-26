import { FinancialTransaction } from '../../types';

export const dummyTransactions: FinancialTransaction[] = [
  {
    id: 'tx-01',
    transactionId: 'TX-IN-2026-8819',
    sourceAccount: 'PUNB-BRADY-880192',
    sourceName: 'Punjab National Bank Brady House (Unauthorized LoU)',
    destinationAccount: 'HSBC-HK-99201948',
    destinationName: 'Stellar Diamonds HK (Nirav Modi Shell)',
    amount: 1450000000,
    currency: 'INR',
    timestamp: '2026-08-26T02:15:00Z',
    category: 'Wire',
    isSuspicious: true,
    riskScore: 99,
    notes: 'Fraudulent SWIFT Letter of Undertaking (LoU) transmission without core banking ledger entry flagged by ED / CBI.'
  },
  {
    id: 'tx-02',
    transactionId: 'TX-IN-2026-4419',
    sourceAccount: '0x99a81b2c4e6f8a9012cd',
    sourceName: 'D-Syndicate Treasury Cold Storage',
    destinationAccount: 'HABIB-UAE-881920',
    destinationName: 'Al-Memon Holdings LLC (Tiger Memon)',
    amount: 520000000,
    currency: 'INR',
    timestamp: '2026-08-25T23:30:00Z',
    category: 'Crypto',
    isSuspicious: true,
    riskScore: 98,
    notes: 'Rapid USDT stablecoin conversion into offshore fiat accounts flagged by FIU-IND and Interpol Financial Crime Directorate.'
  },
  {
    id: 'tx-03',
    transactionId: 'TX-IN-2026-1192',
    sourceAccount: 'HDFC-DELHI-992019',
    sourceName: 'Corporate Victim Escrow Account',
    destinationAccount: 'AXIS-KOLKATA-449102',
    destinationName: 'Balaji Luxury Automotive Imports (Sukesh Chandrashekhar)',
    amount: 215000000,
    currency: 'INR',
    timestamp: '2026-08-25T18:40:00Z',
    category: 'Shell Entity',
    isSuspicious: true,
    riskScore: 97,
    notes: 'Extortion compliance installment spoofed from Tihar jail channeled into luxury vehicle procurement and hawala tokens.'
  },
  {
    id: 'tx-04',
    transactionId: 'TX-IN-2026-7700',
    sourceAccount: '0x71c0491829410cb9210492',
    sourceName: 'GainBitcoin Investor Pool (Amit Bhardwaj)',
    destinationAccount: '0x88f01928471bca902814',
    destinationName: 'Darknet Tumbler Cold Core (Sriki Srikrishna)',
    amount: 380000000,
    currency: 'INR',
    timestamp: '2026-08-25T14:10:00Z',
    category: 'Hawala',
    isSuspicious: true,
    riskScore: 95,
    notes: 'Layered cryptocurrency tumbling sequence hopping through 124 unhosted wallets to obscure investor Bitcoin trail.'
  }
];

export const dummyFinancialTransactions = dummyTransactions;
