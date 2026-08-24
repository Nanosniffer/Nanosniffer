import React from 'react';
import { Alert, RiskLevel } from '../../types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { RiskBadge } from '../common/StatusBadge';
import { formatDate, getRiskColor } from '../../utils/formatters';
import { ShieldAlert, MapPin, Clock, User, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

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
  const risk = getRiskColor(alert.alertLevel);

  return (
    <Card
      className={`p-4 bg-agency-900/90 border ${risk.border} ${risk.glow} transition-all duration-300 flex flex-col justify-between`}
    >
      <div>
        {/* Top bar: Alert Code, Category, Level, AI Confidence */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400 bg-agency-950 px-2 py-0.5 rounded border border-slate-800">
              {alert.alertCode}
            </span>
            <span className="text-xs font-semibold text-slate-200">{alert.category}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>{alert.aiConfidence}% AI CONF</span>
            </div>
            <RiskBadge level={alert.alertLevel} />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-sm font-bold text-slate-100 mb-1.5 leading-snug">{alert.title}</h3>
        <p className="text-xs text-slate-300/90 leading-relaxed mb-3">{alert.description}</p>

        {/* Details grid: Location, Time, Associated Criminals */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mb-3 bg-agency-950/70 p-2.5 rounded-lg border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="text-slate-200 truncate">{alert.location.name}, {alert.location.city}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="text-slate-300 truncate">{formatDate(alert.timestamp)}</span>
          </div>
        </div>

        {/* Related Criminals tags */}
        {alert.relatedCriminals.length > 0 && (
          <div className="mb-3">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1.5">
              Target Associated Suspects:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {alert.relatedCriminals.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onSelectCriminal && onSelectCriminal(c.id)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyber-cyan transition"
                >
                  <User className="w-3 h-3 text-cyber-cyan" />
                  <span>{c.name}</span>
                  <span className="text-slate-400 text-[10px]">({c.alias})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Suggested Action */}
        <div className="p-2.5 rounded-lg bg-red-950/20 border border-red-500/20 mb-3 text-xs">
          <span className="font-mono text-red-400 font-bold block mb-0.5">Recommended Interdiction:</span>
          <span className="text-slate-300">{alert.suggestedAction}</span>
        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-400">Status:</span>
          <span className="text-xs font-mono font-bold text-slate-200 uppercase">{alert.status}</span>
        </div>

        <div className="flex items-center gap-2">
          {alert.status !== 'ACKNOWLEDGED' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onStatusChange && onStatusChange(alert.id, 'ACKNOWLEDGED')}
              className="text-xs py-1"
            >
              Acknowledge
            </Button>
          )}
          {alert.status !== 'ESCALATED' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onStatusChange && onStatusChange(alert.id, 'ESCALATED')}
              className="text-xs py-1"
            >
              Escalate
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
