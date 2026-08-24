import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary, getLocations, getCriminals } from '../api';
import { StatCard } from '../components/cards/StatCard';
import { CrimesMonthlyChart } from '../components/charts/CrimesMonthlyChart';
import { CategoryDistributionChart } from '../components/charts/CategoryDistributionChart';
import { HighRiskZonesChart } from '../components/charts/HighRiskZonesChart';
import { FinancialTrendChart } from '../components/charts/FinancialTrendChart';
import { CommunicationFreqChart } from '../components/charts/CommunicationFreqChart';
import { RecentInvestigationsTable } from '../components/tables/RecentInvestigationsTable';
import { SurveillanceMap } from '../components/maps/SurveillanceMap';
import { DashboardSkeleton } from '../components/common/SkeletonLoaders';
import { ErrorFallback } from '../components/common/ErrorFallback';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { Criminal } from '../types';
import {
  Users,
  ShieldAlert,
  AlertTriangle,
  MapPin,
  Cpu,
  Bell,
  Activity,
  Radio,
  FileText,
  Clock,
  ArrowRight,
  Zap,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  // Fetch dashboard summary
  const { data: summaryRes, isLoading, refetch, isError } = useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: getDashboardSummary,
  });

  // Fetch locations for surveillance map snapshot
  const { data: locationsRes } = useQuery({
    queryKey: ['locations'],
    queryFn: getLocations,
  });

  // Fetch criminals list
  const { data: criminalsRes } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  const summary = summaryRes?.data;
  const isFallback = summaryRes?.isFallback ?? false;
  const locations = locationsRes?.data || [];
  const criminals = criminalsRes?.data || [];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Welcome & Notification Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider font-semibold">
              TASK FORCE TACTICAL OVERVIEW
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Command Center
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="cyan"
            size="sm"
            onClick={() => navigate('/network')}
            className="text-xs gap-1.5 shadow-neon-cyan"
          >
            <Zap className="w-3.5 h-3.5" /> Launch Relationship Graph
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/alerts')}
            className="text-xs gap-1.5"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" /> View 30 AI Alerts
          </Button>
        </div>
      </div>

      {/* Fallback Notice if backend offline */}
      {isFallback && (
        <ErrorFallback
          onRetry={() => refetch()}
          isFallbackDataActive={true}
        />
      )}

      {/* 6 Top Telemetry Stat Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="Total Suspects"
            value={summary.totalSuspects}
            trend={summary.suspectsTrend}
            icon={Users}
            color="cyan"
            badgeText="20 Active"
          />
          <StatCard
            title="Investigations"
            value={summary.activeInvestigations}
            trend={summary.investigationsTrend}
            icon={Activity}
            color="purple"
            badgeText="8 Joint Ops"
          />
          <StatCard
            title="High Risk Targets"
            value={summary.highRiskIndividuals}
            trend={summary.highRiskTrend}
            icon={ShieldAlert}
            color="crimson"
            badgeText="DEFCON 2"
          />
          <StatCard
            title="Surveillance Sites"
            value={summary.locationsUnderSurveillance}
            trend={summary.locationsTrend}
            icon={MapPin}
            color="amber"
            badgeText="15 Hubs"
          />
          <StatCard
            title="AI Risk Index"
            value={`${summary.aiRiskScore}/100`}
            trend={summary.aiRiskTrend}
            icon={Cpu}
            color="crimson"
            badgeText="Critical"
          />
          <StatCard
            title="Recent AI Alerts"
            value={summary.recentAlertsCount}
            trend={summary.alertsTrend}
            icon={Bell}
            color="emerald"
            badgeText="30 Intercepts"
          />
        </div>
      )}

      {/* Analytics Charts Grid */}
      {summary && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. Crimes per Month (8 cols) */}
          <Card className="lg:col-span-8 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyber-cyan" /> Monthly Crime Volume & Resolution Rate
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Comparative trend across drug trafficking, cybercrime, and extortion
                </p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-agency-950 text-cyan-400 border border-cyan-500/30">
                FY2026 YTD
              </span>
            </div>
            <CrimesMonthlyChart data={summary.crimesPerMonth} />
          </Card>

          {/* 2. Crime Category Distribution (4 cols) */}
          <Card className="lg:col-span-4 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-purple-400" /> Syndicate Threat Distribution
              </h3>
              <span className="text-[10px] font-mono text-slate-400">8 Categories</span>
            </div>
            <CategoryDistributionChart data={summary.crimeCategoryDistribution} />
          </Card>

          {/* 3. High Risk Zones BarChart (4 cols) */}
          <Card className="lg:col-span-4 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" /> High-Risk Surveillance Corridors
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Top 8</span>
            </div>
            <HighRiskZonesChart data={summary.highRiskZones} />
          </Card>

          {/* 4. Financial Flow LineChart (4 cols) */}
          <Card className="lg:col-span-4 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> Monitored vs Flagged Illicit Capital
              </h3>
              <span className="text-[10px] font-mono text-emerald-400">USD Millions</span>
            </div>
            <FinancialTrendChart data={summary.financialActivityTrend} />
          </Card>

          {/* 5. Communication Frequency (4 cols) */}
          <Card className="lg:col-span-4 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyber-cyan" /> 24-Hour Intercept Frequency
              </h3>
              <span className="text-[10px] font-mono text-slate-400">By Time Slot</span>
            </div>
            <CommunicationFreqChart data={summary.communicationFrequency} />
          </Card>
        </div>
      )}

      {/* Surveillance Map & Real-Time Incident Feed Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Tactical Map (8 cols) */}
        <div className="lg:col-span-8 space-y-2">
          <SurveillanceMap locations={locations} criminals={criminals} />
        </div>

        {/* Right: Live Activity Feed (4 cols) */}
        <Card className="lg:col-span-4 p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-cyber-cyan animate-pulse" />
                <h3 className="text-sm font-bold text-slate-100">Live Intercept Feed</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">REALTIME</span>
            </div>

            <div className="space-y-3">
              {summary?.recentActivityFeed.map((act) => (
                <div
                  key={act.id}
                  className="p-3 rounded-lg bg-agency-950/80 border border-slate-800/80 space-y-1 hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-cyber-cyan font-bold">{act.actor}</span>
                    <span className="text-slate-500">{act.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{act.message}</p>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/feed')}
            className="w-full text-xs text-cyber-cyan gap-1"
          >
            Open Full Intelligence Feed <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Card>
      </div>

      {/* Bottom: Recent Investigations Table */}
      {summary && (
        <RecentInvestigationsTable investigations={summary.recentInvestigations} />
      )}

      {/* Criminal Profile Drawer if selected */}
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
