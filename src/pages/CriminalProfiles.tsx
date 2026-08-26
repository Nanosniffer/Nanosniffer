import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCriminals } from '../api';
import { CriminalTable } from '../components/tables/CriminalTable';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { Criminal } from '../types';
import { RefreshCw, UserPlus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { AddSuspectWizardModal } from '../components/modals/AddSuspectWizardModal';

export const CriminalProfiles: React.FC = () => {
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);
  const [isAddWizardOpen, setIsAddWizardOpen] = useState(false);
  const [localAddedCriminals, setLocalAddedCriminals] = useState<Criminal[]>([]);
  const queryClient = useQueryClient();

  const { data: res, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const queryCriminals = res?.data || [];
  
  // Merge locally added criminals ensuring instant reactive update
  const criminals = React.useMemo(() => {
    if (localAddedCriminals.length === 0) return queryCriminals;
    const addedIds = new Set(localAddedCriminals.map(c => c.id));
    const addedCrimIds = new Set(localAddedCriminals.map(c => c.criminalId));
    const filteredQuery = queryCriminals.filter(c => !addedIds.has(c.id) && !addedCrimIds.has(c.criminalId));
    return [...localAddedCriminals, ...filteredQuery];
  }, [localAddedCriminals, queryCriminals]);

  const handleSuspectCreated = (newSuspect: Criminal) => {
    setLocalAddedCriminals(prev => [newSuspect, ...prev.filter(c => c.id !== newSuspect.id && c.criminalId !== newSuspect.criminalId)]);
    queryClient.invalidateQueries({ queryKey: ['criminals'] });
    refetch();
    setSelectedCriminal(newSuspect);
  };

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
            onClick={() => setIsAddWizardOpen(true)}
            className="gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Suspect Profile</span>
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

      {/* 5-Step Guided Suspect Addition Wizard Modal */}
      <AddSuspectWizardModal
        isOpen={isAddWizardOpen}
        onClose={() => setIsAddWizardOpen(false)}
        onSuccess={handleSuspectCreated}
      />
    </div>
  );
};

