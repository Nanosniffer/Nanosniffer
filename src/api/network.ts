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
  // 1. REGIONAL HUBS & STRATEGIC ORGANIZATIONS (Balanced Human-Scale Canvas)
  // =========================================================================

  // Hub 1: D-Company Command (Top-Left)
  addNode({
    id: 'node-org-01',
    type: 'organizationNode',
    position: { x: 300, y: 80 },
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

  // Hub 2: Worli Narcotics Cartel (Top-Center)
  addNode({
    id: 'node-org-04',
    type: 'organizationNode',
    position: { x: 920, y: 80 },
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

  // Hub 3: Diamond Bourse & Offshore Fraud (Top-Right)
  addNode({
    id: 'node-loc-03',
    type: 'locationNode',
    position: { x: 1540, y: 80 },
    data: {
      label: 'Bharat Diamond Bourse BKC',
      type: 'location',
      riskLevel: 'HIGH',
      riskScore: 94,
      entityId: 'loc-03',
      metadata: { city: 'Mumbai', facility: 'Diamond Trading Front' }
    }
  });

  // Hub 4: Tihar Special Security Ward (Middle-Left)
  addNode({
    id: 'node-loc-02',
    type: 'locationNode',
    position: { x: 300, y: 580 },
    data: {
      label: 'Tihar Jail Special Security Ward',
      type: 'location',
      riskLevel: 'CRITICAL',
      riskScore: 97,
      entityId: 'loc-02',
      metadata: { city: 'New Delhi', facility: 'High Security Complex' }
    }
  });

  // Hub 5: Darknet Tumbler Crypto Core (Middle-Center)
  addNode({
    id: 'node-fin-02',
    type: 'bankNode',
    position: { x: 920, y: 580 },
    data: {
      label: 'Darknet Tumbler Crypto Mixer',
      type: 'bank',
      riskLevel: 'CRITICAL',
      riskScore: 95,
      entityId: 'fin-02',
      metadata: { balance: '₹38.0 Cr (120 BTC)', status: 'ACTIVE' }
    }
  });

  // Hub 6: Purulia Aerial Smuggling Drop (Middle-Right)
  addNode({
    id: 'node-org-06',
    type: 'organizationNode',
    position: { x: 1540, y: 580 },
    data: {
      label: 'Purulia Aerial Smuggling Ring',
      type: 'organization',
      riskLevel: 'CRITICAL',
      riskScore: 96,
      entityId: 'org-06',
      metadata: { territory: 'West Bengal & Karachi Transit', weaponTypes: 'AK-56, 9mm, RPGs' }
    }
  });

  // =========================================================================
  // 2. PRECISE, PROPORTIONAL COORDINATES FOR ALL 24 CRIMINALS
  // =========================================================================
  const criminalLayoutMap: Record<string, { x: number; y: number }> = {
    // Cluster 1: D-Company Syndicate (Top-Left)
    'crm-01': { x: 300, y: 220 },   // Dawood Ibrahim
    'crm-02': { x: 100, y: 340 },   // Tiger Memon
    'crm-21': { x: 500, y: 340 },   // Chhota Shakeel
    'crm-03': { x: 300, y: 440 },   // Yakub Memon

    // Cluster 2: Narcotics Cartel (Top-Center)
    'crm-22': { x: 740, y: 240 },   // Vicky Goswami
    'crm-23': { x: 920, y: 360 },   // Baby Patankar
    'crm-24': { x: 1100, y: 240 },  // Dharmesh Patel

    // Cluster 3: Diamond & Corporate Fraud (Top-Right)
    'crm-15': { x: 1360, y: 240 },  // Nirav Modi
    'crm-16': { x: 1540, y: 360 },  // Joseph Babu
    'crm-17': { x: 1720, y: 240 },  // Dhananjay Chhatrapati
    'crm-18': { x: 1540, y: 460 },  // Natwarlal

    // Cluster 4: Tihar Extortion & Hawala (Middle-Left)
    'crm-14': { x: 120, y: 720 },   // Sukesh Chandrashekhar
    'crm-13': { x: 300, y: 760 },   // Hasan Ali Khan
    'crm-09': { x: 480, y: 720 },   // Ketan Parekh

    // Cluster 5: Darknet & Cybercrime (Middle-Center)
    'crm-07': { x: 800, y: 720 },   // Sriki
    'crm-08': { x: 1040, y: 720 },  // Amit Bhardwaj

    // Cluster 6: Arms Smuggling (Middle-Right)
    'crm-19': { x: 1420, y: 720 },  // Niels Holck
    'crm-20': { x: 1660, y: 720 },  // Peter Bleach

    // Cluster 7: Special Heinous Crimes & Serial Offenses (Bottom Row)
    'crm-04': { x: 200, y: 980 },   // Charles Sobhraj
    'crm-05': { x: 480, y: 980 },   // Raman Raghav
    'crm-06': { x: 760, y: 980 },   // Thug Behram
    'crm-10': { x: 1040, y: 980 },  // Akku Yadav
    'crm-11': { x: 1320, y: 980 },  // Gurmeet Ram Rahim
    'crm-12': { x: 1600, y: 980 },  // Kuldeep Sengar
  };

  // =========================================================================
  // 3. RENDER ALL PERSON NODES & COMPACT SATELLITE NODES
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
        connectionsCount: (criminal.phoneNumbers?.length || 0) + (criminal.vehicles?.length || 0) + 2,
        centralityScore: (criminal.riskScore / 100) * 0.95,
        metadata: {
          alias: criminal.alias,
          crimeCategory: criminal.crimeCategory,
          city: criminal.lastKnownLocation?.city || 'Mumbai',
          criminalId: criminal.criminalId
        }
      }
    });

    // Add Phone Satellite Node (Offset strictly above-left to avoid overlaps)
    if (criminal.phoneNumbers && criminal.phoneNumbers.length > 0) {
      const phone = criminal.phoneNumbers[0];
      const phoneNodeId = `phone-${criminal.id}`;
      
      addNode({
        id: phoneNodeId,
        type: 'phoneNode',
        position: { x: coords.x - 120, y: coords.y - 70 },
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

    // Add Vehicle Satellite Node (Offset strictly above-right to avoid overlaps)
    if (criminal.vehicles && criminal.vehicles.length > 0) {
      const vehicle = criminal.vehicles[0];
      const vehNodeId = `veh-${criminal.id}`;

      addNode({
        id: vehNodeId,
        type: 'vehicleNode',
        position: { x: coords.x + 120, y: coords.y - 70 },
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
  // 4. STRATEGIC RELATIONSHIP EDGES (High-Level Underworld Hierarchy)
  // =========================================================================

  // D-Company Syndicate Edges
  addEdge({ id: 'edge-org-01', source: 'crm-01', target: 'node-org-01', label: 'Commands', data: { relationshipType: 'Owns', details: 'Supreme Boss', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-01-02', source: 'crm-01', target: 'crm-02', label: 'Lieutenant', data: { relationshipType: 'Associate', details: 'Logistics Commander', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-01-21', source: 'crm-01', target: 'crm-21', label: 'Enforcer', data: { relationshipType: 'Associate', details: 'Arms & Hit Contracts Chief', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-02-03', source: 'crm-02', target: 'crm-03', label: 'Brother', data: { relationshipType: 'Associate', details: 'Financial Conduit', riskLevel: 'HIGH' } });

  // Narcotics Cartel Edges
  addEdge({ id: 'edge-narc-01', source: 'crm-22', target: 'node-org-04', label: 'Kingpin', data: { relationshipType: 'Owns', details: 'Transnational Mandrax & Meth', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-narc-02', source: 'crm-23', target: 'node-org-04', label: 'Distributor', data: { relationshipType: 'Owns', details: 'Worli MD Pipeline', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-narc-03', source: 'crm-24', target: 'node-org-04', label: 'Chemist', data: { relationshipType: 'Associate', details: 'Ankleshwar GIDC Factory', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-22-23', source: 'crm-22', target: 'crm-23', label: 'Supplies', data: { relationshipType: 'Associate', details: 'Ephedrine Consignment Ingress', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-23-24', source: 'crm-23', target: 'crm-24', label: 'Chemicals', data: { relationshipType: 'Associate', details: 'Precursor Synthesis', riskLevel: 'HIGH' } });

  // Diamond & Corporate Fraud Edges
  addEdge({ id: 'edge-dia-01', source: 'crm-15', target: 'node-loc-03', label: 'Trading Front', data: { relationshipType: 'Operates In', details: 'BKC Diamond Bourse LoU Transit', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-15-16', source: 'crm-15', target: 'crm-16', label: 'Shell Director', data: { relationshipType: 'Associate', details: 'Offshore Round-Tripping', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-crm-15-17', source: 'crm-15', target: 'crm-17', label: 'Auditor', data: { relationshipType: 'Associate', details: 'Forged Bank Guarantees', riskLevel: 'HIGH' } });

  // Tihar Extortion & Hawala Edges
  addEdge({ id: 'edge-tihar-01', source: 'crm-14', target: 'node-loc-02', label: 'Ward Inmate', data: { relationshipType: 'Operates In', details: 'VoIP Spoofing Command', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-14-13', source: 'crm-14', target: 'crm-13', label: 'Hawala Transit', data: { relationshipType: 'Associate', details: 'Dubai Ledger Routing', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-crm-13-09', source: 'crm-13', target: 'crm-09', label: 'Market Rigging', data: { relationshipType: 'Associate', details: 'Circular Trading Pools', riskLevel: 'HIGH' } });

  // Darknet Cybercrime Edges
  addEdge({ id: 'edge-cyber-01', source: 'crm-07', target: 'node-fin-02', label: 'Mixer Core', data: { relationshipType: 'Owns', details: '120 BTC Tumbler Cascade', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-cyber-02', source: 'crm-08', target: 'node-fin-02', label: 'Mining Pool', data: { relationshipType: 'Owns', details: 'Ponzi Cloud Pool', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-07-08', source: 'crm-07', target: 'crm-08', label: 'Exploit Key', data: { relationshipType: 'Associate', details: 'Exchange Private Key Extraction', riskLevel: 'CRITICAL' } });

  // Arms Smuggling Edges
  addEdge({ id: 'edge-arms-01', source: 'crm-19', target: 'node-org-06', label: 'Air Drop Pilot', data: { relationshipType: 'Operates In', details: 'Purulia Aerial Drops', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-19-20', source: 'crm-19', target: 'crm-20', label: 'Arms Dealer', data: { relationshipType: 'Associate', details: 'Purulia Aerial Arms Smuggling', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-19-21', source: 'crm-19', target: 'crm-21', label: 'AK-56 Supply', data: { relationshipType: 'Associate', details: 'Underworld Weapon Conduit', riskLevel: 'CRITICAL' } });

  return {
    data: {
      nodes,
      edges,
      metrics: {
        degreeCentralityTopNodes: [
          { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', score: 0.99 },
          { id: 'crm-22', name: 'Vicky Goswami', score: 0.97 },
          { id: 'crm-14', name: 'Sukesh Chandrashekhar', score: 0.95 },
          { id: 'crm-21', name: 'Chhota Shakeel', score: 0.94 }
        ],
        betweennessCentralityTopNodes: [
          { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', score: 0.992 },
          { id: 'crm-21', name: 'Chhota Shakeel', score: 0.945 },
          { id: 'crm-23', name: 'Shashikala Patankar', score: 0.918 }
        ],
        communityClustersCount: 7,
        highestInfluenceLeader: { id: 'crm-01', name: 'Dawood Ibrahim Kaskar', score: 0.99 },
        totalConnections: edges.length,
        averageConnectionsPerNode: parseFloat((edges.length / (nodes.length || 1)).toFixed(1))
      }
    },
    isFallback: true
  };
};
