import { apiClient } from './axios';
import { dummyOrganizations, dummyLocations, dummyTransactions, dummyPhoneRecords } from '../data/dummy';
import { Organization, LocationEntity, FinancialTransaction, PhoneRecord } from '../types';

export const getEntities = async () => {
  try {
    const res = await apiClient.get('/entities');
    if (res.data) return { data: res.data, isFallback: false };
    return {
      data: {
        organizations: dummyOrganizations,
        locations: dummyLocations,
        transactions: dummyTransactions,
        phones: dummyPhoneRecords,
      },
      isFallback: true,
    };
  } catch (error) {
    return {
      data: {
        organizations: dummyOrganizations,
        locations: dummyLocations,
        transactions: dummyTransactions,
        phones: dummyPhoneRecords,
      },
      isFallback: true,
    };
  }
};

export const getLocations = async (): Promise<{ data: LocationEntity[]; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<LocationEntity[]>('/locations');
    if (res.data && res.data.length > 0) return { data: res.data, isFallback: false };
    return { data: dummyLocations, isFallback: true };
  } catch (error) {
    return { data: dummyLocations, isFallback: true };
  }
};

export const getOrganizations = async (): Promise<{ data: Organization[]; isFallback: boolean }> => {
  try {
    const res = await apiClient.get<Organization[]>('/organizations');
    if (res.data && res.data.length > 0) return { data: res.data, isFallback: false };
    return { data: dummyOrganizations, isFallback: true };
  } catch (error) {
    return { data: dummyOrganizations, isFallback: true };
  }
};
