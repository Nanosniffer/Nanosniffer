import React, { useState } from 'react';
import { Criminal } from '../../types';
import { RiskBadge, StatusBadge } from '../common/StatusBadge';
import { formatCurrency } from '../../utils/formatters';
import { Button } from '../ui/button';
import { downloadJSON, printCriminalDossier } from '../../utils/exportUtils';
import {
  X,
  User,
  Shield,
  Phone,
  Car,
  Landmark,
  Building2,
  MapPin,
  ExternalLink,
  Download,
  Printer,
  Sparkles,
  Edit,
  Trash2
} from 'lucide-react';

interface CriminalProfileDrawerProps {
  criminal: Criminal | null;
  onClose: () => void;
  onSelectAssociate?: (id: string) => void;
  onEdit?: (criminal: Criminal) => void;
  onDelete?: (criminal: Criminal) => void;
}

export const CriminalProfileDrawer: React.FC<CriminalProfileDrawerProps> = ({
  criminal,
  onClose,
  onSelectAssociate,
  onEdit,
  onDelete,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'associates' | 'vehicles' | 'phones' | 'finance' | 'orgs'>('overview');

  if (!criminal) return null;

  const associates = criminal.knownAssociates || [];
  const vehicles = criminal.vehicles || [];
  const phones = criminal.phoneNumbers || [];
  const finances = criminal.financialAccounts || [];
  const orgs = criminal.connectedOrganizations || [];
  const tags = criminal.tags || [];
  const coords = criminal.lastKnownLocation?.coordinates || [19.0176, 72.8150];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3.5">
            <img
              src={criminal.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300'}
              alt={criminal.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80';
              }}
              className="w-14 h-14 rounded-lg object-cover border border-slate-200 bg-white shrink-0 shadow-subtle"
            />
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[11px] font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {criminal.criminalId}
                </span>
                <StatusBadge status={criminal.status} />
                <RiskBadge level={criminal.riskLevel} />
              </div>
              <h2 className="text-lg font-bold text-slate-900 leading-tight">{criminal.name}</h2>
              <p className="text-xs text-slate-500">
                Alias: <strong className="text-slate-800 font-semibold">"{criminal.alias}"</strong> • {criminal.crimeCategory} • {criminal.nationality}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {onEdit && (
              <Button
                variant="default"
                size="sm"
                onClick={() => onEdit(criminal)}
                title="Edit Criminal Profile"
                className="h-8 px-2.5 gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => printCriminalDossier(criminal)}
              title="Print Intelligence Dossier"
              className="h-8 px-2"
            >
              <Printer className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => downloadJSON(criminal, `Dossier_${criminal.criminalId}.json`)}
              title="Export JSON"
              className="h-8 px-2"
            >
              <Download className="w-3.5 h-3.5" />
            </Button>
            {onDelete && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onDelete(criminal)}
                title="Delete Criminal Profile"
                className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Structured Tabs Bar */}
        <div className="flex items-center gap-1 px-4 border-b border-slate-200 bg-white overflow-x-auto text-xs shrink-0">
          {[
            { id: 'overview', label: 'Overview', icon: Sparkles },
            { id: 'associates', label: `Associates (${associates.length})`, icon: User },
            { id: 'vehicles', label: `Vehicles (${vehicles.length})`, icon: Car },
            { id: 'phones', label: `Wiretaps (${phones.length})`, icon: Phone },
            { id: 'finance', label: `Accounts (${finances.length})`, icon: Landmark },
            { id: 'orgs', label: `Syndicates (${orgs.length})`, icon: Building2 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 py-2.5 px-3 border-b-2 font-medium transition-colors shrink-0 ${
                  activeTab === tab.id
                    ? 'border-slate-900 text-slate-900 font-semibold'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-3.5">
              {/* AI Assessment Callout */}
              <div className="p-3.5 rounded-lg bg-blue-50/70 border border-blue-200/80 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" /> AI Threat Assessment
                  </span>
                  <span className="text-[11px] font-bold text-blue-900 bg-white px-2 py-0.2 rounded border border-blue-200">
                    Score: {criminal.riskScore}/100
                  </span>
                </div>
                <p className="text-[11px] text-blue-950/80 leading-relaxed font-sans">{criminal.aiThreatSummary || 'Active surveillance telemetry monitoring subject activities.'}</p>
              </div>

              {/* Biography Summary */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                  Official Intelligence Summary
                </span>
                <p className="text-slate-700 leading-relaxed">{criminal.biography || 'No additional biographical notes logged.'}</p>
              </div>

              {/* Biometrics & Personal Identifiers */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider block">
                  Identity & Biometric Records
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-md bg-white border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">AGE / GENDER</span>
                    <span className="text-slate-900 font-semibold">{criminal.age} Yrs • {criminal.gender}</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-white border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">DATE OF BIRTH</span>
                    <span className="text-slate-900 font-semibold">{criminal.personalDetails?.dob || 'Classified'}</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-white border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">BLOOD GROUP</span>
                    <span className="text-slate-900 font-semibold">{criminal.personalDetails?.bloodGroup || 'O+'}</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-white border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">HEIGHT / EYES</span>
                    <span className="text-slate-900 font-semibold">{criminal.personalDetails?.heightCm || 178} cm • {criminal.personalDetails?.eyeColor || 'Brown'}</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-white border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">FINGERPRINT RECORD</span>
                    <span className="text-slate-900 font-mono font-semibold truncate block">{criminal.personalDetails?.fingerprintId || 'FP-ACN-8819'}</span>
                  </div>
                  <div className="p-2.5 rounded-md bg-white border border-slate-200">
                    <span className="text-slate-400 text-[10px] block">NATIONALITY</span>
                    <span className="text-slate-900 font-semibold">{criminal.nationality}</span>
                  </div>
                </div>
              </div>

              {/* Location & Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-md bg-white border border-slate-200 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-400 block">LAST KNOWN LOCATION</span>
                  <div className="flex items-center gap-1.5 text-slate-900 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    <span>{criminal.lastKnownLocation?.address || 'Classified'}, {criminal.lastKnownLocation?.city || 'Mumbai'}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    [{coords.join(', ')}]
                  </div>
                </div>

                <div className="p-3 rounded-md bg-white border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-semibold text-slate-400 block">SURVEILLANCE TAGS</span>
                  <div className="flex flex-wrap gap-1">
                    {tags.length > 0 ? tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] border border-slate-200 font-medium">
                        #{tag}
                      </span>
                    )) : (
                      <span className="text-slate-400 italic">No tags logged</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ASSOCIATES */}
          {activeTab === 'associates' && (
            <div className="space-y-2.5">
              {associates.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-lg">
                  No co-conspirators or associates currently linked.
                </div>
              ) : (
                associates.map((assoc) => (
                  <div
                    key={assoc.id}
                    onClick={() => onSelectAssociate && onSelectAssociate(assoc.id)}
                    className="p-3 rounded-lg bg-white border border-slate-200 hover:border-slate-300 shadow-subtle flex items-center justify-between gap-3 cursor-pointer group transition"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={assoc.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                        alt={assoc.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';
                        }}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 bg-slate-100"
                      />
                      <div>
                        <div className="font-semibold text-slate-900 group-hover:text-brand-600 transition">
                          {assoc.name} <span className="text-slate-400 text-xs italic font-normal">("{assoc.alias}")</span>
                        </div>
                        <div className="text-slate-500 text-[11px]">
                          Role: <strong className="text-slate-700">{assoc.role}</strong> • Link: {assoc.relationship}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        {assoc.riskScore}/100
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 3: VEHICLES */}
          {activeTab === 'vehicles' && (
            <div className="space-y-2.5">
              {vehicles.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-lg">
                  No registered vehicles or mobile transport assets identified.
                </div>
              ) : (
                vehicles.map((v) => (
                  <div key={v.id} className="p-3 rounded-lg bg-white border border-slate-200 shadow-subtle space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-slate-700" />
                        <span className="font-semibold text-slate-900">{v.make} {v.model} ({v.year})</span>
                      </div>
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {v.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-md border border-slate-100">
                      <div>
                        <span className="text-slate-400 text-[10px] block">LICENSE PLATE</span>
                        <span className="text-slate-900 font-mono font-semibold">{v.licensePlate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">COLOR / REGISTRATION</span>
                        <span className="text-slate-700">{v.color} • {v.registeredOwner}</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 text-[10px] block">LAST OBSERVED</span>
                        <span className="text-slate-700">{v.lastSeenLocation} ({v.lastSeenTime})</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: PHONES / WIRETAPS */}
          {activeTab === 'phones' && (
            <div className="space-y-2.5">
              {phones.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-lg">
                  No wiretaps or intercepted telephone lines active for this subject.
                </div>
              ) : (
                phones.map((p) => (
                  <div key={p.id} className="p-3 rounded-lg bg-white border border-slate-200 shadow-subtle space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        <span className="font-mono font-bold text-slate-900">{p.phoneNumber}</span>
                      </div>
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {p.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-md border border-slate-100">
                      <div>
                        <span className="text-slate-400 text-[10px] block">CARRIER</span>
                        <span className="text-slate-700">{p.carrier}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">IMEI NUMBER</span>
                        <span className="text-slate-700 font-mono">{p.imei}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">CALLS INTERCEPTED</span>
                        <span className="text-slate-900 font-bold">{p.totalCallsLogged} logged</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">LAST ACTIVE</span>
                        <span className="text-slate-700">{p.lastActive}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 5: FINANCIAL ACCOUNTS */}
          {activeTab === 'finance' && (
            <div className="space-y-2.5">
              {finances.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-lg">
                  No monitored accounts or financial anomalies recorded.
                </div>
              ) : (
                finances.map((fin) => (
                  <div key={fin.id} className="p-3 rounded-lg bg-white border border-slate-200 shadow-subtle space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Landmark className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-slate-900">{fin.bankName}</span>
                      </div>
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        {fin.accountType}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-md border border-slate-100">
                      <div>
                        <span className="text-slate-400 text-[10px] block">MONITORED BALANCE</span>
                        <span className="text-slate-900 font-bold text-sm">
                          {formatCurrency(fin.balance, fin.currency)}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">FLAGGED WIRES</span>
                        <span className="text-red-700 font-bold">{fin.flaggedTransactionsCount} suspicious transfers</span>
                      </div>
                      <div className="col-span-2">
                        <span className="text-slate-400 text-[10px] block">ACCOUNT NUMBER</span>
                        <span className="text-slate-700 font-mono break-all">{fin.accountNumber}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 6: CONNECTED SYNDICATES */}
          {activeTab === 'orgs' && (
            <div className="space-y-2.5">
              {orgs.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 border border-slate-200 rounded-lg">
                  No linked organizations or syndicates logged.
                </div>
              ) : (
                orgs.map((org) => (
                  <div key={org.id} className="p-3 rounded-lg bg-white border border-slate-200 shadow-subtle space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-purple-600" />
                        <span className="font-semibold text-slate-900">{org.name}</span>
                      </div>
                      <RiskBadge level={org.threatLevel} />
                    </div>
                    <div className="p-2 rounded bg-slate-50 border border-slate-100 text-[11px]">
                      <span className="text-slate-400 text-[10px] block">ORGANIZATIONAL ROLE</span>
                      <span className="text-slate-800 font-medium">{org.role}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 px-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shrink-0">
          <span className="text-[10px] font-mono text-slate-400">
            ACN Intelligence Dossier • Defcon Level 2
          </span>
          <div className="flex items-center gap-2">
            {onDelete && (
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => onDelete(criminal)} 
                className="h-7 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-200 gap-1"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete Profile</span>
              </Button>
            )}
            <Button variant="default" size="sm" onClick={onClose} className="h-7 text-xs">
              Close Dossier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
