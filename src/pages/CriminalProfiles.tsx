import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCriminals } from '../api';
import { CriminalTable } from '../components/tables/CriminalTable';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { ErrorFallback } from '../components/common/ErrorFallback';
import { Criminal } from '../types';
import { Users, UserPlus, Download, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/button';
import { downloadJSON } from '../utils/exportUtils';

export const CriminalProfiles: React.FC = () => {
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  const { data: res, isLoading, refetch } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const criminals = res?.data || [];
  const isFallback = res?.isFallback ?? false;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider font-semibold">
              TASK FORCE DATABASE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-agency-900 border border-slate-700 text-slate-400">
              {criminals.length} TARGETS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Criminal Profiles & Dossiers
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadJSON(criminals, 'Interpol_Target_Roster.json')}
            className="text-xs gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Export Roster JSON
          </Button>
        </div>
      </div>

      {isFallback && (
        <ErrorFallback
          title="Profiles Local Repository Active"
          message="FastAPI backend offline. Displaying 20 verified target dossiers from local intelligence cache."
          onRetry={() => refetch()}
        />
      )}

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
    </div>
  );
};
