import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCriminals } from '../api';
import { CriminalTable } from '../components/tables/CriminalTable';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { Criminal } from '../types';
import { RefreshCw, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { EvidenceIntakeModal } from '../components/modals/EvidenceIntakeModal';

export const CriminalProfiles: React.FC = () => {
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);
  const [intakeOpen, setIntakeOpen] = useState(false);

  const { data: res, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const criminals = res?.data || [];

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              INTELLIGENCE DATABASE
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {criminals.length} Subject Dossiers
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Criminal Profiles & Surveillance Dossiers
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Query classified biometrics, associates, communications telemetry, and financial nodes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="default"
            size="sm"
            onClick={() => setIntakeOpen(true)}
            className="gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Suspect</span>
          </Button>

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

      {/* Main Criminals Table */}
      {isLoading ? (
        <TableSkeleton rows={8} />
      ) : (
        <CriminalTable
          criminals={criminals}
          onSelectCriminal={(c) => setSelectedCriminal(c)}
        />
      )}

      {/* Profile Dossier Drawer */}
      <CriminalProfileDrawer
        criminal={selectedCriminal}
        onClose={() => setSelectedCriminal(null)}
        onSelectAssociate={(id) => {
          const found = criminals.find((c) => c.id === id);
          if (found) setSelectedCriminal(found);
        }}
      />

      <EvidenceIntakeModal
        isOpen={intakeOpen}
        onClose={() => setIntakeOpen(false)}
      />
    </div>
  );
};
