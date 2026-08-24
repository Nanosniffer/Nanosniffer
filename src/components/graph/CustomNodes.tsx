import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {
  User,
  Phone,
  Car,
  Landmark,
  MapPin,
  Calendar,
  Building2,
  ShieldAlert,
  Radio,
  ExternalLink
} from 'lucide-react';
import { NetworkNodeData } from '../../types';
import { getRiskColor } from '../../utils/formatters';

// Common handle helper
const Handles = () => (
  <>
    <Handle type="target" position={Position.Top} className="!w-2.5 !h-2.5 !bg-cyber-cyan !border-agency-950" />
    <Handle type="source" position={Position.Bottom} className="!w-2.5 !h-2.5 !bg-cyber-purple !border-agency-950" />
    <Handle type="target" position={Position.Left} id="left" className="!w-2.5 !h-2.5 !bg-cyber-cyan !border-agency-950" />
    <Handle type="source" position={Position.Right} id="right" className="!w-2.5 !h-2.5 !bg-cyber-purple !border-agency-950" />
  </>
);

// 1. Person Node
export const PersonNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  const risk = getRiskColor(data.riskLevel || 'HIGH');
  return (
    <div
      className={`min-w-[180px] p-3 rounded-xl bg-agency-900/95 border backdrop-blur-md shadow-lg transition-all ${
        selected
          ? 'border-cyber-cyan ring-2 ring-cyber-cyan/50 scale-105 shadow-neon-cyan'
          : 'border-slate-700/80 hover:border-slate-500'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="relative shrink-0">
          <img
            src={data.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
            alt={data.label}
            className="w-10 h-10 rounded-full object-cover border border-slate-600"
          />
          {data.riskScore && (
            <span
              className={`absolute -bottom-1 -right-1 text-[9px] font-mono px-1 rounded-full font-bold border ${risk.badge}`}
            >
              {data.riskScore}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-slate-100 truncate">{data.label}</div>
          <div className="text-[10px] text-cyber-cyan font-mono truncate">{data.subType || 'Target'}</div>
          {data.metadata?.alias && (
            <div className="text-[9px] text-slate-400 font-mono italic truncate">"{data.metadata.alias}"</div>
          )}
        </div>
      </div>
    </div>
  );
});

// 2. Phone Node
export const PhoneNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[160px] p-2.5 rounded-lg bg-emerald-950/80 border backdrop-blur-md transition-all ${
        selected ? 'border-emerald-400 ring-2 ring-emerald-400/50 shadow-lg scale-105' : 'border-emerald-500/40 hover:border-emerald-400'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400">
          <Phone className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-mono font-semibold text-emerald-200 truncate">{data.label}</div>
          <div className="text-[9px] text-emerald-400/80 font-mono flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 animate-pulse" /> {data.metadata?.status || 'TAPPED'}
          </div>
        </div>
      </div>
    </div>
  );
});

// 3. Vehicle Node
export const VehicleNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[160px] p-2.5 rounded-lg bg-purple-950/80 border backdrop-blur-md transition-all ${
        selected ? 'border-purple-400 ring-2 ring-purple-400/50 shadow-neon-purple scale-105' : 'border-purple-500/40 hover:border-purple-400'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-purple-500/20 text-purple-400">
          <Car className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-purple-200 truncate">{data.label}</div>
          <div className="text-[9px] text-purple-300/80 font-mono truncate">{data.metadata?.model || 'Tracked Vehicle'}</div>
        </div>
      </div>
    </div>
  );
});

// 4. Bank Node
export const BankNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[170px] p-2.5 rounded-lg bg-blue-950/80 border backdrop-blur-md transition-all ${
        selected ? 'border-blue-400 ring-2 ring-blue-400/50 shadow-lg scale-105' : 'border-blue-500/40 hover:border-blue-400'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-blue-500/20 text-blue-400">
          <Landmark className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-blue-200 truncate">{data.label}</div>
          <div className="text-[10px] text-blue-400 font-mono font-bold truncate">{data.metadata?.balance || 'Account'}</div>
        </div>
      </div>
    </div>
  );
});

// 5. Location Node
export const LocationNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[160px] p-2.5 rounded-lg bg-amber-950/80 border backdrop-blur-md transition-all ${
        selected ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-neon-amber scale-105' : 'border-amber-500/40 hover:border-amber-400'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-amber-500/20 text-amber-400">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-amber-200 truncate">{data.label}</div>
          <div className="text-[9px] text-amber-400/80 font-mono truncate">{data.metadata?.city || 'Monitored Site'}</div>
        </div>
      </div>
    </div>
  );
});

// 6. Event Node
export const EventNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[160px] p-2.5 rounded-lg bg-red-950/80 border backdrop-blur-md transition-all ${
        selected ? 'border-red-400 ring-2 ring-red-400/50 shadow-neon-crimson scale-105' : 'border-red-500/40 hover:border-red-400'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-md bg-red-500/20 text-red-400">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-red-200 truncate">{data.label}</div>
          <div className="text-[9px] text-red-300 font-mono truncate">{data.metadata?.date || 'Incident'}</div>
        </div>
      </div>
    </div>
  );
});

// 7. Organization Node
export const OrganizationNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[180px] p-3 rounded-xl bg-agency-950 border backdrop-blur-md shadow-lg transition-all ${
        selected ? 'border-rose-400 ring-2 ring-rose-400/50 scale-105' : 'border-rose-500/50 hover:border-rose-400'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-slate-100 truncate">{data.label}</div>
          <div className="text-[10px] text-rose-400 font-mono truncate">{data.metadata?.headquarters || 'Syndicate'}</div>
        </div>
      </div>
    </div>
  );
});

export const nodeTypes = {
  personNode: PersonNode,
  phoneNode: PhoneNode,
  vehicleNode: VehicleNode,
  bankNode: BankNode,
  locationNode: LocationNode,
  eventNode: EventNode,
  organizationNode: OrganizationNode,
};
