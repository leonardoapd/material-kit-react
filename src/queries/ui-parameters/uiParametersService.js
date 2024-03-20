import { apiClient } from 'src/api/api-client';

export const getUiParameters = async () => {
  const response = await apiClient.get('uiparameters');
  return response.data;
};
