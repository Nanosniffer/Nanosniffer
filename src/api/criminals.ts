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
const DELETED_STORAGE_KEY = 'acn_deleted_criminals';

export const getStoredDeletedCriminalIds = (): string[] => {
  try {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem(DELETED_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading deleted criminals from localStorage:', err);
  }
  return [];
};

export const getStoredCustomCriminals = (): Criminal[] => {
  try {
    if (typeof window === 'undefined') return [];
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
    const filteredExisting = existing.filter(c => c.id !== criminal.id && c.criminalId !== criminal.criminalId);
    const updated = [criminal, ...filteredExisting];
    
    // Also remove from deleted set if re-added
    const deletedIds = getStoredDeletedCriminalIds().filter(id => id !== criminal.id && id !== criminal.criminalId);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(deletedIds));
    }
    
    // Also prepend to in-memory dummy list ensuring no duplicate
    const foundIdx = dummyCriminals.findIndex(c => c.id === criminal.id || c.criminalId === criminal.criminalId);
    if (foundIdx >= 0) {
      dummyCriminals[foundIdx] = criminal;
    } else {
      dummyCriminals.unshift(criminal);
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('acn_criminals_updated', { detail: updated }));
    }
  } catch (err) {
    console.error('Error saving custom criminal to localStorage:', err);
  }
};

export const deleteCriminal = async (id: string): Promise<{ success: boolean }> => {
  try {
    // 1. Remove from custom criminals in localStorage
    const existing = getStoredCustomCriminals();
    const updatedCustom = existing.filter(c => c.id !== id && c.criminalId !== id);
    
    // 2. Add to deleted blacklist in localStorage
    const deleted = getStoredDeletedCriminalIds();
    const updatedDeleted = Array.from(new Set([...deleted, id]));

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCustom));
      localStorage.setItem(DELETED_STORAGE_KEY, JSON.stringify(updatedDeleted));
    }

    // 3. Remove from in-memory dummy list
    const inMemIdx = dummyCriminals.findIndex(c => c.id === id || c.criminalId === id);
    if (inMemIdx >= 0) {
      dummyCriminals.splice(inMemIdx, 1);
    }

    // 4. Dispatch update event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('acn_criminals_updated', { detail: getAllMergedCriminals() }));
    }

    // 5. If connected to live custom backend, notify in background
    if (typeof window !== 'undefined' && !window.location.hostname.includes('github.io')) {
      try {
        await apiClient.delete(`/criminals/${id}`, { timeout: 2000 });
      } catch (e) {
        // Ignore backend background error
      }
    }

    return { success: true };
  } catch (err) {
    console.error('Error deleting criminal:', err);
    return { success: false };
  }
};

export const getAllMergedCriminals = (): Criminal[] => {
  const deletedIds = new Set(getStoredDeletedCriminalIds());
  const custom = getStoredCustomCriminals().filter(c => !deletedIds.has(c.id) && !deletedIds.has(c.criminalId));
  
  const customIds = new Set(custom.map(c => c.id));
  const customCriminalIds = new Set(custom.map(c => c.criminalId));
  const remainingDummies = dummyCriminals.filter(d => 
    !deletedIds.has(d.id) && 
    !deletedIds.has(d.criminalId) &&
    !customIds.has(d.id) && 
    !customCriminalIds.has(d.criminalId)
  );
  return [...custom, ...remainingDummies];
};

export const getCriminals = async (filters?: CriminalFilterParams): Promise<{ data: Criminal[]; isFallback: boolean }> => {
  // On GitHub Pages or static host, serve instantly from merged local database
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io')) {
    const all = getAllMergedCriminals();
    return { data: all, isFallback: true };
  }

  try {
    const res = await apiClient.get<Criminal[]>('/criminals', { params: filters, timeout: 2000 });
    if (res.data && res.data.length > 0) {
      const custom = getStoredCustomCriminals();
      const customIds = new Set(custom.map(c => c.id));
      const backendFiltered = res.data.filter(c => !customIds.has(c.id));
      return { data: [...custom, ...backendFiltered], isFallback: false };
    }
  } catch (error) {
    // Fallback instantly
  }
  return { data: getAllMergedCriminals(), isFallback: true };
};

export const createCriminal = async (criminalData: Criminal): Promise<{ data: Criminal; isFallback: boolean }> => {
  // 1. Immediately persist synchronously to localStorage and memory
  saveCustomCriminal(criminalData);

  // 2. If connected to a live custom backend, notify backend in background
  if (typeof window !== 'undefined' && !window.location.hostname.includes('github.io')) {
    try {
      await apiClient.post<Criminal>('/criminals', criminalData, { timeout: 2000 });
    } catch (error) {
      // Ignore background backend error
    }
  }

  return { data: criminalData, isFallback: true };
};

export const updateCriminal = async (criminalData: Criminal): Promise<{ data: Criminal; isFallback: boolean }> => {
  saveCustomCriminal(criminalData);

  if (typeof window !== 'undefined' && !window.location.hostname.includes('github.io')) {
    try {
      await apiClient.put<Criminal>(`/criminals/${criminalData.id}`, criminalData, { timeout: 2000 });
    } catch (error) {
      // Ignore background backend error
    }
  }

  return { data: criminalData, isFallback: true };
};

export const getCriminalById = async (id: string): Promise<{ data: Criminal | null; isFallback: boolean }> => {
  const all = getAllMergedCriminals();
  const found = all.find((c) => c.id === id || c.criminalId === id) || null;
  return { data: found, isFallback: true };
};
