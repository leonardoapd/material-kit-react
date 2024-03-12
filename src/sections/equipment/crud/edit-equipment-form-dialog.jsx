import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Grid,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const EditEquipmentFormDialog = ({ open, onClose, onConfirm, equipment }) => {
  const [editForm, setEditForm] = useState({
    name: equipment.name,
    code: equipment.code,
    serialNumber: equipment.serialNumber.toUpperCase(),
    purchaseDate: format(new Date(equipment.purchaseDate), 'yyyy-MM-dd'),
    location: equipment.location,
  });

  const { name, code, serialNumber, purchaseDate, location } = editForm;

  const handleChange = (event) => {
    setEditForm({
      ...editForm,
      [event.target.name]: event.target.value,
    });
    console.log(editForm);
  };

  const handleConfirm = () => {
    // Perform save operation here
    // You can access the updated values using the name, description, and quantity variables
    // Don't forget to call onClose() to close the dialog
    onConfirm();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
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
                name="serial"
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
            <TextField
              fullWidth
              label="Fecha de Compra"
              variant="outlined"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={purchaseDate}
              onChange={handleChange}
              name="purchaseDate"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="outlined" color="error">
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
};

export default EditEquipmentFormDialog;

EditEquipmentFormDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  equipment: PropTypes.object,
};
