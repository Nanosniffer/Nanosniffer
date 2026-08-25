import React from 'react';
import { Card } from '../ui/card';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  color?: string;
  badgeText?: string;
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  trendLabel = 'vs last 30d',
  icon: Icon,
  badgeText,
  description,
}) => {
  return (
    <Card className="p-4 bg-white border border-slate-200 shadow-card hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
            {title}
          </p>
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-2xl font-bold tracking-tight text-slate-900 font-sans">
              {value}
            </span>
            {badgeText && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                {badgeText}
              </span>
            )}
          </div>
        </div>

        <div className="p-2 rounded-md bg-slate-50 border border-slate-200 text-slate-700 shrink-0">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {(trend !== undefined || description) && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          {trend !== undefined && (
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center text-[11px] font-semibold px-1.5 py-0.2 rounded border ${
                  trend >= 0
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {trend >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5" />
                )}
                {trend >= 0 ? `+${trend}%` : `${trend}%`}
              </span>
              <span className="text-[11px] text-slate-500 truncate">{trendLabel}</span>
            </div>
          )}
          {description && (
            <span className="text-[11px] text-slate-400 truncate">{description}</span>
          )}
        </div>
      )}
    </Card>
  );
};
