import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

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
  DialogContent,
  DialogActions,
} from '@mui/material';

import { data } from 'src/_mock/inventory';

// import Iconify from 'src/components/iconify';

export default function AddMaintenanceDialog({ open, onClose, onConfirm, selected }) {
  const { id } = selected;
  const [equipmentId, setEquipmentId] = useState('');

  useEffect(() => {
    if (id) {
      setEquipmentId(id);
    }
  }, [id]);

  const handleChange = (event) => {
    setEquipmentId(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle id="alert-dialog-title">Programar Mantenimiento</DialogTitle>
      <DialogContent style={{ paddingTop: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel id="equipment">Equipo</InputLabel>
                <Select
                  fullWidth
                  label="Equipo"
                  variant="outlined"
                  value={equipmentId}
                  onChange={handleChange}
                  name="equipment"
                  labelId="equipment"
                >
                  {data.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="maintenance-type">Tipo de Mantenimiento</InputLabel>
                <Select fullWidth label="Tipo de Mantenimiento" value="" variant="outlined">
                  <MenuItem value="preventive">Preventivo</MenuItem>
                  <MenuItem value="corrective">Correctivo</MenuItem>
                  <MenuItem value="predictive">Predictivo</MenuItem>
                  <MenuItem value="security">Seguridad</MenuItem>
                  <MenuItem value="residual">Gestión de Residuos</MenuItem>
                  <MenuItem value="other">Otro</MenuItem>
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
              />
              <FormControl fullWidth>
                <InputLabel id="maintenance-frequency">Frecuencia de Mantenimiento</InputLabel>
                <Select fullWidth label="Frecuencia de Mantenimiento" value="" variant="outlined">
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
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancelar
        </Button>
        <LoadingButton onClick={onConfirm} variant="contained" color="primary" loading={false}>
          Programar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

AddMaintenanceDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  selected: PropTypes.object,
};
