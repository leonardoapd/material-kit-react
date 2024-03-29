import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getMaintenanceCost, getMaintenanceComplience} from 'src/queries/charts/chartsService';

export const fetchMaintenanceComplience = createAsyncThunk(
  'charts/fetchMaintenanceComplience',
  async () => {
    const response = await getMaintenanceComplience();
    return response;
  }
);

export const fetchMaintenanceCost = createAsyncThunk(
  'charts/fetchMaintenanceCost',
  async () => {
    const response = await getMaintenanceCost();
    return response;
  }
);

const initialState = {
  maintenanceComplience: [],
  maintenanceCost: [],
  isLoading: 'idle',
  error: null,
};

export const chartsSlice = createSlice({
  name: 'charts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenanceComplience.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchMaintenanceComplience.fulfilled, (state, action) => {
        state.isLoading = 'succeded';
        state.maintenanceComplience = action.payload;
      })
      .addCase(fetchMaintenanceComplience.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMaintenanceCost.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchMaintenanceCost.fulfilled, (state, action) => {
        state.isLoading = 'succeded';
        state.maintenanceCost = action.payload;
      })
      .addCase(fetchMaintenanceCost.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectMaintenanceComplience = (state) => state.charts.maintenanceComplience;
export const selectMaintenanceCost = (state) => state.charts.maintenanceCost;
export const selectChartsLoading = (state) => state.charts.isLoading;
export const selectChartsError = (state) => state.charts.error;

export default chartsSlice.reducer;