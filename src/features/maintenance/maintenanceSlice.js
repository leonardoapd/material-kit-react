import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getMaintenance,
  createMaintenance,
  updateMaintenance,
  deleteMaintenance,
} from 'src/queries/maintenance/maintenanceService';

export const fetchMaintenance = createAsyncThunk('maintenance/fetchMaintenance', async () => {
  const response = await getMaintenance();
  return response;
});

export const addMaintenance = createAsyncThunk(
  'maintenance/addMaintenance',
  async (maintenanceData) => {
    const response = await createMaintenance(maintenanceData);
    return response;
  }
);

export const editMaintenance = createAsyncThunk(
  'maintenance/editMaintenance',
  async (maintenanceData) => {
    const response = await updateMaintenance(maintenanceData);
    return response;
  }
);

export const removeMaintenance = createAsyncThunk(
  'maintenance/removeMaintenance',
  async (maintenanceId) => {
    const response = await deleteMaintenance(maintenanceId);
    return response;
  }
);

const initialState = {
  maintenance: [],
  isLoading: 'idle',
  error: null,
};

export const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenance.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchMaintenance.fulfilled, (state, action) => {
        state.isLoading = 'succeded';
        state.maintenance = action.payload;
      })
      .addCase(fetchMaintenance.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
      .addCase(addMaintenance.fulfilled, (state, action) => {
        if (Array.isArray(action.payload) && action.payload.length > 0) {
          action.payload.forEach((maintenance) => {
            state.maintenance.push(maintenance);
          });
        }
      })
      .addCase(editMaintenance.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingMaintenanceIndex = state.maintenance.findIndex(
          (maintenance) => maintenance.id === id
        );
        state.maintenance[existingMaintenanceIndex] = action.payload;
      })
      .addCase(removeMaintenance.fulfilled, (state, action) => {
        state.maintenance = state.maintenance.filter(
          (maintenance) => maintenance.id !== action.payload.id
        );
      });
  },
});

export const selectMaintenance = (state) => state.maintenance.maintenance;
export const selectMaintenanceById = (state, maintenanceId) =>
  state.maintenance.maintenance.find((maintenance) => maintenance.id === maintenanceId);
export const selectMaintenanceStatus = (state) => state.maintenance.isLoading;
export const selectMaintenanceError = (state) => state.maintenance.error;

export default maintenanceSlice.reducer;
