import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getMaintenanceTasks, updateMaintenanceTask } from 'src/queries/maintenance/maintenanceTaskService';

export const fetchMaintenanceTasks = createAsyncThunk(
  'maintenance/fetchMaintenanceTasks',
  async () => {
    const response = await getMaintenanceTasks();
    return response;
  }
);

export const editMaintenanceTask = createAsyncThunk(
  'maintenance/updateMaintenanceTask',
  async (maintenanceTask) => {
    const response = await updateMaintenanceTask(maintenanceTask);
    return response;
  }
);

const initialState = {
  maintenanceTasks: [],
  isLoading: 'idle',
  error: null,
};

export const maintenanceTaskSlice = createSlice({
  name: 'maintenanceTasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaintenanceTasks.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchMaintenanceTasks.fulfilled, (state, action) => {
        state.isLoading = 'succeded';
        state.maintenanceTasks = action.payload;
      })
      .addCase(fetchMaintenanceTasks.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
      .addCase(editMaintenanceTask.fulfilled, (state, action) => {
        state.maintenanceTasks = state.maintenanceTasks.map((maintenanceTask) =>
          maintenanceTask.id === action.payload.id ? action.payload : maintenanceTask
        );
      });
  },
});

export const selectMaintenanceTasks = (state) => state.maintenanceTasks.maintenanceTasks;
export const selectMaintenanceTaskById = (state, maintenanceTaskId) =>
  state.maintenanceTasks.maintenanceTasks.find(
    (maintenanceTask) => maintenanceTask.id === maintenanceTaskId
  );
export const selectMaintenanceTaskStatus = (state) => state.maintenanceTasks.isLoading;
export const selectMaintenanceTaskError = (state) => state.maintenanceTasks.error;

export default maintenanceTaskSlice.reducer;
