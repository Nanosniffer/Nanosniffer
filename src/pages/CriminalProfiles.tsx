import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCriminals } from '../api';
import { CriminalTable } from '../components/tables/CriminalTable';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { Criminal } from '../types';
import { RefreshCw, UserPlus, Database } from 'lucide-react';
import { Button } from '../components/ui/button';
import { AddSuspectWizardModal } from '../components/modals/AddSuspectWizardModal';
import { EditCriminalModal } from '../components/modals/EditCriminalModal';
import { DeleteCriminalConfirmModal } from '../components/modals/DeleteCriminalConfirmModal';
import { usePoliceDatabase } from '../context/PoliceDatabaseContext';

export const CriminalProfiles: React.FC = () => {
  const { isConnected, selectedGateway, openModal: openPoliceDbModal } = usePoliceDatabase();
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);
  const [isAddWizardOpen, setIsAddWizardOpen] = useState(false);
  const [editingCriminal, setEditingCriminal] = useState<Criminal | null>(null);
  const [deletingCriminal, setDeletingCriminal] = useState<Criminal | null>(null);
  const [localAddedCriminals, setLocalAddedCriminals] = useState<Criminal[]>([]);
  const queryClient = useQueryClient();

  const { data: res, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const queryCriminals = res?.data || [];
  
  // Merge locally added/edited criminals ensuring instant reactive update
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

  const handleCriminalUpdated = (updated: Criminal) => {
    setLocalAddedCriminals(prev => [updated, ...prev.filter(c => c.id !== updated.id && c.criminalId !== updated.criminalId)]);
    queryClient.invalidateQueries({ queryKey: ['criminals'] });
    refetch();
    if (selectedCriminal && (selectedCriminal.id === updated.id || selectedCriminal.criminalId === updated.criminalId)) {
      setSelectedCriminal(updated);
    }
  };

  const handleCriminalDeleted = (deletedId: string) => {
    setLocalAddedCriminals(prev => prev.filter(c => c.id !== deletedId && c.criminalId !== deletedId));
    queryClient.invalidateQueries({ queryKey: ['criminals'] });
    refetch();
    if (selectedCriminal && (selectedCriminal.id === deletedId || selectedCriminal.criminalId === deletedId)) {
      setSelectedCriminal(null);
    }
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
            variant={isConnected ? 'outline' : 'default'}
            size="sm"
            onClick={openPoliceDbModal}
            className={`gap-1.5 font-semibold shadow-sm transition ${
              isConnected
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>{isConnected ? `${selectedGateway.shortCode} Active` : 'Connect Police DB'}</span>
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-emerald-200'}`} />
          </Button>

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
          onEditCriminal={(c) => setEditingCriminal(c)}
          onDeleteCriminal={(c) => setDeletingCriminal(c)}
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
        onEdit={(c) => setEditingCriminal(c)}
        onDelete={(c) => setDeletingCriminal(c)}
      />

      {/* 5-Step Guided Suspect Addition Wizard Modal */}
      <AddSuspectWizardModal
        isOpen={isAddWizardOpen}
        onClose={() => setIsAddWizardOpen(false)}
        onSuccess={handleSuspectCreated}
      />

      {/* Edit Criminal Profile Modal */}
      <EditCriminalModal
        isOpen={!!editingCriminal}
        criminal={editingCriminal}
        onClose={() => setEditingCriminal(null)}
        onSuccess={handleCriminalUpdated}
      />

      {/* Delete Criminal Confirmation Modal */}
      <DeleteCriminalConfirmModal
        isOpen={!!deletingCriminal}
        criminal={deletingCriminal}
        onClose={() => setDeletingCriminal(null)}
        onSuccess={handleCriminalDeleted}
      />
    </div>
  );
};
