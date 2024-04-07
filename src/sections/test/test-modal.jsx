import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

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

const TestModal = ({ scheduler }) => {
  const [formData, setFormData] = useState(
    {
      ...scheduler.edited,
      start: format(new Date(scheduler.edited?.start), "yyyy-MM-dd'T'HH:mm"),
      end: format(new Date(scheduler.edited?.end), "yyyy-MM-dd'T'HH:mm"),
      comments: scheduler.edited?.comments || '',
    } || {
      event_id: '',
      title: '',
      start: '',
      end: '',
      comments: '',
    }
  );

  const handleClose = () => {
    scheduler.close();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleConfirm = () => {
    scheduler.onConfirm(formData, 'edit'); // 'edit' puede cambiar según sea necesario
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle>{scheduler.edited ? 'Editar Evento' : 'Agregar Evento'}</DialogTitle>
      <DialogContent style={{ paddingTop: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="title"
              label="Título"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {scheduler.edited && (
            <Grid item xs={12}>
              <TextField
                name="comments"
                label="Comentarios"
                value={formData.comments}
                onChange={handleChange}
                fullWidth
                rows={4}
                multiline
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <TextField
                name="start"
                label="Inicio"
                type="datetime-local"
                value={formData.start}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                name="end"
                label="Fin"
                type="datetime-local"
                value={formData.end}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
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
        <Button onClick={handleConfirm} color="success" size="small" autoFocus>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestModal;

TestModal.propTypes = {
  scheduler: PropTypes.object,
};
