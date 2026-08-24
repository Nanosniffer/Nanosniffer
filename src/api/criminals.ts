import { apiClient } from './axios';
import { dummyCriminals } from '../data/dummy';
import { Criminal } from '../types';

export interface CriminalFilterParams {
  crimeType?: string;
  riskLevel?: string;
  city?: string;
  status?: string;
  searchQuery?: string;
}

export const getCriminals = async (filters?: CriminalFilterParams): Promise<{ data: Criminal[]; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<Criminal[]>('/criminals', { params: filters });
    if (res.data && res.data.length > 0) {
      return { data: res.data, isFallback: false };
    }
    return { data: dummyCriminals, isFallback: true };
  } catch (error) {
    return { data: dummyCriminals, isFallback: true };
  }
};

export const getCriminalById = async (id: string): Promise<{ data: Criminal | null; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<Criminal>(`/criminals/${id}`);
    if (res.data) {
      return { data: res.data, isFallback: false };
    }
    const found = dummyCriminals.find((c) => c.id === id || c.criminalId === id) || null;
    return { data: found, isFallback: true };
  } catch (error) {
    const found = dummyCriminals.find((c) => c.id === id || c.criminalId === id) || null;
    return { data: found, isFallback: true };
  }
};
