import { apiClient } from './axios';
import { dummyAlerts } from '../data/dummy';
import { Alert } from '../types';

export const getAlerts = async (): Promise<{ data: Alert[]; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<Alert[]>('/alerts');
    if (res.data && res.data.length > 0) {
      return { data: res.data, isFallback: false };
    }
    return { data: dummyAlerts, isFallback: true };
  } catch (error) {
    return { data: dummyAlerts, isFallback: true };
  }
};

export const updateAlertStatus = async (id: string, status: Alert['status']): Promise<{ success: boolean }> => {
  try {
    await apiClient.patch(`/alerts/${id}`, { status });
    return { success: true };
  } catch (error) {
    // In offline mode, simulated success
    const alert = dummyAlerts.find(a => a.id === id);
    if (alert) alert.status = status;
    return { success: true };
  }
};
