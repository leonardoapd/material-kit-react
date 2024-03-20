import { useState } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import MaintenanceEfficiency from '../maintenance-efficiency';
import MaintenanceCalendarEvents from '../maintenance-calendar-events';

export default function MaintenanceView() {
  // eslint-disable-next-line no-unused-vars
  const [percentage, setPercentage] = useState(87);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Mantenimientos
      </Typography>

      <Grid container spacing={3}>
        <Grid item="true" xs={12} md={9}>
          <MaintenanceCalendarEvents title="Calendario" subheader="Próximos mantenimientos" />
        </Grid>
        <Grid item="true" container xs={12} md={3} spacing={3}>
          <Grid item="true" xs={12}>
            <MaintenanceEfficiency
              title="Efectividad"
              subheader={`${percentage}% de efectividad`}
              chart={{
                percent: percentage / 100,
              }}
            />
          </Grid>
          <Grid item="true" xs={12}>
            <MaintenanceEfficiency
              title="Cumplimiento"
              subheader={`${percentage}% de cumplimiento`}
              chart={{
                percent: 45 / 100,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
