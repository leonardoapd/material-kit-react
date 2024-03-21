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
  TextField,
  DialogTitle,
  Autocomplete,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { editEquipment } from 'src/features/equipment/equipmentSlice';
import { selectUiParametersByName } from 'src/features/uiparameters/uiParametersSlice';
import { closeDialog, selectDialogOpen, selectDialogData } from 'src/features/dialogs/dialogsSlice';

export default function EditEquipmentFormDialog({ employees }) {
  const dispatch = useDispatch();
  const open = useSelector((state) => selectDialogOpen(state, 'editEquipment'));
  const categories = useSelector((state) => selectUiParametersByName(state, 'TipoEquipo'));
  const locations = useSelector((state) => selectUiParametersByName(state, 'Ubicacion'));

  const [editForm, setEditForm] = useState({
    name: '',
    code: '',
    serialNumber: '',
    purchaseDate: '',
    location: null, // Set initial value to null
    model: '',
    category: null, // Set initial value to null
    description: '',
    accountableId: '',
  });

  const equipment = useSelector((state) => selectDialogData(state, 'editEquipment'));
  const employeesNames = employees.map((employee) => employee.name);

  useEffect(() => {
    if (equipment) {
      setEditForm({
        ...equipment,
        location: equipment.location,
        purchaseDate: equipment.purchaseDate
          ? format(new Date(equipment.purchaseDate), 'yyyy-MM-dd')
          : '',
        category: equipment.category,
        accountableId: equipment.accountableId,
      });
    }
  }, [equipment]);

  const { name, code, serialNumber, location, model, description, accountableId, category } =
    editForm;

  const handleClose = () => {
    dispatch(closeDialog({ dialogType: 'editEquipment' }));
    setEditForm({
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
  };

  const handleChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
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
                <Autocomplete
                  fullWidth
                  label="Ubicacion"
                  options={locations}
                  getOptionLabel={(option) => option}
                  value={location}
                  onChange={(event, value) => {
                    setEditForm({
                      ...editForm,
                      location: value || '',
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Ubicacion" variant="outlined" />
                  )}
                />
                <Autocomplete
                  fullWidth
                  label="Responsable"
                  options={employees.map((employee) => employee.name)}
                  getOptionLabel={(option) => option}
                  value={employees.find((employee) => employee.id === accountableId)?.name || ''}
                  onChange={(event, value) => {
                    setEditForm({
                      ...editForm,
                      accountableId: employees[employeesNames.indexOf(value)]?.id || '',
                    });
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Responsable" variant="outlined" />
                  )}
                />
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
                value={editForm.purchaseDate || ''}
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
                label="Categoria"
                options={categories}
                getOptionLabel={(option) => option}
                value={category}
                onChange={(event, value) => {
                  setEditForm({
                    ...editForm,
                    category: value || '',
                  });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Categoria" variant="outlined" />
                )}
              />
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
