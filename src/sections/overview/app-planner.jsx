import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '@bitnoi.se/react-scheduler/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Scheduler } from '@bitnoi.se/react-scheduler';

import { Card, CardHeader } from '@mui/material';

import { openDialog } from 'src/features/dialogs/dialogsSlice';
import {
  fetchEquipment,
  selectEquipment,
  selectEquipmentStatus,
} from 'src/features/equipment/equipmentSlice';
import {
  fetchMaintenance,
  selectMaintenance,
  selectMaintenanceStatus,
} from 'src/features/maintenance/maintenanceSlice';
import {
  fetchMaintenanceTasks,
  selectMaintenanceTasks,
  selectMaintenanceTaskStatus,
} from 'src/features/maintenance/maintenanceTaskSlice';

import Legend from './task-color-legend';
// import Iconify from 'src/components/iconify';

export default function AppPlanner({ title, subheader }) {
  const dispatch = useDispatch();
  const maintenanceTasks = useSelector(selectMaintenanceTasks);
  const maintenanceTaskStatus = useSelector(selectMaintenanceTaskStatus);
  const equipment = useSelector(selectEquipment);
  const equipmentStatus = useSelector(selectEquipmentStatus);
  const maintenances = useSelector(selectMaintenance);
  const maintenanceStatus = useSelector(selectMaintenanceStatus);

  const [filterButtonState, setFilterButtonState] = useState(0);

  useEffect(() => {
    if (maintenanceTaskStatus === 'idle') {
      dispatch(fetchMaintenanceTasks());
    }
  }, [maintenanceTaskStatus, dispatch]);

  useEffect(() => {
    if (equipmentStatus === 'idle') {
      dispatch(fetchEquipment());
    }
  }, [equipmentStatus, dispatch]);

  useEffect(() => {
    if (maintenanceStatus === 'idle') {
      dispatch(fetchMaintenance());
    }
  }, [maintenanceStatus, dispatch]);

  const getColorByStatus = (status) => {
    const statusColors = {
      Pendiente: 'red',
      'En Progreso': 'blue',
      Ejecutado: 'green',
      Cancelado: 'gray',
      Reprogramado: 'orange',
    };

    return statusColors[status] || 'blue';
  };

  const events = maintenances.map((maintenance) => {
    const tasks = maintenanceTasks.filter((task) => task.maintenanceId === maintenance.id);
    const equipmentInfo = equipment.find((eq) => eq.id === maintenance.equipmentId);

    return {
      id: maintenance.id,
      label: {
        icon: equipmentInfo?.photo || 'https://picsum.photos/24',
        title: equipmentInfo?.name || 'Equipo Desconocido',
        subtitle: maintenance.type,
      },
      data: tasks.map((task) => {
        const color = getColorByStatus(task.status);

        return {
          id: task.id,
          startDate: new Date(task.startDate),
          endDate: new Date(task.endDate),
          occupancy: 2,
          title: task.title,
          subtitle: task.status,
          bgColor: color,
        };
      }),
    };
  });

  const handleTileClick = (clickedResource) => {
    dispatch(openDialog({ dialogType: 'showMaintenanceTask', data: clickedResource.id }));
  };

  return (
    <>
      <Card>
        <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />
        <div style={{ height: 380, padding: 20 }}>
          <Scheduler
            data={events}
            //   isLoading={isLoading}
            // onRangeChange={(newRange) => console.log(newRange)}
            onTileClick={handleTileClick}
            // onItemClick={(item) => console.log(item)}
            onFilterData={() => {
              // Some filtering logic...
              setFilterButtonState(1);
            }}
            onClearFilterData={() => {
              // Some clearing filters logic...
              setFilterButtonState(0);
            }}
            config={{
              zoom: 1,
              filterButtonState,
              includeTakenHoursOnWeekendsInDayView: true,
            }}
            lang="es"
          />
        </div>
      </Card>

      <Legend />
    </>
  );
}

AppPlanner.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};
