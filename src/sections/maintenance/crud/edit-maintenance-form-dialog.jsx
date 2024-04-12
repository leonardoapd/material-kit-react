import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Grid,
  Stack,
  Select,
  Dialog,
  Button,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { selectEquipment } from 'src/features/equipment/equipmentSlice';
import { fetchMaintenanceTasks } from 'src/features/maintenance/maintenanceTaskSlice';
import { selectUiParametersByName } from 'src/features/uiparameters/uiParametersSlice';
import { editMaintenance, selectMaintenance } from 'src/features/maintenance/maintenanceSlice';
import { closeDialog, selectDialogOpen, selectDialogData } from 'src/features/dialogs/dialogsSlice';
import {
  fetchMaintenanceCounts,
  fetchMaintenanceComplience,
} from 'src/features/charts/chartsSlice';

export default function EditMaintenanceFormDialog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const maintenances = useSelector(selectMaintenance);
  const open = useSelector((state) => selectDialogOpen(state, 'editMaintenance'));
  const inventory = useSelector(selectEquipment);
  const maintenanceId = useSelector((state) => selectDialogData(state, 'editMaintenance'));
  const maintenanceTypes = useSelector((state) =>
    selectUiParametersByName(state, 'TipoMantenimiento')
  );

  const maintenance = maintenances.find((item) => item.id === maintenanceId);

  const [editForm, setEditForm] = useState({
    equipmentId: '',
    type: '',
    description: '',
    firstMaintenanceTaskDate: '',
    frequency: '',
    estimatedDuration: 0,
  });

  useEffect(() => {
    if (maintenance) {
      setEditForm({
        equipmentId: maintenance.equipmentId,
        type: maintenance.type,
        description: maintenance.description,
        firstMaintenanceTaskDate: maintenance.firstMaintenanceTaskDate,
        frequency: maintenance.frequency,
        estimatedDuration: maintenance.estimatedDuration,
      });
    }
  }, [maintenance]);

  const handleChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleConfirm = async () => {
    await dispatch(editMaintenance({ id: maintenanceId, ...editForm }));
    handleClose();
    dispatch(fetchMaintenanceTasks());
    dispatch(fetchMaintenanceCounts());
    dispatch(fetchMaintenanceComplience());
    navigate('/maintenance');
  };

  const handleClose = () => {
    setEditForm({
      equipmentId: '',
      type: '',
      description: '',
      firstMaintenanceTaskDate: '',
      frequency: '',
      estimatedDuration: '',
    });
    dispatch(closeDialog({ dialogType: 'editMaintenance' }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Editar Mantenimiento</DialogTitle>
      <DialogContent style={{ paddingTop: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Autocomplete
                fullWidth
                label="Equipo"
                options={inventory}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => {
                  setEditForm({
                    ...editForm,
                    equipmentId: value ? value.id : '',
                  });
                }}
                value={inventory.find((item) => item.id === editForm.equipmentId) || null}
                renderInput={(params) => (
                  <TextField {...params} label="Equipo" variant="outlined" />
                )}
              />

              <FormControl fullWidth>
                <InputLabel id="maintenance-type">Tipo de Mantenimiento</InputLabel>
                <Select
                  labelId="maintenance-type"
                  id="maintenance-type"
                  label="Tipo de Mantenimiento"
                  variant="outlined"
                  value={editForm.type}
                  onChange={handleChange}
                  name="type"
                  fullWidth
                >
                  {maintenanceTypes.map((name, index) => (
                    <MenuItem key={index} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label="Fecha de Mantenimiento"
                  variant="outlined"
                  type="datetime-local"
                  InputLabelProps={{ shrink: true }}
                  value={editForm.firstMaintenanceTaskDate}
                  onChange={handleChange}
                  name="firstMaintenanceTaskDate"
                />
                <FormControl fullWidth>
                  <InputLabel id="maintenance-frequency">Frecuencia de Mantenimiento</InputLabel>
                  <Select
                    labelId="maintenance-frequency"
                    id="maintenance-frequency"
                    label="Frecuencia de Mantenimiento"
                    variant="outlined"
                    value={editForm.frequency}
                    onChange={handleChange}
                    name="frequency"
                    fullWidth
                  >
                    <MenuItem value={7}>Semanal</MenuItem>
                    <MenuItem value={15}>Quincenal</MenuItem>
                    <MenuItem value={30}>Mensual</MenuItem>
                    <MenuItem value={60}>Bimestral</MenuItem>
                    <MenuItem value={90}>Trimestral</MenuItem>
                    <MenuItem value={180}>Semestral</MenuItem>
                    <MenuItem value={360}>Anual</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Duracion del Mantenimiento"
                  variant="outlined"
                  type="number"
                  placeholder="Horas"
                  onChange={handleChange}
                  name="estimatedDuration"
                  value={editForm.estimatedDuration}
                />
              </Stack>
              <TextField
                fullWidth
                label="Descripcion"
                variant="outlined"
                placeholder="Escriba la descripcion del mantenimiento"
                multiline
                value={editForm.description}
                onChange={handleChange}
                name="description"
                rows={7.2}
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" size="small">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="success" size="small" autoFocus>
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

EditMaintenanceFormDialog.propTypes = {
  maintenanceId: PropTypes.string.isRequired,
};
