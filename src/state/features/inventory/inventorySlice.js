import { useQuery } from 'react-query';
import { createSlice } from '@reduxjs/toolkit';

import { getInventory} from 'src/queries/inventory/inventoryService';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    fetchInventoryDataStart(state) {
      state.isLoading = true;
      state.isError = false;
    },
    fetchInventoryDataSuccess(state, action) {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    },
    fetchInventoryDataFailure(state) {
      state.isLoading = false;
      state.isError = true;
    },
    addItem(state, action) {
      state.data.push(action.payload);
    },
    updateItem(state, action) {
      const { id, ...newData } = action.payload;
      const index = state.data.findIndex((item) => item.id === id);
      state.data[index] = { ...state.data[index], ...newData };
    },
    removeItem(state, action) {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  fetchInventoryDataStart,
  fetchInventoryDataSuccess,
  fetchInventoryDataFailure,
  addItem,
  updateItem,
  removeItem,
} = inventorySlice.actions;

export default inventorySlice.reducer;

export const useInventoryDataQuery = () => useQuery('inventory', getInventory)

