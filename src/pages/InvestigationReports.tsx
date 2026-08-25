import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReports } from '../api';
import { ReportCard } from '../components/cards/ReportCard';
import { TableSkeleton } from '../components/common/SkeletonLoaders';
import { InvestigationReport } from '../types';
import { FileText, X, Printer, CheckCircle2, RefreshCw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { printInvestigationReport } from '../utils/exportUtils';
import { formatDate } from '../utils/formatters';

export const InvestigationReports: React.FC = () => {
  const [previewReport, setPreviewReport] = useState<InvestigationReport | null>(null);

  const { data: reportsRes, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
  });

  const reports = reportsRes?.data || [];

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-lg border border-slate-200 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              EXECUTIVE INTELLIGENCE BRIEFS
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
              {reports.length} Reports Logged
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Investigation Reports & Intelligence Briefs
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Formal intelligence assessments, multi-tier evidence summaries, and forensic link graphs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => refetch()}
            disabled={isFetching}
            className="gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </Button>
        </div>
      </div>

      {/* Reports Grid */}
      {isLoading ? (
        <TableSkeleton rows={4} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-100">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-slate-200 rounded-xl shadow-2xl overflow-y-auto p-6 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {previewReport.reportNumber}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                    {previewReport.classificationLevel}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900">{previewReport.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  Author: {previewReport.author} • Generated: {formatDate(previewReport.dateGenerated)}
                </p>
              </div>

              <button
                onClick={() => setPreviewReport(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Executive Summary */}
            <div className="space-y-1.5">
              <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Executive Intelligence Summary
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                {previewReport.summary}
              </p>
            </div>

            {/* Target & Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {Object.entries(previewReport.metrics).map(([key, val]) => (
                <div key={key} className="p-2.5 rounded-md bg-white border border-slate-200">
                  <span className="text-slate-400 text-[10px] uppercase block truncate">{key}</span>
                  <span className="text-slate-900 font-bold text-sm block mt-0.5 truncate">{String(val)}</span>
                </div>
              ))}
            </div>

            {/* Key Findings List */}
            <div className="space-y-2">
              <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Key Analytical Findings & Evidence Trail
              </h3>
              <div className="space-y-1.5">
                {previewReport.keyFindings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded-md bg-slate-50 border border-slate-100 text-xs text-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-[11px]">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPreviewReport(null)}
                className="text-xs h-8"
              >
                Close Preview
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => printInvestigationReport(previewReport)}
                  className="text-xs h-8 gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
