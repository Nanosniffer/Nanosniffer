import { InvestigationReport } from '../../types';

export const dummyReports: InvestigationReport[] = [
  {
    id: 'rep-01',
    reportNumber: 'CBI-OPS-2026-0881',
    title: 'Operation Black Friday: D-Company Transnational Architecture',
    type: 'Network Summary',
    dateGenerated: '2026-08-26',
    author: 'ACP Vikram Rathore, Crime Branch Mumbai',
    targetEntity: 'D-Company Global Syndicate (Dawood Ibrahim Kaskar)',
    summary: 'Comprehensive multi-agency investigative dossier documenting the command structure, maritime RDX landing conduits, overseas shell accounts, and active hawala links of Dawood Ibrahim, Tiger Memon, and Chhota Shakeel.',
    classificationLevel: 'TOP SECRET // INTEL',
    keyFindings: [
      'Maritime smuggling corridors routed through Shekhadi / Raigad coast and Karachi deep-sea trawlers.',
      'Tiger Memon orchestrated operational ground logistics and explosive caches distribution.',
      'Hawala proceeds laundered through Dubai real estate shell trusts and Tether USDT cold wallets.',
      'Direct links established with TADA Special Court warrants and Interpol Red Corner Notices.'
    ],
    aiRiskScore: 99,
    metrics: {
      'Syndicate Footprint': '₹45,000 Crore',
      'Target Suspects': 24,
      'Seized Assets': '₹1,250 Crore',
      'Red Corner Alerts': 4
    },
    fileSizeBytes: 4829104
  },
  {
    id: 'rep-02',
    reportNumber: 'ED-PMLA-2026-0419',
    title: 'Project Firestar Vault: ₹13,500 Crore PNB Diamond Fraud',
    type: 'Financial Analysis',
    dateGenerated: '2026-08-25',
    author: 'Deputy Director Rajesh Shinde, Enforcement Directorate',
    targetEntity: 'Firestar Diamond Global Syndicate (Nirav Modi)',
    summary: 'Financial trail reconstruction of fraudulent Letters of Undertaking (LoUs) issued via Punjab National Bank Brady House branch without ledger entries, funneled to overseas shell entities in Hong Kong, Dubai, and BVI.',
    classificationLevel: 'SECRET',
    keyFindings: [
      'Over 1,212 fraudulent SWIFT messages transmitted across international correspondent banks.',
      'Circular trading of diamond consignments between shell companies inflated fake book values by 800%.',
      'Attached properties include Mayfair London apartments, Al-Khaima Dubai assets, and Alibaug villas.',
      'Extradition proceedings active under Fugitive Economic Offenders Act (FEOA).'
    ],
    aiRiskScore: 96,
    metrics: {
      'Defrauded Capital': '₹13,578 Crore',
      'Attached Properties': 48,
      'Shell Entities Traced': 124,
      'ED PMLA Sections': 'Sec 3, 4 & 50'
    },
    fileSizeBytes: 3910240
  },
  {
    id: 'rep-03',
    reportNumber: 'CBI-PUR-2026-0112',
    title: 'Dossier Purulia Sky-Drop: Antonov An-26 Illicit Arms Grid',
    type: 'Timeline Report',
    dateGenerated: '2026-08-24',
    author: 'Inspector Meera Rao, CBI Special Crime Branch',
    targetEntity: 'Purulia Aerial Arms Smuggling Network (Niels Holck & Peter Bleach)',
    summary: 'Tactical analysis of the transnational aviation arms trafficking operation that air-dropped military-grade AK-47 assault rifles, rocket launchers, and anti-tank munitions over Purulia, West Bengal.',
    classificationLevel: 'SECRET',
    keyFindings: [
      'Antonov An-26 aircraft modified in Latvia and routed through Karachi and Varanasi airfields.',
      'Consignment contained 770 Kalashnikov rifles, 100 rocket launchers, and 25,000 rounds of 7.62mm ammo.',
      'Peter Bleach and Latvian aircrew convicted; Red Corner alert remains active for Niels Holck (Kim Davy).',
      'End-user certificates forged using fictitious defense ministry authorization stamps.'
    ],
    aiRiskScore: 95,
    metrics: {
      'Recovered Firearms': 770,
      'Rocket Launchers': 100,
      'Seized Ammo Rounds': '25,000',
      'Interpol Notices': 2
    },
    fileSizeBytes: 2840190
  }
];

export const dummyInvestigationReports = dummyReports;
