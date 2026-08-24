import React from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'cyan' | 'purple' | 'danger' | 'amber' | 'emerald' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'default',
  children,
  ...props
}) => {
  const base = 'inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium tracking-wide uppercase border';

  const variants = {
    default: 'bg-slate-800/80 text-slate-300 border-slate-700',
    cyan: 'bg-cyan-950/70 text-cyan-400 border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.2)]',
    purple: 'bg-purple-950/70 text-purple-400 border-purple-500/40 shadow-[0_0_8px_rgba(139,92,246,0.2)]',
    danger: 'bg-red-950/70 text-red-400 border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.2)]',
    amber: 'bg-amber-950/70 text-amber-400 border-amber-500/40',
    emerald: 'bg-emerald-950/70 text-emerald-400 border-emerald-500/40',
    outline: 'bg-transparent text-slate-400 border-slate-700',
  };

  return (
    <span className={cn(base, variants[variant], className)} {...props}>
      {children}
    </span>
  );
};
