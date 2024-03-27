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

import { selectEquipment } from 'src/features/equipment/equipmentSlice';
import { closeDialog, selectDialogOpen, selectDialogData } from 'src/features/dialogs/dialogsSlice';

import Iconify from 'src/components/iconify';

export default function ShowEquipmentInfoDialog() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inventory = useSelector(selectEquipment);
  const open = useSelector((state) => selectDialogOpen(state, 'showEquipmentInfo'));
  const equipmentId = useSelector((state) => selectDialogData(state, 'showEquipmentInfo'));

  const equipment = inventory.find((item) => item.id === equipmentId);

  const [expanded, setExpanded] = useState(false);
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

  const purchaseDateFormatted = new Date(purchaseDate).toLocaleDateString('en-GB');

  const handleClose = () => {
    dispatch(closeDialog({ dialogType: 'showEquipmentInfo' }));
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderDescription = () => {
    const maxLength = 100; // Longitud máxima de la descripción antes de truncar
    const maxHeight = 200; // Altura máxima de la descripción antes de agregar un scrollbar
    if (description && description.length > maxLength && !expanded) {
      return (
        <div style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto' }}>
          <Typography variant="body2" color="text.secondary">
            {`${description.substring(0, maxLength)}...`}
          </Typography>
          <Button onClick={toggleExpanded} size="small">
            Ver más
          </Button>
        </div>
      );
    }
    return (
      <div style={{ maxHeight: `${maxHeight}px`, overflowY: 'auto' }}>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {description && description.length > maxLength && (
          <Button onClick={toggleExpanded} size="small">
            Ver menos
          </Button>
        )}
      </div>
    );
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
          {renderDescription()}
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
              <Typography variant="body2" color="text.secondary">
                <strong>Ultimo Mantenimiento Realizado:</strong> {purchaseDateFormatted}
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
              <Typography variant="body2" color="text.secondary">
                <strong>Próximo Mantenimiento:</strong> {purchaseDateFormatted}
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
