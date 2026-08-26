import React, { useState, useMemo } from 'react';
import { Criminal } from '../../types';
import { RiskBadge, StatusBadge } from '../common/StatusBadge';
import { formatRelativeTime } from '../../utils/formatters';
import { Search, ChevronRight, ArrowUpDown, Eye, Filter, Edit, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface CriminalTableProps {
  criminals: Criminal[];
  onSelectCriminal: (criminal: Criminal) => void;
  onEditCriminal?: (criminal: Criminal) => void;
  onDeleteCriminal?: (criminal: Criminal) => void;
}

export const CriminalTable: React.FC<CriminalTableProps> = ({ 
  criminals, 
  onSelectCriminal, 
  onEditCriminal,
  onDeleteCriminal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrimeType, setSelectedCrimeType] = useState<string>('ALL');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Sorting
  const [sortField, setSortField] = useState<'riskScore' | 'name' | 'lastActivity'>('riskScore');
  const [sortAsc, setSortAsc] = useState(false);

  // Extract unique cities safely
  const uniqueCities = useMemo(() => {
    const set = new Set(
      (criminals || [])
        .map((c) => c?.lastKnownLocation?.city)
        .filter(Boolean)
    );
    return Array.from(set).sort() as string[];
  }, [criminals]);

  // Filtered & Sorted criminals
  const filteredCriminals = useMemo(() => {
    return (criminals || [])
      .filter((c) => {
        if (!c) return false;
        const name = (c.name || '').toLowerCase();
        const alias = (c.alias || '').toLowerCase();
        const crimId = (c.criminalId || '').toLowerCase();
        const tags = Array.isArray(c.tags) ? c.tags : [];
        const city = c.lastKnownLocation?.city || '';
        const q = searchQuery.toLowerCase();

        const matchesSearch =
          !searchQuery ||
          name.includes(q) ||
          alias.includes(q) ||
          crimId.includes(q) ||
          tags.some((t) => typeof t === 'string' && t.toLowerCase().includes(q));

        const matchesCrime = selectedCrimeType === 'ALL' || c.crimeCategory === selectedCrimeType;
        const matchesRisk = selectedRiskLevel === 'ALL' || c.riskLevel === selectedRiskLevel;
        const matchesCity = selectedCity === 'ALL' || city === selectedCity;
        const matchesStatus = selectedStatus === 'ALL' || c.status === selectedStatus;

        return matchesSearch && matchesCrime && matchesRisk && matchesCity && matchesStatus;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortField === 'riskScore') comp = (a.riskScore || 0) - (b.riskScore || 0);
        else if (sortField === 'name') comp = (a.name || '').localeCompare(b.name || '');
        else if (sortField === 'lastActivity') comp = new Date(a.lastActivity || 0).getTime() - new Date(b.lastActivity || 0).getTime();
        return sortAsc ? comp : -comp;
      });
  }, [
    criminals,
    searchQuery,
    selectedCrimeType,
    selectedRiskLevel,
    selectedCity,
    selectedStatus,
    sortField,
    sortAsc,
  ]);

  const toggleSort = (field: 'riskScore' | 'name' | 'lastActivity') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-3">
      {/* Search & Filter Toolbar */}
      <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-card space-y-2.5 text-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search suspects by name, alias, ID, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 shadow-subtle"
            />
          </div>

          <div className="text-[11px] text-slate-500 font-medium">
            Showing <strong className="text-slate-900">{filteredCriminals.length}</strong> of {criminals.length} Subject Dossiers
          </div>
        </div>

        {/* Filter Selects */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-xs">
          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">CRIME CATEGORY</label>
            <select
              value={selectedCrimeType}
              onChange={(e) => setSelectedCrimeType(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
            >
              <option value="ALL">All Categories</option>
              <option value="Drug Trafficking">Drug Trafficking</option>
              <option value="Cybercrime">Cybercrime</option>
              <option value="Money Laundering">Money Laundering</option>
              <option value="Arms Smuggling">Arms Smuggling</option>
              <option value="Extortion">Extortion</option>
              <option value="Organized Heist">Organized Heist</option>
              <option value="Terrorism Financing">Terrorism Financing</option>
              <option value="Human Trafficking">Human Trafficking</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">THREAT LEVEL</label>
            <select
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
            >
              <option value="ALL">All Threat Levels</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">LOCATION</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
            >
              <option value="ALL">All Locations</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">STATUS</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 text-xs focus:outline-none focus:border-slate-400 shadow-subtle"
            >
              <option value="ALL">All Statuses</option>
              <option value="WANTED">WANTED</option>
              <option value="UNDER_SURVEILLANCE">UNDER SURVEILLANCE</option>
              <option value="IN_CUSTODY">IN CUSTODY</option>
              <option value="BAIL">BAIL</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-lg border border-slate-200 bg-white shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Subject ID</th>
                <th
                  onClick={() => toggleSort('name')}
                  className="py-2.5 px-4 cursor-pointer hover:text-slate-900 transition"
                >
                  <div className="flex items-center gap-1">
                    Subject & Alias <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-2.5 px-4">Crime Category</th>
                <th
                  onClick={() => toggleSort('riskScore')}
                  className="py-2.5 px-4 cursor-pointer hover:text-slate-900 transition"
                >
                  <div className="flex items-center gap-1">
                    Risk Score <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-2.5 px-4">Location</th>
                <th className="py-2.5 px-4">Status</th>
                <th
                  onClick={() => toggleSort('lastActivity')}
                  className="py-2.5 px-4 cursor-pointer hover:text-slate-900 transition"
                >
                  <div className="flex items-center gap-1">
                    Last Activity <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCriminals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-10 text-center text-slate-400 text-xs">
                    No suspect records match the selected intelligence filters.
                  </td>
                </tr>
              ) : (
                filteredCriminals.map((criminal) => (
                  <tr
                    key={criminal.id}
                    onClick={() => onSelectCriminal(criminal)}
                    className="hover:bg-slate-50/80 cursor-pointer transition group"
                  >
                    {/* Criminal ID */}
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {criminal.criminalId}
                    </td>

                    {/* Suspect & Alias */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={criminal.photoUrl}
                          alt={criminal.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80';
                          }}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 bg-slate-100 shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {criminal.name}
                          </div>
                          <div className="text-[11px] text-slate-400 italic">
                            "{criminal.alias}"
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Crime Category */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-800">{criminal.crimeCategory}</span>
                      <div className="text-[10px] text-slate-400">
                        {criminal.nationality}
                      </div>
                    </td>

                    {/* Risk Score */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs">
                          {criminal.riskScore}
                        </span>
                        <div className="w-12 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            style={{ width: `${criminal.riskScore}%` }}
                            className={`h-full rounded-full ${
                              criminal.riskScore >= 90
                                ? 'bg-red-600'
                                : criminal.riskScore >= 75
                                ? 'bg-amber-500'
                                : 'bg-blue-600'
                            }`}
                          />
                        </div>
                      </div>
                      <div className="mt-1">
                        <RiskBadge level={criminal.riskLevel} />
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4 text-slate-700">
                      <div className="font-medium">{criminal.lastKnownLocation?.city || 'Classified'}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                        {criminal.lastKnownLocation?.country || 'India'}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <StatusBadge status={criminal.status} />
                    </td>

                    {/* Last Activity */}
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {formatRelativeTime(criminal.lastActivity)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {onEditCriminal && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-6 px-2 text-[11px] gap-1 hover:bg-slate-100 text-slate-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditCriminal(criminal);
                            }}
                            title="Edit Suspect Dossier"
                          >
                            <Edit className="w-3 h-3" /> Edit
                          </Button>
                        )}
                        {onDeleteCriminal && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="h-6 px-1.5 text-[11px] text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteCriminal(criminal);
                            }}
                            title="Permanently Delete Dossier"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-6 px-2 text-[11px] gap-1 bg-slate-900 hover:bg-slate-800 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectCriminal(criminal);
                          }}
                          title="Open Detailed Intelligence Dossier"
                        >
                          <Eye className="w-3 h-3" /> Dossier
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
