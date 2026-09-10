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

  const getEdgeColor = (type?: string, riskLevel?: string) => {
    if (riskLevel === 'CRITICAL') {
      if (type === 'Commands' || type === 'Enforces') return '#dc2626'; // red-600
    }
    switch (type) {
      case 'Money Transfer':
      case 'Hawala':
      case 'Launders':
      case 'Escrow':
        return '#8b5cf6'; // violet-500
      case 'Calls':
      case 'Intercepted':
      case 'VoIP':
      case 'Burner':
        return '#059669'; // emerald-600
      case 'Meeting':
      case 'Commands':
      case 'Enforces':
      case 'Hit Contract':
        return '#ef4444'; // red-500
      case 'Travel':
      case 'Operates In':
      case 'Transit':
        return '#2563eb'; // blue-600
      case 'Supplies':
      case 'Arms Deal':
      case 'Chemicals':
        return '#d97706'; // amber-600
      case 'Associate':
      case 'Brother':
      case 'Lieutenant':
      case 'Chemist':
      case 'Distributor':
        return '#0891b2'; // cyan-600
      case 'Owns':
      case 'Director':
      case 'Chief':
        return '#4f46e5'; // indigo-600
      default:
        return '#64748b'; // slate-500
    }
  };

  const strokeColor = getEdgeColor(data?.relationshipType, data?.riskLevel);

  return (
    <>
      <path
        id={id}
        style={{
          ...style,
          stroke: selected ? '#0f172a' : (style.stroke || strokeColor),
          strokeWidth: selected ? 2.5 : (style.strokeWidth || 1.5),
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
              className={`px-1.5 py-0.5 rounded text-[10px] font-medium border shadow-sm transition-all ${
                selected
                  ? 'bg-slate-900 text-white border-slate-900 font-bold scale-105 shadow-md'
                  : 'bg-white/95 backdrop-blur-sm text-slate-700 border-slate-200 hover:border-slate-400 hover:scale-105'
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
