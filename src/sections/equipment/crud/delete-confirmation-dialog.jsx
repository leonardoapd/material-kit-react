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

import { removeEquipment } from 'src/features/equipment/equipmentSlice';
import { closeDialog, selectDialogOpen, selectDialogData } from 'src/features/dialogs/dialogsSlice';
import {
  fetchMaintenanceCounts,
  fetchMaintenanceComplience,
} from 'src/features/charts/chartsSlice';

export default function DeleteConfirmationDialog() {
  const dispatch = useDispatch();
  // const open = useSelector(selectDeleteEquipmentDialogOpen);
  // const data = useSelector(selectDeleteEquipmentDialogData);
  const open = useSelector((state) => selectDialogOpen(state, 'deleteEquipment'));
  const data = useSelector((state) => selectDialogData(state, 'deleteEquipment'));
  const id = data;

  const handleClose = () => {
    dispatch(closeDialog({ dialogType: 'deleteEquipment' }));
  };

  const handleConfirm = () => {
    dispatch(removeEquipment(id));
    dispatch(fetchMaintenanceCounts());
    dispatch(fetchMaintenanceComplience());
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">
        Estas seguro que deseas eliminar este equipo?
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
