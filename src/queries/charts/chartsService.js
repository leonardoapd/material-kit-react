import { apiClient } from 'src/api/api-client';

export const getMaintenanceComplience = async () => {
  const response = await apiClient.get('maintenancechart/monthly-completion');
  return response.data;
};

export const getMaintenanceCost = async () => {
  const response = await apiClient.get('maintenancechart/maintenance-costs');
  return response.data;
};

export const getMaintenanceTypes = async () => {
  const response = await apiClient.get('maintenancechart/maintenance-types');
  return response.data;
};

export const getMaintenanceCounts = async () => {
  const response = await apiClient.get('maintenancechart/maintenance-counts');
  return response.data;
};

