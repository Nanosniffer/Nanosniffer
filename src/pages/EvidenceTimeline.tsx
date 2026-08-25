import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTimelineEvents, getCriminals } from '../api';
import { EvidenceTimelineView } from '../components/timeline/EvidenceTimelineView';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { Criminal } from '../types';
import { Clock, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';

export const EvidenceTimeline: React.FC = () => {
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  const { data: timelineRes, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['timeline'],
    queryFn: () => getTimelineEvents(),
  });

  const { data: criminalsRes } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const events = timelineRes?.data || [];
  const criminals = criminalsRes?.data || [];

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              FORENSIC SEQUENCE & RECONSTRUCTION
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {events.length} Events Logged
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Evidence Timeline & Cross-Correlations
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Sequential reconstruction of wiretaps, ATM cashouts, CCTV sightings, and syndicate meetings.
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
            <span>Sync</span>
          </Button>
        </div>
      </div>

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
