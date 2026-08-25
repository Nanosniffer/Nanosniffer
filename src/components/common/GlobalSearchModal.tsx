import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  User,
  Phone,
  Car,
  MapPin,
  Building,
  CreditCard,
  Briefcase,
  ArrowRight,
  Command,
  FileText
} from 'lucide-react';
import { dummyCriminals } from '../../data/dummy';

interface SearchResultItem {
  id: string;
  name: string;
  subtitle: string;
  category: 'Suspects' | 'Phones' | 'Vehicles' | 'Locations' | 'Organizations' | 'Cases';
  riskLevel?: string;
  route: string;
}

export const GlobalSearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Aggregate searchable items
  const allItems: SearchResultItem[] = [];

  // Add suspects
  dummyCriminals.forEach(c => {
    allItems.push({
      id: c.id,
      name: c.name,
      subtitle: `${c.alias ? `"${c.alias}" • ` : ''}${c.crimeCategory} • ${c.lastKnownLocation.city}`,
      category: 'Suspects',
      riskLevel: c.riskLevel,
      route: `/criminals`,
    });

    c.phoneNumbers.forEach(p => {
      allItems.push({
        id: `${c.id}-phone-${p.phoneNumber}`,
        name: p.phoneNumber,
        subtitle: `${p.carrier || 'Cellular'} • Linked to ${c.name}`,
        category: 'Phones',
        route: `/network`,
      });
    });

    c.vehicles.forEach(v => {
      allItems.push({
        id: `${c.id}-veh-${v.licensePlate}`,
        name: `${v.licensePlate} (${v.model})`,
        subtitle: `${v.color} • Registered to ${c.name}`,
        category: 'Vehicles',
        route: `/network`,
      });
    });
  });

  // Add cases
  allItems.push(
    { id: 'case-1', name: 'CASE-2026-014: Operation Viper Strike', subtitle: 'Organized Drug & Arms Trafficking Cartel', category: 'Cases', riskLevel: 'CRITICAL', route: '/dashboard' },
    { id: 'case-2', name: 'CASE-2026-018: Phantom Ledger', subtitle: 'Cross-Border Shell Banking Laundering', category: 'Cases', riskLevel: 'HIGH', route: '/dashboard' },
    { id: 'case-3', name: 'CASE-2026-022: Dark Geofence', subtitle: 'Port of Miami Maritime Smuggling', category: 'Cases', riskLevel: 'CRITICAL', route: '/dashboard' }
  );

  // Add locations & orgs
  allItems.push(
    { id: 'loc-1', name: 'Port of Miami Terminal 4', subtitle: 'Restricted Maritime Smuggling Corridor', category: 'Locations', riskLevel: 'CRITICAL', route: '/network' },
    { id: 'loc-2', name: 'Panama City Free Trade Zone', subtitle: 'Offshore Freight Staging Area', category: 'Locations', riskLevel: 'HIGH', route: '/network' },
    { id: 'org-1', name: 'Nautilus Maritime Logistics', subtitle: 'Front shell company • Panama / Miami', category: 'Organizations', riskLevel: 'HIGH', route: '/network' },
    { id: 'org-2', name: 'Apex Crypto Exchange Ltd', subtitle: 'Unregistered tumbler entity • St. Kitts', category: 'Organizations', riskLevel: 'CRITICAL', route: '/network' }
  );

  const filtered = query.trim()
    ? allItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
    : allItems.slice(0, 10);

  const handleSelect = (item: SearchResultItem) => {
    onClose();
    navigate(item.route);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Suspects': return <User className="w-3.5 h-3.5 text-slate-500" />;
      case 'Phones': return <Phone className="w-3.5 h-3.5 text-blue-500" />;
      case 'Vehicles': return <Car className="w-3.5 h-3.5 text-amber-500" />;
      case 'Locations': return <MapPin className="w-3.5 h-3.5 text-red-500" />;
      case 'Organizations': return <Building className="w-3.5 h-3.5 text-purple-500" />;
      case 'Cases': return <Briefcase className="w-3.5 h-3.5 text-slate-700" />;
      default: return <FileText className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/40 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-100">
      <div
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 h-12 border-b border-slate-200 gap-3">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search suspects, phones, vehicles, bank accounts, case IDs..."
            className="flex-1 text-xs text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No matching intelligence entities found for "{query}".
            </div>
          ) : (
            filtered.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`w-full text-left p-2.5 rounded-md flex items-center justify-between transition-colors ${
                  selectedIndex === index ? 'bg-slate-100' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded bg-white border border-slate-200 flex items-center justify-center shrink-0">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900 truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate">{item.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  {item.riskLevel && (
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${
                        item.riskLevel === 'CRITICAL'
                          ? 'bg-red-50 text-red-700 border-red-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {item.riskLevel}
                    </span>
                  )}
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to open</span>
          </div>
          <span>ACN Global Command Search</span>
        </div>
      </div>
    </div>
  );
};
