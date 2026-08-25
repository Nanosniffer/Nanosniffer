import React, { useState } from 'react';
import { IntelligenceFeedItem } from '../../types';
import { Card } from '../ui/card';
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
  MapPin,
  Terminal,
  Sparkles
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
        return <Eye className="w-4 h-4 text-slate-700" />;
      case 'financial_anomaly':
        return <DollarSign className="w-4 h-4 text-emerald-600" />;
      case 'suspicious_travel':
        return <Plane className="w-4 h-4 text-blue-600" />;
      case 'social_media':
        return <Share2 className="w-4 h-4 text-purple-600" />;
      case 'weapon_purchase':
        return <Crosshair className="w-4 h-4 text-red-600" />;
      case 'unknown_meeting':
        return <Users className="w-4 h-4 text-amber-600" />;
      default:
        return <Eye className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <Card className="p-4 bg-white border border-slate-200 shadow-card hover:border-slate-300 transition-all space-y-2.5">
      {/* Header: Source, Type, Time, Bookmark */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200 shrink-0">
            {getFeedIcon(item.type)}
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-900 block truncate max-w-[200px] sm:max-w-xs">
              {item.source}
            </span>
            <span className="text-[10px] text-slate-400">
              {formatRelativeTime(item.timestamp)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
            <Sparkles className="w-3 h-3 text-brand-600" />
            <span>{item.confidenceScore}% Confidence</span>
          </div>
          <RiskBadge level={item.priority} />
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`p-1.5 rounded-md transition ${
              bookmarked ? 'text-brand-600 bg-blue-50' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Title & Summary */}
      <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h3>
      <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>

      {/* Raw Intercept Code Snippet */}
      {item.interceptSnippet && (
        <div className="p-2 rounded-md bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 flex items-start gap-2">
          <Terminal className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <div className="overflow-x-auto truncate">{item.interceptSnippet}</div>
        </div>
      )}

      {/* Suspects & Location Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Targets:</span>
          {item.suspectsInvolved.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelectCriminal && onSelectCriminal(s.id)}
              className="text-xs font-semibold text-brand-600 hover:underline"
            >
              {s.name} ({s.alias})
            </button>
          ))}
        </div>

        {item.location && (
          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{item.location}</span>
          </div>
        )}
      </div>
    </Card>
  );
};
