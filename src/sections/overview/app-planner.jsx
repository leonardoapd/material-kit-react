import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { es } from 'date-fns/locale';
import '@bitnoi.se/react-scheduler/dist/style.css';
import { Scheduler } from '@aldabil/react-scheduler';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Card, CardHeader } from '@mui/material';

import { openDialog } from 'src/features/dialogs/dialogsSlice';
import { fetchMaintenanceComplience } from 'src/features/charts/chartsSlice';
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

import {
  EventPopover,
  RenderedEvent,
  TaskColorLegend,
  EditEventDialog,
} from 'src/components/planner';

export default function AppPlanner({ title, subheader }) {
  const dispatch = useDispatch();
  const maintenanceTasks = useSelector(selectMaintenanceTasks);
  const maintenanceTaskStatus = useSelector(selectMaintenanceTaskStatus);
  const maintenances = useSelector(selectMaintenance);
  const maintenanceStatus = useSelector(selectMaintenanceStatus);

  useEffect(() => {
    if (maintenanceTaskStatus === 'idle') {
      dispatch(fetchMaintenanceTasks());
    }
  }, [maintenanceTaskStatus, dispatch]);

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

  const events = maintenances.flatMap((maintenance) => {
    const tasks = maintenanceTasks.filter((task) => task.maintenanceId === maintenance.id);

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
      return <EditEventDialog scheduler={scheduler} />;
    }
    return scheduler.close();
  };

  return (
    <>
      <Card sx={{ maxHeight: 480, overflowY: 'auto' }}>
        <CardHeader title={title} subheader={subheader} sx={{ mb: 2 }} />
        <Box sx={{ p: 2 }}>
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
            viewerExtraComponent={(task) => (
              <EventPopover
                id={task.event_id}
                onStatusChange={() => dispatch(fetchMaintenanceComplience())}
              />
            )}
            customEditor={handleCustomViewer}
            eventRenderer={({ event, ...props }) => <RenderedEvent event={event} {...props} />}
            draggable={false}
          />
        </Box>
      </Card>

      <TaskColorLegend />
    </>
  );
}

AppPlanner.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};
