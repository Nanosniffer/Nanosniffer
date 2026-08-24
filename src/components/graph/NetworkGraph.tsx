import React, { useState, useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { nodeTypes } from './CustomNodes';
import { edgeTypes } from './CustomEdges';
import { NetworkGraphData, NetworkNodeData } from '../../types';
import { GraphControls } from './GraphControls';
import { NodeDetailPanel } from './NodeDetailPanel';
import { GraphAnalyticsWidgets } from './GraphAnalyticsWidgets';

interface NetworkGraphProps {
  initialData: NetworkGraphData;
  onOpenCriminalDossier?: (criminalId: string) => void;
}

// Inner graph wrapper to access useReactFlow
const GraphCanvas: React.FC<NetworkGraphProps> = ({ initialData, onOpenCriminalDossier }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialData.edges);
  
  const [selectedNodeData, setSelectedNodeData] = useState<NetworkNodeData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  
  const [sourceNode, setSourceNode] = useState('');
  const [targetNode, setTargetNode] = useState('');
  const [highlightedPathIds, setHighlightedPathIds] = useState<{ nodes: Set<string>; edges: Set<string> }>({
    nodes: new Set(),
    edges: new Set(),
  });

  const { fitView } = useReactFlow();

  // Filter nodes & edges based on type & search
  const filteredNodes = useMemo(() => {
    return initialData.nodes.map((node) => {
      const matchesType = selectedType === 'ALL' || node.data.type === selectedType;
      const matchesSearch =
        !searchQuery ||
        node.data.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.data.subType?.toLowerCase().includes(searchQuery.toLowerCase());

      const isPathActive = highlightedPathIds.nodes.size > 0;
      const isInPath = highlightedPathIds.nodes.has(node.id);

      const isDimmed = (isPathActive && !isInPath) || (!matchesType || !matchesSearch);

      return {
        ...node,
        style: {
          ...node.style,
          opacity: isDimmed ? 0.2 : 1,
          transition: 'opacity 0.3s ease',
        },
      };
    });
  }, [initialData.nodes, selectedType, searchQuery, highlightedPathIds]);

  const filteredEdges = useMemo(() => {
    return initialData.edges.map((edge) => {
      const isPathActive = highlightedPathIds.edges.size > 0;
      const isInPath = highlightedPathIds.edges.has(edge.id);

      return {
        ...edge,
        type: 'tacticalEdge',
        animated: isInPath || edge.animated,
        style: {
          ...edge.style,
          stroke: isInPath ? '#22d3ee' : undefined,
          strokeWidth: isInPath ? 3 : 1.5,
          opacity: isPathActive && !isInPath ? 0.15 : 0.85,
        },
      };
    });
  }, [initialData.edges, highlightedPathIds]);

  // Sync state when filtered
  useEffect(() => {
    setNodes(filteredNodes);
  }, [filteredNodes, setNodes]);

  useEffect(() => {
    setEdges(filteredEdges);
  }, [filteredEdges, setEdges]);

  // Node click handler
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeData(node.data as NetworkNodeData);
  }, []);

  // Shortest Path Finder (BFS implementation)
  const handleFindPath = useCallback(() => {
    if (!sourceNode || !targetNode || sourceNode === targetNode) return;

    // Build adjacency graph
    const adj = new Map<string, Array<{ neighbor: string; edgeId: string }>>();
    initialData.nodes.forEach((n) => adj.set(n.id, []));

    initialData.edges.forEach((e) => {
      if (!adj.has(e.source)) adj.set(e.source, []);
      if (!adj.has(e.target)) adj.set(e.target, []);
      adj.get(e.source)!.push({ neighbor: e.target, edgeId: e.id });
      adj.get(e.target)!.push({ neighbor: e.source, edgeId: e.id }); // undirected traversal
    });

    // BFS Queue
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
    } else {
      alert('No direct or intermediary path detected between the selected entities.');
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
    fitView({ duration: 800 });
  };

  const nodesList = useMemo(() => {
    return initialData.nodes.map((n) => ({ id: n.id, label: `${n.data.label} (${n.data.type})` }));
  }, [initialData.nodes]);

  return (
    <div className="relative w-full h-[750px] rounded-2xl overflow-hidden border border-slate-800 bg-agency-950 shadow-2xl flex flex-col">
      {/* Controls Header */}
      <div className="p-3 bg-agency-950/90 border-b border-slate-800 z-10">
        <GraphControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedType={selectedType}
          onTypeSelect={setSelectedType}
          onResetLayout={handleResetLayout}
          nodesList={nodesList}
          sourceNode={sourceNode}
          targetNode={targetNode}
          onSourceChange={setSourceNode}
          onTargetChange={setTargetNode}
          onFindPath={handleFindPath}
          onClearPath={handleClearPath}
          isPathActive={highlightedPathIds.nodes.size > 0}
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
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          fitView
          attributionPosition="bottom-left"
          minZoom={0.2}
          maxZoom={2.5}
        >
          <Background color="#1e293b" gap={24} size={1.5} />
          <Controls className="!bg-agency-900 !border-slate-700" />
          <MiniMap
            nodeColor={(n) => {
              switch (n.data?.type) {
                case 'person':
                  return '#06b6d4';
                case 'phone':
                  return '#10b981';
                case 'vehicle':
                  return '#8b5cf6';
                case 'bank':
                  return '#3b82f6';
                case 'organization':
                  return '#f43f5e';
                default:
                  return '#f59e0b';
              }
            }}
            maskColor="rgba(2, 6, 23, 0.85)"
            className="!bg-agency-950 !border-slate-800"
          />
        </ReactFlow>

        {/* Node Detail Inspector Drawer */}
        <NodeDetailPanel
          nodeData={selectedNodeData}
          onClose={() => setSelectedNodeData(null)}
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
