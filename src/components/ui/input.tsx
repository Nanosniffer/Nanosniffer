import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-md bg-white border border-slate-200 px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 shadow-subtle transition-all focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-900/10 disabled:bg-slate-50 disabled:opacity-60',
            icon ? 'pl-9' : 'pl-3',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
