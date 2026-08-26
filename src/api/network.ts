import { apiClient } from './axios';
import { dummyNetworkGraph } from '../data/dummy';
import { NetworkGraphData } from '../types';
import { getAllMergedCriminals } from './criminals';

export const getNetworkGraph = async (): Promise<{ data: NetworkGraphData; isFallback: boolean }> => {
  const allCriminals = getAllMergedCriminals();
  
  // Base nodes and edges from dummy dataset
  const nodes = [...dummyNetworkGraph.nodes];
  const edges = [...dummyNetworkGraph.edges];
  const existingNodeIds = new Set(nodes.map(n => n.id));
  const existingEdgeIds = new Set(edges.map(e => e.id));

  // Dynamically generate nodes and edges for all criminals
  allCriminals.forEach((criminal, idx) => {
    // 1. Criminal Person Node
    if (!existingNodeIds.has(criminal.id)) {
      const angle = (idx / (allCriminals.length || 1)) * 2 * Math.PI;
      const radius = 350 + (idx % 3) * 80;
      const nodeX = 400 + Math.cos(angle) * radius;
      const nodeY = 300 + Math.sin(angle) * radius;

      nodes.push({
        id: criminal.id,
        type: 'custom',
        position: { x: nodeX, y: nodeY },
        data: {
          label: criminal.name,
          type: 'person',
          entityId: criminal.id,
          riskLevel: criminal.riskLevel,
          riskScore: criminal.riskScore,
          avatarUrl: criminal.photoUrl,
          status: criminal.status,
          metadata: {
            alias: criminal.alias,
            crimeCategory: criminal.crimeCategory,
            city: criminal.lastKnownLocation?.city || 'Mumbai',
            criminalId: criminal.criminalId
          },
          connectionsCount: 3,
          centralityScore: 0.85
        }
      });
      existingNodeIds.add(criminal.id);
    }

    // 2. Phone / Wiretap Nodes & Edges
    (criminal.phoneNumbers || []).forEach((phone) => {
      const phoneNodeId = `node-phone-${phone.phoneNumber}`;
      if (!existingNodeIds.has(phoneNodeId)) {
        nodes.push({
          id: phoneNodeId,
          type: 'custom',
          position: { x: 400 + Math.random() * 200 - 100, y: 300 + Math.random() * 200 - 100 },
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
        existingNodeIds.add(phoneNodeId);
      }

      const edgeId = `edge-${criminal.id}-${phoneNodeId}`;
      if (!existingEdgeIds.has(edgeId)) {
        edges.push({
          id: edgeId,
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
        existingEdgeIds.add(edgeId);
      }
    });

    // 3. Vehicle Nodes & Edges
    (criminal.vehicles || []).forEach((vehicle) => {
      const vehNodeId = `node-veh-${vehicle.licensePlate}`;
      if (!existingNodeIds.has(vehNodeId)) {
        nodes.push({
          id: vehNodeId,
          type: 'custom',
          position: { x: 400 + Math.random() * 250 - 125, y: 300 + Math.random() * 250 - 125 },
          data: {
            label: `${vehicle.licensePlate}`,
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
        existingNodeIds.add(vehNodeId);
      }

      const edgeId = `edge-${criminal.id}-${vehNodeId}`;
      if (!existingEdgeIds.has(edgeId)) {
        edges.push({
          id: edgeId,
          source: criminal.id,
          target: vehNodeId,
          label: 'Owns',
          data: {
            relationshipType: 'Owns',
            details: `Registered transport asset (${vehicle.make} ${vehicle.model})`,
            riskLevel: criminal.riskLevel
          }
        });
        existingEdgeIds.add(edgeId);
      }
    });
  });

  return {
    data: {
      nodes,
      edges,
      metrics: {
        ...dummyNetworkGraph.metrics,
        totalConnections: edges.length,
        averageConnectionsPerNode: parseFloat((edges.length / (nodes.length || 1)).toFixed(1))
      }
    },
    isFallback: true
  };
};
