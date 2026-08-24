import React from 'react';
import { InvestigationReport } from '../../types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { formatDate } from '../../utils/formatters';
import { FileText, Download, Eye, FileCode, Shield, CheckCircle2 } from 'lucide-react';
import { downloadJSON, triggerPrintDossier } from '../../utils/exportUtils';

interface ReportCardProps {
  report: InvestigationReport;
  onPreview: (report: InvestigationReport) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onPreview }) => {
  return (
    <Card className="p-5 bg-agency-900/90 border-slate-800 hover:border-cyber-cyan/40 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Classification & Number */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="text-xs font-mono font-bold text-cyber-cyan bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
            {report.reportNumber}
          </span>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-500/40">
            {report.classificationLevel}
          </span>
        </div>

        <h3 className="text-base font-bold text-slate-100 mb-1.5">{report.title}</h3>
        <p className="text-xs text-slate-400 mb-3 line-clamp-2">{report.summary}</p>

        {/* Metadata info */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-agency-950/80 border border-slate-800 text-xs font-mono mb-3">
          <div>
            <span className="text-slate-500 block text-[10px]">TARGET ENTITY</span>
            <span className="text-slate-200 truncate block">{report.targetEntity}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">GENERATED DATE</span>
            <span className="text-slate-200 truncate block">{formatDate(report.dateGenerated)}</span>
          </div>
        </div>

        {/* Key findings highlights */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[10px] font-mono uppercase text-slate-400 tracking-wider block">
            Key Findings Summary
          </span>
          {report.keyFindings.slice(0, 2).map((kf, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyber-cyan shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-relaxed">{kf}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPreview(report)}
          className="text-xs py-1 gap-1.5 flex-1"
        >
          <Eye className="w-3.5 h-3.5" /> Preview Report
        </Button>
        <Button
          variant="cyan"
          size="sm"
          onClick={() => triggerPrintDossier(report.title)}
          className="text-xs py-1 gap-1"
        >
          <Download className="w-3.5 h-3.5" /> PDF
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => downloadJSON(report, `${report.reportNumber}.json`)}
          title="Export JSON"
          className="text-xs py-1 p-2"
        >
          <FileCode className="w-4 h-4 text-purple-400" />
        </Button>
      </div>
    </Card>
  );
};
