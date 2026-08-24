import { apiClient } from './axios';
import { dummyNetworkGraph } from '../data/dummy';
import { NetworkGraphData } from '../types';

export const getNetworkGraph = async (): Promise<{ data: NetworkGraphData; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<NetworkGraphData>('/network/graph');
    if (res.data && res.data.nodes?.length > 0) {
      return { data: res.data, isFallback: false };
    }
    return { data: dummyNetworkGraph, isFallback: true };
  } catch (error) {
    return { data: dummyNetworkGraph, isFallback: true };
  }
};
