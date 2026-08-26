import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  FileText,
  Clock
} from 'lucide-react';
import { getAllMergedCriminals } from '../../api/criminals';

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
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Reset 30s timer on user activity
  const resetAutoCloseTimer = useCallback(() => {
    setSecondsRemaining(30);
  }, []);

  // Universal Click/Touch Anywhere Outside Listener (Works on iOS, Android, Desktop)
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDownOutside = (e: MouseEvent | TouchEvent | PointerEvent) => {
      if (
        modalContainerRef.current &&
        !modalContainerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    // Listen on pointerdown and touchstart for zero-delay mobile response
    document.addEventListener('pointerdown', handlePointerDownOutside, { capture: true });
    document.addEventListener('touchstart', handlePointerDownOutside, { capture: true, passive: true });
    document.addEventListener('mousedown', handlePointerDownOutside, { capture: true });

    return () => {
      document.removeEventListener('pointerdown', handlePointerDownOutside, { capture: true });
      document.removeEventListener('touchstart', handlePointerDownOutside, { capture: true });
      document.removeEventListener('mousedown', handlePointerDownOutside, { capture: true });
    };
  }, [isOpen, onClose]);

  // 30-second countdown timer effect
  useEffect(() => {
    if (!isOpen) return;

    setSecondsRemaining(30);
    setTimeout(() => inputRef.current?.focus(), 50);
    setQuery('');
    setSelectedIndex(0);

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, onClose]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : null;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if (isOpen) {
        resetAutoCloseTimer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, resetAutoCloseTimer]);

  // Aggregate searchable items from all suspects
  const allItems: SearchResultItem[] = [];
  const allCriminals = getAllMergedCriminals();

  // Add suspects
  allCriminals.forEach(c => {
    allItems.push({
      id: c.id,
      name: c.name,
      subtitle: `${c.alias ? `"${c.alias}" • ` : ''}${c.crimeCategory} • ${c.lastKnownLocation?.city || 'Classified'} • ${c.criminalId}`,
      category: 'Suspects',
      riskLevel: c.riskLevel,
      route: `/criminals`,
    });

    (c.phoneNumbers || []).forEach(p => {
      allItems.push({
        id: `${c.id}-phone-${p.phoneNumber}`,
        name: p.phoneNumber,
        subtitle: `${p.carrier || 'Cellular'} • Linked to ${c.name} (${c.alias})`,
        category: 'Phones',
        route: `/network`,
      });
    });

    (c.vehicles || []).forEach(v => {
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
    { id: 'case-1', name: 'CASE-2026-001: Operation Black Friday', subtitle: 'D-Company Transnational Hawala & Arms Network', category: 'Cases', riskLevel: 'CRITICAL', route: '/dashboard' },
    { id: 'case-2', name: 'CASE-2026-002: Project Firestar Vault', subtitle: 'PNB ₹13,500 Cr Diamond LoU Money Laundering', category: 'Cases', riskLevel: 'CRITICAL', route: '/dashboard' },
    { id: 'case-3', name: 'CASE-2026-003: Operation Purulia Sky-Drop', subtitle: 'Antonov An-26 Aerial Arms Smuggling Grid', category: 'Cases', riskLevel: 'CRITICAL', route: '/dashboard' },
    { id: 'case-4', name: 'CASE-2026-004: Project Dark Ledger', subtitle: 'GainBitcoin & Indiranagar Crypto Drain Ring', category: 'Cases', riskLevel: 'HIGH', route: '/dashboard' }
  );

  // Add locations & orgs
  allItems.push(
    { id: 'loc-1', name: 'Dongri & Nagpada Syndicate Headquarters', subtitle: 'Pakmodia Street & Temkar Mohalla • Mumbai', category: 'Locations', riskLevel: 'CRITICAL', route: '/network' },
    { id: 'loc-2', name: 'Tihar High-Security Prison Ward No. 4', subtitle: 'VoIP Spoofing Extortion Nexus • New Delhi', category: 'Locations', riskLevel: 'CRITICAL', route: '/network' },
    { id: 'loc-3', name: 'Bharat Diamond Bourse BKC', subtitle: 'Circular Export Invoicing Front • Mumbai', category: 'Locations', riskLevel: 'HIGH', route: '/network' },
    { id: 'org-1', name: 'D-Company Global Syndicate', subtitle: 'Transnational Underworld Network • Mumbai / Dubai / Karachi', category: 'Organizations', riskLevel: 'CRITICAL', route: '/network' },
    { id: 'org-2', name: 'Worli Mephedrone Cartel', subtitle: 'Synthetic Narcotics Distribution • Mumbai / Gujarat', category: 'Organizations', riskLevel: 'CRITICAL', route: '/network' }
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
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-100 cursor-pointer"
    >
      <div
        ref={modalContainerRef}
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-150 cursor-default"
        onClick={e => {
          e.stopPropagation();
          resetAutoCloseTimer();
        }}
        onMouseMove={resetAutoCloseTimer}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-3.5 sm:px-4 h-12 border-b border-slate-200 gap-2 sm:gap-3 bg-white">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
              resetAutoCloseTimer();
            }}
            placeholder="Search suspects, phones, vehicles, bank accounts, case IDs..."
            className="flex-1 text-xs text-slate-900 placeholder-slate-400 bg-transparent focus:outline-none"
          />

          {/* 30s Live Countdown Indicator */}
          <div 
            title="Modal will automatically close if idle"
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-600 shrink-0"
          >
            <Clock className="w-3 h-3 text-slate-400 animate-pulse" />
            <span>{secondsRemaining}s</span>
          </div>

          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>

          {/* Explicit Mobile / Click Close Button */}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition shrink-0"
            title="Close Search"
          >
            <X className="w-4 h-4" />
          </button>
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
                onMouseEnter={() => {
                  setSelectedIndex(index);
                  resetAutoCloseTimer();
                }}
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

        {/* Footer Navigation Hints & Auto-close notice */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">↑↓ to navigate</span>
            <span className="hidden sm:inline">↵ to open</span>
            <span className="sm:hidden text-[10px] text-slate-500">Tap item to view</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
            <span>Auto-closes after 30s idle</span>
          </div>
        </div>
      </div>
    </div>
  );
};
