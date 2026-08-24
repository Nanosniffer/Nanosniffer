import React from 'react';
import { X, ExternalLink, ShieldAlert, Phone, Car, Landmark, MapPin, Building2, Calendar, Radio, ArrowRight } from 'lucide-react';
import { NetworkNodeData } from '../../types';
import { Button } from '../ui/button';
import { RiskBadge } from '../common/StatusBadge';
import { useNavigate } from 'react-router-dom';

interface NodeDetailPanelProps {
  nodeData: NetworkNodeData | null;
  onClose: () => void;
  onOpenCriminalDossier?: (criminalId: string) => void;
}

export const NodeDetailPanel: React.FC<NodeDetailPanelProps> = ({
  nodeData,
  onClose,
  onOpenCriminalDossier,
}) => {
  const navigate = useNavigate();
  if (!nodeData) return null;

  const renderTypeIcon = () => {
    switch (nodeData.type) {
      case 'person':
        return <ShieldAlert className="w-5 h-5 text-cyber-cyan" />;
      case 'phone':
        return <Phone className="w-5 h-5 text-emerald-400" />;
      case 'vehicle':
        return <Car className="w-5 h-5 text-purple-400" />;
      case 'bank':
        return <Landmark className="w-5 h-5 text-blue-400" />;
      case 'location':
        return <MapPin className="w-5 h-5 text-amber-400" />;
      case 'organization':
        return <Building2 className="w-5 h-5 text-rose-400" />;
      case 'event':
        return <Calendar className="w-5 h-5 text-red-400" />;
      default:
        return <ShieldAlert className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="absolute top-4 right-4 z-20 w-80 sm:w-96 max-h-[90%] bg-agency-900/95 border border-cyber-cyan/40 rounded-xl p-5 shadow-2xl glass-panel overflow-y-auto animate-in slide-in-from-right-4 duration-200">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-agency-950 border border-slate-700">
            {renderTypeIcon()}
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-cyber-cyan">
              {nodeData.type} NODE INSPECTOR
            </span>
            <h3 className="text-sm font-bold text-slate-100">{nodeData.label}</h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="py-4 space-y-4 text-xs">
        {/* Risk & Centrality Gauge */}
        <div className="grid grid-cols-2 gap-2">
          {nodeData.riskLevel && (
            <div className="p-2.5 rounded-lg bg-agency-950/70 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400">Risk Assessment</span>
              <div className="mt-1">
                <RiskBadge level={nodeData.riskLevel} />
              </div>
            </div>
          )}
          {nodeData.riskScore && (
            <div className="p-2.5 rounded-lg bg-agency-950/70 border border-slate-800">
              <span className="text-[10px] font-mono text-slate-400">Threat Index</span>
              <div className="text-base font-mono font-bold text-cyber-cyan mt-0.5">
                {nodeData.riskScore} / 100
              </div>
            </div>
          )}
        </div>

        {/* Metadata items list */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
            Verified Attributes
          </span>
          <div className="space-y-1.5 p-3 rounded-lg bg-agency-950/80 border border-slate-800/80">
            {Object.entries(nodeData.metadata || {}).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="text-slate-200 font-semibold truncate max-w-[160px] text-right">
                  {typeof value === 'boolean' ? (value ? 'YES' : 'NO') : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Snippet */}
        <div className="p-3 rounded-lg bg-cyan-950/30 border border-cyan-500/30 space-y-1">
          <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-semibold text-[11px]">
            <Radio className="w-3 h-3 animate-pulse" /> AI Relationship Insight
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            High-density bridge node within criminal infrastructure. Interdicting this connection reduces syndicate transaction throughput by 42%.
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-800 space-y-2">
        {nodeData.type === 'person' && (
          <Button
            variant="cyan"
            size="sm"
            onClick={() => {
              if (onOpenCriminalDossier) {
                onOpenCriminalDossier(nodeData.entityId);
              } else {
                navigate('/criminals');
              }
            }}
            className="w-full text-xs"
          >
            Open Full Criminal Dossier <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/timeline')}
          className="w-full text-xs"
        >
          View Evidence Timeline
        </Button>
      </div>
    </div>
  );
};
