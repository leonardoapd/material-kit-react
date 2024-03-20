import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingButton from '@mui/lab/LoadingButton';
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

import { closeDialog, selectDialogOpen } from 'src/features/dialogs/dialogsSlice';
import { selectUiParametersByName } from 'src/features/uiparameters/uiParametersSlice';

export default function AddMaintenanceDialog({ selected, inventory }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => selectDialogOpen(state, 'addMaintenance'));
  const maintenanceTypes = useSelector((state) =>
    selectUiParametersByName(state, 'TipoMantenimiento')
  );

  const [addForm, setAddForm] = useState({
    equipmentId: '',
    maintenanceType: '',
    description: '',
    maintenanceDate: '',
    maintenanceFrequency: '',
    maintenanceDuration: 0,
  });

  const { id } = selected;

  useEffect(() => {
    if (selected) {
      setAddForm({
        ...addForm,
        equipmentId: id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, selected]);

  const {
    equipmentId,
    maintenanceType,
    description,
    maintenanceDate,
    maintenanceFrequency,
    maintenanceDuration,
  } = addForm;

  const handleChange = (event) => {
    setAddForm({
      ...addForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleConfirm = () => {
    console.log(addForm);
  };

  const handleClose = () => {
    setAddForm((prev) => ({
      ...prev,
      equipmentId: id,
      maintenanceType: '',
      description: '',
      maintenanceDate: '',
      maintenanceFrequency: '',
      maintenanceDuration: 0,
    }));
    dispatch(closeDialog({ dialogType: 'addMaintenance' }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Programar Mantenimiento</DialogTitle>
      <DialogContent style={{ paddingTop: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Autocomplete
                fullWidth
                label="Equipo"
                options={inventory}
                getOptionLabel={(option) => option.name}
                onChange={handleChange}
                value={inventory.find((item) => item.id === equipmentId) || null}
                name="equipment"
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
                  value={maintenanceType}
                  onChange={handleChange}
                  name="maintenanceType"
                  fullWidth
                >
                  {maintenanceTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripcion"
              variant="outlined"
              placeholder="Escriba la descripcion del mantenimiento"
              multiline
              rows={4}
              value={description}
              onChange={handleChange}
              name="description"
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Fecha de Mantenimiento"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={maintenanceDate}
                onChange={handleChange}
                name="maintenanceDate"
              />
              <FormControl fullWidth>
                <InputLabel id="maintenance-frequency">Frecuencia de Mantenimiento</InputLabel>
                <Select
                  labelId="maintenance-frequency"
                  id="maintenance-frequency"
                  label="Frecuencia de Mantenimiento"
                  variant="outlined"
                  value={maintenanceFrequency}
                  onChange={handleChange}
                  name="maintenanceFrequency"
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
                name="maintenanceDuration"
                value={maintenanceDuration}
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="error">
          Cancelar
        </Button>
        <LoadingButton onClick={handleConfirm} variant="contained" color="primary" loading={false}>
          Programar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

AddMaintenanceDialog.propTypes = {
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  selected: PropTypes.object,
  inventory: PropTypes.array,
};
