import React from 'react';
import PropTypes from 'prop-types';

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

export default function AddEquipmentFormDialog({ open, onClose, onConfirm }) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Añadir Equipo</DialogTitle>
      <DialogContent style={{ paddingTop: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField fullWidth label="Codigo" variant="outlined" />
              <TextField fullWidth label="Serial" variant="outlined" />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Nombre" variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Ubicacion" variant="outlined" />
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
            />
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

AddEquipmentFormDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};
