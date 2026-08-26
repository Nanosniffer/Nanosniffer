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

const STORAGE_KEY = 'acn_custom_criminals';

export const getStoredCustomCriminals = (): Criminal[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading custom criminals from localStorage:', err);
  }
  return [];
};

export const saveCustomCriminal = (criminal: Criminal) => {
  try {
    const existing = getStoredCustomCriminals();
    const updated = [criminal, ...existing.filter(c => c.id !== criminal.id && c.criminalId !== criminal.criminalId)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    // Also prepend to in-memory dummy list
    const foundIdx = dummyCriminals.findIndex(c => c.id === criminal.id || c.criminalId === criminal.criminalId);
    if (foundIdx >= 0) {
      dummyCriminals[foundIdx] = criminal;
    } else {
      dummyCriminals.unshift(criminal);
    }
  } catch (err) {
    console.error('Error saving custom criminal to localStorage:', err);
  }
};

export const getAllMergedCriminals = (): Criminal[] => {
  const custom = getStoredCustomCriminals();
  if (custom.length === 0) return dummyCriminals;
  
  const customIds = new Set(custom.map(c => c.id));
  const customCriminalIds = new Set(custom.map(c => c.criminalId));
  const remainingDummies = dummyCriminals.filter(d => !customIds.has(d.id) && !customCriminalIds.has(d.criminalId));
  return [...custom, ...remainingDummies];
};

export const getCriminals = async (filters?: CriminalFilterParams): Promise<{ data: Criminal[]; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<Criminal[]>('/criminals', { params: filters });
    if (res.data && res.data.length > 0) {
      // Merge with custom locally registered profiles
      const custom = getStoredCustomCriminals();
      const customIds = new Set(custom.map(c => c.id));
      const backendFiltered = res.data.filter(c => !customIds.has(c.id));
      return { data: [...custom, ...backendFiltered], isFallback: false };
    }
    return { data: getAllMergedCriminals(), isFallback: true };
  } catch (error) {
    return { data: getAllMergedCriminals(), isFallback: true };
  }
};

export const createCriminal = async (criminalData: Criminal): Promise<{ data: Criminal; isFallback: boolean }> => {
  try {
    const res = await apiClient.post<Criminal>('/criminals', criminalData);
    if (res.data) {
      saveCustomCriminal(res.data);
      return { data: res.data, isFallback: false };
    }
  } catch (error) {
    // Standalone / GitHub Pages Fallback
  }
  saveCustomCriminal(criminalData);
  return { data: criminalData, isFallback: true };
};

export const getCriminalById = async (id: string): Promise<{ data: Criminal | null; isFallback: boolean }> => {
  const all = getAllMergedCriminals();
  const found = all.find((c) => c.id === id || c.criminalId === id) || null;
  return { data: found, isFallback: true };
};
