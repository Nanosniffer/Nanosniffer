import React from 'react';
import { RiskLevel, SuspectStatus } from '../../types';
import { Badge } from '../ui/badge';
import { getRiskColor, getStatusBadgeStyle } from '../../utils/formatters';

export const RiskBadge: React.FC<{ level: RiskLevel; className?: string }> = ({ level, className }) => {
  const variant =
    level === 'CRITICAL'
      ? 'danger'
      : level === 'HIGH'
      ? 'amber'
      : level === 'MEDIUM'
      ? 'default'
      : 'cyan';

  return (
    <Badge variant={variant} className={className}>
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse" />
      {level}
    </Badge>
  );
};

export const StatusBadge: React.FC<{ status: SuspectStatus; className?: string }> = ({ status, className }) => {
  const formatted = status.replace('_', ' ');
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium border ${getStatusBadgeStyle(status)} ${className || ''}`}>
      {formatted}
    </span>
  );
};
