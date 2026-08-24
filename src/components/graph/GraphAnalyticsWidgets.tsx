import React from 'react';
import { NetworkGraphData } from '../../types';
import { Card } from '../ui/card';
import { Activity, GitMerge, Users, Network, TrendingUp } from 'lucide-react';

interface GraphAnalyticsWidgetsProps {
  metrics: NetworkGraphData['metrics'];
  onSelectNode?: (nodeId: string) => void;
}

// Circular progress indicator component
const CircularMeter: React.FC<{ value: number; max?: number; label: string; subLabel: string; color: string }> = ({
  value,
  max = 1,
  label,
  subLabel,
  color,
}) => {
  const percentage = Math.min(100, Math.round((value / max) * 100));
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke="#1e293b"
            strokeWidth="5"
            fill="transparent"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color}
            strokeWidth="5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-xs font-mono font-bold text-slate-100">{percentage}%</span>
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold text-slate-200">{label}</div>
        <div className="text-[10px] text-slate-400 font-mono">{subLabel}</div>
      </div>
    </div>
  );
};

export const GraphAnalyticsWidgets: React.FC<GraphAnalyticsWidgetsProps> = ({ metrics, onSelectNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {/* 1. Degree Centrality (Most Connected) */}
      <Card className="p-3.5 bg-agency-900/90 border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-cyber-cyan flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" /> DEGREE CENTRALITY
          </span>
          <span className="text-[10px] font-mono text-slate-400">TOP 1</span>
        </div>
        <div className="text-sm font-bold text-slate-100 truncate">
          {metrics.degreeCentralityTopNodes[0]?.name || 'Helena Vance'}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Centrality Index:</span>
          <span className="text-cyber-cyan font-bold">{metrics.degreeCentralityTopNodes[0]?.score || 0.99}</span>
        </div>
      </Card>

      {/* 2. Betweenness Centrality (Bridge / Bottleneck) */}
      <Card className="p-3.5 bg-agency-900/90 border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
            <GitMerge className="w-3.5 h-3.5" /> BRIDGE NODE
          </span>
          <span className="text-[10px] font-mono text-slate-400">VULNERABILITY</span>
        </div>
        <div className="text-sm font-bold text-slate-100 truncate">
          {metrics.betweennessCentralityTopNodes[0]?.name || 'Helena Vance'}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Bridge Factor:</span>
          <span className="text-purple-400 font-bold">{metrics.betweennessCentralityTopNodes[0]?.score || 0.98}</span>
        </div>
      </Card>

      {/* 3. Community Detection */}
      <Card className="p-3.5 bg-agency-900/90 border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> CLUSTERS
          </span>
          <span className="text-[10px] font-mono text-slate-400">MODULARITY</span>
        </div>
        <div className="text-sm font-bold text-slate-100">
          {metrics.communityClustersCount} Sub-Syndicates
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Inter-Cluster Wires:</span>
          <span className="text-amber-400 font-bold">14 Active</span>
        </div>
      </Card>

      {/* 4. Influence Leader */}
      <Card className="p-3.5 bg-agency-900/90 border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-red-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> HIGH INFLUENCE
          </span>
          <span className="text-[10px] font-mono text-slate-400">COMMAND</span>
        </div>
        <div className="text-sm font-bold text-slate-100 truncate">
          {metrics.highestInfluenceLeader?.name || 'Mateo Silva'}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Threat Authority:</span>
          <span className="text-red-400 font-bold">{metrics.highestInfluenceLeader?.score * 100}%</span>
        </div>
      </Card>

      {/* 5. Total Connections */}
      <Card className="p-3.5 bg-agency-900/90 border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> GRAPH DENSITY
          </span>
          <span className="text-[10px] font-mono text-slate-400">{metrics.totalConnections} EDGES</span>
        </div>
        <div className="text-sm font-bold text-slate-100">
          {metrics.averageConnectionsPerNode} Avg Conns / Node
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-400">Network Cohesion:</span>
          <span className="text-emerald-400 font-bold">High Density</span>
        </div>
      </Card>
    </div>
  );
};
