import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReports } from '../api';
import { ReportCard } from '../components/cards/ReportCard';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { ErrorFallback } from '../components/common/ErrorFallback';
import { InvestigationReport } from '../types';
import { FileText, Download, X, Printer, Shield, CheckCircle2, FileCode } from 'lucide-react';
import { Button } from '../components/ui/button';
import { downloadJSON, triggerPrintDossier } from '../utils/exportUtils';
import { formatDate } from '../utils/formatters';

export const InvestigationReports: React.FC = () => {
  const [previewReport, setPreviewReport] = useState<InvestigationReport | null>(null);

  const { data: reportsRes, isLoading, refetch } = useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
  });

  const reports = reportsRes?.data || [];
  const isFallback = reportsRes?.isFallback ?? false;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyber-cyan uppercase tracking-wider font-semibold">
              EXECUTIVE INTELLIGENCE BRIEFS
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-agency-900 border border-slate-700 text-slate-400">
              {reports.length} READY FOR EXPORT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
            Investigation Reports & Dossiers
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="cyan"
            size="sm"
            onClick={() => downloadJSON(reports, 'All_Investigation_Reports.json')}
            className="text-xs gap-1.5 shadow-neon-cyan"
          >
            <Download className="w-3.5 h-3.5" /> Export All (JSON Bundle)
          </Button>
        </div>
      </div>

      {isFallback && (
        <ErrorFallback
          title="Intelligence Reports Archive Active"
          message="FastAPI backend offline. Displaying 6 full forensic and AI recommendation dossiers from local cache."
          onRetry={() => refetch()}
        />
      )}

      {/* Reports Grid */}
      {isLoading ? (
        <TableSkeleton rows={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reports.map((rep) => (
            <ReportCard
              key={rep.id}
              report={rep}
              onPreview={(r) => setPreviewReport(r)}
            />
          ))}
        </div>
      )}

      {/* Printable Report Preview Dialog */}
      {previewReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-agency-950 border border-cyber-cyan/50 rounded-2xl shadow-2xl overflow-y-auto glass-panel p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-cyber-cyan bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/40">
                    {previewReport.reportNumber}
                  </span>
                  <span className="text-xs font-mono font-bold text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-500/40">
                    {previewReport.classificationLevel}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-100">{previewReport.title}</h2>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Author: <span className="text-slate-200">{previewReport.author}</span> • Date: {formatDate(previewReport.dateGenerated)}
                </p>
              </div>

              <button
                onClick={() => setPreviewReport(null)}
                className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase text-cyber-cyan tracking-wider font-bold">
                Executive Intelligence Summary
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed bg-agency-900/90 p-4 rounded-xl border border-slate-800">
                {previewReport.summary}
              </p>
            </div>

            {/* Target & Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              {Object.entries(previewReport.metrics).map(([key, val]) => (
                <div key={key} className="p-3 rounded-lg bg-agency-900 border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase block truncate">{key}</span>
                  <span className="text-cyber-cyan font-bold text-sm block mt-0.5 truncate">{String(val)}</span>
                </div>
              ))}
            </div>

            {/* Key Findings List */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider font-bold">
                Key Analytical Findings & Evidence Trail
              </h3>
              <div className="space-y-2">
                {previewReport.keyFindings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-agency-900/60 border border-slate-800 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyber-cyan shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewReport(null)}
                className="text-xs"
              >
                Close Preview
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => triggerPrintDossier(previewReport.title)}
                  className="text-xs gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </Button>
                <Button
                  variant="cyan"
                  size="sm"
                  onClick={() => downloadJSON(previewReport, `${previewReport.reportNumber}.json`)}
                  className="text-xs gap-1.5 shadow-neon-cyan"
                >
                  <Download className="w-3.5 h-3.5" /> Export JSON
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
