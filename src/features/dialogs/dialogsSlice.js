import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialogs: {},
};

export const dialogsSlice = createSlice({
  name: 'dialogs',
  initialState,
  reducers: {
    openDialog: (state, action) => {
      const { dialogType, data } = action.payload;
      state.dialogs[dialogType] = {
        open: true,
        data,
      };
    },
    closeDialog: (state, action) => {
      const { dialogType } = action.payload;
      state.dialogs[dialogType] = {
        open: false,
        data: null,
      };
    },
  },
});

export const { openDialog, closeDialog } = dialogsSlice.actions;

export const selectDialog = (state, dialogType) => state.dialogs[dialogType];
export const selectDialogOpen = (state, dialogType) =>
  state.dialogs.dialogs[dialogType]?.open || false;
export const selectDialogData = (state, dialogType) =>
    state.dialogs.dialogs[dialogType]?.data || null;

export default dialogsSlice.reducer;
