import React from 'react';
import { Skeleton } from '../ui/skeleton';
import { Card } from '../ui/card';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top telemetry cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="p-4 space-y-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </Card>
        ))}
      </div>
      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-80 p-5 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-60 w-full" />
        </Card>
        <Card className="h-80 p-5 space-y-4">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-60 w-full" />
        </Card>
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 6 }) => {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full rounded-lg" />
      {[...Array(rows)].map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-lg" />
      ))}
    </div>
  );
};
