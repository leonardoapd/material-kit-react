import { configureStore } from '@reduxjs/toolkit';

import employeeReducer from '../features/employee/employeeSlice';
import equipmentReducer from '../features/equipment/equipmentSlice';
import equipmentDialogReducer from '../features/equipment-dialogs/equipmentDialogSlice';

export default configureStore({
  reducer: {
    equipment: equipmentReducer,
    employees: employeeReducer,
    equipmentDialog: equipmentDialogReducer,
  },
});
