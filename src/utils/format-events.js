export function generateEvents(maintenance) {
  const { equipment, type, description, date, frequency, status, duration } = maintenance;

  if (frequency <= 0) {
    console.error('La frecuencia debe ser mayor que cero.');
    return [];
  }

  const maintenanceDate = new Date(date);
  const events = [];

  // Recorremos desde la fecha de mantenimiento inicial hasta 3 años después
  for (
    let currentDate = new Date(date), i = 0;
    currentDate.getFullYear() - maintenanceDate.getFullYear() < 1;
    currentDate.setDate(currentDate.getDate() + frequency), i += 1
  ) {
    const startDate = new Date(currentDate);
    const endDate = new Date(startDate.getTime() + duration * 60000); // End date is the start date plus the duration in minutes
    events.push({
      title: `${equipment} - ${type} - ${description} - ${status} - ${i + 1} de ${Math.ceil(
        360 / frequency
      )}`,
      start: startDate,
      end: endDate,
    });
  }

  return events;
}
