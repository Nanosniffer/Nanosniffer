import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAlerts, updateAlertStatus, getCriminals } from '../api';
import { AlertCard } from '../components/cards/AlertCard';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { EmptyState } from '../components/common/EmptyState';
import { Alert, Criminal } from '../types';
import { ShieldAlert, Search, RefreshCw, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export const Alerts: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  const { data: alertsRes, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['alerts'],
    queryFn: getAlerts,
  });

  const { data: criminalsRes } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const alerts = alertsRes?.data || [];
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
      const matchesStatus = selectedStatus === 'ALL' || a.status === selectedStatus;

      return matchesSearch && matchesLevel && matchesStatus;
    });
  }, [alerts, searchQuery, selectedLevel, selectedStatus]);

  // Counts for summary metrics
  const criticalCount = alerts.filter(a => a.alertLevel === 'CRITICAL').length;
  const highCount = alerts.filter(a => a.alertLevel === 'HIGH').length;
  const pendingCount = alerts.filter(a => a.status === 'NEW' || a.status === 'ESCALATED').length;
  const resolvedCount = alerts.filter(a => a.status === 'RESOLVED' || a.status === 'ACKNOWLEDGED').length;

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              RISK & ANOMALY INTELLIGENCE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Threat & Risk Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time AI telemetry flags, geofence breaches, and money laundering indicators.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => refetch()}
          disabled={isFetching}
          className="gap-1.5 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
          <span>Sync Alerts</span>
        </Button>
      </div>

      {/* Top Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="p-3 bg-white border border-slate-200 shadow-card">
          <span className="text-[11px] font-semibold text-red-700 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Critical Alerts
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{criticalCount}</span>
            <span className="text-[10px] text-slate-400">Immediate Action</span>
          </div>
        </Card>

        <Card className="p-3 bg-white border border-slate-200 shadow-card">
          <span className="text-[11px] font-semibold text-orange-700 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-orange-600" /> High Risk
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{highCount}</span>
            <span className="text-[10px] text-slate-400">Under Review</span>
          </div>
        </Card>

        <Card className="p-3 bg-white border border-slate-200 shadow-card">
          <span className="text-[11px] font-semibold text-blue-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" /> Investigating
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{pendingCount}</span>
            <span className="text-[10px] text-slate-400">Active Handlers</span>
          </div>
        </Card>

        <Card className="p-3 bg-white border border-slate-200 shadow-card">
          <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Resolved
          </span>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{resolvedCount}</span>
            <span className="text-[10px] text-slate-400">Cleared Logs</span>
          </div>
        </Card>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter alerts by title, subject, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-subtle"
          />
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                selectedLevel === lvl
                  ? 'bg-slate-900 text-white shadow-subtle'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Grid */}
      {isLoading ? (
        <TableSkeleton rows={6} />
      ) : filteredAlerts.length === 0 ? (
        <EmptyState
          title="No matching alerts"
          description="No threat telemetry alerts match the selected filters."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedLevel('ALL');
            setSelectedStatus('ALL');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
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
