import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getIntelligenceFeed, getCriminals } from '../api';
import { IntelligenceFeedCard } from '../components/cards/IntelligenceFeedCard';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { EmptyState } from '../components/common/EmptyState';
import { Criminal } from '../types';
import { Radio, Search, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';

export const IntelligenceFeed: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCriminal, setSelectedCriminal] = useState<Criminal | null>(null);

  const { data: feedRes, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['intelligenceFeed'],
    queryFn: getIntelligenceFeed,
  });

  const { data: criminalsRes } = useQuery({
    queryKey: ['criminals'],
    queryFn: () => getCriminals(),
  });

  const feedItems = feedRes?.data || [];
  const criminals = criminalsRes?.data || [];

  const feedFilters = [
    { id: 'ALL', label: 'All Intelligence' },
    { id: 'surveillance', label: 'Surveillance' },
    { id: 'financial_anomaly', label: 'Financial' },
    { id: 'weapon_purchase', label: 'Weapons / Arms' },
    { id: 'suspicious_travel', label: 'Travel / Logistics' },
    { id: 'social_media', label: 'Cyber / Darknet' },
    { id: 'unknown_meeting', label: 'Meetings' },
  ];

  const filteredFeed = useMemo(() => {
    return feedItems.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.location && item.location.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedType === 'ALL' || item.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [feedItems, searchQuery, selectedType]);

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              TELEMETRY & SURVEILLANCE STREAM
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Intelligence Feed
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Classified SIGINT, wiretaps, satellite geofences, and informant field reports.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => refetch()}
          disabled={isRefetching}
          className="gap-1.5 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
          <span>Refresh Feed</span>
        </Button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-card flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search intelligence by keyword, source, suspect..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-subtle"
          />
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {feedFilters.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setSelectedType(pill.id)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                selectedType === pill.id
                  ? 'bg-slate-900 text-white shadow-subtle'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Feed Items List */}
      {isLoading ? (
        <TableSkeleton rows={5} />
      ) : filteredFeed.length === 0 ? (
        <EmptyState
          title="No intelligence items"
          description="No live telemetry items match the selected filter parameters."
          actionLabel="Reset Filters"
          onAction={() => {
            setSelectedType('ALL');
            setSearchQuery('');
          }}
        />
      ) : (
        <div className="space-y-3">
          {filteredFeed.map((item) => (
            <IntelligenceFeedCard
              key={item.id}
              item={item}
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
