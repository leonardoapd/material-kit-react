import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, useCallback } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import {
  fetchMaintenanceTasks,
  selectMaintenanceTasks,
  selectMaintenanceTaskStatus,
} from 'src/features/maintenance/maintenanceTaskSlice';

import MaintenanceEfficiency from '../maintenance-efficiency';
import MaintenanceCalendarEvents from '../maintenance-calendar-events';

export default function MaintenanceView() {
  const dispatch = useDispatch();
  const maintenanceTasks = useSelector(selectMaintenanceTasks);
  const status = useSelector(selectMaintenanceTaskStatus);
  // eslint-disable-next-line no-unused-vars
  const [percentage, setPercentage] = useState({
    cumplimiento: 0,
    efectividad: 0,
  });
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMaintenanceTasks());
    }
  }, [status, dispatch]);

  const getEfficiency = useCallback(
    (monthNumber, yearNumber) => {
      setMonth(monthNumber);
      setYear(yearNumber);

      const monthlyTasks = maintenanceTasks.filter(
        (task) =>
          new Date(task.startDate).getMonth() === monthNumber &&
          new Date(task.startDate).getFullYear() === yearNumber
      );

      const statusCounts = monthlyTasks.reduce(
        (counts, task) => {
          counts[task.status] = (counts[task.status] || 0) + 1;
          return counts;
        },
        {
          Pendiente: 0,
          'En Progreso': 0,
          Ejecutado: 0,
          Cancelado: 0,
          Reprogramado: 0,
        }
      );

      const ejecutadoCount = statusCounts.Ejecutado || 0;
      const canceladoCount = statusCounts.Cancelado || 0;
      const reprogramadoCount = statusCounts.Reprogramado || 0;

      const cumplimiento = (ejecutadoCount / (ejecutadoCount + canceladoCount)) * 100 || 0;
      const efectividad = (ejecutadoCount / (ejecutadoCount + reprogramadoCount)) * 100 || 0;

      setPercentage({
        cumplimiento: cumplimiento.toFixed(2),
        efectividad: efectividad.toFixed(2),
      });
    },
    [maintenanceTasks]
  );

  useEffect(() => {
    getEfficiency(month, year);
  }, [month, year, maintenanceTasks, getEfficiency]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Mantenimientos
      </Typography>

      <Grid container spacing={3}>
        <Grid item="true" xs={12} md={9}>
          <MaintenanceCalendarEvents
            title="Calendario"
            subheader="Próximos mantenimientos"
            maintenanceTasks={maintenanceTasks}
            onMonthChange={getEfficiency}
          />
        </Grid>
        <Grid item="true" container xs={12} md={3} spacing={3}>
          <Grid item="true" xs={12}>
            <MaintenanceEfficiency
              title="Efectividad"
              subheader={`${percentage.efectividad}% de efectividad`}
              chart={{
                percent: percentage.efectividad / 100,
              }}
            />
          </Grid>
          <Grid item="true" xs={12}>
            <MaintenanceEfficiency
              title="Cumplimiento"
              subheader={`${percentage.cumplimiento}% de cumplimiento`}
              chart={{
                percent: percentage.cumplimiento / 100,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
