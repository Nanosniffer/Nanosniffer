import { apiClient } from './axios';
import { dummyInvestigationReports } from '../data/dummy';
import { InvestigationReport } from '../types';

export const getReports = async (): Promise<{ data: InvestigationReport[]; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<InvestigationReport[]>('/reports');
    if (res.data && res.data.length > 0) {
      return { data: res.data, isFallback: false };
    }
    return { data: dummyInvestigationReports, isFallback: true };
  } catch (error) {
    return { data: dummyInvestigationReports, isFallback: true };
  }
};

export const getReportById = async (id: string): Promise<{ data: InvestigationReport | null; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<InvestigationReport>(`/reports/${id}`);
    if (res.data) return { data: res.data, isFallback: false };
    const found = dummyInvestigationReports.find(r => r.id === id || r.reportNumber === id) || null;
    return { data: found, isFallback: true };
  } catch (error) {
    const found = dummyInvestigationReports.find(r => r.id === id || r.reportNumber === id) || null;
    return { data: found, isFallback: true };
  }
};
