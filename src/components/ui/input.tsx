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
            'w-full rounded-lg bg-agency-900/90 border border-slate-700/60 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 transition-all focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan disabled:opacity-50',
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
