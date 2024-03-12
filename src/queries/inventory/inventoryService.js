import axios from 'axios';

const API_URL = 'https://65e0cd42d3db23f7624a1ba4.mockapi.io/api/v1/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getInventory = async () => {
  const response = await api.get('inventory');
  return response.data;
};

export const createEquipment = async (equipmentData) => {
  const response = await api.post('inventory', equipmentData);
  return response.data;
};

export const updateEquipment = async (equipmentData) => {
  const response = await api.put(`inventory/${equipmentData.id}`, equipmentData);
  return response.data;
};

export const deleteEquipment = async (equipmentId) => {
  const response = await api.delete(`inventory/${equipmentId}`);
  return response.data;
};

