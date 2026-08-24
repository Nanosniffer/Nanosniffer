import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number; // e.g. +4.5%
  trendLabel?: string;
  icon: LucideIcon;
  color?: 'cyan' | 'purple' | 'crimson' | 'amber' | 'emerald';
  badgeText?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  trendLabel = 'vs last 30d',
  icon: Icon,
  color = 'cyan',
  badgeText,
}) => {
  const colorStyles = {
    cyan: {
      border: 'border-cyber-cyan/30',
      iconBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/40',
      glow: 'hover:border-cyber-cyan/60 hover:shadow-neon-cyan',
      text: 'text-cyber-cyan-bright',
    },
    purple: {
      border: 'border-purple-500/30',
      iconBg: 'bg-purple-500/15 text-purple-400 border-purple-500/40',
      glow: 'hover:border-purple-500/60 hover:shadow-neon-purple',
      text: 'text-purple-300',
    },
    crimson: {
      border: 'border-red-500/30',
      iconBg: 'bg-red-500/15 text-red-400 border-red-500/40',
      glow: 'hover:border-red-500/60 hover:shadow-neon-crimson',
      text: 'text-red-400',
    },
    amber: {
      border: 'border-amber-500/30',
      iconBg: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
      glow: 'hover:border-amber-500/60 hover:shadow-neon-amber',
      text: 'text-amber-300',
    },
    emerald: {
      border: 'border-emerald-500/30',
      iconBg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
      glow: 'hover:border-emerald-500/60 hover:shadow-[0_0_15px_rgba(16,185,129,0.35)]',
      text: 'text-emerald-300',
    },
  };

  const style = colorStyles[color];

  return (
    <Card
      className={`p-4 bg-agency-900/90 ${style.border} ${style.glow} transition-all duration-300 relative overflow-hidden group`}
    >
      {/* Background ambient gradient flare */}
      <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-slate-700/10 blur-xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="mt-1 flex items-baseline gap-2">
            <span className={`text-2xl sm:text-3xl font-extrabold font-mono ${style.text}`}>
              {value}
            </span>
            {badgeText && (
              <span className="text-[10px] font-mono font-medium px-1.5 py-0.5 rounded bg-agency-950 text-slate-300 border border-slate-700">
                {badgeText}
              </span>
            )}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border ${style.iconBg} shrink-0`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      {trend !== undefined && (
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 text-xs font-mono">
          {trend >= 0 ? (
            <span className="flex items-center text-emerald-400 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +{trend}%
            </span>
          ) : (
            <span className="flex items-center text-red-400 font-semibold">
              <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> {trend}%
            </span>
          )}
          <span className="text-slate-500 text-[11px] truncate">{trendLabel}</span>
        </div>
      )}
    </Card>
  );
};
