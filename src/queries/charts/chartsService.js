import { apiClient } from 'src/api/api-client';

export const getMaintenanceComplience = async () => {
  const response = await apiClient.get('maintenancechart/monthly-completion');
  return response.data;
};

export const getMaintenanceCost = async () => {
  const response = await apiClient.get('maintenancechart/monthly-cost');
  return response.data;
};

export const getMaintenanceTypes = async () => {
  const response = await apiClient.get('maintenancechart/maintenance-types');
  return response.data;
};

export const getMaintenanceStatus = async () => {
  const response = await apiClient.get('maintenancechart/maintenance-status');
  return response.data;
};

