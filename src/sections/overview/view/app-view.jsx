import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import {
  selectChartsLoading,
  fetchMaintenanceCost,
  selectMaintenanceCost,
  fetchMaintenanceCounts,
  selectMaintenanceCounts,
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
  const maintenanceCounts = useSelector(selectMaintenanceCounts);
  const maintenanceCost = useSelector(selectMaintenanceCost);
  const chartsLoading = useSelector(selectChartsLoading);

  useEffect(() => {
    if (chartsLoading === 'idle') {
      dispatch(fetchMaintenanceComplience());
      dispatch(fetchMaintenanceCounts());
      dispatch(fetchMaintenanceCost());
    }
  }, [chartsLoading, dispatch]);

  const labels = Object.keys(monthlyCompletionRates);
  const series = Object.values(monthlyCompletionRates).map((value) => (value * 100).toFixed(1));
  const average = series.reduce((acc, value) => acc + parseFloat(value), 0) / series.length;

  const countsLabels = Object.keys(maintenanceCounts);
  const countsSeries = Object.values(maintenanceCounts);

  const costLabels = Object.keys(maintenanceCost);
  const costSeries = Object.values(maintenanceCost);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hola, bienvenido 👋
      </Typography>

      <Grid container spacing={3}>
        {countsLabels.map((label, index) => (
          <Grid key={index} xs={12} sm={6} md={4}>
            <AppWidgetSummary
              title={label}
              total={countsSeries[index]}
              color={['info', 'warning', 'success'][index]}
              icon={
                <img
                  alt="icon"
                  src={`./assets/icons/glass/ic_glass_${label
                    .replace(/\s/g, '_')
                    .replace(/\.$/, '')
                    .toLowerCase()}.png`}
                />
              }
            />
          </Grid>
        ))}

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
                  color: '#CECECE',
                },
              ],
              colors: ['#F67A5B'],
            }}
            complianceType="compliance"
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AppMaintenanceCompliance
            title="Costos de mantenimiento"
            subheader="Year average: $1,250"
            chart={{
              labels: costLabels,
              series: [
                {
                  name: 'Costo Mensual',
                  type: 'column',
                  fill: 'solid',
                  data: costSeries,
                },
                {
                  name: 'Presupuestado',
                  type: 'area',
                  fill: 'gradient',
                  data: costSeries.map(() => 1200000),
                  color: '#CECECE',
                },
              ],
              colors: ["#7DDA58"],
            }}
            complianceType="cost"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
