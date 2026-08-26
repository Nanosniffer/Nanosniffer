import { apiClient } from './axios';
import { dummyDashboardSummary } from '../data/dummy';
import { DashboardSummary } from '../types';
import { getAllMergedCriminals, getStoredCustomCriminals } from './criminals';

export const getDashboardSummary = async (): Promise<{ data: DashboardSummary; isFallback: boolean }> => {
  const allCriminals = getAllMergedCriminals();
  const custom = getStoredCustomCriminals();

  // Dynamically compute real dashboard metrics
  const totalSuspects = allCriminals.length;
  const highRiskIndividuals = allCriminals.filter(c => c.riskLevel === 'CRITICAL' || c.riskLevel === 'HIGH').length;
  const activeInvestigations = 14 + custom.length;
  const recentAlertsCount = 8 + custom.length;

  // Prepend recent activity feed for custom suspects
  const customActivities = custom.map(c => ({
    id: `act-${c.id}`,
    timestamp: c.lastActivity || new Date().toISOString(),
    message: `Target dossier registered for ${c.name} ("${c.alias}") • Threat Index: ${c.riskScore}/100.`,
    type: 'alert' as const,
    actor: 'Lead Tactical Investigator'
  }));

  const mergedSummary: DashboardSummary = {
    ...dummyDashboardSummary,
    totalSuspects,
    activeInvestigations,
    highRiskIndividuals,
    recentAlertsCount,
    recentActivityFeed: [...customActivities, ...(dummyDashboardSummary.recentActivityFeed || [])]
  };

  return { data: mergedSummary, isFallback: true };
};
