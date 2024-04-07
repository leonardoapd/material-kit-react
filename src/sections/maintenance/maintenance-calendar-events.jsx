/* eslint-disable no-unused-vars */
import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import FullCalendar from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import allLocales from '@fullcalendar/core/locales-all';
// import interactionPlugin from '@fullcalendar/interaction';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { Calendar, momentLocalizer } from 'react-big-calendar';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import CardHeader from '@mui/material/CardHeader';

import { openDialog } from 'src/features/dialogs/dialogsSlice';

import './maintenance-calendar-events.css';
import ShowMaintenanceTaskDialog from './crud/show-maintenance-form-dialog';
// import {
//   fetchMaintenanceTasks,
//   selectMaintenanceTasks,
//   selectMaintenanceTaskStatus,
// } from '../../features/maintenance/maintenanceTaskSlice';

// ----------------------------------------------------------------------

export default function MaintenanceCalendarEvents({
  title,
  subheader,
  maintenanceTasks,
  onMonthChange,
  ...other
}) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const locale = 'es';
  moment.locale(locale);


  const events = maintenanceTasks.map((event) => {
    let color;
    switch (event.status) {
      case 'Pendiente':
        color = 'red';
        break;
      case 'En Progreso':
        color = 'yellow';
        break;
      case 'Ejecutado':
        color = 'green';
        break;
      case 'Cancelado':
        color = 'gray';
        break;
      case 'Reprogramado':
        color = 'orange';
        break;
      default:
        color = 'blue';
        break;
    }

    return {
      id: event.id,
      title: event.title,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      taskCode: event.taskCode,
      completed: event.completedDate,
      status: event.status,
      nextMaintenance: new Date(event.nextMaintenanceTaskDate),
      maintenanceId: event.maintenanceId,
      color,
    };
  });

  const eventColor = (eventoInfo) => {
    switch (eventoInfo.event.extendedProps.status) {
      case 'Pendiente':
        return 'red';

      case 'En Progreso':
        return 'yellow';

      case 'Ejecutado':
        return 'green';

      case 'Cancelado':
        return 'gray';

      case 'Reprogramado':
        return 'orange';

      default:
        return 'blue';
    }
  };
  const eventContent = (info) => {
    const backgroundColor = (() => {
      switch (info.event.extendedProps.status) {
        case 'Pendiente':
          return 'red';

        case 'En Progreso':
          return 'yellow';

        case 'Ejecutado':
          return 'green';

        case 'Cancelado':
          return 'gray';

        default:
          return 'blue';
      }
    })();

    return (
      <Chip
        label={`${info.timeText} | ${info.event.title}`}
        sx={{ backgroundColor, borderColor: backgroundColor, color: 'white' }}
      />
    );
  };

  // const handleDateSelect = (selectInfo) => {
  //   // console.log(selectInfo);
  // };

  const handleEventClick = (clickInfo) => {
    // console.log(clickInfo);
    setAnchorEl(clickInfo.jsEvent.target);
    dispatch(openDialog({ dialogType: 'showMaintenanceTask', data: clickInfo.event.id }));
  };

  const handleEvents = (eventos) => {
    // console.log(eventos);
  };

  // TODO: Mejorar la forma en que se obtiene el mes y año
  const handleTitleChange = (info) => {
    const monthNames = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    const [monthName, year] = info.view.title.split(' de '); // Dividimos el título en mes y año
    const monthNumber = monthNames.findIndex(
      (name) => name.toLowerCase() === monthName.toLowerCase()
    );
    const yearNumber = parseInt(year, 10);
    onMonthChange(monthNumber, yearNumber);
  };

  return (
    <>
      <Card {...other}>
        <CardHeader title={title} subheader={subheader} />
        <Box sx={{ p: 3, flexGrow: 1 }}>
          {/* <FullCalendar
            locales={allLocales}
            locale="es"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,today,next',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable
            selectable
            selectMirror
            dayMaxEvents
            weekends
            events={events}
            eventColor={eventColor}
            // height="480px"
            datesSet={handleTitleChange}
            titleFormat={{
              month: 'long',
              year: 'numeric',
            }}
            // select={handleDateSelect}
            eventContent={eventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
          eventAdd={function(){}}
          eventChange={function(){}}
          eventRemove={function(){}}
          */
          /> */}
        </Box>
      </Card>

      <ShowMaintenanceTaskDialog anchorEl={anchorEl} />
    </>
  );
}

MaintenanceCalendarEvents.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  maintenanceTasks: PropTypes.array,
  onMonthChange: PropTypes.func,
};
