import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import { removeMaintenance } from 'src/features/maintenance/maintenanceSlice';
import { closeDialog, selectDialogOpen, selectDialogData } from 'src/features/dialogs/dialogsSlice';

export default function DeleteConfirmationDialog() {
  const dispatch = useDispatch();

  const open = useSelector((state) => selectDialogOpen(state, 'deleteMaintenance'));
  const data = useSelector((state) => selectDialogData(state, 'deleteMaintenance'));
  const id = data;

  const handleClose = () => {
    dispatch(closeDialog({ dialogType: 'deleteMaintenance' }));
  };

  const handleConfirm = () => {
    dispatch(removeMaintenance(id));
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        Estas seguro que deseas eliminar este mantenimiento?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esta acción no se puede deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size="small" color="info">
          No, cancelar
        </Button>
        <Button onClick={handleConfirm} size="small" autoFocus color="error">
          Si, eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
