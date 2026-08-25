import React from 'react';
import { InvestigationReport } from '../../types';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { formatDate } from '../../utils/formatters';
import { FileText, Download, Eye, FileCode, CheckCircle2, Shield } from 'lucide-react';
import { downloadJSON, printInvestigationReport } from '../../utils/exportUtils';

interface ReportCardProps {
  report: InvestigationReport;
  onPreview: (report: InvestigationReport) => void;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report, onPreview }) => {
  return (
    <Card className="p-4 bg-white border border-slate-200 shadow-card hover:border-slate-300 transition-all flex flex-col justify-between space-y-3">
      <div>
        {/* Classification & Number */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
            {report.reportNumber}
          </span>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
              report.classificationLevel.includes('TOP SECRET')
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
            }`}
          >
            {report.classificationLevel}
          </span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">{report.title}</h3>
        <p className="text-xs text-slate-600 mb-3 line-clamp-2 leading-relaxed">{report.summary}</p>

        {/* Metadata info */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-md bg-slate-50 border border-slate-100 text-xs mb-3">
          <div>
            <span className="text-slate-400 block text-[10px]">TARGET ENTITY</span>
            <span className="text-slate-800 font-semibold truncate block">{report.targetEntity}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">DATE GENERATED</span>
            <span className="text-slate-700 truncate block font-mono text-[11px]">{formatDate(report.dateGenerated)}</span>
          </div>
        </div>

        {/* Key findings highlights */}
        <div className="space-y-1.5 mb-2">
          <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
            Executive Findings
          </span>
          {report.keyFindings.slice(0, 2).map((kf, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
              <span className="line-clamp-2 leading-relaxed text-[11px]">{kf}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onPreview(report)}
          className="text-xs h-7 gap-1.5 flex-1"
        >
          <Eye className="w-3.5 h-3.5" /> Preview Report
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => printInvestigationReport(report)}
          className="text-xs h-7 gap-1 px-2.5"
        >
          <Download className="w-3.5 h-3.5" /> PDF
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => downloadJSON(report, `${report.reportNumber}.json`)}
          title="Export JSON"
          className="text-xs h-7 px-2"
        >
          <FileCode className="w-3.5 h-3.5 text-slate-500" />
        </Button>
      </div>
    </Card>
  );
};
