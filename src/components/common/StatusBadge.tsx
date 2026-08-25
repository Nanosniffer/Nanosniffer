import React from 'react';
import { RiskLevel, SuspectStatus } from '../../types';
import { getRiskColor, getStatusBadgeStyle } from '../../utils/formatters';

export const RiskBadge: React.FC<{ level: RiskLevel; className?: string; showDot?: boolean }> = ({
  level,
  className,
  showDot = true,
}) => {
  const config = getRiskColor(level);

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${config.badge} ${className || ''}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${config.dot}`} />
      )}
      {level}
    </span>
  );
};

export const StatusBadge: React.FC<{ status: SuspectStatus; className?: string }> = ({
  status,
  className,
}) => {
  const formatted = (status || 'UNKNOWN').replace('_', ' ');
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${getStatusBadgeStyle(status)} ${className || ''}`}
    >
      {formatted}
    </span>
  );
};
