import React from 'react';
import { Search, Route, RotateCcw, Filter } from 'lucide-react';
import { Button } from '../ui/button';

interface GraphControlsProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedType: string;
  onTypeSelect: (type: string) => void;
  onResetLayout: () => void;
  nodesList: Array<{ id: string; label: string }>;
  sourceNode: string;
  targetNode: string;
  onSourceChange: (id: string) => void;
  onTargetChange: (id: string) => void;
  onFindPath: () => void;
  onClearPath: () => void;
  isPathActive: boolean;
}

export const GraphControls: React.FC<GraphControlsProps> = ({
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeSelect,
  onResetLayout,
  nodesList,
  sourceNode,
  targetNode,
  onSourceChange,
  onTargetChange,
  onFindPath,
  onClearPath,
  isPathActive,
}) => {
  const nodeTypeFilters: Array<{ id: string; label: string }> = [
    { id: 'ALL', label: 'All Entities' },
    { id: 'person', label: 'Persons' },
    { id: 'phone', label: 'Phones' },
    { id: 'vehicle', label: 'Vehicles' },
    { id: 'bank', label: 'Bank Accounts' },
    { id: 'location', label: 'Locations' },
    { id: 'organization', label: 'Organizations' },
    { id: 'event', label: 'Events' },
  ];

  return (
    <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-card space-y-2.5 text-xs">
      {/* Top row: Search and Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Filter entities in graph..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-subtle"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1">
          {nodeTypeFilters.map((pill) => (
            <button
              key={pill.id}
              onClick={() => onTypeSelect(pill.id)}
              className={`px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                selectedType === pill.id
                  ? 'bg-slate-900 text-white shadow-subtle'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row: Shortest Path Finder & Layout Reset */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-500 font-medium flex items-center gap-1 text-[11px]">
            <Route className="w-3.5 h-3.5 text-slate-700" /> Link Tracer:
          </span>
          <select
            value={sourceNode}
            onChange={(e) => onSourceChange(e.target.value)}
            className="bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
          >
            <option value="">Origin entity...</option>
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
            className="bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
          >
            <option value="">Destination entity...</option>
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
            className="h-7 text-xs"
          >
            Trace Path
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
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onResetLayout}
          className="h-7 text-xs gap-1.5"
        >
          <RotateCcw className="w-3 h-3" /> Reset View
        </Button>
      </div>
    </div>
  );
};
