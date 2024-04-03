/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import '@bitnoi.se/react-scheduler/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Scheduler } from '@bitnoi.se/react-scheduler';

import { Card, Stack, Button, Container, Typography } from '@mui/material';

import { openDialog } from 'src/features/dialogs/dialogsSlice';
import {
  fetchEmployees,
  selectEmployees,
  selectEmployeeStatus,
} from 'src/features/employee/employeeSlice';
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

import Iconify from 'src/components/iconify';

// import Legend from '../task-color-legend';
import ShowMaintenanceTaskDialog from '../../maintenance/crud/show-maintenance-form-dialog';

export default function TextView() {
  const dispatch = useDispatch();
  const maintenanceTasks = useSelector(selectMaintenanceTasks);
  const maintenanceTaskStatus = useSelector(selectMaintenanceTaskStatus);
  const equipment = useSelector(selectEquipment);
  const equipmentStatus = useSelector(selectEquipmentStatus);
  const employees = useSelector(selectEmployees);
  const employeeStatus = useSelector(selectEmployeeStatus);
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
    if (employeeStatus === 'idle') {
      dispatch(fetchEmployees());
    }
  }, [employeeStatus, dispatch]);

  useEffect(() => {
    if (maintenanceStatus === 'idle') {
      dispatch(fetchMaintenance());
    }
  }, [maintenanceStatus, dispatch]);

  const getColorByStatus = (status) => {
    const statusColors = {
      Pendiente: 'red',
      'En Progreso': 'yellow',
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
        subtitle: maintenance.description,
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
    dispatch(openDialog({ dialogType: 'showMaintenanceTask', data: clickedResource.id}));
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Planificador</Typography>

        <Button
          variant="contained"
          color="success"
          startIcon={<Iconify icon="eva:plus-fill" />}
          //   onClick={handleOpenAddEquipmentDialog}
        >
          Añadir Equipo
        </Button>
      </Stack>

      <Card sx={{ p: 2 }}>
        <div style={{ height: 480, padding: 20 }}>
          <Scheduler
            data={events}
            //   isLoading={isLoading}
            onRangeChange={(newRange) => console.log(newRange)}
            onTileClick={handleTileClick}
            onItemClick={(item) => console.log(item)}
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
      {/* <Legend /> */}

      <ShowMaintenanceTaskDialog />
    </Container>
  );
}
