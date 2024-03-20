import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from 'src/queries/employees/employeesService';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await getEmployees();
  return response;
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employeeData) => {
  const response = await createEmployee(employeeData);
  return response;
});

export const editEmployee = createAsyncThunk('employees/editEmployee', async (employeeData) => {
  const response = await updateEmployee(employeeData);
  return response;
});

export const removeEmployee = createAsyncThunk('employees/removeEmployee', async (employeeId) => {
  const response = await deleteEmployee(employeeId);
  return response;
});

export const getEmployee = createAsyncThunk('employees/getEmployee', async (employeeId) => {
  const response = await getEmployee(employeeId);
  return response;
});

const initialState = {
  employees: [],
  isLoading: 'idle',
  error: null,
};

export const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.isLoading = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.isLoading = 'succeded';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.isLoading = 'failed';
        state.error = action.error.message;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        const { id } = action.payload;
        const existingEmployeeIndex = state.employees.findIndex((employee) => employee.id === id);
        if (existingEmployeeIndex !== -1) {
          state.employees[existingEmployeeIndex] = action.payload;
        }
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.employees = state.employees.filter((employee) => employee.id !== action.payload.id);
      });
  },
});

export const selectEmployees = (state) => state.employees.employees;
export const selectEmployeeStatus = (state) => state.employees.isLoading;
export const selectEmployeeError = (state) => state.employees.error;

export default employeeSlice.reducer;
