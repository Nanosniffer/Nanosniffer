import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getIntelligenceFeed, getCriminals } from '../api';
import { IntelligenceFeedCard } from '../components/cards/IntelligenceFeedCard';
import { CriminalProfileDrawer } from '../components/drawers/CriminalProfileDrawer';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { ErrorFallback } from '../components/common/ErrorFallback';
import { IntelligenceFeedItem, Criminal } from '../types';
import { Radio, Filter, Search, Sparkles, RefreshCw } from 'lucide-react';
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
  const isFallback = feedRes?.isFallback ?? false;
  const criminals = criminalsRes?.data || [];

  const feedFilters = [
    { id: 'ALL', label: 'All Intercepts' },
    { id: 'surveillance', label: 'Surveillance' },
    { id: 'financial_anomaly', label: 'Financial Anomaly' },
    { id: 'weapon_purchase', label: 'Weapon Purchase' },
    { id: 'suspicious_travel', label: 'Suspicious Travel' },
    { id: 'social_media', label: 'Darknet / Keys' },
    { id: 'unknown_meeting', label: 'Unknown Meeting' },
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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider font-semibold flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> LIVE TELEMETRY INTERCEPT STREAM
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Intelligence Feed & Intercepts
          </h1>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isRefetching}
          className="text-xs gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
          Refresh Intercept Stream
        </Button>
      </div>

      {isFallback && (
        <ErrorFallback
          title="Local SIGINT Cache Stream Active"
          message="FastAPI backend offline. Displaying continuous simulated intelligence stream from local repository."
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
              placeholder="Search intercepts by keyword, source, suspect..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-agency-950 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {feedFilters.map((pill) => (
              <button
                key={pill.id}
                onClick={() => setSelectedType(pill.id)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition ${
                  selectedType === pill.id
                    ? 'bg-cyber-cyan/20 text-cyber-cyan-bright border border-cyber-cyan/60 shadow-neon-cyan'
                    : 'bg-agency-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feed Items List */}
      {isLoading ? (
        <TableSkeleton rows={5} />
      ) : filteredFeed.length === 0 ? (
        <div className="p-12 text-center text-slate-500 font-mono text-xs glass-panel rounded-xl">
          No live intelligence intercepts matching the filter parameters.
        </div>
      ) : (
        <div className="space-y-4">
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
