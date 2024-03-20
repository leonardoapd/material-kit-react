import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getUiParameters } from 'src/queries/ui-parameters/uiParametersService';

// Acción asincrónica para cargar las opciones desde el backend
export const fetchUiParameters = createAsyncThunk('uiparameters/fetchUiParameters', async () => {
  const response = await getUiParameters();
  return response;
});

const initialState = {
  uiParameters: {},
  isLoading: 'idle',
  error: null,
};

export const uiParametersSlice = createSlice({
  name: 'uiparameters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUiParameters.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchUiParameters.fulfilled, (state, action) => {
        state.isLoading = 'succeeded';
        // Organiza los parámetros de la interfaz de usuario por nombre
        action.payload.forEach((uiParameter) => {
          if (!state.uiParameters[uiParameter.name]) {
            state.uiParameters[uiParameter.name] = [];
          }
          state.uiParameters[uiParameter.name].push(uiParameter.value);
        });
      })
      .addCase(fetchUiParameters.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectUiParameters = (state) => state.uiParameters.uiParameters;
export const selectUiParametersStatus = (state) => state.uiParameters.isLoading;

// Selector para obtener los valores por nombre
export const selectUiParametersByName = (state, name) => state.uiParameters.uiParameters[name] || [];

export default uiParametersSlice.reducer;
