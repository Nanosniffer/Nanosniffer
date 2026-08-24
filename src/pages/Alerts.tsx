import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAlerts, updateAlertStatus, getCriminals } from '../api';
import { AlertCard } from '../components/cards/AlertCard';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { ErrorFallback } from '../components/common/ErrorFallback';
import { Alert, RiskLevel, Criminal } from '../types';
import { ShieldAlert, Filter, Search, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

export const Alerts: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  const { data: alertsRes, isLoading, refetch } = useQuery({
    queryKey: ['alerts'],
    queryFn: getAlerts,
  });

  const { data: criminalsRes } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const alerts = alertsRes?.data || [];
  const isFallback = alertsRes?.isFallback ?? false;
  const criminals = criminalsRes?.data || [];

  const handleStatusChange = async (id: string, status: Alert['status']) => {
    await updateAlertStatus(id, status);
    refetch();
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter((a) => {
      const matchesSearch =
        !searchQuery ||
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.alertCode.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLevel = selectedLevel === 'ALL' || a.alertLevel === selectedLevel;
      const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;

      return matchesSearch && matchesLevel && matchesCategory;
    });
  }, [alerts, searchQuery, selectedLevel, selectedCategory]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-red-400 uppercase tracking-wider font-semibold flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> AI RISK DETECTION CENTER
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-agency-900 border border-slate-700 text-slate-400">
              {alerts.length} ALERTS LOGGED
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Threat & Risk Interception Alerts
          </h1>
        </div>
      </div>

      {isFallback && (
        <ErrorFallback
          title="AI Threat Stream Active"
          message="FastAPI backend offline. Displaying 30 simulated neural threat detection alerts from local cache."
          onRetry={() => refetch()}
        />
      )}

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-xl bg-agency-900/90 border border-slate-800 glass-panel shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search alerts by keyword, location, code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-agency-950 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition ${
                  selectedLevel === lvl
                    ? lvl === 'CRITICAL'
                      ? 'bg-red-500/30 text-red-300 border border-red-500/60 shadow-neon-crimson'
                      : lvl === 'HIGH'
                      ? 'bg-amber-500/30 text-amber-300 border border-amber-500/60 shadow-neon-amber'
                      : 'bg-cyber-cyan/30 text-cyber-cyan-bright border border-cyber-cyan/60 shadow-neon-cyan'
                    : 'bg-agency-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Grid */}
      {isLoading ? (
        <TableSkeleton rows={6} />
      ) : filteredAlerts.length === 0 ? (
        <div className="p-12 text-center text-slate-500 font-mono text-xs glass-panel rounded-xl">
          No active alerts match your search and severity filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onStatusChange={handleStatusChange}
              onSelectCriminal={(crmId) => {
                const found = criminals.find((c) => c.id === crmId || c.criminalId === crmId);
                if (found) setSelectedCriminal(found);
              }}
            />
          ))}
        </div>
      )}

      {/* Criminal Profile Drawer */}
      <CriminalProfileDrawer
        criminal={selectedCriminal}
        onClose={() => setSelectedCriminal(null)}
      />
    </div>
  );
};
