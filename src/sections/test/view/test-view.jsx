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

import Legend from '../task-color-legend';
import ShowMaintenanceTaskDialog from '../../maintenance/crud/show-maintenance-form-dialog';

// const mockedSchedulerData = [
//   {
//     id: '070ac5b5-8369-4cd2-8ba2-0a209130cc60',
//     label: {
//       icon: 'https://picsum.photos/24',
//       title: 'COLORIMETRO DR900',
//       subtitle: 'Realizar mantenimiento de los empaques.',
//     },
//     data: [
//       {
//         id: '8b71a8a5-33dd-4fc8-9caa-b4a584ba3762',
//         startDate: new Date('2024-04-13T05:31:24.272Z'),
//         endDate: new Date('2024-04-13T10:28:22.649Z'),
//         occupancy: 1,
//         title: 'Project A',
//         subtitle: 'Subtitle A',
//         description: 'array indexing Salad West Account',
//         bgColor: 'rgb(254,165,17)',
//       },
//       {
//         id: '22fbe237-6344-4c8e-affb-64a1750f33bd',
//         startDate: new Date('2024-04-07T08:16:31.123Z'),
//         endDate: new Date('2024-04-11T21:55:23.582Z'),
//         occupancy: 2852,
//         title: 'Project B',
//         subtitle: 'Subtitle B',
//         description: 'Tuna Home pascal IP drive',
//         bgColor: 'rgb(254,165,177)',
//       },
//   {
//     id: '3601c1cd-f4b5-46bc-8564-8c983919e3f5',
//     startDate: new Date('2023-03-30T22:25:14.377Z'),
//     endDate: new Date('2023-09-01T07:20:50.526Z'),
//     occupancy: 1800,
//     title: 'Project C',
//     subtitle: 'Subtitle C',
//     bgColor: 'rgb(254,165,177)',
//   },
//   {
//     id: 'b088e4ac-9911-426f-aef3-843d75e714c2',
//     startDate: new Date('2023-10-28T10:08:22.986Z'),
//     endDate: new Date('2023-10-30T12:30:30.150Z'),
//     occupancy: 11111,
//     title: 'Project D',
//     subtitle: 'Subtitle D',
//     description: 'Garden heavy an software Metal',
//     bgColor: 'rgb(254,165,177)',
//   },
//     ],
//   },
// ];

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
  const [anchorEl, setAnchorEl] = useState(null);

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
    console.log(clickedResource);
    setAnchorEl(clickedResource);
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
      <Legend />

      <ShowMaintenanceTaskDialog anchorEl={anchorEl} />
    </Container>
  );
}
