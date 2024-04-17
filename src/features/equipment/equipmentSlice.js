import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getInventory,
  createEquipment,
  updateEquipment,
  deleteEquipment,
} from 'src/queries/inventory/inventoryService';

export const fetchEquipment = createAsyncThunk('equipment/fetchEquipment', async () => {
  const response = await getInventory();
  return response;
});

export const addEquipment = createAsyncThunk('equipment/addEquipment', async (equipmentData) => {
  const response = await createEquipment(equipmentData);
  return response;
});

export const editEquipment = createAsyncThunk('equipment/editEquipment', async (equipmentData) => {
  const response = await updateEquipment(equipmentData);
  return response;
});

export const removeEquipment = createAsyncThunk('equipment/removeEquipment', async (equipmentId) => {
    const response = await deleteEquipment(equipmentId);
    return response;
  }
);

const initialState = {
  equipment: [],
  isLoading: 'idle',
  error: null,
};

export const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipment.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchEquipment.fulfilled, (state, action) => {
        state.isLoading = 'succeded';
        state.equipment = action.payload;
      })
      .addCase(fetchEquipment.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEquipment.fulfilled, (state, action) => {
        state.equipment.push(action.payload);
      })
      .addCase(editEquipment.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingEquipmentIndex = state.equipment.findIndex(
          (equipment) => equipment.id === id
        );
        if (existingEquipmentIndex !== -1) {
          state.equipment[existingEquipmentIndex] = action.payload;
        }
      })
      .addCase(removeEquipment.fulfilled, (state, action) => {
        state.equipment = state.equipment.filter((equipment) => equipment.id !== action.payload);
      });
  },
});

export const selectEquipment = (state) => state.equipment.equipment;
export const selectEquipmentById = (state, equipmentId) => state.equipment.equipment.find((equipment) => equipment.id === equipmentId);
export const selectEquipmentStatus = (state) => state.equipment.isLoading;
export const selectEquipmentError = (state) => state.equipment.error;

export default equipmentSlice.reducer;
