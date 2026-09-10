import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import {
  Phone,
  Car,
  Landmark,
  MapPin,
  Calendar,
  Building2,
  ShieldAlert,
  Radio,
  Briefcase
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

// 1. Person Node (Enterprise Dossier Card)
export const PersonNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  const risk = getRiskColor(data.riskLevel || 'HIGH');
  return (
    <div
      className={`min-w-[210px] max-w-[230px] p-2.5 rounded-lg bg-white border transition-all duration-200 ${
        selected
          ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xl scale-105'
          : 'border-slate-200 shadow-md hover:border-slate-300 hover:shadow-lg'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="relative shrink-0">
          <img
            src={data.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
            alt={data.label}
            className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-slate-100"
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
          <div className="text-xs font-bold text-slate-900 truncate">{data.label}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] text-blue-700 font-semibold truncate bg-blue-50 px-1 py-0.2 rounded border border-blue-100">
              {data.subType || 'SUSPECT'}
            </span>
          </div>
          {data.metadata?.alias && (
            <div className="text-[10px] text-slate-400 italic truncate mt-0.5">
              "{data.metadata.alias}"
            </div>
          )}
        </div>
      </div>
      <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <span className={`w-1.5 h-1.5 rounded-full ${risk.dot}`} />
          <span className="font-semibold text-slate-700">{data.riskLevel || 'HIGH'}</span>
        </span>
        <span className="font-mono text-slate-500 font-medium">
          {data.metadata?.criminalId || (data.entityId || 'PERSON').slice(0, 8)}
        </span>
      </div>
    </div>
  );
});

// 2. Organization Node (Syndicate Command Center)
export const OrganizationNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[210px] p-2.5 rounded-lg bg-white border transition-all duration-200 ${
        selected
          ? 'border-purple-600 ring-2 ring-purple-600/20 shadow-xl scale-105'
          : 'border-purple-200 bg-gradient-to-r from-purple-50/50 to-white shadow-md hover:border-purple-300 hover:shadow-lg'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-md bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm">
          <Building2 className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] uppercase font-bold text-purple-700 tracking-wider">Syndicate / Cartel</div>
          <div className="text-xs font-bold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
            {data.metadata?.revenue || data.metadata?.territory || 'ORGANIZATION'}
          </div>
        </div>
      </div>
    </div>
  );
});

// 3. Phone Node (Wiretap / Intercept)
export const PhoneNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[180px] p-2 rounded-lg bg-white border transition-all duration-200 ${
        selected
          ? 'border-emerald-600 ring-2 ring-emerald-600/20 shadow-xl scale-105'
          : 'border-emerald-200 bg-emerald-50/30 shadow-sm hover:border-emerald-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-emerald-500 text-white flex items-center justify-center shrink-0">
          <Phone className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-mono font-bold text-slate-900 truncate">{data.label}</div>
          <div className="text-[9px] text-emerald-700 font-medium truncate flex items-center gap-1">
            <Radio className="w-2.5 h-2.5 animate-pulse" />
            <span>{data.metadata?.carrier || 'INTERCEPTED LINE'}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

// 4. Vehicle Node (Monitored Asset)
export const VehicleNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[180px] p-2 rounded-lg bg-white border transition-all duration-200 ${
        selected
          ? 'border-amber-600 ring-2 ring-amber-600/20 shadow-xl scale-105'
          : 'border-amber-200 bg-amber-50/30 shadow-sm hover:border-amber-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-amber-500 text-white flex items-center justify-center shrink-0">
          <Car className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-mono font-bold text-slate-900 truncate">{data.label}</div>
          <div className="text-[9px] text-amber-800 font-medium truncate">
            {data.metadata?.model || data.metadata?.make || 'MONITORED VEHICLE'}
          </div>
        </div>
      </div>
    </div>
  );
});

// 5. Bank Node (Hawala / Crypto Mixer / Escrow)
export const BankNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[190px] p-2.5 rounded-lg bg-white border transition-all duration-200 ${
        selected
          ? 'border-blue-600 ring-2 ring-blue-600/20 shadow-xl scale-105'
          : 'border-blue-200 bg-blue-50/30 shadow-md hover:border-blue-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0">
          <Landmark className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-blue-700 font-mono font-bold truncate mt-0.5">
            {data.metadata?.balance || 'FINANCIAL ACCOUNT'}
          </div>
        </div>
      </div>
    </div>
  );
});

// 6. Location Node (Safehouse / Hub / Security Ward)
export const LocationNode = memo(({ data, selected }: NodeProps<NetworkNodeData>) => {
  return (
    <div
      className={`min-w-[190px] p-2.5 rounded-lg bg-white border transition-all duration-200 ${
        selected
          ? 'border-red-600 ring-2 ring-red-600/20 shadow-xl scale-105'
          : 'border-red-200 bg-red-50/30 shadow-md hover:border-red-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-red-600 text-white flex items-center justify-center shrink-0">
          <MapPin className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
            {data.metadata?.city ? `${data.metadata.city} • ${data.metadata.facility || 'Facility'}` : 'GEOLOCATION HUB'}
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
      className={`min-w-[180px] p-2.5 rounded-lg bg-white border transition-all duration-200 ${
        selected
          ? 'border-slate-900 ring-2 ring-slate-900/10 shadow-lg'
          : 'border-slate-200 shadow-md hover:border-slate-300'
      }`}
    >
      <Handles />
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-md bg-slate-800 text-white flex items-center justify-center shrink-0">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs font-bold text-slate-900 truncate">{data.label}</div>
          <div className="text-[10px] text-slate-500 font-medium truncate">
            {data.metadata?.date || 'CRITICAL INCIDENT'}
          </div>
        </div>
      </div>
    </div>
  );
});

export const nodeTypes = {
  person: PersonNode,
  personNode: PersonNode,
  phone: PhoneNode,
  phoneNode: PhoneNode,
  vehicle: VehicleNode,
  vehicleNode: VehicleNode,
  bank: BankNode,
  bankNode: BankNode,
  financialNode: BankNode,
  location: LocationNode,
  locationNode: LocationNode,
  event: EventNode,
  eventNode: EventNode,
  organization: OrganizationNode,
  organizationNode: OrganizationNode,
  custom: PersonNode,
};
