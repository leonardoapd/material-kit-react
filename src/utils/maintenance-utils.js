// maintenanceUtils.js
import { fCurrency } from 'src/utils/format-number';
import { fDateTime, calculateEstimatedDuration } from 'src/utils/format-time';

export const taskStatus = {
  Pendiente: '⌚',
  Ejecutado: '✅',
  Cancelado: '❌',
  'En Curso': '⏳',
  Reprogramado: '🔄',
};

export const taskFrequency = {
  7: 'Semanal',
  15: 'Quincenal',
  30: 'Mensual',
  60: 'Bimestral',
  90: 'Trimestral',
  180: 'Semestral',
  360: 'Anual',
};

export const getMaintenanceColorByStatus = (status) => {
  const statusColors = {
    Pendiente: 'red',
    'En Progreso': 'blue',
    Ejecutado: '#43A047',
    Cancelado: 'gray',
    Reprogramado: 'orange',
  };

  return statusColors[status] || 'blue';
};

export const getEquipmentName = (equipmentId, equipment) => {
  const foundEquipment = equipment.find((eq) => eq.id === equipmentId);
  return foundEquipment ? foundEquipment.name : 'Equipo no encontrado';
};

export const formatMaintenanceData = (maintenances, equipment) =>
  maintenances.map((maintenance) => {
    const estimatedDuration = calculateEstimatedDuration(
      maintenance.startDate,
      maintenance.endDate
    );
    return {
      ...maintenance,
      startDate: fDateTime(maintenance.startDate, 'dd/MM/yyyy HH:mm a'),
      cost: fCurrency(maintenance.cost),
      status: taskStatus[maintenance.status],
      frequency: taskFrequency[maintenance.frequency],
      equipmentName: getEquipmentName(maintenance.equipmentId, equipment),
      estimatedDuration,
      nextMaintenanceTaskDate: fDateTime(maintenance.nextMaintenanceTaskDate, 'dd/MM/yyyy HH:mm a'),
    };
  });

export const capitalizeFirstLetter = (string) => {
    const words = string.split(' ');
    const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
    return capitalizedWords.join(' ');
};
