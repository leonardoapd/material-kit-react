import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import {
  selectChartsLoading,
  fetchMaintenanceComplience,
  selectMaintenanceComplience,
} from 'src/features/charts/chartsSlice';

// import Iconify from 'src/components/iconify';

// import ShowMaintenanceTaskDialog from 'src/sections/maintenance/crud/show-maintenance-form-dialog';

// import AppTasks from '../app-tasks';
import AppPlanner from '../app-planner';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
// import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';
import AppMaintenanceCompliance from '../app-maintenance-compliance';

// ----------------------------------------------------------------------

export default function AppView() {
  const dispatch = useDispatch();
  const monthlyCompletionRates = useSelector(selectMaintenanceComplience);
  const chartsLoading = useSelector(selectChartsLoading);

  // const [monthlyCompletionRates, setMonthlyCompletionRates] = useState({});

  useEffect(() => {
    if (chartsLoading === 'idle') {
      dispatch(fetchMaintenanceComplience());
    }
  }, [chartsLoading, dispatch]);

  const labels = Object.keys(monthlyCompletionRates);
  const series = Object.values(monthlyCompletionRates).map((value) => (value * 100).toFixed(1));
  const average = series.reduce((acc, value) => acc + parseFloat(value), 0) / series.length;

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hola, bienvenido 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Mantenimientos Completados"
            total={1}
            color="success"
            icon={<img alt="icon" src="./assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="$ Total Gastado"
            total={1352831}
            color="info"
            icon={<img alt="icon" src="./assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Equipos Comprados"
            total={2}
            color="warning"
            icon={<img alt="icon" src="./assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Mantenimientos el próximo mes"
            total={4}
            color="error"
            icon={<img alt="icon" src="./assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={8} lg={8}>
          <AppPlanner title="Planificador de mantenimiento" subheader="(+43%) than last year" />
        </Grid>

        <Grid xs={12} md={4} lg={4}>
          <AppMaintenanceCompliance
            title="Cumplimiento de mantenimiento"
            subheader={`Year average: ${average.toFixed(1)}%`}
            chart={{
              labels,
              series: [
                {
                  name: 'Cumplimiento',
                  type: 'bar',
                  fill: 'solid',
                  data: series,
                },
                {
                  name: 'Esperado',
                  type: 'area',
                  fill: 'gradient',
                  data: series.map(() => 96),
                },
              ],
              colors: ['#F67A5B'],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
