import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'cyan' | 'purple' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none';

    const variants = {
      default: 'bg-agency-800 hover:bg-agency-750 text-slate-200 border border-slate-700/60 hover:border-slate-500 shadow-sm active:scale-[0.98]',
      cyan: 'bg-cyber-cyan/20 hover:bg-cyber-cyan/30 text-cyber-cyan-bright border border-cyber-cyan/50 hover:shadow-neon-cyan active:scale-[0.98]',
      purple: 'bg-cyber-purple/20 hover:bg-cyber-purple/30 text-cyber-purple-bright border border-cyber-purple/50 hover:shadow-neon-purple active:scale-[0.98]',
      danger: 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 hover:shadow-neon-crimson active:scale-[0.98]',
      ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-slate-100 border border-transparent',
      outline: 'bg-transparent hover:bg-agency-800/60 text-slate-300 border border-slate-700 hover:border-slate-500',
    };

    const sizes = {
      sm: 'px-2.5 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-5 py-2.5 text-base gap-2.5',
      icon: 'p-2 text-sm',
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
