import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTimelineEvents, getCriminals } from '../api';
import { EvidenceTimelineView } from '../components/timeline/EvidenceTimelineView';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { ErrorFallback } from '../components/common/ErrorFallback';
import { Criminal } from '../types';
import { Clock, Download, Zap, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { downloadJSON } from '../utils/exportUtils';

export const EvidenceTimeline: React.FC = () => {
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  const { data: timelineRes, isLoading, refetch } = useQuery({
    queryKey: ['timeline'],
    queryFn: () => getTimelineEvents(),
  });

  const { data: criminalsRes } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const events = timelineRes?.data || [];
  const isFallback = timelineRes?.isFallback ?? false;
  const criminals = criminalsRes?.data || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider font-semibold">
              CHRONOLOGICAL FORENSIC SEQUENCE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-agency-900 border border-slate-700 text-slate-400">
              {events.length} LOGGED EVENTS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Evidence Timeline & Cross-Correlations
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadJSON(events, 'Evidence_Timeline_100_Events.json')}
            className="text-xs gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Full Timeline (JSON)
          </Button>
        </div>
      </div>

      {isFallback && (
        <ErrorFallback
          title="Evidence Timeline Stream Active"
          message="FastAPI backend offline. Displaying 100 chronological incidents across calls, ATM cashouts, CCTV sightings, and wire transfers from local cache."
          onRetry={() => refetch()}
        />
      )}

      {/* Timeline view */}
      {isLoading ? (
        <TableSkeleton rows={8} />
      ) : (
        <EvidenceTimelineView
          events={events}
          onSelectCriminal={(crmId) => {
            const found = criminals.find((c) => c.id === crmId || c.criminalId === crmId);
            if (found) setSelectedCriminal(found);
          }}
        />
      )}

      {/* Criminal Profile Drawer */}
      <CriminalProfileDrawer
        criminal={selectedCriminal}
        onClose={() => setSelectedCriminal(null)}
      />
    </div>
  );
};
