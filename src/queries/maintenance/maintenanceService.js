import { apiClient } from '../../api/api-client';

export const getMaintenance = async () => {
  const response = await apiClient.get('maintenance');
  return response.data;
};

export const createMaintenance = async (maintenanceData) => {
  const response = await apiClient.post('maintenance', maintenanceData);
  return response.data;
};

export const updateMaintenance = async (maintenanceData) => {
  const response = await apiClient.put(`maintenance/${maintenanceData.id}`, maintenanceData);
  return response.data;
};

export const updateMaintenanceStatus = async (maintenanceData) => {
  const response = await apiClient.put(`maintenance/update-status/${maintenanceData.id}`, maintenanceData);
  return response.data;
}

export const deleteMaintenance = async (maintenanceId) => {
  const response = await apiClient.delete(`maintenance/${maintenanceId}`);
  return response.data;
};
