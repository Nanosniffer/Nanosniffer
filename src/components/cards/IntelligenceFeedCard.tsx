import React, { useState } from 'react';
import { IntelligenceFeedItem } from '../../types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { RiskBadge } from '../common/StatusBadge';
import { formatRelativeTime } from '../../utils/formatters';
import {
  Eye,
  DollarSign,
  Plane,
  Share2,
  Crosshair,
  Users,
  Bookmark,
  BookmarkCheck,
  Zap,
  MapPin,
  Terminal
} from 'lucide-react';

interface IntelligenceFeedCardProps {
  item: IntelligenceFeedItem;
  onSelectCriminal?: (criminalId: string) => void;
}

export const IntelligenceFeedCard: React.FC<IntelligenceFeedCardProps> = ({
  item,
  onSelectCriminal,
}) => {
  const [bookmarked, setBookmarked] = useState(item.isBookmarked || false);

  const getFeedIcon = (type: IntelligenceFeedItem['type']) => {
    switch (type) {
      case 'surveillance':
        return <Eye className="w-4 h-4 text-cyber-cyan" />;
      case 'financial_anomaly':
        return <DollarSign className="w-4 h-4 text-emerald-400" />;
      case 'suspicious_travel':
        return <Plane className="w-4 h-4 text-amber-400" />;
      case 'social_media':
        return <Share2 className="w-4 h-4 text-purple-400" />;
      case 'weapon_purchase':
        return <Crosshair className="w-4 h-4 text-red-400" />;
      case 'unknown_meeting':
        return <Users className="w-4 h-4 text-rose-400" />;
      default:
        return <Eye className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <Card className="p-4 bg-agency-900/90 border-slate-800 hover:border-slate-700 transition-all duration-200">
      {/* Header: Source, Type, Time, Bookmark */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-agency-950 border border-slate-800">
            {getFeedIcon(item.type)}
          </div>
          <div>
            <span className="text-xs font-mono font-semibold text-cyber-cyan block truncate max-w-[200px] sm:max-w-xs">
              {item.source}
            </span>
            <span className="text-[10px] font-mono text-slate-500">
              {formatRelativeTime(item.timestamp)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
            <Zap className="w-3 h-3 text-emerald-400" />
            <span>{item.confidenceScore}% CONF</span>
          </div>
          <RiskBadge level={item.priority} />
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1.5 rounded-lg transition ${
              bookmarked ? 'text-cyber-cyan bg-cyan-950/50' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Title & Summary */}
      <h3 className="text-sm font-bold text-slate-100 mb-1.5 leading-snug">{item.title}</h3>
      <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.summary}</p>

      {/* Raw Intercept Code Snippet */}
      {item.interceptSnippet && (
        <div className="p-2.5 rounded-lg bg-agency-950 border border-slate-800 font-mono text-xs text-cyber-cyan-bright mb-3 flex items-start gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyber-cyan shrink-0 mt-0.5" />
          <div className="overflow-x-auto truncate">{item.interceptSnippet}</div>
        </div>
      )}

      {/* Suspects & Location */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-400">Suspects:</span>
          {item.suspectsInvolved.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectCriminal && onSelectCriminal(s.id)}
              className="text-xs font-mono text-cyber-cyan hover:underline"
            >
              {s.name} ({s.alias})
            </button>
          ))}
        </div>

        {item.location && (
          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>{item.location}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
