import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  equipmentDialog: {
    new: {
      open: false,
      data: null,
    },
    edit: {
      open: false,
      data: null,
    },
    remove: {
      open: false,
      data: null,
    },
  },
};

export const dialogsSlice = createSlice({
  name: 'equipmentDialog',
  initialState,
  reducers: {
    openNewEquipmentDialog: (state, action) => {
      state.equipmentDialog.new = {
        open: true,
        data: null,
      };
    },
    closeNewEquipmentDialog: (state, action) => {
      state.equipmentDialog.new = {
        open: false,
        data: null,
      };
    },
    openEditEquipmentDialog: (state, action) => {
      state.equipmentDialog.edit = {
        open: true,
        data: action.payload,
      };
    },
    closeEditEquipmentDialog: (state, action) => {
      state.equipmentDialog.edit = {
        open: false,
        data: null,
      };
    },
    openDeleteEquipmentDialog: (state, action) => {
      state.equipmentDialog.remove = {
        open: true,
        data: action.payload,
      };
    },
    closeDeleteEquipmentDialog: (state, action) => {
      state.equipmentDialog.remove = {
        open: false,
        data: null,
      };
    },
  },
});

export const {
  openNewEquipmentDialog,
  closeNewEquipmentDialog,
  openEditEquipmentDialog,
  closeEditEquipmentDialog,
  openDeleteEquipmentDialog,
  closeDeleteEquipmentDialog,
} = dialogsSlice.actions;

export const selectEquipmentDialog = (state) => state.equipmentDialog.equipmentDialog;
export const selectNewEquipmentDialogOpen = (state) =>
  state.equipmentDialog.equipmentDialog.new.open;
export const selectEditEquipmentDialogOpen = (state) =>
  state.equipmentDialog.equipmentDialog.edit.open;
export const selectDeleteEquipmentDialogOpen = (state) =>
  state.equipmentDialog.equipmentDialog.remove.open;
export const selectNewEquipmentDialogData = (state) =>
  state.equipmentDialog.equipmentDialog.new.data;
export const selectEditEquipmentDialogData = (state) =>
  state.equipmentDialog.equipmentDialog.edit.data;
export const selectDeleteEquipmentDialogData = (state) =>
  state.equipmentDialog.equipmentDialog.remove.data;

export default dialogsSlice.reducer;
