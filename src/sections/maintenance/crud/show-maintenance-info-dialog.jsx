import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, Stack, Dialog, Button, Typography, CardContent, CardActions } from '@mui/material';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import { taskFrequency, getEquipmentName, capitalizeFirstLetter } from 'src/utils/maintenance-utils';

import { selectEquipment } from 'src/features/equipment/equipmentSlice';
import { selectMaintenanceById } from 'src/features/maintenance/maintenanceSlice';
import { closeDialog, selectDialogOpen, selectDialogData } from 'src/features/dialogs/dialogsSlice';

import DescriptionRenderer from 'src/components/description-renderer/description-renderer';
// import Iconify from 'src/components/iconify';

export default function ShowMaintenanceInfoDialog() {
  const dispatch = useDispatch();
  const open = useSelector((state) => selectDialogOpen(state, 'showMaintenanceInfo'));
  const maintenanceId = useSelector((state) => selectDialogData(state, 'showMaintenanceInfo'));
  const maintenance = useSelector((state) => selectMaintenanceById(state, maintenanceId));
  const equipment = useSelector(selectEquipment);

  const [info, setInfo] = useState({
    equipmentName: '',
    type: '',
    description: '',
    cost: '',
    frequency: '',
    startDate: '',
    endDate: '',
    status: '',
    comments: '',
  });

  useEffect(() => {
    if (maintenance) {
      setInfo({
        equipmentName: capitalizeFirstLetter(getEquipmentName(maintenance.equipmentId, equipment)),
        type: maintenance.type || '',
        description: maintenance.description || '',
        cost: fCurrency(maintenance.cost),
        frequency: taskFrequency[maintenance.frequency],
        startDate: fDate(maintenance.startDate, 'dd/MM/yyyy HH:mm'),
        endDate: fDate(maintenance.endDate, 'dd/MM/yyyy HH:mm'),
        status: maintenance.status || '',
        comments: maintenance.comments || '',
      });
    }
  }, [equipment, maintenance]);

  const handleClose = () => {
    dispatch(closeDialog({ dialogType: 'showMaintenanceInfo' }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card sx={{ position: 'relative', maxWidth: 485 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {info.equipmentName} - Mantenimiento {info.type}
          </Typography>
          <DescriptionRenderer description={info.description || 'Sin descripción.'} />
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
          >
            <Stack direction="column">
              <Typography variant="body2" color="text.secondary">
                <strong>Fecha de inicio:</strong> {info.startDate}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Fecha de fin:</strong> {info.endDate}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography variant="body2" color="text.secondary">
                <strong>Estado:</strong> {info.status}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Costo:</strong> {info.cost}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Frecuencia:</strong> {info.frequency}
              </Typography>
            </Stack>
          </Stack>
            <Typography variant="body2" color="text.secondary">
                <strong>Comentarios:</strong>
            </Typography>
            <DescriptionRenderer description={info.comments || 'No hay comentarios.'} />
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" onClick={handleClose}>
            Cerrar
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}
