import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getNetworkGraph, getCriminals } from '../api';
import { NetworkGraph } from '../components/graph/NetworkGraph';
import { GraphAnalyticsWidgets } from '../components/graph/GraphAnalyticsWidgets';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { DashboardSkeleton } from '../components/common/SkeletonLoaders';
import { Criminal } from '../types';
import { Share2, Info, Download, Filter, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';

export const NetworkAnalysis: React.FC = () => {
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  const { data: graphRes, isLoading, refetch, isFetching } = useQuery({
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

  const handleExportJSON = () => {
    if (!graphData) return;
    const blob = new Blob([JSON.stringify(graphData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ACN-Network-Topology-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              INVESTIGATION HERO WORKSPACE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Network Analysis & Association Topology
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore multi-tier relationships between persons, shell companies, communications, and financial channels.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Sync Graph</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportJSON}
            className="gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Topology</span>
          </Button>
        </div>
      </div>

      {/* Graph Analytics Widgets */}
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
        <div className="h-[700px] rounded-lg bg-white border border-slate-200 shadow-card animate-pulse flex items-center justify-center text-slate-400 text-xs font-mono">
          Loading intelligence relationship topology...
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
