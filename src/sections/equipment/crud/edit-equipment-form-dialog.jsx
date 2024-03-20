import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
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

import { EquipmentCategory } from 'src/enums/equipment-category';
import { editEquipment } from 'src/features/equipment/equipmentSlice';
import {
  closeEditEquipmentDialog,
  selectEditEquipmentDialogOpen,
  selectEditEquipmentDialogData,
} from 'src/features/equipment-dialogs/equipmentDialogSlice';

export default function EditEquipmentFormDialog({ employees }) {
  const dispatch = useDispatch();

  const open = useSelector(selectEditEquipmentDialogOpen);
  const [editForm, setEditForm] = useState({
    name: '',
    code: '',
    serialNumber: '',
    purchaseDate: '',
    location: '',
    model: '',
    category: '',
    description: '',
    accountableId: '',
  });
  const equipment = useSelector(selectEditEquipmentDialogData);

  useEffect(() => {
    if (equipment) {
      setEditForm(equipment);
    }
  }, [equipment]);

  const { name, code, serialNumber, location, model, category, description, accountableId } = editForm;

  const handleClose = () => {
    dispatch(closeEditEquipmentDialog());
  };

  const handleChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event) => {
    setEditForm({
      ...editForm,
      category: event.target.value,
    });
  };

  const handleConfirm = () => {
    dispatch(editEquipment(editForm));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Editar Equipo</DialogTitle>
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
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
                <TextField
                  fullWidth
                  label="Nombre"
                  variant="outlined"
                  value={name}
                  onChange={handleChange}
                  name="name"
                />
                <TextField
                  fullWidth
                  label="Ubicacion"
                  variant="outlined"
                  value={location}
                  onChange={handleChange}
                  name="location"
                />
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="accountableId">Responsable</InputLabel>
                  <Select
                    labelId="accountableId"
                    id="accountableId"
                    label="Responsable"
                    variant="outlined"
                    value={accountableId}
                    onChange={handleChange}
                    name="accountableId"
                  >
                    {employees.map((employee) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>

              <TextField
                fullWidth
                label="Descripcion"
                variant="outlined"
                value={description}
                onChange={handleChange}
                name="description"
                multiline
                rows={7.2} // Puedes ajustar el número de filas según sea necesario
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField
                fullWidth
                label="Fecha de Compra"
                variant="outlined"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                value={editForm.purchaseDate ? format(new Date(editForm.purchaseDate), 'yyyy-MM-dd') : ''}
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
                  onChange={handleSelectChange}
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
          Editar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

EditEquipmentFormDialog.propTypes = {
  employees: PropTypes.array,
};
