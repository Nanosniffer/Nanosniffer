import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: string;
}

export const Card: React.FC<CardProps> = ({
  className,
  hover = false,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-slate-200 shadow-card transition-all duration-150',
        hover && 'hover:border-slate-300 hover:shadow-card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
