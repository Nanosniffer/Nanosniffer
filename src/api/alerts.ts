import { apiClient } from './axios';
import { dummyAlerts } from '../data/dummy';
import { Alert } from '../types';
import { getStoredCustomCriminals } from './criminals';

export const getAlerts = async (): Promise<{ data: Alert[]; isFallback: boolean }> => {
  const custom = getStoredCustomCriminals();
  
  // Dynamically generate real-time alerts for custom created suspects
  const customAlerts: Alert[] = custom.map((c, i) => ({
    id: `alert-custom-${c.id}`,
    alertCode: `ALT-${Math.floor(8000 + Math.random() * 1000)}`,
    title: `DEFCON INTERDICTION: Target ${c.name} ("${c.alias}")`,
    alertLevel: c.riskLevel,
    aiConfidence: c.riskScore,
    description: `Real-time biometric surveillance confirmed active operational telemetry for ${c.name} (${c.crimeCategory}). Risk score: ${c.riskScore}/100.`,
    relatedCriminals: [
      { id: c.id, name: c.name, alias: c.alias, riskScore: c.riskScore }
    ],
    location: {
      name: c.lastKnownLocation?.address || 'Tactical Sector',
      city: c.lastKnownLocation?.city || 'Mumbai',
      coordinates: c.lastKnownLocation?.coordinates || [19.0176, 72.8150]
    },
    timestamp: c.lastActivity || new Date().toISOString(),
    category: 'Geofence Breach',
    status: 'NEW',
    suggestedAction: `Deploy regional interdiction units and monitor active wiretaps across ${c.lastKnownLocation?.city || 'the target area'}.`
  }));

  const allAlerts = [...customAlerts, ...dummyAlerts];
  return { data: allAlerts, isFallback: true };
};

export const updateAlertStatus = async (id: string, status: Alert['status']): Promise<{ success: boolean }> => {
  const alert = dummyAlerts.find(a => a.id === id);
  if (alert) alert.status = status;
  return { success: true };
};
