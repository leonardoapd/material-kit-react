import { useEffect } from 'react';
import { es } from 'date-fns/locale';
// import '@bitnoi.se/react-scheduler/dist/style.css';
// import { Scheduler } from '@bitnoi.se/react-scheduler';
import { Scheduler } from '@aldabil/react-scheduler';
import { useDispatch, useSelector } from 'react-redux';

import { Card, Stack, Container, Typography } from '@mui/material';

import { openDialog } from 'src/features/dialogs/dialogsSlice';
// import {
//   fetchEmployees,
//   selectEmployees,
//   selectEmployeeStatus,
// } from 'src/features/employee/employeeSlice';
// import {
//   fetchEquipment,
//   selectEquipment,
//   selectEquipmentStatus,
// } from 'src/features/equipment/equipmentSlice';
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

import TestModal from '../test-modal';
import TestEvent from '../test-event';
import TestComponent from '../test-component';

// import Legend from '../task-color-legend';

export default function TextView() {
  const dispatch = useDispatch();
  const maintenanceTasks = useSelector(selectMaintenanceTasks);
  const maintenanceTaskStatus = useSelector(selectMaintenanceTaskStatus);
  // const equipment = useSelector(selectEquipment);
  // const equipmentStatus = useSelector(selectEquipmentStatus);
  // const employees = useSelector(selectEmployees);
  // const employeeStatus = useSelector(selectEmployeeStatus);
  const maintenances = useSelector(selectMaintenance);
  const maintenanceStatus = useSelector(selectMaintenanceStatus);

  // const [filterButtonState, setFilterButtonState] = useState(0);

  useEffect(() => {
    if (maintenanceTaskStatus === 'idle') {
      dispatch(fetchMaintenanceTasks());
    }
  }, [maintenanceTaskStatus, dispatch]);

  // useEffect(() => {
  //   if (equipmentStatus === 'idle') {
  //     dispatch(fetchEquipment());
  //   }
  // }, [equipmentStatus, dispatch]);

  // useEffect(() => {
  //   if (employeeStatus === 'idle') {
  //     dispatch(fetchEmployees());
  //   }
  // }, [employeeStatus, dispatch]);

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

  // const resources = maintenances.map((maintenance) => {
  //   const equipmentInfo = equipment.find((eq) => eq.id === maintenance.equipmentId);

  //   return {
  //     assignee: maintenance.id,
  //     text: equipmentInfo?.name,
  //     subtext: maintenance.description,
  //     avatar: equipmentInfo?.photo,
  //   };
  // });

  const events = maintenances.flatMap((maintenance) => {
    const tasks = maintenanceTasks.filter((task) => task.maintenanceId === maintenance.id);
    // const equipmentInfo = equipment.find((eq) => eq.id === maintenance.equipmentId);

    return tasks.map((task) => ({
      event_id: task.id,
      title: task.title,
      start: new Date(task.startDate),
      end: new Date(task.endDate),
      draggable: false,
      deletable: false,
      color: getColorByStatus(task.status),
    }));
  });

  const handleTileClick = (event) => {
    dispatch(openDialog({ dialogType: 'showMaintenanceTask', data: event.event_id }));
  };

  const handleCustomViewer = (scheduler) => {
    console.log(scheduler);
    if (scheduler.edited) {
      return <TestModal scheduler={scheduler} />;
    }
    return scheduler.close();
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Planificador</Typography>
      </Stack>

      <Card sx={{ p: 4, maxHeight: 580, overflowY: 'auto' }}>
        <Scheduler
          events={events}
          view="month"
          height={420}
          month={{
            startHour: 0,
            endHour: 23,
          }}
          day={{
            startHour: 0,
            endHour: 23,
          }}
          week={{
            startHour: 0,
            endHour: 23,
          }}
          translations={{
            navigation: {
              month: 'Mes',
              week: 'Semana',
              day: 'Día',
              today: 'Hoy',
              agenda: 'Agenda',
            },
            form: {
              addTitle: 'Agregar Evento',
              editTitle: 'Editar Evento',
              confirm: 'Confirmar',
              delete: 'Eliminar',
              cancel: 'Cancelar',
            },
            event: {
              title: 'Título',
              start: 'Inicio',
              end: 'Fin',
              allDay: 'Todo el día',
            },
            validation: {
              required: 'Campo obligatorio',
              invalidEmail: 'Correo electrónico inválido',
              onlyNumbers: 'Solo se permiten números',
              min: 'Mínimo {{min}} caracteres',
              max: 'Máximo {{max}} caracteres',
            },
            moreEvents: 'Más...',
            noDataToDisplay: 'No hay datos para mostrar',
            loading: 'Cargando...',
          }}
          onEventClick={handleTileClick}
          locale={es}
          viewerExtraComponent={(task) => <TestComponent id={task.event_id} />}
          customEditor={handleCustomViewer}
          eventRenderer={({ event, ...props }) => <TestEvent event={event} {...props} />}
          draggable={false}
        />
      </Card>
    </Container>
  );
}
