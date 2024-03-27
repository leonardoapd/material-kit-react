import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Grid,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { addEquipment } from 'src/features/equipment/equipmentSlice';
import { closeDialog, selectDialogOpen } from 'src/features/dialogs/dialogsSlice';
import { selectUiParametersByName } from 'src/features/uiparameters/uiParametersSlice';

export default function AddEquipmentFormDialog() {
  const dispatch = useDispatch();
  const open = useSelector((state) => selectDialogOpen(state, 'addEquipment'));
  const categories = useSelector((state) => selectUiParametersByName(state, 'TipoEquipo'));
  const locations = useSelector((state) => selectUiParametersByName(state, 'Ubicacion'));

  const [addForm, setAddForm] = useState({
    code: '',
    serialNumber: '',
    name: '',
    location: '',
    purchaseDate: '',
    model: '',
    category: '',
  });

  const { code, serialNumber, name, model, purchaseDate } = addForm;

  const handleClose = () => {
    dispatch(closeDialog({ dialogType: 'addEquipment' }));
  };

  const handleChange = (event) => {
    setAddForm({
      ...addForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleConfirm = () => {
    dispatch(addEquipment(addForm));
    handleClose();
    setAddForm({
      code: '',
      serialNumber: '',
      name: '',
      location: '',
      purchaseDate: '',
      model: '',
      category: '',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Añadir Equipo</DialogTitle>
      <DialogContent style={{ paddingTop: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Codigo"
                variant="outlined"
                value={code}
                onChange={handleChange}
                name="code"
              />
              <TextField
                fullWidth
                label="Serial"
                variant="outlined"
                value={serialNumber}
                onChange={handleChange}
                name="serialNumber"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              variant="outlined"
              value={name}
              onChange={handleChange}
              name="name"
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              fullWidth
              options={locations}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Ubicacion" variant="outlined" />
              )}
              onChange={(event, value) => {
                setAddForm({
                  ...addForm,
                  location: value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Fecha de compra"
                type="date"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                value={purchaseDate}
                onChange={handleChange}
                name="purchaseDate"
              />
              <TextField
                fullWidth
                label="Modelo"
                variant="outlined"
                value={model}
                onChange={handleChange}
                name="model"
              />
              <Autocomplete
                fullWidth
                options={categories}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField {...params} label="Categoria" variant="outlined" />
                )}
                onChange={(event, value) => {
                  setAddForm({
                    ...addForm,
                    category: value,
                  });
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error" size="small">
          Cancelar
        </Button>
        <Button
          onClick={handleConfirm}
          size="small"
          autoFocus
          color="success"
          loading={false}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
