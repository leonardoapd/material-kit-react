import React from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

export default function DeleteConfirmationDialog({ open, onClose, onConfirm }) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Do you want to delete this item?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          No, cancel
        </Button>
        <Button onClick={handleConfirm} variant="contained" autoFocus color="error">
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

DeleteConfirmationDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};
