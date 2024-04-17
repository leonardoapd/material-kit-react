import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { es } from 'date-fns/locale';
import { Scheduler } from '@aldabil/react-scheduler';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Card, CardHeader } from '@mui/material';

import { capitalizeFirstLetter, getMaintenanceColorByStatus } from 'src/utils/maintenance-utils';

import { openDialog } from 'src/features/dialogs/dialogsSlice';
import {
  fetchMaintenanceCounts,
  fetchMaintenanceComplience,
} from 'src/features/charts/chartsSlice';
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
  EventPopover,
  RenderedEvent,
  TaskColorLegend,
  EditEventDialog,
} from 'src/components/planner';

export default function AppPlanner({ title, subheader }) {
  const dispatch = useDispatch();
  const maintenances = useSelector(selectMaintenance);
  const maintenanceStatus = useSelector(selectMaintenanceStatus);
  const inventory = useSelector(selectEquipment);
  const equipmentStatus = useSelector(selectEquipmentStatus);

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

  const events = maintenances.map((maintenance) => {
    const equipment = inventory.find((eq) => eq.id === maintenance.equipmentId);

    return {
      event_id: maintenance.id,
      title: `${capitalizeFirstLetter(equipment.name)} - ${maintenance.type}`,
      start: new Date(maintenance.startDate),
      end: new Date(maintenance.endDate),
      draggable: false,
      deletable: false,
      color: getMaintenanceColorByStatus(maintenance.status),
    };
  });

  const handleTileClick = (event) => {
    dispatch(openDialog({ dialogType: 'showMaintenanceTask', data: event.event_id }));
  };

  const handleCustomViewer = (scheduler) => {
    if (scheduler.edited) {
      return <EditEventDialog scheduler={scheduler} />;
    }
    return scheduler.close();
  };

  const handleStatusChange = () => {
    dispatch(fetchMaintenanceCounts());
    dispatch(fetchMaintenanceComplience());
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
              <EventPopover id={task.event_id} onStatusChange={handleStatusChange} />
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
