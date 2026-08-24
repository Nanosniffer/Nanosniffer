import { RiskLevel, SuspectStatus } from '../types';

export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (isoString: string): string => {
  try {
    const d = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(d);
  } catch (e) {
    return isoString;
  }
};

export const formatRelativeTime = (isoString: string): string => {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    if (diffDay < 7) return `${diffDay}d ago`;
    return formatDate(isoString);
  } catch (e) {
    return isoString;
  }
};

export const getRiskColor = (level: RiskLevel): {
  bg: string;
  text: string;
  border: string;
  badge: string;
  glow: string;
} => {
  switch (level) {
    case 'CRITICAL':
      return {
        bg: 'bg-red-500/15',
        text: 'text-red-400',
        border: 'border-red-500/40',
        badge: 'bg-red-950/80 text-red-400 border-red-500/50',
        glow: 'shadow-[0_0_15px_rgba(239,68,68,0.4)]',
      };
    case 'HIGH':
      return {
        bg: 'bg-amber-500/15',
        text: 'text-amber-400',
        border: 'border-amber-500/40',
        badge: 'bg-amber-950/80 text-amber-400 border-amber-500/50',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.4)]',
      };
    case 'MEDIUM':
      return {
        bg: 'bg-yellow-500/15',
        text: 'text-yellow-400',
        border: 'border-yellow-500/40',
        badge: 'bg-yellow-950/80 text-yellow-400 border-yellow-500/50',
        glow: 'shadow-[0_0_15px_rgba(234,179,8,0.4)]',
      };
    case 'LOW':
    default:
      return {
        bg: 'bg-cyan-500/15',
        text: 'text-cyan-400',
        border: 'border-cyan-500/40',
        badge: 'bg-cyan-950/80 text-cyan-400 border-cyan-500/50',
        glow: 'shadow-[0_0_15px_rgba(6,182,212,0.4)]',
      };
  }
};

export const getStatusBadgeStyle = (status: SuspectStatus): string => {
  switch (status) {
    case 'WANTED':
      return 'bg-red-950/80 text-red-400 border-red-500/50 animate-pulse';
    case 'UNDER_SURVEILLANCE':
      return 'bg-cyan-950/80 text-cyan-400 border-cyan-500/50';
    case 'IN_CUSTODY':
      return 'bg-slate-800 text-slate-300 border-slate-600';
    case 'BAIL':
      return 'bg-purple-950/80 text-purple-400 border-purple-500/50';
    case 'INACTIVE':
    default:
      return 'bg-slate-900 text-slate-500 border-slate-800';
  }
};
