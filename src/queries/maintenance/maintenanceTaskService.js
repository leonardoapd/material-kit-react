import { apiClient } from '../../api/api-client';

export const getMaintenanceTasks = async () => {
  const response = await apiClient.get('maintenancetask');
  return response.data;
};

export const updateMaintenanceTask = async (maintenanceTask) => {
  const response = await apiClient.put(`maintenancetask/${maintenanceTask.id}`, maintenanceTask);
  return response.data;
};