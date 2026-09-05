import React from 'react';
import { Search, Route, RotateCcw, Filter, Sparkles, ZoomIn, ZoomOut, Maximize2, Shield, Users } from 'lucide-react';
import { Button } from '../ui/button';

interface GraphControlsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedType: string;
  onTypeSelect: (type: string) => void;
  onResetLayout: () => void;
  onAutoSpace: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  nodesList: Array<{ id: string; label: string }>;
  sourceNode: string;
  targetNode: string;
  onSourceChange: (id: string) => void;
  onTargetChange: (id: string) => void;
  onFindPath: () => void;
  onClearPath: () => void;
  isPathActive: boolean;
  viewMode: 'all' | 'kingpins' | 'persons' | 'vehicles' | 'phones' | 'finance';
  onViewModeChange: (mode: 'all' | 'kingpins' | 'persons' | 'vehicles' | 'phones' | 'finance') => void;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeSelect,
  onResetLayout,
  onAutoSpace,
  onZoomIn,
  onZoomOut,
  onFitView,
  nodesList,
  sourceNode,
  targetNode,
  onSourceChange,
  onTargetChange,
  onFindPath,
  onClearPath,
  isPathActive,
  viewMode,
  onViewModeChange
}) => {
  return (
    <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-card space-y-2.5 text-xs">
      {/* View Presets Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            Display Mode:
          </span>
          <button
            onClick={() => onViewModeChange('kingpins')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition flex items-center gap-1.5 ${
              viewMode === 'kingpins'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>👑 Kingpins & Syndicates (Clean View)</span>
          </button>

          <button
            onClick={() => onViewModeChange('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              viewMode === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🌐 Full Map (All Entities)
          </button>

          <button
            onClick={() => onViewModeChange('persons')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              viewMode === 'persons'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            👤 Suspects Only
          </button>

          <button
            onClick={() => onViewModeChange('vehicles')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              viewMode === 'vehicles'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🚗 Vehicles Only
          </button>

          <button
            onClick={() => onViewModeChange('phones')}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              viewMode === 'phones'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            📱 Wiretaps Only
          </button>
        </div>

        {/* Quick Zoom and Auto-Tidy Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={onAutoSpace}
            title="Automatically space out nodes to eliminate overlaps"
            className="h-7 text-xs gap-1 font-semibold text-blue-700 bg-blue-50 border-blue-200 hover:bg-blue-100"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Auto-Space Nodes</span>
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onFitView}
            title="Fit Entire Map"
            className="h-7 w-7 p-0"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onZoomIn}
            title="Zoom In"
            className="h-7 w-7 p-0"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onZoomOut}
            title="Zoom Out"
            className="h-7 w-7 p-0"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Search & Path Tracer */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        {/* Search */}
        <div className="relative w-full sm:w-60">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search nodes in graph..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1 text-xs rounded-md bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-subtle"
          />
        </div>

        {/* Path Tracer */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1 text-[11px]">
            <Route className="w-3.5 h-3.5 text-slate-700" /> Trace Link:
          </span>
          <select
            value={sourceNode}
            onChange={(e) => onSourceChange(e.target.value)}
            className="bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle max-w-[130px] truncate"
          >
            <option value="">Origin suspect...</option>
            {nodesList.map((n) => (
              <option key={`src-${n.id}`} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
          <span className="text-slate-400 text-xs">→</span>
          <select
            value={targetNode}
            onChange={(e) => onTargetChange(e.target.value)}
            className="bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle max-w-[130px] truncate"
          >
            <option value="">Destination suspect...</option>
            {nodesList.map((n) => (
              <option key={`dst-${n.id}`} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>

          <Button
            variant="default"
            size="sm"
            onClick={onFindPath}
            disabled={!sourceNode || !targetNode}
            className="h-7 text-xs bg-slate-900 hover:bg-slate-800 text-white font-semibold"
          >
            Trace
          </Button>

          {isPathActive && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onClearPath}
              className="h-7 text-xs"
            >
              Clear
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={onResetLayout}
            className="h-7 text-xs gap-1 ml-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
