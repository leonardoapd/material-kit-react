import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Grid,
  Stack,
  Dialog,
  Button,
  Select,
  MenuItem,
  TextField,
  InputLabel,
  DialogTitle,
  FormControl,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { EquipmentCategory } from 'src/enums/enums';
import { addEquipment } from 'src/features/equipment/equipmentSlice';
// import {
//   closeNewEquipmentDialog,
//   selectNewEquipmentDialogOpen,
// } from 'src/features/equipment-dialogs/dialogsSlice';

import { closeDialog, selectDialogOpen } from 'src/features/dialogs/dialogsSlice';

export default function AddEquipmentFormDialog() {
  const dispatch = useDispatch();
  const open = useSelector((state) => selectDialogOpen(state, 'addEquipment'));

  const [addForm, setAddForm] = useState({
    code: '',
    serialNumber: '',
    name: '',
    location: '',
    purchaseDate: '',
    model: '',
    category: EquipmentCategory.Computador,
  });

  const { code, serialNumber, name, location, model, purchaseDate, category } = addForm;

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
      category: EquipmentCategory.Computador,
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
            <TextField
              fullWidth
              label="Ubicacion"
              variant="outlined"
              value={location}
              onChange={handleChange}
              name="location"
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
              <FormControl fullWidth variant="outlined">
                <InputLabel id="category">Categoria</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  label="Categoria"
                  variant="outlined"
                  value={category}
                  onChange={handleChange}
                  name="category"
                >
                  <MenuItem value={EquipmentCategory.Computador}>Computadora</MenuItem>
                  <MenuItem value={EquipmentCategory.Monitor}>Monitor</MenuItem>
                  <MenuItem value={EquipmentCategory.Impresora}>Impresora</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="error">
          Cancelar
        </Button>
        <LoadingButton
          onClick={handleConfirm}
          variant="contained"
          autoFocus
          color="success"
          loading={false}
        >
          Añadir
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
