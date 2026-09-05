import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { nodeTypes } from './CustomNodes';
import { edgeTypes } from './CustomEdges';
import { NetworkGraphData, NetworkNodeData, NetworkNode, NetworkEdge } from '../../types';
import { GraphControls } from './GraphControls';
import { NodeDetailPanel } from './NodeDetailPanel';

interface NetworkGraphProps {
  initialData: NetworkGraphData;
  onOpenCriminalDossier?: (criminalId: string) => void;
}

// Inner graph wrapper to access useReactFlow
const GraphCanvas: React.FC<NetworkGraphProps> = ({ initialData, onOpenCriminalDossier }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);
  
  const [selectedNodeData, setSelectedNodeData] = useState<NetworkNodeData | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [viewMode, setViewMode] = useState<'all' | 'kingpins' | 'persons' | 'vehicles' | 'phones' | 'finance'>('kingpins');
  
  const [sourceNode, setSourceNode] = useState('');
  const [targetNode, setTargetNode] = useState('');
  const [highlightedPathIds, setHighlightedPathIds] = useState<{ nodes: Set<string>; edges: Set<string> }>({
    nodes: new Set(),
    edges: new Set(),
  });

  const { fitView, zoomIn, zoomOut } = useReactFlow();

  // Find 1-hop neighbors of selected node
  const connectedNodeIds = useMemo(() => {
    if (!selectedNodeId) return null;
    const connected = new Set<string>([selectedNodeId]);
    initialData.edges.forEach((edge) => {
      if (edge.source === selectedNodeId) connected.add(edge.target);
      if (edge.target === selectedNodeId) connected.add(edge.source);
    });
    return connected;
  }, [selectedNodeId, initialData.edges]);

  // Filter nodes based on viewMode, search, type, and selection
  const filteredNodes = useMemo(() => {
    return initialData.nodes
      .filter((node) => {
        // Mode 1: Kingpins & Syndicates Only (Clean uncluttered view)
        if (viewMode === 'kingpins') {
          const isKeyPerson = node.data.type === 'person' && (node.data.riskScore || 0) >= 94;
          const isOrg = node.data.type === 'organization';
          const isLoc = node.data.type === 'location';
          const isBank = node.data.type === 'bank';
          return isKeyPerson || isOrg || isLoc || isBank;
        }

        // Mode 2: Persons Only
        if (viewMode === 'persons') {
          return node.data.type === 'person';
        }

        // Mode 3: Vehicles & Owners Only
        if (viewMode === 'vehicles') {
          return node.data.type === 'vehicle' || node.data.type === 'person';
        }

        // Mode 4: Phones & Wiretaps Only
        if (viewMode === 'phones') {
          return node.data.type === 'phone' || node.data.type === 'person';
        }

        // Mode 5: Financial Nodes Only
        if (viewMode === 'finance') {
          return node.data.type === 'bank' || node.data.type === 'organization' || node.data.type === 'person';
        }

        // Mode 6: All Entities
        return true;
      })
      .map((node) => {
        const matchesType = selectedType === 'ALL' || node.data.type === selectedType;
        const matchesSearch =
          !searchQuery ||
          node.data.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          node.data.subType?.toLowerCase().includes(searchQuery.toLowerCase());

        const isPathActive = highlightedPathIds.nodes.size > 0;
        const isInPath = highlightedPathIds.nodes.has(node.id);

        const isConnected = connectedNodeIds ? connectedNodeIds.has(node.id) : true;
        const isDimmed = (isPathActive && !isInPath) || (!matchesType || !matchesSearch) || (!isConnected && selectedNodeId !== null);

        return {
          ...node,
          style: {
            ...node.style,
            opacity: isDimmed ? 0.2 : 1,
            transition: 'opacity 0.2s ease, transform 0.3s ease',
          },
        };
      });
  }, [initialData.nodes, viewMode, selectedType, searchQuery, highlightedPathIds, connectedNodeIds, selectedNodeId]);

  const visibleNodeIdSet = useMemo(() => new Set(filteredNodes.map(n => n.id)), [filteredNodes]);

  const filteredEdges = useMemo(() => {
    return initialData.edges
      .filter((edge) => visibleNodeIdSet.has(edge.source) && visibleNodeIdSet.has(edge.target))
      .map((edge) => {
        const isPathActive = highlightedPathIds.edges.size > 0;
        const isInPath = highlightedPathIds.edges.has(edge.id);

        const isEdgeConnected = selectedNodeId
          ? edge.source === selectedNodeId || edge.target === selectedNodeId
          : true;

        const isDimmed = (isPathActive && !isInPath) || (!isEdgeConnected && selectedNodeId !== null);

        return {
          ...edge,
          type: 'tacticalEdge',
          animated: isInPath || edge.animated,
          style: {
            ...edge.style,
            stroke: isInPath ? '#0f172a' : undefined,
            strokeWidth: isInPath ? 2.5 : isEdgeConnected && selectedNodeId ? 2 : 1.25,
            opacity: isDimmed ? 0.15 : 0.9,
          },
        };
      });
  }, [initialData.edges, visibleNodeIdSet, highlightedPathIds, selectedNodeId]);

  // Sync state when filtered
  useEffect(() => {
    setNodes(filteredNodes);
  }, [filteredNodes, setNodes]);

  useEffect(() => {
    setEdges(filteredEdges);
  }, [filteredEdges, setEdges]);

  // Auto-fit on initial load or viewMode change
  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ duration: 500, padding: 0.25 });
    }, 150);
    return () => clearTimeout(timer);
  }, [viewMode, fitView]);

  // Node click handler
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeData(node.data as NetworkNodeData);
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeData(null);
    setSelectedNodeId(null);
  }, []);

  // Shortest Path Finder (BFS)
  const handleFindPath = useCallback(() => {
    if (!sourceNode || !targetNode || sourceNode === targetNode) return;

    const adj = new Map<string, Array<{ neighbor: string; edgeId: string }>>();
    initialData.nodes.forEach((n) => adj.set(n.id, []));

    initialData.edges.forEach((e) => {
      if (!adj.has(e.source)) adj.set(e.source, []);
      if (!adj.has(e.target)) adj.set(e.target, []);
      adj.get(e.source)!.push({ neighbor: e.target, edgeId: e.id });
      adj.get(e.target)!.push({ neighbor: e.source, edgeId: e.id });
    });

    const queue: Array<{ curr: string; pathNodes: string[]; pathEdges: string[] }> = [
      { curr: sourceNode, pathNodes: [sourceNode], pathEdges: [] },
    ];
    const visited = new Set<string>([sourceNode]);
    let foundPath: { nodes: string[]; edges: string[] } | null = null;

    while (queue.length > 0) {
      const { curr, pathNodes, pathEdges } = queue.shift()!;

      if (curr === targetNode) {
        foundPath = { nodes: pathNodes, edges: pathEdges };
        break;
      }

      const neighbors = adj.get(curr) || [];
      for (const { neighbor, edgeId } of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push({
            curr: neighbor,
            pathNodes: [...pathNodes, neighbor],
            pathEdges: [...pathEdges, edgeId],
          });
        }
      }
    }

    if (foundPath) {
      setHighlightedPathIds({
        nodes: new Set(foundPath.nodes),
        edges: new Set(foundPath.edges),
      });
    }
  }, [sourceNode, targetNode, initialData]);

  const handleClearPath = () => {
    setSourceNode('');
    setTargetNode('');
    setHighlightedPathIds({ nodes: new Set(), edges: new Set() });
  };

  const handleResetLayout = () => {
    handleClearPath();
    setSearchQuery('');
    setSelectedType('ALL');
    setViewMode('kingpins');
    setSelectedNodeData(null);
    setSelectedNodeId(null);
    fitView({ duration: 600, padding: 0.25 });
  };

  const handleAutoSpace = () => {
    // Spreading out animation
    setNodes((prevNodes) =>
      prevNodes.map((n) => ({
        ...n,
        position: {
          x: n.position.x * 1.15,
          y: n.position.y * 1.15,
        }
      }))
    );
    setTimeout(() => {
      fitView({ duration: 600, padding: 0.3 });
    }, 100);
  };

  const nodesList = useMemo(() => {
    return filteredNodes.map((n) => ({ id: n.id, label: `${n.data.label} (${n.data.type})` }));
  }, [filteredNodes]);

  return (
    <div className="relative w-full h-[740px] rounded-lg overflow-hidden border border-slate-200 bg-slate-50 shadow-card flex flex-col">
      {/* Controls Header */}
      <div className="p-2.5 bg-white border-b border-slate-200 z-10">
        <GraphControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
          onResetLayout={handleResetLayout}
          onAutoSpace={handleAutoSpace}
          onZoomIn={() => zoomIn({ duration: 300 })}
          onZoomOut={() => zoomOut({ duration: 300 })}
          onFitView={() => fitView({ duration: 500, padding: 0.25 })}
          nodesList={nodesList}
          sourceNode={sourceNode}
          targetNode={targetNode}
          onSourceChange={setSourceNode}
          onTargetChange={setTargetNode}
          onFindPath={handleFindPath}
          onClearPath={handleClearPath}
          isPathActive={highlightedPathIds.nodes.size > 0}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {/* Canvas */}
      <div className="relative flex-1 w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          fitViewOptions={{ padding: 0.25, maxZoom: 1.0 }}
          attributionPosition="bottom-left"
          minZoom={0.1}
          maxZoom={2.5}
        >
          <Background color="#cbd5e1" gap={24} size={1} />
          <Controls className="!bg-white !border-slate-200 !shadow-sm" />
          <MiniMap
            nodeColor={(n) => {
              switch (n.data?.type) {
                case 'person':
                  return '#0f172a';
                case 'phone':
                  return '#10b981';
                case 'vehicle':
                  return '#f59e0b';
                case 'bank':
                  return '#3b82f6';
                case 'organization':
                  return '#a855f7';
                default:
                  return '#ef4444';
              }
            }}
            maskColor="rgba(241, 245, 249, 0.75)"
            className="!bg-white !border-slate-200"
          />
        </ReactFlow>

        {/* Node Detail Inspector Drawer */}
        <NodeDetailPanel
          nodeData={selectedNodeData}
          onClose={() => {
            setSelectedNodeData(null);
            setSelectedNodeId(null);
          }}
          onOpenCriminalDossier={onOpenCriminalDossier}
        />
      </div>
    </div>
  );
};

export const NetworkGraph: React.FC<NetworkGraphProps> = (props) => {
  return (
    <ReactFlowProvider>
      <GraphCanvas {...props} />
    </ReactFlowProvider>
  );
};
