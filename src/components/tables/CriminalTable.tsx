import React, { useState, useMemo } from 'react';
import { Criminal, CrimeCategory, RiskLevel, SuspectStatus } from '../../types';
import { RiskBadge, StatusBadge } from '../common/StatusBadge';
import { formatRelativeTime } from '../../utils/formatters';
import { Search, Filter, ChevronRight, User, ShieldAlert, ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';

interface CriminalTableProps {
  criminals: Criminal[];
  onSelectCriminal: (criminal: Criminal) => void;
}

export const CriminalTable: React.FC<CriminalTableProps> = ({ criminals, onSelectCriminal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrimeType, setSelectedCrimeType] = useState<string>('ALL');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // Sorting
  const [sortField, setSortField] = useState<'riskScore' | 'name' | 'lastActivity'>('riskScore');
  const [sortAsc, setSortAsc] = useState(false);

  // Extract unique cities for filter dropdown
  const uniqueCities = useMemo(() => {
    const set = new Set(criminals.map((c) => c.lastKnownLocation.city));
    return Array.from(set).sort();
  }, [criminals]);

  // Filtered & Sorted criminals
  const filteredCriminals = useMemo(() => {
    return criminals
      .filter((c) => {
        const matchesSearch =
          !searchQuery ||
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.alias.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.criminalId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCrime = selectedCrimeType === 'ALL' || c.crimeCategory === selectedCrimeType;
        const matchesRisk = selectedRiskLevel === 'ALL' || c.riskLevel === selectedRiskLevel;
        const matchesCity = selectedCity === 'ALL' || c.lastKnownLocation.city === selectedCity;
        const matchesStatus = selectedStatus === 'ALL' || c.status === selectedStatus;

        return matchesSearch && matchesCrime && matchesRisk && matchesCity && matchesStatus;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortField === 'riskScore') comp = a.riskScore - b.riskScore;
        else if (sortField === 'name') comp = a.name.localeCompare(b.name);
        else if (sortField === 'lastActivity') comp = new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime();
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
      setSortAsc(false); // Default descending for new field
    }
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="p-4 rounded-xl bg-agency-900/90 border border-slate-800 glass-panel shadow-md space-y-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, alias, ID, tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-agency-950 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyber-cyan"
            />
          </div>

          <div className="text-xs font-mono text-slate-400">
            Displaying <span className="text-cyber-cyan font-bold">{filteredCriminals.length}</span> of {criminals.length} Dossiers
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800/80 text-xs">
          {/* Crime Type */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">CRIME TYPE</label>
            <select
              value={selectedCrimeType}
              onChange={(e) => setSelectedCrimeType(e.target.value)}
              className="w-full bg-agency-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyber-cyan"
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

          {/* Risk Level */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">RISK LEVEL</label>
            <select
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value)}
              className="w-full bg-agency-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All Threat Levels</option>
              <option value="CRITICAL">CRITICAL</option>
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">LOCATION / CITY</label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full bg-agency-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyber-cyan"
            >
              <option value="ALL">All Cities</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-[10px] font-mono text-slate-400 block mb-1">STATUS</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-agency-950 border border-slate-700 rounded px-2.5 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-cyber-cyan"
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
      <div className="rounded-xl border border-slate-800 bg-agency-900/90 glass-panel overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-agency-950/80 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Criminal ID</th>
                <th
                  onClick={() => toggleSort('name')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-200 transition"
                >
                  <div className="flex items-center gap-1">
                    Suspect & Alias <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Crime Category</th>
                <th
                  onClick={() => toggleSort('riskScore')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-200 transition"
                >
                  <div className="flex items-center gap-1">
                    Risk Score <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4">Last Known Location</th>
                <th className="py-3 px-4">Status</th>
                <th
                  onClick={() => toggleSort('lastActivity')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-200 transition"
                >
                  <div className="flex items-center gap-1">
                    Last Activity <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredCriminals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500 font-mono text-xs">
                    No suspect records match the selected intelligence criteria.
                  </td>
                </tr>
              ) : (
                filteredCriminals.map((criminal) => (
                  <tr
                    key={criminal.id}
                    onClick={() => onSelectCriminal(criminal)}
                    className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                  >
                    {/* Criminal ID */}
                    <td className="py-3 px-4 font-mono font-bold text-cyber-cyan-bright">
                      {criminal.criminalId}
                    </td>

                    {/* Suspect & Alias */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={criminal.photoUrl}
                          alt={criminal.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-700 group-hover:border-cyber-cyan transition-colors shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-slate-100 group-hover:text-cyber-cyan-bright transition-colors">
                            {criminal.name}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 italic">
                            "{criminal.alias}"
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Crime Category */}
                    <td className="py-3 px-4">
                      <span className="font-medium text-slate-300">{criminal.crimeCategory}</span>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {criminal.nationality}
                      </div>
                    </td>

                    {/* Risk Score Meter */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                          <div
                            style={{ width: `${criminal.riskScore}%` }}
                            className={`h-full ${
                              criminal.riskScore >= 90
                                ? 'bg-red-500 shadow-neon-crimson'
                                : criminal.riskScore >= 75
                                ? 'bg-amber-500'
                                : 'bg-cyan-500'
                            }`}
                          />
                        </div>
                        <span className="font-mono font-bold text-slate-200">
                          {criminal.riskScore}
                        </span>
                      </div>
                      <div className="mt-1">
                        <RiskBadge level={criminal.riskLevel} />
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4 font-mono text-slate-300">
                      <div>{criminal.lastKnownLocation.city}</div>
                      <div className="text-[10px] text-slate-500 truncate max-w-[140px]">
                        {criminal.lastKnownLocation.country}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <StatusBadge status={criminal.status} />
                    </td>

                    {/* Last Activity */}
                    <td className="py-3 px-4 font-mono text-slate-400 text-[11px]">
                      {formatRelativeTime(criminal.lastActivity)}
                    </td>

                    {/* Action Arrow */}
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1.5 text-slate-400 group-hover:text-cyber-cyan"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
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
