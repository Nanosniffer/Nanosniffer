import React, { useState, useMemo } from 'react';
import { TimelineEvent, TimelineEventType } from '../../types';
import { RiskBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import {
  Phone,
  CreditCard,
  Camera,
  Car,
  FileText,
  ShieldCheck,
  Users,
  DollarSign,
  Compass,
  Crosshair,
  Search,
  Filter,
  CheckCircle2,
  FileCode,
  MapPin,
  Clock
} from 'lucide-react';
import { Button } from '../ui/button';

interface EvidenceTimelineViewProps {
  events: TimelineEvent[];
  onSelectCriminal?: (criminalId: string) => void;
}

export const EvidenceTimelineView: React.FC<EvidenceTimelineViewProps> = ({
  events,
  onSelectCriminal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<string>('ALL');
  const [selectedCriminalId, setSelectedCriminalId] = useState<string>('ALL');

  // Unique criminal options
  const uniqueCriminals = useMemo(() => {
    const map = new Map<string, string>();
    events.forEach((e) => {
      if (e.criminalId && e.criminalName) {
        map.set(e.criminalId, e.criminalName);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch =
        !searchQuery ||
        e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.criminalName && e.criminalName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType = selectedEventType === 'ALL' || e.eventType === selectedEventType;
      const matchesCriminal =
        selectedCriminalId === 'ALL' || e.criminalId === selectedCriminalId;

      return matchesSearch && matchesType && matchesCriminal;
    });
  }, [events, searchQuery, selectedEventType, selectedCriminalId]);

  const getEventIcon = (type: TimelineEventType) => {
    switch (type) {
      case 'Phone Calls':
        return <Phone className="w-4 h-4 text-emerald-400" />;
      case 'ATM Withdrawal':
        return <CreditCard className="w-4 h-4 text-blue-400" />;
      case 'CCTV Sighting':
        return <Camera className="w-4 h-4 text-amber-400" />;
      case 'Vehicle Movement':
        return <Car className="w-4 h-4 text-purple-400" />;
      case 'FIR Filed':
        return <FileText className="w-4 h-4 text-red-400" />;
      case 'Arrest':
        return <ShieldCheck className="w-4 h-4 text-cyan-400" />;
      case 'Meeting':
        return <Users className="w-4 h-4 text-rose-400" />;
      case 'Wire Transfer':
        return <DollarSign className="w-4 h-4 text-green-400" />;
      case 'Border Crossing':
        return <Compass className="w-4 h-4 text-cyan-300" />;
      case 'Weapon Sighting':
        return <Crosshair className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-5">
      {/* Controls Bar */}
      <div className="p-4 rounded-xl bg-agency-900/90 border border-slate-800 glass-panel shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search evidence events, transcripts, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-agency-950 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div className="text-xs font-mono text-slate-400">
            <span className="text-cyber-cyan font-bold">{filteredEvents.length}</span> / {events.length} Timeline Events Filtered
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80 text-xs">
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">EVENT CLASSIFICATION</label>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="w-full bg-agency-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All Event Types</option>
              <option value="Phone Calls">Phone Calls</option>
              <option value="ATM Withdrawal">ATM Withdrawal</option>
              <option value="CCTV Sighting">CCTV Sighting</option>
              <option value="Vehicle Movement">Vehicle Movement</option>
              <option value="FIR Filed">FIR Filed</option>
              <option value="Arrest">Arrest</option>
              <option value="Meeting">Meeting</option>
              <option value="Wire Transfer">Wire Transfer</option>
              <option value="Border Crossing">Border Crossing</option>
              <option value="Weapon Sighting">Weapon Sighting</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">FILTER BY TARGET SUSPECT</label>
            <select
              value={selectedCriminalId}
              onChange={(e) => setSelectedCriminalId(e.target.value)}
              className="w-full bg-agency-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All Suspects</option>
              {uniqueCriminals.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-6 py-2">
        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-slate-500 font-mono text-xs">
            No evidence timeline items found matching the current filters.
          </div>
        ) : (
          filteredEvents.map((evt, index) => (
            <div key={evt.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-8 h-8 rounded-full bg-agency-950 border-2 border-slate-700 group-hover:border-cyber-cyan shadow-md flex items-center justify-center transition-colors">
                {getEventIcon(evt.eventType)}
              </div>

              {/* Event Card */}
              <div className="p-4 rounded-xl bg-agency-900/90 border border-slate-800 group-hover:border-slate-700 glass-panel transition-all space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyber-cyan bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      {evt.eventType}
                    </span>
                    {evt.isVerified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" /> VERIFIED EVIDENCE
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">
                      {formatDate(evt.timestamp)}
                    </span>
                    <RiskBadge level={evt.severity} />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-100">{evt.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{evt.description}</p>

                {/* Metadata row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-amber-300">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{evt.location}</span>
                    </div>

                    {evt.criminalName && (
                      <button
                        onClick={() => evt.criminalId && onSelectCriminal && onSelectCriminal(evt.criminalId)}
                        className="text-cyber-cyan hover:underline"
                      >
                        Target: {evt.criminalName}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">
                      AI Confidence: <span className="text-slate-200 font-bold">{evt.confidenceScore}%</span>
                    </span>
                  </div>
                </div>

                {/* Evidence attachments preview */}
                {evt.evidenceFiles && evt.evidenceFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {evt.evidenceFiles.map((file, fIdx) => (
                      <div
                        key={fIdx}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-agency-950 border border-slate-800 text-[11px] font-mono text-slate-300 hover:border-cyber-cyan cursor-pointer transition"
                      >
                        <FileCode className="w-3 h-3 text-purple-400" />
                        <span>{file.fileName}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
