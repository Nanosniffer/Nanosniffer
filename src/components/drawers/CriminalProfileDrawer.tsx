import React, { useState } from 'react';
import { Criminal } from '../../types';
import { RiskBadge, StatusBadge } from '../common/StatusBadge';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Button } from '../ui/button';
import { downloadJSON, triggerPrintDossier } from '../../utils/exportUtils';
import {
  X,
  User,
  ShieldAlert,
  Car,
  Phone,
  Landmark,
  Building2,
  Clock,
  Printer,
  FileCode,
  AlertTriangle,
  ExternalLink,
  MapPin,
  Fingerprint,
  Activity,
  Zap,
  Radio,
  FileText
} from 'lucide-react';

interface CriminalProfileDrawerProps {
  criminal: Criminal | null;
  onClose: () => void;
  onSelectAssociate?: (associateId: string) => void;
}

export const CriminalProfileDrawer: React.FC<CriminalProfileDrawerProps> = ({
  criminal,
  onClose,
  onSelectAssociate,
}) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'associates' | 'vehicles' | 'phones' | 'finance' | 'orgs'
  >('overview');

  if (!criminal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-agency-950 border-l border-slate-800 shadow-2xl glass-panel flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-800 bg-agency-900/90 flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={criminal.photoUrl}
                alt={criminal.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-cyber-cyan shadow-neon-cyan shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-cyber-cyan bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
                    {criminal.criminalId}
                  </span>
                  <StatusBadge status={criminal.status} />
                  <RiskBadge level={criminal.riskLevel} />
                </div>
                <h2 className="text-xl font-extrabold text-slate-100 mt-1">{criminal.name}</h2>
                <p className="text-xs font-mono text-slate-400">
                  ALIAS: <span className="text-cyan-300 font-semibold">{criminal.alias}</span> • {criminal.crimeCategory}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerPrintDossier(criminal.name)}
                title="Print Tactical Dossier"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={() => downloadJSON(criminal, `Dossier_${criminal.criminalId}.json`)}
                title="Export JSON Dossier"
                className="p-2 rounded-lg text-slate-400 hover:text-purple-400 hover:bg-slate-800 transition"
              >
                <FileCode className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 px-5 border-b border-slate-800 bg-agency-950/80 overflow-x-auto text-xs font-mono">
            {[
              { id: 'overview', label: 'AI Overview', icon: Zap },
              { id: 'associates', label: `Associates (${criminal.knownAssociates.length})`, icon: User },
              { id: 'vehicles', label: `Vehicles (${criminal.vehicles.length})`, icon: Car },
              { id: 'phones', label: `Wiretaps (${criminal.phoneNumbers.length})`, icon: Phone },
              { id: 'finance', label: `Accounts (${criminal.financialAccounts.length})`, icon: Landmark },
              { id: 'orgs', label: `Syndicates (${criminal.connectedOrganizations.length})`, icon: Building2 },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 py-3 px-3 border-b-2 font-medium transition-all shrink-0 ${
                    activeTab === tab.id
                      ? 'border-cyber-cyan text-cyber-cyan-bright bg-cyan-500/10'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                {/* AI Threat Summary Callout */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-red-950/30 via-agency-900 to-agency-900 border border-red-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-red-400 animate-pulse" /> A.E.G.I.S. AI THREAT EVALUATION
                    </span>
                    <span className="text-xs font-mono text-slate-300 font-bold bg-agency-950 px-2 py-0.5 rounded border border-red-500/30">
                      THREAT SCORE: {criminal.riskScore}/100
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-sans">{criminal.aiThreatSummary}</p>
                </div>

                {/* Biography */}
                <div className="p-4 rounded-xl bg-agency-900/80 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                    Official Intelligence Dossier
                  </span>
                  <p className="text-slate-300 leading-relaxed font-sans">{criminal.biography}</p>
                </div>

                {/* Personal Details Grid */}
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block mb-2">
                    Biometric & Personal Identification
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono">
                    <div className="p-3 rounded-lg bg-agency-900 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">AGE / GENDER</span>
                      <span className="text-slate-200 font-bold">{criminal.age} YRS • {criminal.gender}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-agency-900 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">NATIONALITY</span>
                      <span className="text-slate-200 font-bold">{criminal.nationality}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-agency-900 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">DATE OF BIRTH</span>
                      <span className="text-slate-200 font-bold">{criminal.personalDetails.dob}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-agency-900 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">BLOOD GROUP</span>
                      <span className="text-slate-200 font-bold">{criminal.personalDetails.bloodGroup || 'O+'}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-agency-900 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">HEIGHT / EYES</span>
                      <span className="text-slate-200 font-bold">{criminal.personalDetails.heightCm || 180} cm • {criminal.personalDetails.eyeColor || 'Brown'}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-agency-900 border border-slate-800">
                      <span className="text-slate-500 text-[10px] block">FINGERPRINT ID</span>
                      <span className="text-cyber-cyan font-bold truncate block">{criminal.personalDetails.fingerprintId || 'FP-INTEL-881'}</span>
                    </div>
                  </div>
                </div>

                {/* Location & Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-agency-900 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 block">LAST KNOWN LOCATION</span>
                    <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{criminal.lastKnownLocation.address}, {criminal.lastKnownLocation.city}</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Coordinates: [{criminal.lastKnownLocation.coordinates.join(', ')}]
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-agency-900 border border-slate-800 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-500 block">ACTIVE SURVEILLANCE TAGS</span>
                    <div className="flex flex-wrap gap-1">
                      {criminal.tags.map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px] border border-slate-700">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: ASSOCIATES */}
            {activeTab === 'associates' && (
              <div className="space-y-3">
                {criminal.knownAssociates.length === 0 ? (
                  <p className="text-slate-500 py-8 text-center">No primary associates logged in this cluster.</p>
                ) : (
                  criminal.knownAssociates.map((assoc) => (
                    <div
                      key={assoc.id}
                      onClick={() => onSelectAssociate && onSelectAssociate(assoc.id)}
                      className="p-3.5 rounded-xl bg-agency-900 border border-slate-800 hover:border-cyber-cyan transition-all flex items-center justify-between gap-3 cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={assoc.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                          alt={assoc.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-700 group-hover:border-cyber-cyan"
                        />
                        <div>
                          <div className="font-semibold text-slate-100 group-hover:text-cyber-cyan-bright transition">
                            {assoc.name} <span className="text-slate-400 text-xs italic font-mono">({assoc.alias})</span>
                          </div>
                          <div className="text-slate-400 text-xs">
                            Role: <span className="text-slate-200 font-medium">{assoc.role}</span> • Relationship: <span className="text-slate-300 font-mono">{assoc.relationship}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyber-cyan bg-agency-950 px-2 py-1 rounded border border-slate-700">
                          {assoc.riskScore}/100
                        </span>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-slate-200" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: VEHICLES */}
            {activeTab === 'vehicles' && (
              <div className="space-y-3">
                {criminal.vehicles.length === 0 ? (
                  <p className="text-slate-500 py-8 text-center">No active vehicles registered to target.</p>
                ) : (
                  criminal.vehicles.map((v) => (
                    <div key={v.id} className="p-4 rounded-xl bg-agency-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-purple-400" />
                          <span className="font-bold text-slate-200 text-sm">{v.make} {v.model} ({v.year})</span>
                        </div>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-purple-950/80 text-purple-400 border border-purple-500/40">
                          {v.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-agency-950 p-2.5 rounded-lg border border-slate-800">
                        <div>
                          <span className="text-slate-500 text-[10px] block">LICENSE PLATE</span>
                          <span className="text-slate-200 font-bold">{v.licensePlate}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">COLOR / OWNER</span>
                          <span className="text-slate-300">{v.color} • {v.registeredOwner}</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500 text-[10px] block">LAST SIGHTED</span>
                          <span className="text-slate-300">{v.lastSeenLocation} ({v.lastSeenTime})</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 4: PHONES / WIRETAPS */}
            {activeTab === 'phones' && (
              <div className="space-y-3">
                {criminal.phoneNumbers.length === 0 ? (
                  <p className="text-slate-500 py-8 text-center">No telecommunication nodes registered.</p>
                ) : (
                  criminal.phoneNumbers.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl bg-agency-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-emerald-400" />
                          <span className="font-mono font-bold text-emerald-300 text-sm">{p.phoneNumber}</span>
                        </div>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                          <Radio className="w-2.5 h-2.5 animate-pulse" /> {p.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-agency-950 p-2.5 rounded-lg border border-slate-800">
                        <div>
                          <span className="text-slate-500 text-[10px] block">CARRIER</span>
                          <span className="text-slate-300">{p.carrier}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">IMEI NUMBER</span>
                          <span className="text-slate-300">{p.imei}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">CALLS INTERCEPTED</span>
                          <span className="text-cyber-cyan font-bold">{p.totalCallsLogged} calls</span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">LAST TRANSMISSION</span>
                          <span className="text-slate-300">{p.lastActive}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 5: FINANCIAL ACCOUNTS */}
            {activeTab === 'finance' && (
              <div className="space-y-3">
                {criminal.financialAccounts.length === 0 ? (
                  <p className="text-slate-500 py-8 text-center">No monitored financial nodes logged.</p>
                ) : (
                  criminal.financialAccounts.map((fin) => (
                    <div key={fin.id} className="p-4 rounded-xl bg-agency-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-blue-400" />
                          <span className="font-semibold text-slate-100 text-sm">{fin.bankName}</span>
                        </div>
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-500/40">
                          {fin.accountType}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-agency-950 p-2.5 rounded-lg border border-slate-800">
                        <div>
                          <span className="text-slate-500 text-[10px] block">ESTIMATED BALANCE</span>
                          <span className="text-emerald-400 font-bold text-sm">
                            {formatCurrency(fin.balance, fin.currency)}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 text-[10px] block">FLAGGED TRANSACTIONS</span>
                          <span className="text-red-400 font-bold">{fin.flaggedTransactionsCount} Suspicious Wires</span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500 text-[10px] block">ACCOUNT / WALLET IDENTIFIER</span>
                          <span className="text-slate-300 font-mono break-all">{fin.accountNumber}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 6: CONNECTED SYNDICATES */}
            {activeTab === 'orgs' && (
              <div className="space-y-3">
                {criminal.connectedOrganizations.map((org) => (
                  <div key={org.id} className="p-4 rounded-xl bg-agency-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-rose-400" />
                        <span className="font-bold text-slate-100 text-sm">{org.name}</span>
                      </div>
                      <RiskBadge level={org.threatLevel} />
                    </div>
                    <div className="p-2.5 rounded-lg bg-agency-950 border border-slate-800 font-mono text-xs">
                      <span className="text-slate-500 text-[10px] block">ORGANIZATIONAL ROLE</span>
                      <span className="text-slate-200 font-semibold">{org.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-slate-800 bg-agency-950 flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-slate-500">
              CLASSIFIED // INTERPOL LEVEL 4 DOSSIER
            </span>
            <Button variant="default" size="sm" onClick={onClose} className="text-xs">
              Close Dossier
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
