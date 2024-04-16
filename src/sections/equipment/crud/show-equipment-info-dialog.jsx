import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  Stack,
  Dialog,
  Button,
  Avatar,
  Tooltip,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
} from '@mui/material';

import { fDate } from 'src/utils/format-time';

import { selectEquipment } from 'src/features/equipment/equipmentSlice';
import { closeDialog, selectDialogOpen, selectDialogData } from 'src/features/dialogs/dialogsSlice';

import Iconify from 'src/components/iconify';
import DescriptionRenderer from 'src/components/description-renderer/description-renderer';

export default function ShowEquipmentInfoDialog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inventory = useSelector(selectEquipment);
  const open = useSelector((state) => selectDialogOpen(state, 'showEquipmentInfo'));
  const equipmentId = useSelector((state) => selectDialogData(state, 'showEquipmentInfo'));

  const equipment = inventory.find((item) => item.id === equipmentId);

  const [info, setInfo] = useState({
    name: '',
    code: '',
    location: '',
    purchaseDate: '',
    serialNumber: '',
    photo: '',
    model: '',
    category: '',
    description: '',
  });

  const { name, code, location, purchaseDate, serialNumber, photo, model, category, description } =
    info;

  useEffect(() => {
    if (equipment) {
      setInfo({
        ...equipment,
      });
    }
  }, [equipment]);

  const purchaseDateFormatted = fDate(purchaseDate, 'dd/MM/yyyy');

  const handleClose = () => {
    dispatch(closeDialog({ dialogType: 'showEquipmentInfo' }));
  };

  const handleGenerateQR = () => {
    // Lógica para generar código QR o mostrarlo
    if (code) {
      // Mostrar QR
      console.log('Mostrar código QR');
    } else {
      // Generar código QR
      console.log('Generar código QR');
    }
  };

  const handleViewMaintenanceDetails = () => {
    navigate(`/maintenance?equipmentName=${encodeURIComponent(name)}`);
    dispatch(closeDialog({ dialogType: 'showEquipmentInfo' }));
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Card sx={{ position: 'relative', maxWidth: 485 }}>
        <CardMedia component="img" image={photo} alt={name} height="200" />
        <Stack direction="row" sx={{ position: 'absolute', top: '8px', right: '8px' }}>
          <Tooltip title={code ? 'Mostrar QR' : 'Generar código QR'}>
            <Button
              sx={{
                backgroundColor: 'transparent',
                borderRadius: '50%',
                padding: '8px',
              }}
              onClick={handleGenerateQR}
            >
              <Avatar sx={{ width: 40, height: 40 }}>
                <Iconify icon="bi:qr-code" />
              </Avatar>
            </Button>
          </Tooltip>
          <Tooltip title="Imprimir Hoja de Vida">
            <Button
              sx={{
                backgroundColor: 'transparent',
                borderRadius: '50%',
                padding: '8px',
              }}
              //   onClick={handlePrint}
            >
              <Avatar sx={{ width: 40, height: 40 }}>
                <Iconify icon="bi:printer" />
              </Avatar>
            </Button>
          </Tooltip>
        </Stack>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <DescriptionRenderer description={description || 'Sin descripción.'} />
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}
          >
            <Stack direction="column">
              <Typography variant="body2" color="text.secondary">
                <strong>Modelo:</strong> {model}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Categoria:</strong> {category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Ubicación:</strong> {location}
              </Typography>
            </Stack>
            <Stack direction="column">
              <Typography variant="body2" color="text.secondary">
                <strong>Código:</strong> {code}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Serial:</strong> {serialNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Fecha de compra:</strong> {purchaseDateFormatted}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button size="small" onClick={handleViewMaintenanceDetails}>
            Ver Detalles de Maintenimientos
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
}
