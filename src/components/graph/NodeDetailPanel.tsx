import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  ExternalLink,
  ShieldAlert,
  Phone,
  Car,
  Landmark,
  MapPin,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { NetworkNodeData } from '../../types';
import { Button } from '../ui/button';
import { RiskBadge } from '../common/StatusBadge';

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
        return <ShieldAlert className="w-4 h-4 text-slate-700" />;
      case 'phone':
        return <Phone className="w-4 h-4 text-emerald-600" />;
      case 'vehicle':
        return <Car className="w-4 h-4 text-amber-600" />;
      case 'bank':
        return <Landmark className="w-4 h-4 text-blue-600" />;
      case 'location':
        return <MapPin className="w-4 h-4 text-red-600" />;
      case 'organization':
        return <Building2 className="w-4 h-4 text-purple-600" />;
      case 'event':
        return <Calendar className="w-4 h-4 text-slate-700" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="absolute top-4 right-4 z-20 w-80 sm:w-96 max-h-[92%] bg-white border border-slate-200 rounded-lg p-4 shadow-popover overflow-y-auto animate-in slide-in-from-right-3 duration-150 text-xs">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-md bg-slate-50 border border-slate-200">
            {renderTypeIcon()}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                {nodeData.type}
              </span>
              {nodeData.riskLevel && <RiskBadge level={nodeData.riskLevel} />}
            </div>
            <h3 className="text-sm font-bold text-slate-900 leading-tight mt-0.5">
              {nodeData.label}
            </h3>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body Content */}
      <div className="py-3 space-y-3.5">
        {/* Threat Score Gauge */}
        {nodeData.riskScore && (
          <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">AI Threat Index</span>
              <span className="text-xs font-bold text-slate-900">{nodeData.riskScore}/100</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  nodeData.riskScore > 75
                    ? 'bg-red-600'
                    : nodeData.riskScore > 50
                    ? 'bg-amber-500'
                    : 'bg-blue-600'
                }`}
                style={{ width: `${nodeData.riskScore}%` }}
              />
            </div>
          </div>
        )}

        {/* Verified Attributes List */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Node Attributes
          </span>
          <div className="space-y-1 p-2.5 rounded-md bg-slate-50 border border-slate-100">
            {Object.entries(nodeData.metadata || {}).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                <span className="text-slate-800 font-medium truncate max-w-[170px] text-right">
                  {typeof value === 'boolean' ? (value ? 'YES' : 'NO') : String(value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Correlation Assessment */}
        <div className="p-2.5 rounded-md bg-blue-50/60 border border-blue-200/80 space-y-1">
          <div className="flex items-center gap-1.5 text-blue-900 font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
            <span>AI Network Topology Assessment</span>
          </div>
          <p className="text-[11px] text-blue-950/80 leading-relaxed">
            Identified as a critical bridge element within the syndicate structure. Removing this node creates a 42% bottleneck in inter-regional money and supply movements.
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        {nodeData.type === 'person' && (
          <Button
            variant="default"
            size="sm"
            onClick={() => {
              if (onOpenCriminalDossier) {
                onOpenCriminalDossier(nodeData.entityId);
              } else {
                navigate('/criminals');
              }
            }}
            className="w-full text-xs font-semibold"
          >
            View Full Profile <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/timeline')}
          className="w-full text-xs"
        >
          Inspect Evidence Timeline
        </Button>
      </div>
    </div>
  );
};
