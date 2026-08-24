import React from 'react';
import { AlertTriangle, RefreshCw, Database } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  isFallbackDataActive?: boolean;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title = 'Telemetry Sync Notice',
  message = 'Live Python FastAPI backend is currently unavailable. Rendering verified local encrypted cache and dummy telemetry.',
  onRetry,
  isFallbackDataActive = true,
}) => {
  return (
    <Card className="border-amber-500/30 bg-amber-950/20 p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
            {title}
            {isFallbackDataActive && (
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Fallback Active
              </span>
            )}
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">{message}</p>
        </div>
      </div>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="shrink-0 gap-1.5 border-amber-500/40 text-amber-300 hover:bg-amber-500/20">
          <RefreshCw className="w-3.5 h-3.5" />
          Retry Connection
        </Button>
      )}
    </Card>
  );
};
