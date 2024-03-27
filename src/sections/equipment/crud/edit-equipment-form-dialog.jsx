import { format } from 'date-fns';
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

import { selectEmployees } from 'src/features/employee/employeeSlice';
import { editEquipment, selectEquipment } from 'src/features/equipment/equipmentSlice';
import { selectUiParametersByName } from 'src/features/uiparameters/uiParametersSlice';
import { closeDialog, selectDialogOpen, selectDialogData } from 'src/features/dialogs/dialogsSlice';

export default function EditEquipmentFormDialog() {
  const dispatch = useDispatch();

  const employees = useSelector(selectEmployees);
  const inventory = useSelector(selectEquipment);
  const open = useSelector((state) => selectDialogOpen(state, 'editEquipment'));
  const categories = useSelector((state) => selectUiParametersByName(state, 'TipoEquipo'));
  const locations = useSelector((state) => selectUiParametersByName(state, 'Ubicacion'));
  const equipmentId = useSelector((state) => selectDialogData(state, 'editEquipment'));

  const equipment = inventory.find((item) => item.id === equipmentId);
  const employeesNames = employees.map((employee) => employee.name);

  const [editForm, setEditForm] = useState({
    name: '',
    code: '',
    serialNumber: '',
    purchaseDate: '',
    location: locations[0] || null,
    model: '',
    category: categories[0] || null,
    description: '',
    accountableId: '',
  });

  const { name, code, serialNumber, location, model, description, accountableId, category } =
    editForm;

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
                      location: value || null,
                    });
                  }}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
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
                      accountableId: employees[employeesNames.indexOf(value)]?.id || null,
                    });
                  }}
                  isOptionEqualToValue={(option, value) => option.value === value.value}
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
                rows={7.2}
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
        <Button onClick={handleClose} color="error" size="small">
          Cancelar
        </Button>
        <LoadingButton onClick={handleConfirm} size="small" autoFocus color="success">
          Guardar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
