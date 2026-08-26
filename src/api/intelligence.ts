import { apiClient } from './axios';
import { dummyIntelligenceFeed } from '../data/dummy';
import { IntelligenceFeedItem } from '../types';
import { getStoredCustomCriminals } from './criminals';

export const getIntelligenceFeed = async (): Promise<{ data: IntelligenceFeedItem[]; isFallback: boolean }> => {
  const custom = getStoredCustomCriminals();

  // Generate dynamic telemetry intercepts for newly added suspects
  const customFeed: IntelligenceFeedItem[] = custom.map((c) => ({
    id: `feed-custom-${c.id}`,
    type: 'surveillance',
    title: `Target Telemetry Active: ${c.name} (${c.alias})`,
    source: (c.phoneNumbers && c.phoneNumbers.length > 0) ? 'SIGINT Wiretap Node' : 'Field HUMINT Intercept',
    timestamp: c.lastActivity || new Date().toISOString(),
    confidenceScore: c.riskScore || 90,
    summary: `Interdiction signal logged for ${c.name} in ${c.lastKnownLocation?.city || 'Mumbai'}. Threat risk calculated at ${c.riskScore}/100.`,
    suspectsInvolved: [
      { id: c.id, name: c.name, alias: c.alias }
    ],
    location: `${c.lastKnownLocation?.city || 'Mumbai'}, ${c.lastKnownLocation?.country || 'India'}`,
    coordinates: c.lastKnownLocation?.coordinates || [19.0176, 72.8150],
    priority: c.riskLevel,
    interceptSnippet: `VOIP & IMSI capture logged movement towards ${c.lastKnownLocation?.address || 'local hideout'}.`
  }));

  return { data: [...customFeed, ...dummyIntelligenceFeed], isFallback: true };
};
