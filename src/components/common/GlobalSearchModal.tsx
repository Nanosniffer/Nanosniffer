import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, User, Phone, Car, MapPin, Building2, ChevronRight, ShieldAlert } from 'lucide-react';
import { dummyCriminals, dummyOrganizations, dummyLocations, dummyPhoneRecords } from '../../data/dummy';
import { RiskBadge } from './StatusBadge';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCriminal?: (criminalId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCriminal,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Trigger toggle if passed from outside
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset query on open
  useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return { criminals: [], phones: [], vehicles: [], locations: [], orgs: [] };
    const q = query.toLowerCase();

    const criminals = dummyCriminals.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.alias.toLowerCase().includes(q) ||
        c.criminalId.toLowerCase().includes(q) ||
        c.crimeCategory.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 4);

    const phones = dummyPhoneRecords.filter(
      (p) =>
        p.phoneNumber.toLowerCase().includes(q) ||
        p.ownerName.toLowerCase().includes(q) ||
        p.carrier.toLowerCase().includes(q) ||
        p.imei.toLowerCase().includes(q)
    ).slice(0, 3);

    const vehicles = dummyCriminals.flatMap((c) => c.vehicles).filter(
      (v) =>
        v.licensePlate.toLowerCase().includes(q) ||
        v.make.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.registeredOwner.toLowerCase().includes(q)
    ).slice(0, 3);

    const locations = dummyLocations.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.city.toLowerCase().includes(q) ||
        l.address.toLowerCase().includes(q) ||
        l.type.toLowerCase().includes(q)
    ).slice(0, 3);

    const orgs = dummyOrganizations.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        (o.codeName && o.codeName.toLowerCase().includes(q)) ||
        o.type.toLowerCase().includes(q)
    ).slice(0, 3);

    return { criminals, phones, vehicles, locations, orgs };
  }, [query]);

  const totalResults =
    searchResults.criminals.length +
    searchResults.phones.length +
    searchResults.vehicles.length +
    searchResults.locations.length +
    searchResults.orgs.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-agency-900 border border-cyber-cyan/40 rounded-xl shadow-2xl overflow-hidden glass-panel">
        {/* Search Input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 gap-3">
          <Search className="w-5 h-5 text-cyber-cyan shrink-0 animate-pulse" />
          <input
            autoFocus
            type="text"
            placeholder="Search criminals, phone numbers, vehicles, safehouses, syndicates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-slate-200 p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!query.trim() ? (
            <div className="py-8 text-center text-slate-500 text-sm space-y-2">
              <ShieldAlert className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p>Type to search across tactical intelligence records</p>
              <div className="flex justify-center gap-2 text-xs font-mono text-slate-400 mt-2">
                <span className="px-2 py-0.5 rounded bg-slate-800">"Viktor"</span>
                <span className="px-2 py-0.5 rounded bg-slate-800">"+40 721"</span>
                <span className="px-2 py-0.5 rounded bg-slate-800">"Maybach"</span>
                <span className="px-2 py-0.5 rounded bg-slate-800">"Rotterdam"</span>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center text-slate-500 text-sm">
              No tactical entities match "{query}"
            </div>
          ) : (
            <>
              {/* Criminals */}
              {searchResults.criminals.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-cyber-cyan uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Criminal Dossiers ({searchResults.criminals.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.criminals.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onClose();
                          if (onSelectCriminal) {
                            onSelectCriminal(c.id);
                          } else {
                            navigate('/criminals');
                          }
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 cursor-pointer transition-all hover:border-cyber-cyan/40"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={c.photoUrl}
                            alt={c.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-700"
                          />
                          <div>
                            <div className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                              {c.name}
                              <span className="text-xs font-mono text-slate-400">({c.alias})</span>
                            </div>
                            <div className="text-xs text-slate-400 font-mono">
                              {c.criminalId} • {c.crimeCategory} • {c.lastKnownLocation.city}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <RiskBadge level={c.riskLevel} />
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Phones */}
              {searchResults.phones.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Wiretaps & Phone Records ({searchResults.phones.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.phones.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          navigate('/network');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="text-sm font-mono font-medium text-emerald-300">
                            {p.phoneNumber}
                          </div>
                          <div className="text-xs text-slate-400">
                            Owner: {p.ownerName} • {p.carrier}
                          </div>
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                          {p.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vehicles */}
              {searchResults.vehicles.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5" /> Tracked Vehicles ({searchResults.vehicles.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.vehicles.map((v) => (
                      <div
                        key={v.id}
                        onClick={() => {
                          onClose();
                          navigate('/network');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200">
                            {v.make} {v.model} ({v.year})
                          </div>
                          <div className="text-xs text-slate-400 font-mono">
                            Plate: {v.licensePlate} • Owner: {v.registeredOwner}
                          </div>
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/80 text-purple-400 border border-purple-500/30">
                          {v.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Locations */}
              {searchResults.locations.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Monitored Locations ({searchResults.locations.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.locations.map((l) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          onClose();
                          navigate('/dashboard');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200">{l.name}</div>
                          <div className="text-xs text-slate-400 font-mono">
                            {l.address}, {l.city} • {l.type}
                          </div>
                        </div>
                        <RiskBadge level={l.riskLevel} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Organizations */}
              {searchResults.orgs.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5" /> Syndicates & Front Companies ({searchResults.orgs.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.orgs.map((o) => (
                      <div
                        key={o.id}
                        onClick={() => {
                          onClose();
                          navigate('/network');
                        }}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/40 cursor-pointer transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-slate-200">{o.name}</div>
                          <div className="text-xs text-slate-400 font-mono">
                            Leader: {o.leaderName} • {o.type} • {o.headquarters}
                          </div>
                        </div>
                        <RiskBadge level={o.threatLevel} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-agency-950/90 border-t border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Global Telemetry Search Engine v2.4</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
