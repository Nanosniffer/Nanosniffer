import React from 'react';
import { Search, Filter, Compass, Route, RotateCcw } from 'lucide-react';
import { NodeType } from '../../types';
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
  const nodeTypeFilters: Array<{ id: string; label: string; count?: number }> = [
    { id: 'ALL', label: 'All Entities' },
    { id: 'person', label: 'Suspects' },
    { id: 'phone', label: 'Tapped Phones' },
    { id: 'vehicle', label: 'Vehicles' },
    { id: 'bank', label: 'Bank Accounts' },
    { id: 'location', label: 'Locations' },
    { id: 'organization', label: 'Syndicates' },
    { id: 'event', label: 'Incidents' },
  ];

  return (
    <div className="flex flex-col gap-3 p-3.5 rounded-xl bg-agency-900/90 border border-slate-800 glass-panel shadow-lg">
      {/* Top row: Search and Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search graph nodes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-agency-950 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {nodeTypeFilters.map((pill) => (
            <button
              key={pill.id}
              onClick={() => onTypeSelect(pill.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                selectedType === pill.id
                  ? 'bg-cyber-cyan/20 text-cyber-cyan-bright border border-cyber-cyan/60 shadow-neon-cyan'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom row: Shortest Path Finder Bar */}
      <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-slate-400 flex items-center gap-1">
            <Route className="w-3.5 h-3.5 text-cyber-cyan" /> Path Interceptor:
          </span>
          <select
            value={sourceNode}
            onChange={(e) => onSourceChange(e.target.value)}
            className="bg-agency-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyber-cyan"
          >
            <option value="">Select Origin Node...</option>
            {nodesList.map((n) => (
              <option key={`src-${n.id}`} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
          <span className="text-slate-500 font-mono">→</span>
          <select
            value={targetNode}
            onChange={(e) => onTargetChange(e.target.value)}
            className="bg-agency-950 border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-cyber-cyan"
          >
            <option value="">Select Target Node...</option>
            {nodesList.map((n) => (
              <option key={`dst-${n.id}`} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>

          <Button
            variant="cyan"
            size="sm"
            onClick={onFindPath}
            disabled={!sourceNode || !targetNode}
            className="text-xs py-1"
          >
            Highlight Shortest Path
          </Button>

          {isPathActive && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearPath}
              className="text-xs py-1 text-slate-400"
            >
              Clear Route
            </Button>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onResetLayout}
          className="text-xs py-1 gap-1 border-slate-700 hover:border-slate-500"
        >
          <RotateCcw className="w-3 h-3" /> Reset View
        </Button>
      </div>
    </div>
  );
};
