import { configureStore } from '@reduxjs/toolkit';

import chartsReducer from '../features/charts/chartsSlice';
import dialogsReducer from '../features/dialogs/dialogsSlice';
import employeeReducer from '../features/employee/employeeSlice';
import equipmentReducer from '../features/equipment/equipmentSlice';
import maintenancesReducer from '../features/maintenance/maintenanceSlice';
import uiParametersReducer from '../features/uiparameters/uiParametersSlice';
import maintenanceTaskReducer from '../features/maintenance/maintenanceTaskSlice';

export default configureStore({
  reducer: {
    equipment: equipmentReducer,
    employees: employeeReducer,
    uiParameters: uiParametersReducer,
    dialogs: dialogsReducer,
    maintenance: maintenancesReducer,
    maintenanceTasks: maintenanceTaskReducer,
    charts: chartsReducer,
  },
});
