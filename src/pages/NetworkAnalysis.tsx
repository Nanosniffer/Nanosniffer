import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNetworkGraph, getCriminals } from '../api';
import { NetworkGraph } from '../components/graph/NetworkGraph';
import { GraphAnalyticsWidgets } from '../components/graph/GraphAnalyticsWidgets';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { DashboardSkeleton } from '../components/common/SkeletonLoaders';
import { ErrorFallback } from '../components/common/ErrorFallback';
import { Criminal } from '../types';
import { Share2, Zap, Network, Info } from 'lucide-react';
import { Card } from '../components/ui/card';

export const NetworkAnalysis: React.FC = () => {
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  const { data: graphRes, isLoading, refetch } = useQuery({
    queryKey: ['networkGraph'],
    queryFn: getNetworkGraph,
  });

  const { data: criminalsRes } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const graphData = graphRes?.data;
  const isFallback = graphRes?.isFallback ?? false;
  const criminals = criminalsRes?.data || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider font-semibold">
              RELATIONSHIP TOPOLOGY ENGINE
            </span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Network Analysis & Association Graph
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-agency-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
          <Info className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>Click any node to inspect telemetry, tap edges to view intercepts</span>
        </div>
      </div>

      {isFallback && (
        <ErrorFallback
          title="Network Graph Topology Active"
          message="FastAPI backend offline. Displaying 7 entity node types with 50+ interconnected edges from local cache."
          onRetry={() => refetch()}
        />
      )}

      {/* Graph Analytics Centrality Widgets */}
      {graphData?.metrics && (
        <GraphAnalyticsWidgets
          metrics={graphData.metrics}
          onSelectNode={(id) => {
            const found = criminals.find((c) => c.id === id);
            if (found) setSelectedCriminal(found);
          }}
        />
      )}

      {/* Master React Flow Canvas */}
      {isLoading || !graphData ? (
        <div className="h-[700px] rounded-2xl bg-agency-950 border border-slate-800 animate-pulse flex items-center justify-center text-slate-500 font-mono">
          Initializing neural relationship canvas...
        </div>
      ) : (
        <NetworkGraph
          initialData={graphData}
          onOpenCriminalDossier={(crmId) => {
            const found = criminals.find((c) => c.id === crmId || c.criminalId === crmId);
            if (found) setSelectedCriminal(found);
          }}
        />
      )}

      {/* Criminal Profile Drawer */}
      <CriminalProfileDrawer
        criminal={selectedCriminal}
        onClose={() => setSelectedCriminal(null)}
        onSelectAssociate={(id) => {
          const found = criminals.find((c) => c.id === id);
          if (found) setSelectedCriminal(found);
        }}
      />
    </div>
  );
};
