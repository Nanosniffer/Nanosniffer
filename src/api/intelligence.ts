import { apiClient } from './axios';
import { dummyIntelligenceFeed } from '../data/dummy';
import { IntelligenceFeedItem } from '../types';

export const getIntelligenceFeed = async (): Promise<{ data: IntelligenceFeedItem[]; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<IntelligenceFeedItem[]>('/intelligence/feed');
    if (res.data && res.data.length > 0) {
      return { data: res.data, isFallback: false };
    }
    return { data: dummyIntelligenceFeed, isFallback: true };
  } catch (error) {
    return { data: dummyIntelligenceFeed, isFallback: true };
  }
};
