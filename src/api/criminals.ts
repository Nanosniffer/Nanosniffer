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

export const createCriminal = async (criminalData: Criminal): Promise<{ data: Criminal; isFallback: boolean }> => {
  try {
    const res = await apiClient.post<Criminal>('/criminals', criminalData);
    if (res.data) {
      dummyCriminals.unshift(res.data);
      return { data: res.data, isFallback: false };
    }
  } catch (error) {
    // Standalone fallback
  }
  dummyCriminals.unshift(criminalData);
  return { data: criminalData, isFallback: true };
};
