import { RiskLevel, SuspectStatus } from '../types';

export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (isoString: string): string => {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    const formatted = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d);
    return `${formatted} IST`;
  } catch (e) {
    return isoString;
  }
};

export const formatTimeIST = (isoString: string): string => {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(d) + ' IST';
  } catch (e) {
    return isoString;
  }
};

export const formatDateOnlyIST = (isoString: string): string => {
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
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

    if (diffMin < 1) return 'Just now (IST)';
    if (diffMin < 60) return `${diffMin}m ago (IST)`;
    if (diffHour < 24) return `${diffHour}h ago (IST)`;
    if (diffDay < 7) return `${diffDay}d ago (IST)`;
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
  dot: string;
  hex: string;
} => {
  switch (level) {
    case 'CRITICAL':
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        badge: 'bg-red-50 text-red-700 border-red-200',
        dot: 'bg-red-600',
        hex: '#dc2626',
      };
    case 'HIGH':
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        badge: 'bg-orange-50 text-orange-700 border-orange-200',
        dot: 'bg-orange-500',
        hex: '#ea580c',
      };
    case 'MEDIUM':
      return {
        bg: 'bg-amber-50',
        text: 'text-amber-700',
        border: 'border-amber-200',
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500',
        hex: '#d97706',
      };
    case 'LOW':
    default:
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        badge: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
        hex: '#2563eb',
      };
  }
};

export const getStatusBadgeStyle = (status: SuspectStatus): string => {
  switch (status) {
    case 'WANTED':
      return 'bg-red-50 text-red-700 border-red-200 font-semibold';
    case 'UNDER_SURVEILLANCE':
      return 'bg-blue-50 text-blue-700 border-blue-200 font-medium';
    case 'IN_CUSTODY':
      return 'bg-slate-100 text-slate-700 border-slate-300 font-medium';
    case 'BAIL':
      return 'bg-indigo-50 text-indigo-700 border-indigo-200 font-medium';
    case 'INACTIVE':
    default:
      return 'bg-slate-100 text-slate-500 border-slate-200 font-normal';
  }
};
