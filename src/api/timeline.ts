import { apiClient } from './axios';
import { dummyTimelineEvents } from '../data/dummy';
import { TimelineEvent } from '../types';

export const getTimelineEvents = async (criminalId?: string): Promise<{ data: TimelineEvent[]; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<TimelineEvent[]>('/timeline', { params: { criminalId } });
    if (res.data && res.data.length > 0) {
      return { data: res.data, isFallback: false };
    }
    if (criminalId) {
      const filtered = dummyTimelineEvents.filter(e => e.criminalId === criminalId);
      return { data: filtered.length > 0 ? filtered : dummyTimelineEvents, isFallback: true };
    }
    return { data: dummyTimelineEvents, isFallback: true };
  } catch (error) {
    if (criminalId) {
      const filtered = dummyTimelineEvents.filter(e => e.criminalId === criminalId);
      return { data: filtered.length > 0 ? filtered : dummyTimelineEvents, isFallback: true };
    }
    return { data: dummyTimelineEvents, isFallback: true };
  }
};
