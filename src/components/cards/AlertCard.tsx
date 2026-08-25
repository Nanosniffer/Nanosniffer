import React from 'react';
import { Alert } from '../../types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { RiskBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import { MapPin, Clock, User, Sparkles, ArrowRight, ShieldAlert } from 'lucide-react';

interface AlertCardProps {
  alert: Alert;
  onStatusChange?: (id: string, status: Alert['status']) => void;
  onSelectCriminal?: (criminalId: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  alert,
  onStatusChange,
  onSelectCriminal,
}) => {
  return (
    <Card className="p-4 bg-white border border-slate-200 shadow-card hover:border-slate-300 transition flex flex-col justify-between space-y-3">
      <div>
        {/* Top Header: Code, Category, Level, AI Confidence */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {alert.alertCode}
            </span>
            <span className="text-xs font-semibold text-slate-900">{alert.category}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-700 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              <Sparkles className="w-3 h-3 text-brand-600" />
              <span>{alert.aiConfidence}% Confidence</span>
            </span>
            <RiskBadge level={alert.alertLevel} />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{alert.title}</h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-3">{alert.description}</p>

        {/* Location & Time Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3 bg-slate-50 p-2.5 rounded-md border border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{alert.location.name}, {alert.location.city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-600">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{formatDate(alert.timestamp)}</span>
          </div>
        </div>

        {/* Related Suspects */}
        {alert.relatedCriminals.length > 0 && (
          <div className="mb-3">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              TARGET ASSOCIATED SUBJECTS:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {alert.relatedCriminals.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCriminal && onSelectCriminal(c.id)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-400 transition shadow-subtle"
                >
                  <User className="w-3 h-3 text-slate-500" />
                  <span className="font-semibold">{c.name}</span>
                  <span className="text-slate-400 text-[10px]">("{c.alias}")</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Suggested Action */}
        <div className="p-2.5 rounded-md bg-amber-50/60 border border-amber-200/80 text-xs">
          <span className="font-semibold text-amber-900 block text-[11px] mb-0.5">Recommended Action:</span>
          <span className="text-amber-950/80 leading-relaxed">{alert.suggestedAction}</span>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-slate-400">Status:</span>
          <span className="text-xs font-semibold text-slate-800 uppercase">{alert.status}</span>
        </div>

        <div className="flex items-center gap-2">
          {alert.status !== 'ACKNOWLEDGED' && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onStatusChange && onStatusChange(alert.id, 'ACKNOWLEDGED')}
              className="h-7 text-xs"
            >
              Acknowledge
            </Button>
          )}
          {alert.status !== 'ESCALATED' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onStatusChange && onStatusChange(alert.id, 'ESCALATED')}
              className="h-7 text-xs"
            >
              Escalate
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
