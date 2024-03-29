import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Card,
  Stack,
  Dialog,
  Button,
  Select,
  MenuItem,
  CardHeader,
  Typography,
  InputLabel,
  FormControl,
} from '@mui/material';

import { selectMaintenance } from 'src/features/maintenance/maintenanceSlice';
import { closeDialog, selectDialogOpen, selectDialogData } from 'src/features/dialogs/dialogsSlice';
import {
  editMaintenanceTask,
  selectMaintenanceTasks,
} from 'src/features/maintenance/maintenanceTaskSlice';

export default function ShowMaintenanceTaskDialog() {
  const dispatch = useDispatch();
  const open = useSelector((state) => selectDialogOpen(state, 'showMaintenanceTask'));
  const data = useSelector((state) => selectDialogData(state, 'showMaintenanceTask'));
  const maintenanceTasks = useSelector(selectMaintenanceTasks);
  const maintenances = useSelector(selectMaintenance);

  const [task, setTask] = useState(null);

  useEffect(() => {
    if (data) {
      setTask(maintenanceTasks.find((mtask) => mtask.id === data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleClose = () => {
    dispatch(closeDialog({ dialogType: 'showMaintenanceTask' }));
  };

  const handleConfirm = () => {
    let updatedTask;
    if (task.status === 'Ejecutado') {
      const completedDate = new Date().toISOString();
      updatedTask = { ...task, completedDate };
    } else {
      updatedTask = { ...task, completedDate: null };
    }
    setTask(updatedTask);
    dispatch(editMaintenanceTask(updatedTask));
    handleClose();
  };

  const handleStatusChange = (e) => {
    setTask({ ...task, status: e.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card sx={{ maxWidth: 400 }}>
        <CardHeader title={task?.title} />
        <Box sx={{ p: 3 }}>
          <Stack direction="column" spacing={1.6} justifyContent="flex-end">
            <Typography variant="body2" color="text.secondary">
              {task?.startDate && format(new Date(task.startDate), 'eeee, dd/MM/yyyy HH:mm')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {
                maintenances.find((maintenance) => maintenance.id === task?.maintenanceId)
                  ?.description
              }
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="status">Estado</InputLabel>
              <Select
                labelId="status"
                id="status"
                value={task?.status}
                label="Estado"
                onChange={handleStatusChange}
              >
                <MenuItem value="Pendiente">Pendiente</MenuItem>
                <MenuItem value="En Progreso">En curso</MenuItem>
                <MenuItem value="Ejecutado">Ejecutado</MenuItem>
                <MenuItem value="Cancelado">Cancelado</MenuItem>
                <MenuItem value="Reprogramado">Reprogramado</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
            <Button onClick={handleClose} variant="outlined">
              Cerrar
            </Button>
            <Button onClick={handleConfirm} color="primary" variant="contained">
              Guardar
            </Button>
          </Stack>
        </Box>
      </Card>
    </Dialog>
  );
}
