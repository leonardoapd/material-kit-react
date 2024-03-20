import { apiClient } from 'src/api/api-client';

export const getEmployees = async () => {
  const response = await apiClient.get('accountable');
  return response.data;
};

export const createEmployee = async (employeeData) => {
  const response = await apiClient.post('accountable', employeeData);
  return response.data;
};

export const updateEmployee = async (employeeData) => {
  const response = await apiClient.put(`accountable/${employeeData.id}`, employeeData);
  return response.data;
};

export const deleteEmployee = async (employeeId) => {
  const response = await apiClient.delete(`accountable/${employeeId}`);
  return response.data;
};

export const getEmployee = async (employeeId) => {
  const response = await apiClient.get(`accountable/${employeeId}`);
  return response.data;
};
