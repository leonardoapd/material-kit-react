import { apiClient } from '../../api/api-client';

export const getInventory = async () => {
  const response = await apiClient.get('equipment');
  return response.data;
};

export const createEquipment = async (equipmentData) => {
  const response = await apiClient.post('equipment', equipmentData);
  return response.data;
};

export const updateEquipment = async (equipmentData) => {
  const response = await apiClient.put(`equipment/${equipmentData.id}`, equipmentData);
  return response.data;
};

export const deleteEquipment = async (equipmentId) => {
  const response = await apiClient.delete(`equipment/${equipmentId}`);
  return response.data;
};

