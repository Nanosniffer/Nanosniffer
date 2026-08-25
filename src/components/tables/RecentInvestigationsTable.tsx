import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Investigation } from '../../types';
import { RiskBadge } from '../common/StatusBadge';
import { Briefcase, ArrowRight, UserCheck, Eye } from 'lucide-react';
import { Button } from '../ui/button';

interface RecentInvestigationsTableProps {
  investigations: Investigation[];
}

export const RecentInvestigationsTable: React.FC<RecentInvestigationsTableProps> = ({
  investigations,
}) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-card overflow-hidden">
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-slate-700" />
          <h3 className="text-sm font-bold text-slate-900">Priority Investigations</h3>
        </div>
        <span className="text-xs text-slate-500 font-medium">{investigations.length} Active Joint Cases</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-4">Investigation ID</th>
              <th className="py-2.5 px-4">Case Title</th>
              <th className="py-2.5 px-4">Primary Subject</th>
              <th className="py-2.5 px-4">Risk Level</th>
              <th className="py-2.5 px-4">Entities</th>
              <th className="py-2.5 px-4">Lead Officer</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {investigations.map((inv) => (
              <tr
                key={inv.id}
                onClick={() => navigate('/network')}
                className="hover:bg-slate-50/80 transition cursor-pointer group"
              >
                <td className="py-3 px-4 font-mono font-bold text-slate-900">
                  {inv.caseNumber}
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {inv.title}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Syndicate: {inv.targetSyndicate}
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-slate-700">
                  {inv.targetSyndicate || 'Elena Rostova'}
                </td>
                <td className="py-3 px-4">
                  <RiskBadge level={inv.priority} />
                </td>
                <td className="py-3 px-4 text-slate-600 font-medium">
                  {inv.totalSuspects} Nodes
                </td>
                <td className="py-3 px-4 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>{inv.leadOfficer}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{inv.leadOfficerBadge}</span>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                      inv.status === 'ACTIVE'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/network');
                    }}
                    className="h-6 px-2 text-[11px] gap-1"
                  >
                    <Eye className="w-3 h-3" /> Inspect
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
