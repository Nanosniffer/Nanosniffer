import { InvestigationReport } from '../../types';

export const dummyReports: InvestigationReport[] = [
  {
    id: 'rep-01',
    reportNumber: 'CBI-OPS-2026-0881',
    title: 'Operation Sagar Manthan: JNPT Heroin & Bullion Interdiction',
    type: 'Network Summary',
    dateGenerated: '2026-08-25',
    author: 'ACP Vikram Rathore, Crime Branch Mumbai',
    targetEntity: 'Western Underworld Syndicate (D-Group)',
    summary: 'Comprehensive multi-agency investigative dossier documenting the interception of container #MEDU-8819 at JNPT Port Navi Mumbai carrying 250 kg heroin valued at ₹1,750 Crore and its operational nexus with Vikram Singhania.',
    classificationLevel: 'TOP SECRET // INTEL',
    keyFindings: [
      'Container originated from Bandar Abbas and transshipped through Jebel Ali with forged CHA bills.',
      'Farooq Ansari facilitated express port clearance via compromised terminal operators.',
      'Hawala proceeds routed through Suresh Patel Zaveri Bazaar Angadia network to Dubai accounts.',
      'Direct links established with MCOCA Case No. 44/2026.'
    ],
    aiRiskScore: 98,
    metrics: {
      'Total Intercept Value': '₹1,750 Crore',
      'Target Suspects': 8,
      'Seized Contraband': '250 kg Heroin',
      'Port Terminals Compromised': 2
    },
    fileSizeBytes: 4829104
  },
  {
    id: 'rep-02',
    reportNumber: 'ED-PMLA-2026-0419',
    title: 'Project Garuda: Multi-State Mahadev Betting & Hawala Trail',
    type: 'Financial Analysis',
    dateGenerated: '2026-08-24',
    author: 'Deputy Director Rajesh Shinde, Enforcement Directorate',
    targetEntity: 'Eastern Cyber & Mahadev Betting Cartel',
    summary: 'Financial trail reconstruction of illegal Mahadev betting apps and decentralized crypto tokens generating ₹450 Crore in untaxed illicit capital across West Bengal, Maharashtra, and UAE.',
    classificationLevel: 'SECRET',
    keyFindings: [
      'Over 2,400 mule bank accounts opened using forged Aadhaar and PAN cards.',
      'Ananya Roy engineered decentralized smart contract liquidity pools to wash betting stakes.',
      'Surat Angadia networks supplied physical cash to local betting distributors.',
      'Total estimated syndicate volume exceeds ₹3,200 Crore over 18 months.'
    ],
    aiRiskScore: 94,
    metrics: {
      'Laundered Capital': '₹3,200 Crore',
      'Frozen Mule Accounts': 220,
      'Active Crypto Pools': 14,
      'ED PMLA Sections': 'Sec 3, 4 & 50'
    },
    fileSizeBytes: 3910240
  },
  {
    id: 'rep-03',
    reportNumber: 'DEL-SPEC-2026-0112',
    title: 'Dossier NCR-Grid: Corporate Extortion & Illegal Arms Nexus',
    type: 'Timeline Report',
    dateGenerated: '2026-08-23',
    author: 'Inspector Meera Rao, Delhi Police Special Cell',
    targetEntity: 'Northern Gangland Logistics',
    summary: 'Tactical analysis of Devendra Rawat\'s armed extortion syndicate operating across Gurugram, Noida, and Western UP toll corridors targeting commercial infrastructure developments.',
    classificationLevel: 'SECRET',
    keyFindings: [
      'Gang utilizes Bihar and MP country-made and smuggled automatic weapons.',
      'Extortion levies calculated at 3% of total project tender value.',
      'Deepak Yadav and Purvanchal sharpshooters employed for intimidatory firing at site offices.',
      'Syndicate backed by shell mining transport firms in Haryana and UP.'
    ],
    aiRiskScore: 93,
    metrics: {
      'Extortion Demands Logged': '₹45 Crore',
      'Threatened Builders': 6,
      'Seized Firearms': 16,
      'MCOCA Warrants': 11
    },
    fileSizeBytes: 2840190
  }
];

export const dummyInvestigationReports = dummyReports;
