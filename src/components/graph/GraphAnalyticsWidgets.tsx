import React from 'react';
import { NetworkGraphData } from '../../types';
import { Card } from '../ui/card';
import { Activity, GitMerge, Users, Network, TrendingUp } from 'lucide-react';

interface GraphAnalyticsWidgetsProps {
  metrics: NetworkGraphData['metrics'];
  onSelectNode?: (nodeId: string) => void;
}

export const GraphAnalyticsWidgets: React.FC<GraphAnalyticsWidgetsProps> = ({ metrics, onSelectNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {/* 1. Degree Centrality */}
      <Card className="p-3 bg-white border border-slate-200 shadow-card hover:border-slate-300">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5 text-blue-600" /> DEGREE CENTRALITY
          </span>
          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
            TOP NODE
          </span>
        </div>
        <div className="text-xs font-bold text-slate-900 truncate">
          {metrics.degreeCentralityTopNodes[0]?.name || 'Elena Rostova'}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>Centrality Score:</span>
          <span className="font-semibold text-slate-900">{metrics.degreeCentralityTopNodes[0]?.score || 0.94}</span>
        </div>
      </Card>

      {/* 2. Betweenness Centrality */}
      <Card className="p-3 bg-white border border-slate-200 shadow-card hover:border-slate-300">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
            <GitMerge className="w-3.5 h-3.5 text-purple-600" /> CRITICAL BRIDGE
          </span>
          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 border border-purple-200">
            VULNERABILITY
          </span>
        </div>
        <div className="text-xs font-bold text-slate-900 truncate">
          {metrics.betweennessCentralityTopNodes[0]?.name || 'Viktor Kozlov'}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>Bridge Factor:</span>
          <span className="font-semibold text-purple-700">{metrics.betweennessCentralityTopNodes[0]?.score || 0.84}</span>
        </div>
      </Card>

      {/* 3. Community Detection */}
      <Card className="p-3 bg-white border border-slate-200 shadow-card hover:border-slate-300">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-600" /> CLUSTERS
          </span>
          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
            COMMUNITIES
          </span>
        </div>
        <div className="text-xs font-bold text-slate-900">
          {metrics.communityClustersCount} Sub-Syndicates
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>Cross-Links:</span>
          <span className="font-semibold text-amber-700">14 Active Wires</span>
        </div>
      </Card>

      {/* 4. Influence Leader */}
      <Card className="p-3 bg-white border border-slate-200 shadow-card hover:border-slate-300">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-red-600" /> HIGH INFLUENCE
          </span>
          <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200">
            TARGET
          </span>
        </div>
        <div className="text-xs font-bold text-slate-900 truncate">
          {metrics.highestInfluenceLeader?.name || 'Mateo Silva'}
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>Authority Score:</span>
          <span className="font-semibold text-red-700">{Math.round((metrics.highestInfluenceLeader?.score || 0.92) * 100)}%</span>
        </div>
      </Card>

      {/* 5. Total Connections */}
      <Card className="p-3 bg-white border border-slate-200 shadow-card hover:border-slate-300">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] font-semibold text-slate-700 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-emerald-600" /> TOPOLOGY DENSITY
          </span>
          <span className="text-[10px] font-medium text-slate-500">
            {metrics.totalConnections} EDGES
          </span>
        </div>
        <div className="text-xs font-bold text-slate-900">
          {metrics.averageConnectionsPerNode} Avg Links/Node
        </div>
        <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
          <span>Cohesion:</span>
          <span className="font-semibold text-emerald-700">High Interlock</span>
        </div>
      </Card>
    </div>
  );
};
