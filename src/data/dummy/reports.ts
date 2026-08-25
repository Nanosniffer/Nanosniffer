import { InvestigationReport } from '../../types';

export const dummyInvestigationReports: InvestigationReport[] = [
  {
    id: 'rep-001',
    reportNumber: 'ACN-RPT-2026-094',
    title: 'Comprehensive Syndicate Network & Asset Topology',
    type: 'Network Summary',
    dateGenerated: '2026-08-24T08:00:00Z',
    author: 'Special Agent Marcus Vance (Lead Analyst)',
    targetEntity: 'Vanguard Cyber Syndicate & Cali-Medellin Axis',
    summary: 'A holistic threat matrix mapping 20 primary targets, 7 shell holding entities, 8 offshore banking vectors, and 12 tactical safehouses spanning Europe, South America, and the Middle East.',
    classificationLevel: 'TOP SECRET // INTEL',
    keyFindings: [
      'Identified Viktor Markov (CR-8942) and Mateo Silva (CR-4109) as central liquidity and supply anchors.',
      'Helena Vance operates as the sole single-point-of-failure bridge connecting South American maritime cargo to European port clearance.',
      'Tariq Mansoor has laundered in excess of $180M USD during FY2026 using UAE real estate and decentralized crypto escrow nodes.'
    ],
    aiRiskScore: 96,
    metrics: {
      'Identified Targets': 20,
      'Active Sub-Networks': 4,
      'Estimated Illicit Capital': '$420,000,000 USD',
      'High Threat Nodes': 7
    },
    fileSizeBytes: 4280192
  },
  {
    id: 'rep-002',
    reportNumber: 'ACN-RPT-2026-088',
    title: 'Cross-Border Ingress & Maritime Timeline Dossier',
    type: 'Timeline Report',
    dateGenerated: '2026-08-23T18:30:00Z',
    author: 'Investigator Sarah Lin (Maritime Interdiction)',
    targetEntity: 'Port of Rotterdam & Antwerp Corridors',
    summary: 'Chronological reconstruction of 100 tactical events over the last 90 days, detailing submersible delivery drops, customs manifest overrides, and encrypted radio schedules.',
    classificationLevel: 'SECRET',
    keyFindings: [
      'Submersible arrival intervals strictly correlate with heavy weather windows at North Sea buoys.',
      '6 corrupt customs dock officers identified in Antwerp handling container bypass protocols.',
      'Average clearance speed for flagged containers was 84% faster than standard inspection protocols.'
    ],
    aiRiskScore: 91,
    metrics: {
      'Events Logged': 100,
      'Verified Intercepts': 68,
      'Correlation Confidence': '94.8%'
    },
    fileSizeBytes: 2891040
  },
  {
    id: 'rep-003',
    reportNumber: 'ACN-RPT-2026-079',
    title: 'Decentralized Wash Cycle & Hawala Dispersal Analysis',
    type: 'Financial Analysis',
    dateGenerated: '2026-08-22T14:15:00Z',
    author: 'Senior Forensic Auditor David Chen (FIU)',
    targetEntity: 'Apex Crypto Trust & Spectre Vault',
    summary: 'Deep-dive blockchain transaction tracing revealing multi-hop mixing structures, cross-chain DEX bridges, and automated cash deposit structuring across Asia and UAE.',
    classificationLevel: 'TOP SECRET // INTEL',
    keyFindings: [
      'Primary liquidity injection derived from European ransomware payments ($32M USD in 60 days).',
      'Over $54M settled in gold bullion deliveries at Dubai Free Zone.',
      'Secondary Hawala tokens generated in Beirut for arms settlement with Aegean Charter.'
    ],
    aiRiskScore: 94,
    metrics: {
      'Flagged Volume': '$86,400,000 USD',
      'Monitored Wallets': 142,
      'Frozen Accounts': 3
    },
    fileSizeBytes: 6104820
  },
  {
    id: 'rep-004',
    reportNumber: 'ACN-RPT-2026-065',
    title: 'Satellite & Cellular Frequency Telemetry Analysis',
    type: 'Communication Analysis',
    dateGenerated: '2026-08-21T11:00:00Z',
    author: 'SIGINT Technical Director Dr. Aris Thorne',
    targetEntity: 'Tapped Burner Swarm #SIG-ALPHA',
    summary: 'Frequency domain analysis of burst-encrypted satellite transmissions, IMSI catcher triangulation points, and VoIP metadata clusters.',
    classificationLevel: 'SECRET',
    keyFindings: [
      'Suspects utilize custom PGP voice scramblers operating over Thuraya satellite uplinks.',
      'Peak communication traffic occurs between 02:00 and 05:00 UTC.',
      'Voice biometric prints achieved 98.4% match across 14 wiretaps.'
    ],
    aiRiskScore: 88,
    metrics: {
      'Total Calls Logged': 3240,
      'Encrypted Minutes': 1480,
      'Identified IMSIs': 28
    },
    fileSizeBytes: 3410290
  },
  {
    id: 'rep-005',
    reportNumber: 'ACN-RPT-2026-052',
    title: 'Global Tactical Safehouse & Surveillance Heatmap',
    type: 'Location Heatmap',
    dateGenerated: '2026-08-20T09:45:00Z',
    author: 'Geo-Spatial Analysis Team',
    targetEntity: '15 High-Risk Safehouse Facilities',
    summary: 'Geographic coordinate distribution, perimeter vulnerability assessments, and thermal CCTV coverage for 15 primary syndicate staging centers worldwide.',
    classificationLevel: 'CONFIDENTIAL',
    keyFindings: [
      'Rotterdam Pier 42 and Bucharest Data Facility exhibit the highest density of high-risk suspect visits.',
      'Safehouse Alpha in the Black Forest has subterranean reinforced bunker infrastructure.',
      'Lisbon VIP Lounge functions as the key neutral diplomatic meeting ground.'
    ],
    aiRiskScore: 85,
    metrics: {
      'Monitored Facilities': 15,
      'Active CCTV Feeds': 11,
      'High-Risk Hotspots': 5
    },
    fileSizeBytes: 5120000
  },
  {
    id: 'rep-006',
    reportNumber: 'ACN-RPT-2026-041',
    title: 'AI Predictive Interdiction & Target Disruption Strategy',
    type: 'AI Recommendation',
    dateGenerated: '2026-08-19T16:00:00Z',
    author: 'A.E.G.I.S. Autonomous Predictive Engine',
    targetEntity: 'Network Vulnerability Nodes',
    summary: 'Algorithmic assessment of maximum-disruption strike points. Simulates network degradation upon simultaneous arrest of key bridge nodes.',
    classificationLevel: 'TOP SECRET // INTEL',
    keyFindings: [
      'Simultaneous takedown of Helena Vance (CR-1048) and Tariq Mansoor (CR-9081) fragments the syndicate into 4 isolated clusters.',
      'Network capacity for money laundering drops by 78% within 24 hours of frozen accounts in Cyprus and Dubai.',
      'Optimal tactical window identified within the next 72 hours before planned hardware cargo offloading.'
    ],
    aiRiskScore: 97,
    metrics: {
      'Simulation Confidence': '96.2%',
      'Projected Impact': '78% Network Disruption',
      'Targeted Nodes': 2
    },
    fileSizeBytes: 1984200
  }
];
