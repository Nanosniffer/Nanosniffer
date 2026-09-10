import { NetworkGraphData, NetworkNode, NetworkEdge } from '../types';
import { getAllMergedCriminals } from './criminals';

const BASE_IMG_PATH = './images/criminals/';

export const getNetworkGraph = async (): Promise<{ data: NetworkGraphData; isFallback: boolean }> => {
  const allCriminals = getAllMergedCriminals();
  
  const nodes: NetworkNode[] = [];
  const edges: NetworkEdge[] = [];
  const existingNodeIds = new Set<string>();
  const existingEdgeIds = new Set<string>();

  // Helper to add nodes safely
  const addNode = (node: NetworkNode) => {
    if (!existingNodeIds.has(node.id)) {
      nodes.push(node);
      existingNodeIds.add(node.id);
    }
  };

  // Helper to add edges safely
  const addEdge = (edge: NetworkEdge) => {
    if (!existingEdgeIds.has(edge.id)) {
      edges.push(edge);
      existingEdgeIds.add(edge.id);
    }
  };

  // =========================================================================
  // 1. STRATEGIC SYNDICATE HUBS & INFRASTRUCTURE
  // =========================================================================

  // --- Row 1: High Priority Syndicates ---
  // Hub 1: D-Company Command (Top-Left)
  addNode({
    id: 'node-org-01',
    type: 'organizationNode',
    position: { x: 380, y: 100 },
    data: {
      label: 'D-Company Global Syndicate',
      type: 'organization',
      riskLevel: 'CRITICAL',
      riskScore: 99,
      entityId: 'org-01',
      connectionsCount: 450,
      metadata: { territory: 'Mumbai, Karachi, Dubai', revenue: '₹45,000 Cr/yr' }
    }
  });

  addNode({
    id: 'node-loc-01',
    type: 'locationNode',
    position: { x: 180, y: 100 },
    data: {
      label: 'Dongri Command Ground Zero',
      type: 'location',
      riskLevel: 'CRITICAL',
      riskScore: 99,
      entityId: 'loc-01',
      metadata: { city: 'Mumbai', facility: 'D-Company Core HQ' }
    }
  });

  addNode({
    id: 'node-fin-01',
    type: 'bankNode',
    position: { x: 580, y: 100 },
    data: {
      label: 'Tether USDT Crypto Treasury',
      type: 'bank',
      riskLevel: 'CRITICAL',
      riskScore: 98,
      entityId: 'fin-01',
      metadata: { balance: '₹145.0 Cr (USDT Core)', status: 'ACTIVE' }
    }
  });

  // Hub 2: Worli-Gujarat Narcotics Cartel (Top-Center)
  addNode({
    id: 'node-org-04',
    type: 'organizationNode',
    position: { x: 1100, y: 100 },
    data: {
      label: 'Worli-Gujarat Narcotics Cartel',
      type: 'organization',
      riskLevel: 'CRITICAL',
      riskScore: 97,
      entityId: 'org-04',
      connectionsCount: 160,
      metadata: { territory: 'Worli Slums & Ankleshwar GIDC', revenue: '₹1,200 Cr/yr' }
    }
  });

  addNode({
    id: 'node-loc-04',
    type: 'locationNode',
    position: { x: 900, y: 100 },
    data: {
      label: 'Ankleshwar GIDC Chemical Lab',
      type: 'location',
      riskLevel: 'CRITICAL',
      riskScore: 96,
      entityId: 'loc-04',
      metadata: { city: 'Ankleshwar, Gujarat', facility: 'Mephedrone Synthesis Factory' }
    }
  });

  // Hub 3: Diamond & Corporate Fraud (Top-Right)
  addNode({
    id: 'node-org-05',
    type: 'organizationNode',
    position: { x: 1850, y: 100 },
    data: {
      label: 'Firestar Diamond Global Holding',
      type: 'organization',
      riskLevel: 'CRITICAL',
      riskScore: 96,
      entityId: 'org-05',
      connectionsCount: 75,
      metadata: { territory: 'BKC Mumbai, Mayfair London', revenue: '₹13,500 Cr PNB Fraud' }
    }
  });

  addNode({
    id: 'node-loc-03',
    type: 'locationNode',
    position: { x: 1650, y: 100 },
    data: {
      label: 'Bharat Diamond Bourse BKC',
      type: 'location',
      riskLevel: 'HIGH',
      riskScore: 94,
      entityId: 'loc-03',
      metadata: { city: 'Mumbai', facility: 'Diamond Trading Front' }
    }
  });

  addNode({
    id: 'node-fin-05',
    type: 'bankNode',
    position: { x: 2050, y: 100 },
    data: {
      label: 'PNB LoU Offshore Escrow',
      type: 'bank',
      riskLevel: 'CRITICAL',
      riskScore: 96,
      entityId: 'fin-05',
      metadata: { balance: '₹11,400 Cr Escrow', status: 'FROZEN' }
    }
  });

  // --- Row 2: Middle Tier Syndicates ---
  // Hub 4: Tihar Special Security Ward & Hawala (Middle-Left)
  addNode({
    id: 'node-loc-02',
    type: 'locationNode',
    position: { x: 380, y: 600 },
    data: {
      label: 'Tihar Jail High Security Ward',
      type: 'location',
      riskLevel: 'CRITICAL',
      riskScore: 97,
      entityId: 'loc-02',
      metadata: { city: 'New Delhi', facility: 'VoIP Spoofing Wing' }
    }
  });

  addNode({
    id: 'node-fin-03',
    type: 'bankNode',
    position: { x: 180, y: 600 },
    data: {
      label: 'Swiss-Dubai Secret Hawala Core',
      type: 'bank',
      riskLevel: 'CRITICAL',
      riskScore: 95,
      entityId: 'fin-03',
      metadata: { balance: '₹3,200 Cr Hawala Ledger', status: 'MONITORED' }
    }
  });

  // Hub 5: Darknet Tumbler Crypto Core (Middle-Center)
  addNode({
    id: 'node-fin-02',
    type: 'bankNode',
    position: { x: 1100, y: 600 },
    data: {
      label: 'Darknet Tumbler 120 BTC Mixer',
      type: 'bank',
      riskLevel: 'CRITICAL',
      riskScore: 95,
      entityId: 'fin-02',
      metadata: { balance: '₹38.0 Cr (120 BTC)', status: 'ACTIVE' }
    }
  });

  addNode({
    id: 'node-org-07',
    type: 'organizationNode',
    position: { x: 900, y: 600 },
    data: {
      label: 'GainBitcoin Cloud Mining Pool',
      type: 'organization',
      riskLevel: 'CRITICAL',
      riskScore: 94,
      entityId: 'org-07',
      metadata: { territory: 'Pan-India & Dubai Cloud', revenue: '₹2,000 Cr Ponzi' }
    }
  });

  // Hub 6: Purulia Aerial Smuggling Drop (Middle-Right)
  addNode({
    id: 'node-org-06',
    type: 'organizationNode',
    position: { x: 1850, y: 600 },
    data: {
      label: 'Purulia Aerial Smuggling Ring',
      type: 'organization',
      riskLevel: 'CRITICAL',
      riskScore: 96,
      entityId: 'org-06',
      metadata: { territory: 'West Bengal & Karachi Transit', weaponTypes: 'AK-56, 9mm, RPGs' }
    }
  });

  addNode({
    id: 'node-loc-06',
    type: 'locationNode',
    position: { x: 1650, y: 600 },
    data: {
      label: 'Purulia Secret Air Drop Grid',
      type: 'location',
      riskLevel: 'CRITICAL',
      riskScore: 95,
      entityId: 'loc-06',
      metadata: { city: 'Purulia, West Bengal', facility: 'AN-26 Ingress Point' }
    }
  });

  // --- Row 3: Bottom Tier Syndicates ---
  // Hub 7: Power Axis & Cult Complex (Bottom-Left)
  addNode({
    id: 'node-org-08',
    type: 'organizationNode',
    position: { x: 600, y: 1100 },
    data: {
      label: 'Sirsa Dera Influence Complex',
      type: 'organization',
      riskLevel: 'CRITICAL',
      riskScore: 96,
      entityId: 'org-08',
      metadata: { territory: 'Sirsa, Haryana & Punjab', facility: 'Autonomous Cult Grid' }
    }
  });

  addNode({
    id: 'node-loc-07',
    type: 'locationNode',
    position: { x: 380, y: 1100 },
    data: {
      label: 'Unnao Safehouse Interception Grid',
      type: 'location',
      riskLevel: 'HIGH',
      riskScore: 92,
      entityId: 'loc-07',
      metadata: { city: 'Unnao, Uttar Pradesh', facility: 'Coercion Center' }
    }
  });

  // Hub 8: National Serial Crimes Archive (Bottom-Right)
  addNode({
    id: 'node-loc-09',
    type: 'locationNode',
    position: { x: 1750, y: 1100 },
    data: {
      label: 'National High-Security Special Archive',
      type: 'location',
      riskLevel: 'HIGH',
      riskScore: 90,
      entityId: 'loc-09',
      metadata: { city: 'Central Forensics Bureau', facility: 'Serial Modus Records' }
    }
  });

  // =========================================================================
  // 2. PRECISE, BALANCED POSITIONS FOR ALL 24 CRIMINALS
  // =========================================================================
  const criminalLayoutMap: Record<string, { x: number; y: number }> = {
    // Cluster 1: D-Company Global Syndicate (Top-Left)
    'crm-01': { x: 380, y: 240 },   // Dawood Ibrahim
    'crm-02': { x: 180, y: 360 },   // Tiger Memon
    'crm-21': { x: 580, y: 360 },   // Chhota Shakeel
    'crm-03': { x: 380, y: 460 },   // Yakub Memon

    // Cluster 2: Transnational Narcotics & Chemical Cartel (Top-Center)
    'crm-22': { x: 920, y: 260 },   // Vicky Goswami
    'crm-23': { x: 1100, y: 380 },  // Baby Patankar
    'crm-24': { x: 1280, y: 260 },  // Dharmesh Patel

    // Cluster 3: Diamond & Corporate Fraud (Top-Right)
    'crm-15': { x: 1850, y: 240 },  // Nirav Modi
    'crm-16': { x: 1650, y: 360 },  // Joseph Babu
    'crm-17': { x: 2050, y: 360 },  // Dhananjay Chhatrapati
    'crm-18': { x: 1850, y: 460 },  // Natwarlal

    // Cluster 4: Tihar VoIP Extortion & Hawala (Middle-Left)
    'crm-14': { x: 380, y: 740 },   // Sukesh Chandrashekhar
    'crm-13': { x: 180, y: 860 },   // Hasan Ali Khan
    'crm-09': { x: 580, y: 860 },   // Ketan Parekh

    // Cluster 5: Darknet & Cybercrime Heists (Middle-Center)
    'crm-07': { x: 950, y: 740 },   // Sriki
    'crm-08': { x: 1250, y: 740 },  // Amit Bhardwaj

    // Cluster 6: Transnational Arms Smuggling (Middle-Right)
    'crm-19': { x: 1720, y: 740 },  // Kim Davy / Niels Holck
    'crm-20': { x: 1980, y: 740 },  // Peter Bleach

    // Cluster 7: Cult Power Axis & Organized Crimes (Bottom-Left)
    'crm-11': { x: 600, y: 1240 },  // Gurmeet Ram Rahim
    'crm-12': { x: 380, y: 1240 },  // Kuldeep Singh Sengar
    'crm-10': { x: 820, y: 1240 },  // Akku Yadav

    // Cluster 8: Serial Offenses & Transnational Fugitives (Bottom-Right)
    'crm-04': { x: 1520, y: 1240 }, // Charles Sobhraj
    'crm-05': { x: 1750, y: 1240 }, // Raman Raghav
    'crm-06': { x: 1980, y: 1240 }, // Thug Behram
  };

  // =========================================================================
  // 3. ATTACH NODES, SATELLITE PHONES & MONITORED VEHICLES
  // =========================================================================
  allCriminals.forEach((criminal, idx) => {
    const coords = criminalLayoutMap[criminal.id] || {
      x: 300 + (idx % 4) * 350,
      y: 1100 + Math.floor(idx / 4) * 200
    };

    // Add Person Node
    addNode({
      id: criminal.id,
      type: 'personNode',
      position: { x: coords.x, y: coords.y },
      data: {
        label: criminal.name,
        type: 'person',
        subType: criminal.alias || criminal.crimeCategory,
        entityId: criminal.id,
        riskLevel: criminal.riskLevel,
        riskScore: criminal.riskScore,
        avatarUrl: criminal.photoUrl || `${BASE_IMG_PATH}${criminal.id}.jpg`,
        status: criminal.status,
        connectionsCount: (criminal.phoneNumbers?.length || 0) + (criminal.vehicles?.length || 0) + 4,
        centralityScore: (criminal.riskScore / 100) * 0.96,
        metadata: {
          alias: criminal.alias,
          crimeCategory: criminal.crimeCategory,
          city: criminal.lastKnownLocation?.city || 'Mumbai',
          criminalId: criminal.criminalId
        }
      }
    });

    // Add Phone Satellite Node (Offset left/up)
    if (criminal.phoneNumbers && criminal.phoneNumbers.length > 0) {
      const phone = criminal.phoneNumbers[0];
      const phoneNodeId = `phone-${criminal.id}`;
      
      addNode({
        id: phoneNodeId,
        type: 'phoneNode',
        position: { x: coords.x - 130, y: coords.y - 65 },
        data: {
          label: phone.phoneNumber,
          type: 'phone',
          entityId: phoneNodeId,
          riskLevel: criminal.riskLevel,
          metadata: {
            carrier: phone.carrier,
            status: phone.status,
            imei: phone.imei,
            owner: criminal.name
          }
        }
      });

      addEdge({
        id: `edge-phone-${criminal.id}`,
        source: criminal.id,
        target: phoneNodeId,
        label: 'Calls',
        animated: true,
        data: {
          relationshipType: 'Calls',
          details: `Monitored intercepted line (${phone.carrier})`,
          riskLevel: criminal.riskLevel
        }
      });
    }

    // Add Vehicle Satellite Node (Offset right/up)
    if (criminal.vehicles && criminal.vehicles.length > 0) {
      const vehicle = criminal.vehicles[0];
      const vehNodeId = `veh-${criminal.id}`;

      addNode({
        id: vehNodeId,
        type: 'vehicleNode',
        position: { x: coords.x + 130, y: coords.y - 65 },
        data: {
          label: vehicle.licensePlate,
          type: 'vehicle',
          entityId: vehNodeId,
          riskLevel: criminal.riskLevel,
          metadata: {
            make: vehicle.make,
            model: vehicle.model,
            color: vehicle.color,
            owner: vehicle.registeredOwner
          }
        }
      });

      addEdge({
        id: `edge-veh-${criminal.id}`,
        source: criminal.id,
        target: vehNodeId,
        label: 'Owns',
        data: {
          relationshipType: 'Owns',
          details: `${vehicle.make} ${vehicle.model} (${vehicle.color})`,
          riskLevel: criminal.riskLevel
        }
      });
    }
  });

  // =========================================================================
  // 4. STRATEGIC & CROSS-SYNDICATE RELATIONSHIP EDGES
  // =========================================================================

  // --- Cluster 1: D-Company Syndicate ---
  addEdge({ id: 'edge-org-01', source: 'crm-01', target: 'node-org-01', label: 'Supreme Chief', data: { relationshipType: 'Commands', details: 'Supreme D-Company Boss', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-loc-01', source: 'crm-01', target: 'node-loc-01', label: 'Core Base', data: { relationshipType: 'Operates In', details: 'Dongri Tactical Ground Zero', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-fin-01', source: 'crm-01', target: 'node-fin-01', label: 'Treasury', data: { relationshipType: 'Owns', details: '145 Cr USDT Hot Core', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-01-02', source: 'crm-01', target: 'crm-02', label: 'Commander', data: { relationshipType: 'Lieutenant', details: '1993 Blasts Logistics Commander', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-01-21', source: 'crm-01', target: 'crm-21', label: 'Enforcer', data: { relationshipType: 'Commands', details: 'Arms & Hit Contracts Chief', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-02-03', source: 'crm-02', target: 'crm-03', label: 'Brother', data: { relationshipType: 'Brother', details: 'Financial Conduit', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-crm-03-fin', source: 'crm-03', target: 'node-fin-01', label: 'Audits', data: { relationshipType: 'Associate', details: 'Hawala Ledger Audit', riskLevel: 'HIGH' } });

  // --- Cluster 2: Transnational Narcotics Cartel ---
  addEdge({ id: 'edge-narc-01', source: 'crm-22', target: 'node-org-04', label: 'Kingpin', data: { relationshipType: 'Commands', details: 'Transnational Mandrax & Meth Ingress', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-narc-02', source: 'crm-23', target: 'node-org-04', label: 'Distributor', data: { relationshipType: 'Distributor', details: 'Worli MD Street Pipeline', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-narc-03', source: 'crm-24', target: 'node-loc-04', label: 'Synthesis', data: { relationshipType: 'Chemist', details: 'Ankleshwar GIDC Factory Core', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-22-23', source: 'crm-22', target: 'crm-23', label: 'Supplies MD', data: { relationshipType: 'Supplies', details: 'Ephedrine Consignment Ingress', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-23-24', source: 'crm-23', target: 'crm-24', label: 'Chemicals', data: { relationshipType: 'Chemicals', details: 'Precursor Chemical Synthesis', riskLevel: 'HIGH' } });

  // --- Cluster 3: Diamond & Bank Fraud Syndicate ---
  addEdge({ id: 'edge-dia-01', source: 'crm-15', target: 'node-org-05', label: 'Director', data: { relationshipType: 'Commands', details: 'Firestar Holding Supreme Controller', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-dia-02', source: 'crm-15', target: 'node-loc-03', label: 'Bourse Base', data: { relationshipType: 'Operates In', details: 'BKC Diamond Bourse LoU Ingress', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-dia-03', source: 'crm-15', target: 'node-fin-05', label: 'LoU Escrow', data: { relationshipType: 'Launders', details: '11,400 Cr Fraudulent LoUs', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-15-16', source: 'crm-15', target: 'crm-16', label: 'Shell Director', data: { relationshipType: 'Associate', details: 'Offshore Round-Tripping', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-crm-15-17', source: 'crm-15', target: 'crm-17', label: 'Auditor', data: { relationshipType: 'Associate', details: 'Forged Bank Guarantees', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-crm-15-18', source: 'crm-15', target: 'crm-18', label: 'Forgery Modus', data: { relationshipType: 'Associate', details: 'Institutional Deception Tactics', riskLevel: 'HIGH' } });

  // --- Cluster 4: Tihar Extortion & Hawala Syndicate ---
  addEdge({ id: 'edge-tihar-01', source: 'crm-14', target: 'node-loc-02', label: 'Ward Inmate', data: { relationshipType: 'Operates In', details: 'VoIP Spoofing Command Desk', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-14-13', source: 'crm-14', target: 'crm-13', label: 'Hawala Transit', data: { relationshipType: 'Hawala', details: 'Dubai Ledger Cash Routing', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-crm-13-fin', source: 'crm-13', target: 'node-fin-03', label: 'Launders', data: { relationshipType: 'Hawala', details: 'Swiss Secret Vaults Transfer', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-13-09', source: 'crm-13', target: 'crm-09', label: 'Market Rigging', data: { relationshipType: 'Associate', details: 'Circular Trading Ingress', riskLevel: 'HIGH' } });

  // --- Cluster 5: Darknet & Cyber Crypto Syndicate ---
  addEdge({ id: 'edge-cyber-01', source: 'crm-07', target: 'node-fin-02', label: 'Mixer Core', data: { relationshipType: 'Launders', details: '120 BTC Tumbler Cascade', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-cyber-02', source: 'crm-08', target: 'node-org-07', label: 'Mining Pool', data: { relationshipType: 'Commands', details: 'GainBitcoin Ponzi Architecture', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-07-08', source: 'crm-07', target: 'crm-08', label: 'Private Keys', data: { relationshipType: 'Associate', details: 'Exchange Private Key Extraction', riskLevel: 'CRITICAL' } });

  // --- Cluster 6: Transnational Arms Smuggling Ring ---
  addEdge({ id: 'edge-arms-01', source: 'crm-19', target: 'node-org-06', label: 'Air Drop Pilot', data: { relationshipType: 'Commands', details: 'Purulia AN-26 Flight Ingress', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-arms-02', source: 'crm-19', target: 'node-loc-06', label: 'Drop Zone', data: { relationshipType: 'Operates In', details: 'Purulia Air Drop Field', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-19-20', source: 'crm-19', target: 'crm-20', label: 'Arms Dealer', data: { relationshipType: 'Associate', details: 'Purulia Arms Procurement', riskLevel: 'CRITICAL' } });

  // --- Cluster 7: Power Axis & Cult Complex ---
  addEdge({ id: 'edge-dera-01', source: 'crm-11', target: 'node-org-08', label: 'Cult Head', data: { relationshipType: 'Commands', details: 'Sirsa Dera Supreme Control', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-unnao-01', source: 'crm-12', target: 'node-loc-07', label: 'Safehouse', data: { relationshipType: 'Operates In', details: 'Unnao Coercion Base', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-akku-01', source: 'crm-10', target: 'node-loc-07', label: 'Extortion Area', data: { relationshipType: 'Operates In', details: 'Kasturba Nagar Extortion Base', riskLevel: 'HIGH' } });

  // --- Cluster 8: Serial Records Archive ---
  addEdge({ id: 'edge-serial-01', source: 'crm-04', target: 'node-loc-09', label: 'Bikini Murders', data: { relationshipType: 'Operates In', details: 'International Fugitive Record', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-serial-02', source: 'crm-05', target: 'node-loc-09', label: 'Serial Offense', data: { relationshipType: 'Operates In', details: 'Forensic Serial Profiling', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-serial-03', source: 'crm-06', target: 'node-loc-09', label: 'Thuggee Cult', data: { relationshipType: 'Operates In', details: 'Historical Cult Assassinations', riskLevel: 'CRITICAL' } });

  // =========================================================================
  // 5. CROSS-SYNDICATE BRIDGING CHANNELS (High-Level Crime Conduits)
  // =========================================================================
  // Conduit 1: Arms supply to D-Company (Purulia -> Shakeel)
  addEdge({ id: 'bridge-arms-shakeel', source: 'crm-19', target: 'crm-21', label: 'AK-56 Supply', data: { relationshipType: 'Arms Deal', details: 'Underworld Weapon Conduit', riskLevel: 'CRITICAL' } });

  // Conduit 2: Narcotics Tax to D-Company (Vicky Goswami -> Dawood)
  addEdge({ id: 'bridge-narc-dawood', source: 'crm-22', target: 'crm-01', label: 'Transit Tax', data: { relationshipType: 'Money Transfer', details: 'Dubai-Karachi Narcotics Tax Ingress', riskLevel: 'CRITICAL' } });

  // Conduit 3: Darknet Crypto Mixer to D-Company Treasury (Sriki -> D-Vault)
  addEdge({ id: 'bridge-crypto-dvault', source: 'crm-07', target: 'node-fin-01', label: 'Tumbling Core', data: { relationshipType: 'Hawala', details: 'Crypto Mixer Tumbler Cleanse', riskLevel: 'CRITICAL' } });

  // Conduit 4: Tihar VoIP to Hawala Kingpin (Sukesh -> Hasan Ali)
  addEdge({ id: 'bridge-tihar-hawala', source: 'crm-14', target: 'node-fin-03', label: 'Offshore Wires', data: { relationshipType: 'Hawala', details: 'Extortion Proceeds Laundering', riskLevel: 'CRITICAL' } });

  // Conduit 5: Drug Revenue to Hawala (Baby Patankar -> Hasan Ali)
  addEdge({ id: 'bridge-patankar-hasan', source: 'crm-23', target: 'crm-13', label: 'Cash Cleanse', data: { relationshipType: 'Hawala', details: 'Street Narcotics Cash to Dubai Hawala', riskLevel: 'CRITICAL' } });

  return {
    data: {
      nodes,
      edges,
      metrics: {
        degreeCentralityTopNodes: [
          { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', score: 0.99 },
          { id: 'crm-21', name: 'Chhota Shakeel', score: 0.97 },
          { id: 'crm-22', name: 'Vicky Goswami', score: 0.96 },
          { id: 'crm-14', name: 'Sukesh Chandrashekhar', score: 0.95 },
          { id: 'crm-15', name: 'Nirav Deepak Modi', score: 0.94 }
        ],
        betweennessCentralityTopNodes: [
          { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', score: 0.992 },
          { id: 'crm-21', name: 'Chhota Shakeel', score: 0.968 },
          { id: 'crm-13', name: 'Hasan Ali Khan', score: 0.945 },
          { id: 'crm-23', name: 'Shashikala Patankar', score: 0.928 },
          { id: 'crm-19', name: 'Kim Davy (Niels Holck)', score: 0.912 }
        ],
        communityClustersCount: 8,
        highestInfluenceLeader: { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', score: 0.99 },
        totalConnections: edges.length,
        averageConnectionsPerNode: parseFloat((edges.length / (nodes.length || 1)).toFixed(1))
      }
    },
    isFallback: true
  };
};
