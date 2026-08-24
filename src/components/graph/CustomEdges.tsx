import React from 'react';
import { EdgeProps, getBezierPath, EdgeLabelRenderer } from 'reactflow';
import { NetworkEdgeData } from '../../types';

export const TacticalEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  selected,
}: EdgeProps<NetworkEdgeData>) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const getEdgeColor = (type?: string) => {
    switch (type) {
      case 'Money Transfer':
        return '#8b5cf6'; // purple
      case 'Calls':
        return '#10b981'; // emerald
      case 'Meeting':
        return '#ef4444'; // red
      case 'Travel':
        return '#06b6d4'; // cyan
      case 'Supplies':
        return '#f59e0b'; // amber
      default:
        return '#64748b'; // slate
    }
  };

  const strokeColor = getEdgeColor(data?.relationshipType);

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          stroke: selected ? '#22d3ee' : strokeColor,
          strokeWidth: selected ? 2.5 : 1.5,
          strokeDasharray: data?.relationshipType === 'Calls' ? '5,5' : undefined,
        }}
        className="react-flow__edge-path transition-all duration-300"
        d={edgePath}
      />
      {data?.relationshipType && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            <div
              className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-medium backdrop-blur-md border shadow-sm transition-all ${
                selected
                  ? 'bg-cyber-cyan text-agency-950 border-white font-bold scale-110'
                  : 'bg-agency-950/90 text-slate-300 border-slate-700/60 hover:border-cyber-cyan'
              }`}
            >
              {data.relationshipType}
              {data.frequency && ` (${data.frequency}x)`}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export const edgeTypes = {
  tacticalEdge: TacticalEdge,
};
