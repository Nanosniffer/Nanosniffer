import { apiClient } from './axios';
import { dummyDashboardSummary } from '../data/dummy';
import { DashboardSummary } from '../types';

export const getDashboardSummary = async (): Promise<{ data: DashboardSummary; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<DashboardSummary>('/dashboard/summary');
    if (res.data && Object.keys(res.data).length > 0) {
      return { data: res.data, isFallback: false };
    }
    return { data: dummyDashboardSummary, isFallback: true };
  } catch (error) {
    return { data: dummyDashboardSummary, isFallback: true };
  }
};
