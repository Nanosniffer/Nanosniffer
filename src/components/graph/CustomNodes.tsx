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
  Share2,
  ShieldAlert
} from 'lucide-react';
import { NetworkNodeData } from '../../types';
import { getRiskColor } from '../../utils/formatters';

// Common handle helper with subtle styling
const Handles = () => (
  <>
    <Handle
      type="target"
      position={Position.Top}
      className="!w-2 !h-2 !bg-slate-400 !border-white !border-2"
    />
    <Handle
      type="source"
      position={Position.Bottom}
      className="!w-2 !h-2 !bg-slate-400 !border-white !border-2"
    />
    <Handle
      type="target"
      position={Position.Left}
      id="left"
      className="!w-2 !h-2 !bg-slate-400 !border-white !border-2"
    />
    <Handle
      type="source"
      position={Position.Right}
      id="right"
      className="!w-2 !h-2 !bg-slate-400 !border-white !border-2"
    />
  </>
);

// 1. Person Node (Compact Enterprise Card)
export const PersonNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  const risk = getRiskColor(data.riskLevel || 'HIGH');
  return (
    <div
      className={`min-w-[190px] max-w-[220px] p-2.5 rounded-lg bg-white border transition-all duration-150 ${
        selected
          ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-lg'
          : 'border-slate-200 shadow-card hover:border-slate-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="relative shrink-0">
          <img
            src={data.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
            alt={data.label}
            className="w-9 h-9 rounded-full object-cover border border-slate-200 bg-slate-100"
          />
          {data.riskScore && (
            <span
              className={`absolute -bottom-1 -right-1 text-[9px] px-1 rounded-full font-bold border ${risk.badge}`}
            >
              {data.riskScore}
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-semibold text-slate-900 truncate">{data.label}</span>
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] text-slate-500 font-medium truncate">
              {data.subType || 'PERSON'}
            </span>
            {data.metadata?.alias && (
              <span className="text-[10px] text-slate-400 italic truncate">
                "{data.metadata.alias}"
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
          <span className="font-medium text-slate-600">{data.riskLevel || 'HIGH'}</span>
        </span>
        <span className="font-mono text-slate-400">ID: {(data.entityId || 'PERSON').slice(0, 8)}</span>
      </div>
    </div>
  );
});

// 2. Organization Node
export const OrganizationNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[180px] p-2.5 rounded-lg bg-white border transition-all duration-150 ${
        selected
          ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-lg'
          : 'border-slate-200 shadow-card hover:border-slate-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center shrink-0">
          <Building2 className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-500 font-medium truncate">
            {data.metadata?.headquarters || 'ORGANIZATION'}
          </div>
        </div>
      </div>
    </div>
  );
});

// 3. Phone Node
export const PhoneNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[170px] p-2.5 rounded-lg bg-white border transition-all duration-150 ${
        selected
          ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-lg'
          : 'border-slate-200 shadow-card hover:border-slate-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
          <Phone className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-mono font-semibold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-500 font-medium truncate">
            {data.metadata?.status || 'COMMUNICATION'}
          </div>
        </div>
      </div>
    </div>
  );
});

// 4. Vehicle Node
export const VehicleNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[170px] p-2.5 rounded-lg bg-white border transition-all duration-150 ${
        selected
          ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-lg'
          : 'border-slate-200 shadow-card hover:border-slate-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
          <Car className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-500 font-medium truncate">
            {data.metadata?.model || 'VEHICLE'}
          </div>
        </div>
      </div>
    </div>
  );
});

// 5. Bank Node
export const BankNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[170px] p-2.5 rounded-lg bg-white border transition-all duration-150 ${
        selected
          ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-lg'
          : 'border-slate-200 shadow-card hover:border-slate-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
          <Landmark className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-500 font-mono font-medium truncate">
            {data.metadata?.balance || 'BANK ACCOUNT'}
          </div>
        </div>
      </div>
    </div>
  );
});

// 6. Location Node
export const LocationNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[170px] p-2.5 rounded-lg bg-white border transition-all duration-150 ${
        selected
          ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-lg'
          : 'border-slate-200 shadow-card hover:border-slate-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-red-50 border border-red-200 text-red-700 flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-500 font-medium truncate">
            {data.metadata?.city || 'LOCATION'}
          </div>
        </div>
      </div>
    </div>
  );
});

// 7. Event Node
export const EventNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[170px] p-2.5 rounded-lg bg-white border transition-all duration-150 ${
        selected
          ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-lg'
          : 'border-slate-200 shadow-card hover:border-slate-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-semibold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-500 font-medium truncate">
            {data.metadata?.date || 'EVENT'}
          </div>
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
