import React from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'cyan' | 'purple' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950/20 disabled:opacity-50 disabled:cursor-not-allowed select-none text-xs';

    const variants = {
      default: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm active:translate-y-px',
      primary: 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm active:translate-y-px',
      secondary: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-subtle hover:border-slate-300 active:translate-y-px',
      cyan: 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm active:translate-y-px',
      purple: 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 active:translate-y-px',
      danger: 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 active:translate-y-px',
      ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent',
      outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-subtle hover:border-slate-300 active:translate-y-px',
    };

    const sizes = {
      sm: 'px-2.5 py-1.5 text-xs gap-1.5 h-7',
      md: 'px-3.5 py-1.5 text-xs gap-2 h-8',
      lg: 'px-4 py-2 text-sm gap-2.5 h-9',
      icon: 'h-8 w-8 p-0',
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
