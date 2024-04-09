import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Stack, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { selectDialogData } from 'src/features/dialogs/dialogsSlice';
import {
  editMaintenanceTask,
  selectMaintenanceTasks,
} from 'src/features/maintenance/maintenanceTaskSlice';

export default function EventPopover({ onStatusChange }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const maintenanceTasks = useSelector(selectMaintenanceTasks);
  const taskId = useSelector((state) => selectDialogData(state, 'showMaintenanceTask'));

  const [task, setTask] = useState({
    id: '',
    status: '',
    completedDate: '',
    title: '',
    startDate: '',
    endDate: '',
    maintenanceId: '',
  });

  useEffect(() => {
    if (taskId) {
      setTask(maintenanceTasks.find((mtask) => mtask.id === taskId));
    }
  }, [taskId, maintenanceTasks]);

  const handleConfirm = async () => {
    let updatedTask;
    if (task.status === 'Ejecutado') {
      const completedDate = new Date().toISOString();
      updatedTask = { ...task, completedDate };
    } else {
      updatedTask = { ...task, completedDate: null };
    }
    setTask(updatedTask);

    const response = await dispatch(editMaintenanceTask(updatedTask));
    if (editMaintenanceTask.fulfilled.match(response)) {
      enqueueSnackbar('Estado del mantenimiento actualizado correctamente', { variant: 'success' });
      onStatusChange();
    } else {
      enqueueSnackbar('No es posible actualizar el estado de la tarea con anticipación', { variant: 'error' });
    }
  };

  const handleStatusChange = (e) => {
    setTask({ ...task, status: e.target.value });
  };

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Stack direction="row" justifyContent="space-between">
          <FormControl fullWidth size="small">
            <InputLabel id="status">Estado</InputLabel>
            <Select
              labelId="status"
              id="status"
              value={task ? task.status || '' : ''}
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
      </Box>

      <Box justifyContent="flex-end" sx={{ mt: 1, display: 'flex' }}>
        <Button onClick={handleConfirm} color="success" size="small" autoFocus>
          Confirmar
        </Button>
      </Box>
    </>
  );
}

EventPopover.propTypes = {
  onStatusChange: PropTypes.func,
};
