import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import { generateEvents } from 'src/utils/format-events';

// ----------------------------------------------------------------------

export default function MaintenanceCalendarEvents({ title, subheader, ...other }) {
  const locale = 'es';
  const localizer = momentLocalizer(moment);
  moment.locale(locale);

  const maintenance = {
    id: '1',
    equipment: 'Deformadora',
    type: 'Correctivo',
    description: 'Se debe cambiar el motor',
    date: '2024-03-11T10:00:00',
    frequency: 180,
    status: 'Pendiente',
    duration: 60 * 48,
  };

  const events = generateEvents(maintenance);
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day', 'agenda']}
          style={{
            height: '400px',
          }}
          //   borderRadius: '16px',
          //   backgroundColor: '#FFFFFF',
          //   boxShadow:
          //     '0 0 2px 0 rgba(145, 158, 171, 0.08), 0 12px 24px -4px rgba(145, 158, 171, 0.08)',
          //   padding: '24px',
          //   fontSize: '12px',
          // }}
          onSelectEvent={(event) => console.log(event)}
          messages={{
            next: 'Siguiente',
            previous: 'Anterior',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
          }}
        />
      </Box>
    </Card>
  );
}

MaintenanceCalendarEvents.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
};
