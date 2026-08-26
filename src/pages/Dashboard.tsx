import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getDashboardSummary, getLocations, getCriminals } from '../api';
import { StatCard } from '../components/cards/StatCard';
import { CrimesMonthlyChart } from '../components/charts/CrimesMonthlyChart';
import { CategoryDistributionChart } from '../components/charts/CategoryDistributionChart';
import { HighRiskZonesChart } from '../components/charts/HighRiskZonesChart';
import { RecentInvestigationsTable } from '../components/tables/RecentInvestigationsTable';
import { SurveillanceMap } from '../components/maps/SurveillanceMap';
import { DashboardSkeleton } from '../components/common/SkeletonLoaders';
import { ErrorFallback } from '../components/common/ErrorFallback';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { RiskBadge } from '../components/common/StatusBadge';
import { Criminal } from '../types';
import {
  Users,
  ShieldAlert,
  AlertTriangle,
  MapPin,
  Briefcase,
  Share2,
  Bell,
  Activity,
  Radio,
  Clock,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  // Fetch dashboard summary
  const { data: summaryRes, isLoading, refetch } = useQuery({
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
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Top Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-300 text-[10px] font-mono font-bold text-amber-950 shadow-xs">
              <span>🇮🇳</span> INDIAN NATIONAL INTELLIGENCE GRID
            </span>
            <span className="text-[11px] font-mono font-medium text-slate-500">
              Timezone: IST (UTC+05:30)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Investigation Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time intelligence and telemetry across 24 Indian underworld syndicates and financial hawala nodes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/network')}
            className="gap-1.5 h-8 font-semibold shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" /> Launch Network Analysis
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/alerts')}
            className="gap-1.5 h-8 font-medium"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-600" /> View Alerts
          </Button>
        </div>
      </div>

      {/* 4 Core KPI Cards */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <StatCard
            title="Active Investigations"
            value={summary.activeInvestigations}
            trend={summary.investigationsTrend}
            trendLabel="vs last month"
            icon={Briefcase}
            description="8 cross-border operations"
          />
          <StatCard
            title="High-Risk Subjects"
            value={summary.highRiskIndividuals}
            trend={summary.highRiskTrend}
            trendLabel="vs last month"
            icon={ShieldAlert}
            description="Active warrants & red notices"
          />
          <StatCard
            title="Connected Entities"
            value={summary.totalSuspects}
            trend={summary.suspectsTrend}
            trendLabel="vs last month"
            icon={Share2}
            description="Persons, accounts, phones"
          />
          <StatCard
            title="Critical Alerts"
            value={summary.recentAlertsCount}
            trend={summary.alertsTrend}
            trendLabel="vs last week"
            icon={AlertTriangle}
            description="Immediate action required"
          />
        </div>
      )}

      {/* Main Analytical Section: Two-Column Layout */}
      {summary && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column (7 cols): Network Activity Preview & Surveillance Snapshot */}
          <div className="lg:col-span-7 space-y-4">
            {/* Network Activity Preview Card */}
            <Card className="p-4 bg-white border border-slate-200 shadow-card space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Share2 className="w-4 h-4 text-slate-700" />
                  <h3 className="text-xs font-bold text-slate-900">Network Activity</h3>
                </div>
                <button
                  onClick={() => navigate('/network')}
                  className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  Full Graph <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Interactive preview representation */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span className="font-semibold text-slate-800">Syndicate Hub: Elena Rostova (Leader)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-50 text-red-700 border border-red-200 font-bold">
                    CRITICAL
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Connected Nodes</span>
                    <span className="font-bold text-slate-900">14 Links</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Bridge Factor</span>
                    <span className="font-bold text-purple-700">0.94 Centrality</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <span className="text-[10px] text-slate-400 block">Laundering Flow</span>
                    <span className="font-bold text-emerald-700">$4.2M Flagged</span>
                  </div>
                </div>
              </div>

              {/* Monthly Crime & Resolution Trend */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-800">Monthly Incident Resolution Rate</span>
                  <span className="text-[10px] text-slate-500 font-mono">FY2026</span>
                </div>
                <CrimesMonthlyChart data={summary.crimesPerMonth} />
              </div>
            </Card>

            {/* Tactical Surveillance Map */}
            <SurveillanceMap locations={locations} criminals={criminals} />
          </div>

          {/* Right Column (5 cols): Risk Overview & Recent Intelligence */}
          <div className="lg:col-span-5 space-y-4">
            {/* Risk Overview Card */}
            <Card className="p-4 bg-white border border-slate-200 shadow-card space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-slate-700" />
                  <h3 className="text-xs font-bold text-slate-900">Risk Overview</h3>
                </div>
                <span className="text-[10px] text-slate-500 font-medium">By Category</span>
              </div>

              {/* Risk Distribution Breakdown */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-red-50 border border-red-200">
                  <span className="text-[10px] font-bold text-red-700 block">CRITICAL</span>
                  <span className="text-sm font-extrabold text-red-900">4</span>
                </div>
                <div className="p-2 rounded bg-orange-50 border border-orange-200">
                  <span className="text-[10px] font-bold text-orange-700 block">HIGH</span>
                  <span className="text-sm font-extrabold text-orange-900">7</span>
                </div>
                <div className="p-2 rounded bg-amber-50 border border-amber-200">
                  <span className="text-[10px] font-bold text-amber-700 block">MEDIUM</span>
                  <span className="text-sm font-extrabold text-amber-900">6</span>
                </div>
                <div className="p-2 rounded bg-blue-50 border border-blue-200">
                  <span className="text-[10px] font-bold text-blue-700 block">LOW</span>
                  <span className="text-sm font-extrabold text-blue-900">3</span>
                </div>
              </div>

              {/* Donut Chart */}
              <CategoryDistributionChart data={summary.crimeCategoryDistribution} />
            </Card>

            {/* Recent Intelligence Feed Timeline */}
            <Card className="p-4 bg-white border border-slate-200 shadow-card space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-slate-700" />
                  <h3 className="text-xs font-bold text-slate-900">Recent Intelligence</h3>
                </div>
                <button
                  onClick={() => navigate('/feed')}
                  className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
                >
                  View Feed <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {summary.recentActivityFeed.map((act) => (
                  <div
                    key={act.id}
                    className="p-2.5 rounded-md bg-slate-50 border border-slate-100 space-y-1 hover:border-slate-300 transition text-xs"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold text-slate-900">{act.actor}</span>
                      <span className="text-slate-400 font-mono">{act.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{act.message}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Priority Investigations Table */}
      {summary && (
        <RecentInvestigationsTable investigations={summary.recentInvestigations} />
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
