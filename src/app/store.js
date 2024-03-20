import { configureStore } from '@reduxjs/toolkit';

import dialogsReducer from '../features/dialogs/dialogsSlice';
import employeeReducer from '../features/employee/employeeSlice';
import equipmentReducer from '../features/equipment/equipmentSlice';
import uiParametersReducer from '../features/uiparameters/uiParametersSlice';
import equipmentDialogReducer from '../features/equipment-dialogs/dialogsSlice';

export default configureStore({
  reducer: {
    equipment: equipmentReducer,
    employees: employeeReducer,
    equipmentDialog: equipmentDialogReducer,
    uiParameters: uiParametersReducer,
    dialogs: dialogsReducer,
  },
});
