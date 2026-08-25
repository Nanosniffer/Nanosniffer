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
  CheckCircle2,
  FileCode,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';

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
        return <Phone className="w-3.5 h-3.5 text-emerald-600" />;
      case 'ATM Withdrawal':
        return <CreditCard className="w-3.5 h-3.5 text-blue-600" />;
      case 'CCTV Sighting':
        return <Camera className="w-3.5 h-3.5 text-amber-600" />;
      case 'Vehicle Movement':
        return <Car className="w-3.5 h-3.5 text-purple-600" />;
      case 'FIR Filed':
        return <FileText className="w-3.5 h-3.5 text-red-600" />;
      case 'Arrest':
        return <ShieldCheck className="w-3.5 h-3.5 text-slate-800" />;
      case 'Meeting':
        return <Users className="w-3.5 h-3.5 text-rose-600" />;
      case 'Wire Transfer':
        return <DollarSign className="w-3.5 h-3.5 text-emerald-700" />;
      case 'Border Crossing':
        return <Compass className="w-3.5 h-3.5 text-blue-700" />;
      case 'Weapon Sighting':
        return <Crosshair className="w-3.5 h-3.5 text-red-700" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-card space-y-2.5 text-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search evidence events, transcripts, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-subtle"
            />
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredEvents.length}</strong> of {events.length} Timeline Events
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">EVENT TYPE</label>
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
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
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">FILTER BY TARGET</label>
            <select
              value={selectedCriminalId}
              onChange={(e) => setSelectedCriminalId(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
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
      <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 pl-5 sm:pl-6 space-y-4 py-2">
        {filteredEvents.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs">
            No evidence timeline items found matching the current filters.
          </div>
        ) : (
          filteredEvents.map((evt) => (
            <div key={evt.id} className="relative group">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[35px] top-1.5 w-7 h-7 rounded-full bg-white border border-slate-300 group-hover:border-slate-900 shadow-sm flex items-center justify-center transition-colors">
                {getEventIcon(evt.eventType)}
              </div>

              {/* Event Card */}
              <div className="p-3.5 rounded-lg bg-white border border-slate-200 shadow-card hover:border-slate-300 transition-all space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {evt.eventType}
                    </span>
                    {evt.isVerified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {formatDate(evt.timestamp)}
                    </span>
                    <RiskBadge level={evt.severity} />
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900 leading-snug">{evt.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{evt.description}</p>

                {/* Metadata row */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{evt.location}</span>
                    </div>

                    {evt.criminalName && (
                      <button
                        onClick={() => evt.criminalId && onSelectCriminal && onSelectCriminal(evt.criminalId)}
                        className="text-brand-600 font-semibold hover:underline"
                      >
                        Target: {evt.criminalName}
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <Sparkles className="w-3 h-3 text-brand-600" />
                    <span>Confidence: <strong className="text-slate-800">{evt.confidenceScore}%</strong></span>
                  </div>
                </div>

                {/* Evidence attachments preview */}
                {evt.evidenceFiles && evt.evidenceFiles.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {evt.evidenceFiles.map((file, fIdx) => (
                      <div
                        key={fIdx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-700 hover:border-slate-400 cursor-pointer transition shadow-subtle"
                      >
                        <FileCode className="w-3 h-3 text-indigo-600" />
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
