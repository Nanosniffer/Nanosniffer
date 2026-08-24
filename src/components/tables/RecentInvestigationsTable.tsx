import React from 'react';
import { Investigation } from '../../types';
import { RiskBadge } from '../common/StatusBadge';
import { formatDate } from '../../utils/formatters';
import { ShieldAlert, ChevronRight, UserCheck } from 'lucide-react';
import { Button } from '../ui/button';

interface RecentInvestigationsTableProps {
  investigations: Investigation[];
}

export const RecentInvestigationsTable: React.FC<RecentInvestigationsTableProps> = ({
  investigations,
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-agency-900/90 glass-panel overflow-hidden">
      <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-cyber-cyan" />
          <h3 className="text-sm font-bold text-slate-100">Active High-Priority Task Force Cases</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">{investigations.length} Active Joint Operations</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-agency-950/80 text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Case Number</th>
              <th className="py-3 px-4">Investigation Title</th>
              <th className="py-3 px-4">Lead Officer</th>
              <th className="py-3 px-4">Priority</th>
              <th className="py-3 px-4">Progress</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {investigations.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-800/40 transition">
                <td className="py-3 px-4 font-mono font-bold text-cyber-cyan">
                  {inv.caseNumber}
                </td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-200">{inv.title}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Target: {inv.targetSyndicate} • {inv.totalSuspects} Suspects
                  </div>
                </td>
                <td className="py-3 px-4 font-mono text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    <span>{inv.leadOfficer}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{inv.leadOfficerBadge}</span>
                </td>
                <td className="py-3 px-4">
                  <RiskBadge level={inv.priority} />
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
                      <div
                        style={{ width: `${inv.progressPercent}%` }}
                        className="h-full bg-cyber-cyan"
                      />
                    </div>
                    <span className="font-mono text-slate-300">{inv.progressPercent}%</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-right font-mono font-semibold text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-agency-950 border border-slate-700 text-xs">
                    {inv.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
