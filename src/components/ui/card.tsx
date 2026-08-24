import React from 'react';
import { cn } from '../../utils/cn';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { glow?: 'cyan' | 'purple' | 'danger' | 'none' }> = ({
  className,
  glow = 'none',
  children,
  ...props
}) => {
  const glowStyles = {
    none: '',
    cyan: 'hover:border-cyber-cyan/40 hover:shadow-neon-cyan transition-all duration-300',
    purple: 'hover:border-cyber-purple/40 hover:shadow-neon-purple transition-all duration-300',
    danger: 'hover:border-red-500/40 hover:shadow-neon-crimson transition-all duration-300',
  };

  return (
    <div
      className={cn(
        'glass-panel rounded-xl p-5 border border-slate-800/80 shadow-glass-card',
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
