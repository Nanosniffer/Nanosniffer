import { IntelligenceFeedItem } from '../../types';

export const dummyIntelligenceFeed: IntelligenceFeedItem[] = [
  {
    id: 'feed-01',
    type: 'surveillance',
    title: 'Visual Confirmation: Helena Vance & Dimitri Costa at Club Obsidian Lisbon',
    source: 'FIELD-UNIT-LIS-04 (High-Gain Optical & Audio)',
    timestamp: '2026-08-24T08:14:00Z',
    confidenceScore: 96,
    priority: 'CRITICAL',
    summary: 'Subject Vance handed over an encrypted Panasonic Toughbook to Costa inside private booth #3. Audio intercept recovered snippets mentioning "Battenberg cargo clearance" and "Port 4 gate bypass".',
    suspectsInvolved: [
      { id: 'crm-03', name: 'Helena Vance', alias: 'The Architect' },
      { id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer' }
    ],
    location: 'Lisbon, Portugal',
    coordinates: [38.7118, -9.1384],
    interceptSnippet: 'VANCE: "...the customs seals are pre-cloned in Hamburg. Dimitri, make sure your charter is at Slip 14 before 0300."',
    isBookmarked: true,
  },
  {
    id: 'feed-02',
    type: 'financial_anomaly',
    title: 'Flash Dispersion of $18.4M USDT across 400 Ghost Wallets',
    source: 'BLOCKCHAIN-ANALYTICS-ENGINE // AEGIS-FIN',
    timestamp: '2026-08-24T06:40:00Z',
    confidenceScore: 99,
    priority: 'CRITICAL',
    summary: 'Spectre Vault initiated a multi-hop mixer dispersal. Over 65% of outputs recombined into accounts managed by Tariq Mansoor in Dubai.',
    suspectsInvolved: [
      { id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer' },
      { id: 'crm-07', name: 'Tariq Mansoor', alias: 'The Broker' }
    ],
    location: 'Bucharest / Dubai Gateway',
    coordinates: [44.4323, 26.1011],
    interceptSnippet: 'TX: 0x98fa...11c2 -> 400 hops -> Escrow Contract #AE-DIFC-8819',
    isBookmarked: true,
  },
  {
    id: 'feed-03',
    type: 'weapon_purchase',
    title: 'Intercepted Manifest: 120 Anti-Armor Guidance Units rerouted to Piraeus',
    source: 'EUROPOL-SIGINT (Maritime Customs Telemetry)',
    timestamp: '2026-08-24T05:22:00Z',
    confidenceScore: 92,
    priority: 'HIGH',
    summary: 'Container marked "Agricultural Harvester Gyros" was re-routed mid-transit from Constanta to Piraeus under fake Aegean Charter consignment code.',
    suspectsInvolved: [
      { id: 'crm-06', name: 'Dimitri Costa', alias: 'The Armorer' },
      { id: 'crm-04', name: 'Chen Wei', alias: 'The Chemist' }
    ],
    location: 'Piraeus Port Gate 4, Greece',
    coordinates: [37.9402, 23.6385],
    interceptSnippet: 'MANIFEST_MOD: Bill of Lading #AG-88192-EU changed destination to Piraeus Slip 4B.',
    isBookmarked: false,
  },
  {
    id: 'feed-04',
    type: 'suspicious_travel',
    title: 'Biometric Airport Hit: Gabriel "El Lobo" Mendoza entering Panama City',
    source: 'INTERPOL-APIS-GATEWAY // Tocumen International',
    timestamp: '2026-08-24T03:30:00Z',
    confidenceScore: 94,
    priority: 'HIGH',
    summary: 'Mendoza passed passport control using fraudulent Chilean diplomatic credentials under the name "Hernan Castillo Valdes". Flagged by facial match.',
    suspectsInvolved: [
      { id: 'crm-19', name: 'Gabriel Mendoza', alias: 'El Lobo' },
      { id: 'crm-02', name: 'Mateo Silva', alias: 'El Serpiente' }
    ],
    location: 'Panama City, Panama',
    coordinates: [8.9500, -79.5997],
    interceptSnippet: 'PASSPORT: CHL-DIP-9901824 | Match Confidence: 94.2%',
    isBookmarked: false,
  },
  {
    id: 'feed-05',
    type: 'social_media',
    title: 'Darknet Forum Key Leak: Vanguard Cyber PGP Identity Refresh',
    source: 'AEGIS-DARKWEB-SCRAPER // Dread Forum Intercept',
    timestamp: '2026-08-24T02:10:00Z',
    confidenceScore: 88,
    priority: 'MEDIUM',
    summary: 'User "null_spectre" posted a signed challenge proving ownership of new Bitcoin payout master address. Linguistic fingerprint matched Viktor Markov with 92% confidence.',
    suspectsInvolved: [
      { id: 'crm-01', name: 'Viktor Markov', alias: 'NullPointer' },
      { id: 'crm-09', name: 'Astrid Lindqvist', alias: 'Zero' }
    ],
    location: 'Darknet / Stockholm Relay',
    coordinates: [59.4042, 17.9506],
    interceptSnippet: 'PGP FINGERPRINT: 4A8B 9912 C04E 88F1 209A | Topic: "Enterprise Ransomware v4.2 Release"',
    isBookmarked: false,
  },
  {
    id: 'feed-06',
    type: 'unknown_meeting',
    title: 'Thermal Drone Sighting: Unscheduled Night Rendezvous in Agadez Desert',
    source: 'SAT-RECON-AFRICOM // Geo-Thermal Unit',
    timestamp: '2026-08-23T23:55:00Z',
    confidenceScore: 85,
    priority: 'HIGH',
    summary: 'Three heavy 4x4 trucks met an unmarked twin-engine turboprop aircraft at a dry salt flat landing strip 40km north of Agadez.',
    suspectsInvolved: [
      { id: 'crm-10', name: 'Youssef Kabbaj', alias: 'Sandstorm' }
    ],
    location: 'Agadez Desert Corridor, Niger',
    coordinates: [16.9754, 7.9890],
    interceptSnippet: 'AIRCRAFT_HEX: UNREGISTERED | Transfer Duration: 8 mins | Direction: Northbound (20 deg)',
    isBookmarked: false,
  }
];
