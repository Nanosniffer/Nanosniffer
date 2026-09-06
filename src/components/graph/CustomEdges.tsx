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
        return '#7c3aed'; // indigo/purple
      case 'Calls':
        return '#059669'; // emerald
      case 'Meeting':
        return '#dc2626'; // red
      case 'Travel':
        return '#2563eb'; // blue
      case 'Supplies':
        return '#d97706'; // amber
      default:
        return '#94a3b8'; // slate-400
    }
  };

  const strokeColor = getEdgeColor(data?.relationshipType);

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          stroke: selected ? '#0f172a' : strokeColor,
          strokeWidth: selected ? 2 : 1.25,
          strokeDasharray: data?.relationshipType === 'Calls' ? '4,4' : undefined,
        }}
        className="react-flow__edge-path transition-all duration-150"
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
              className={`px-1.5 py-0.2 rounded text-[10px] font-medium border shadow-subtle transition-all ${
                selected
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
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
  default: TacticalEdge,
};
