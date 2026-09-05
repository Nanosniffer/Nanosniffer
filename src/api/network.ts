import { apiClient } from './axios';
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

  // 1. ADD CORE ORGANIZATIONS & STRATEGIC HUBS
  addNode({
    id: 'node-org-01',
    type: 'organizationNode',
    position: { x: 500, y: 120 },
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
    position: { x: 180, y: 120 },
    data: {
      label: 'Dongri & Nagpada Command HQ',
      type: 'location',
      riskLevel: 'CRITICAL',
      riskScore: 99,
      entityId: 'loc-01',
      metadata: { city: 'Mumbai', facility: 'D-Company Core' }
    }
  });

  addNode({
    id: 'node-fin-01',
    type: 'bankNode',
    position: { x: 820, y: 120 },
    data: {
      label: 'D-Syndicate Tether USDT Vault',
      type: 'bank',
      riskLevel: 'CRITICAL',
      riskScore: 98,
      entityId: 'fin-01',
      metadata: { balance: '₹145.0 Cr', status: 'ACTIVE' }
    }
  });

  addNode({
    id: 'node-org-04',
    type: 'organizationNode',
    position: { x: 1700, y: 120 },
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
    id: 'node-loc-02',
    type: 'locationNode',
    position: { x: 500, y: 1000 },
    data: {
      label: 'Tihar Jail Special Security Ward',
      type: 'location',
      riskLevel: 'CRITICAL',
      riskScore: 97,
      entityId: 'loc-02',
      metadata: { city: 'New Delhi', facility: 'High Security Complex' }
    }
  });

  addNode({
    id: 'node-fin-02',
    type: 'bankNode',
    position: { x: 1700, y: 1000 },
    data: {
      label: 'Darknet Tumbler Crypto Mixer',
      type: 'bank',
      riskLevel: 'CRITICAL',
      riskScore: 95,
      entityId: 'fin-02',
      metadata: { balance: '₹38.0 Cr (120 BTC)', status: 'ACTIVE' }
    }
  });

  addNode({
    id: 'node-loc-03',
    type: 'locationNode',
    position: { x: 2900, y: 120 },
    data: {
      label: 'Bharat Diamond Bourse BKC',
      type: 'location',
      riskLevel: 'HIGH',
      riskScore: 94,
      entityId: 'loc-03',
      metadata: { city: 'Mumbai', facility: 'Diamond Trading Front' }
    }
  });

  // 2. DEFINE EXPLICIT NON-OVERLAPPING COORDINATES FOR ALL 24 CRIMINALS
  const criminalLayoutMap: Record<string, { x: number; y: number }> = {
    // Cluster 1: D-Company Syndicate (Top-Left)
    'crm-01': { x: 500, y: 350 },   // Dawood Ibrahim
    'crm-02': { x: 180, y: 480 },   // Tiger Memon
    'crm-21': { x: 820, y: 480 },   // Chhota Shakeel
    'crm-03': { x: 500, y: 620 },   // Yakub Memon

    // Cluster 2: Narcotics Cartel (Top-Middle)
    'crm-22': { x: 1400, y: 350 },  // Vicky Goswami
    'crm-23': { x: 1700, y: 420 },  // Baby Patankar
    'crm-24': { x: 2000, y: 350 },  // Dharmesh Patel

    // Cluster 3: Tihar Extortion & Hawala (Bottom-Left)
    'crm-14': { x: 280, y: 1250 },  // Sukesh Chandrashekhar
    'crm-13': { x: 500, y: 1350 },  // Hasan Ali Khan
    'crm-09': { x: 720, y: 1250 },  // Ketan Parekh

    // Cluster 4: Darknet Cybercrime (Bottom-Middle)
    'crm-07': { x: 1500, y: 1250 }, // Sriki
    'crm-08': { x: 1900, y: 1250 }, // Amit Bhardwaj

    // Cluster 5: Diamond & Corporate Fraud (Top-Right)
    'crm-15': { x: 2700, y: 350 },  // Nirav Modi
    'crm-16': { x: 2950, y: 480 },  // Joseph Babu
    'crm-17': { x: 3200, y: 350 },  // Dhananjay Chhatrapati
    'crm-18': { x: 2950, y: 620 },  // Natwarlal

    // Cluster 6: Arms Smuggling & Purulia (Bottom-Right)
    'crm-19': { x: 2700, y: 1250 }, // Niels Holck (Kim Davy)
    'crm-20': { x: 3100, y: 1250 }, // Peter Bleach

    // Cluster 7: Special Heinous & Serial Offenses (Far Bottom Center)
    'crm-04': { x: 800, y: 1900 },   // Charles Sobhraj
    'crm-05': { x: 1200, y: 1900 },  // Raman Raghav
    'crm-06': { x: 1600, y: 1900 },  // Thug Behram
    'crm-10': { x: 2000, y: 1900 },  // Akku Yadav
    'crm-11': { x: 1200, y: 2150 },  // Gurmeet Ram Rahim
    'crm-12': { x: 1600, y: 2150 },  // Kuldeep Sengar
  };

  // 3. RENDER PERSON NODES AND THEIR NON-OVERLAPPING SATELLITES
  allCriminals.forEach((criminal, idx) => {
    const coords = criminalLayoutMap[criminal.id] || {
      x: 600 + (idx % 4) * 500,
      y: 2400 + Math.floor(idx / 4) * 400
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

    // Add Phone Satellite Node (Placed neatly to the upper-left of owner)
    if (criminal.phoneNumbers && criminal.phoneNumbers.length > 0) {
      const phone = criminal.phoneNumbers[0];
      const phoneNodeId = `phone-${criminal.id}`;
      
      addNode({
        id: phoneNodeId,
        type: 'phoneNode',
        position: { x: coords.x - 170, y: coords.y - 85 },
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
          details: `Monitored line (${phone.carrier})`,
          riskLevel: criminal.riskLevel
        }
      });
    }

    // Add Vehicle Satellite Node (Placed neatly to the upper-right of owner)
    if (criminal.vehicles && criminal.vehicles.length > 0) {
      const vehicle = criminal.vehicles[0];
      const vehNodeId = `veh-${criminal.id}`;

      addNode({
        id: vehNodeId,
        type: 'vehicleNode',
        position: { x: coords.x + 170, y: coords.y - 85 },
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

  // 4. ADD STRATEGIC UNDERWORLD SYNDICATE EDGES
  // D-Company Hierarchy
  addEdge({ id: 'edge-org-01', source: 'crm-01', target: 'node-org-01', label: 'Commands', data: { relationshipType: 'Owns', details: 'Supreme Boss', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-org-02', source: 'crm-01', target: 'node-loc-01', label: 'HQ Base', data: { relationshipType: 'Operates In', details: 'Dongri Command Ground Zero', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-org-03', source: 'crm-01', target: 'node-fin-01', label: 'Treasury', data: { relationshipType: 'Owns', details: 'USDT Crypto Vault', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-01-02', source: 'crm-01', target: 'crm-02', label: 'Lieutenant', data: { relationshipType: 'Associate', details: 'Logistics Commander', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-01-21', source: 'crm-01', target: 'crm-21', label: 'Enforcer', data: { relationshipType: 'Associate', details: 'Arms & Hit Contracts Chief', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-02-03', source: 'crm-02', target: 'crm-03', label: 'Brother', data: { relationshipType: 'Associate', details: 'Financial Conduit', riskLevel: 'HIGH' } });

  // Narcotics Cartel Connections
  addEdge({ id: 'edge-narc-01', source: 'crm-22', target: 'node-org-04', label: 'Kingpin', data: { relationshipType: 'Owns', details: 'Transnational Mandrax & Meth', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-narc-02', source: 'crm-23', target: 'node-org-04', label: 'Distributor', data: { relationshipType: 'Owns', details: 'Worli MD Pipeline', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-narc-03', source: 'crm-24', target: 'node-org-04', label: 'Chemist', data: { relationshipType: 'Associate', details: 'Ankleshwar GIDC Factory', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-22-23', source: 'crm-22', target: 'crm-23', label: 'Supplies', data: { relationshipType: 'Associate', details: 'Ephedrine Consignment Ingress', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-23-24', source: 'crm-23', target: 'crm-24', label: 'Raw Chemicals', data: { relationshipType: 'Associate', details: 'Precursor Synthesis', riskLevel: 'HIGH' } });

  // Tihar Extortion Cartel Connections
  addEdge({ id: 'edge-tihar-01', source: 'crm-14', target: 'node-loc-02', label: 'Ward Inmate', data: { relationshipType: 'Operates In', details: 'VoIP Spoofing Command', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-14-13', source: 'crm-14', target: 'crm-13', label: 'Hawala Routing', data: { relationshipType: 'Associate', details: 'Swiss & Dubai Ledger Transit', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-crm-13-09', source: 'crm-13', target: 'crm-09', label: 'Market Rigging', data: { relationshipType: 'Associate', details: 'Circular Trading Pools', riskLevel: 'HIGH' } });

  // Cybercrime & Darknet Connections
  addEdge({ id: 'edge-cyber-01', source: 'crm-07', target: 'node-fin-02', label: 'Mixer Core', data: { relationshipType: 'Owns', details: '120 BTC Tumbler Cascade', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-cyber-02', source: 'crm-08', target: 'node-fin-02', label: 'GainBitcoin', data: { relationshipType: 'Owns', details: 'Ponzi Cloud Mining Pool', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-07-08', source: 'crm-07', target: 'crm-08', label: 'Dark Exploits', data: { relationshipType: 'Associate', details: 'Exchange Private Key Extraction', riskLevel: 'CRITICAL' } });

  // Diamond & Corporate Fraud Connections
  addEdge({ id: 'edge-dia-01', source: 'crm-15', target: 'node-loc-03', label: 'Trading Front', data: { relationshipType: 'Operates In', details: 'BKC Diamond Bourse LoU Transit', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-15-16', source: 'crm-15', target: 'crm-16', label: 'Shell Director', data: { relationshipType: 'Associate', details: 'Offshore Round-Tripping', riskLevel: 'HIGH' } });
  addEdge({ id: 'edge-crm-15-17', source: 'crm-15', target: 'crm-17', label: 'Auditing Front', data: { relationshipType: 'Associate', details: 'Forged Bank Guarantees', riskLevel: 'HIGH' } });

  // Arms Smuggling Connections
  addEdge({ id: 'edge-crm-19-20', source: 'crm-19', target: 'crm-20', label: 'AN-26 Drop', data: { relationshipType: 'Associate', details: 'Purulia Aerial Arms Smuggling', riskLevel: 'CRITICAL' } });
  addEdge({ id: 'edge-crm-19-21', source: 'crm-19', target: 'crm-21', label: 'AK-56 Ingress', data: { relationshipType: 'Associate', details: 'Underworld Weapon Supply', riskLevel: 'CRITICAL' } });

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
