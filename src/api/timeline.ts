import { apiClient } from './axios';
import { dummyTimelineEvents } from '../data/dummy';
import { TimelineEvent } from '../types';
import { getAllMergedCriminals } from './criminals';

export const getTimelineEvents = async (criminalId?: string): Promise<{ data: TimelineEvent[]; isFallback: boolean }> => {
  const allCriminals = getAllMergedCriminals();
  
  // Aggregate custom timeline events logged across all custom suspects
  const customEvents: TimelineEvent[] = [];
  allCriminals.forEach(c => {
    (c.timeline || []).forEach(evt => {
      customEvents.push({
        ...evt,
        criminalId: c.id
      });
    });
  });

  const merged = [...customEvents, ...dummyTimelineEvents];

  if (criminalId) {
    const filtered = merged.filter(e => e.criminalId === criminalId);
    return { data: filtered.length > 0 ? filtered : merged, isFallback: true };
  }

  return { data: merged, isFallback: true };
};
