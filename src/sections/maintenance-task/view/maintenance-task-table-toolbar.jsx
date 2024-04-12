import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Button, Toolbar, Typography } from '@mui/material';

import { openDialog } from 'src/features/dialogs/dialogsSlice';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function MaintenanceTaskTableToolbar({
  numSelected,
  onFilterDates,
  onSchedule,
  dates,
}) {
  const dispatch = useDispatch();
  const { startDate, endDate } = dates;
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);

  const handleSchedule = () => {
    dispatch(openDialog({ dialogType: 'addMaintenance' }));
  };

  const handleFilterDates = () => {
    onFilterDates(selectedStartDate, selectedEndDate);
  };

  const renderOptions = () => {
    if (numSelected > 0 && numSelected < 2) {
      return (
        <Button
          variant="outlined"
          color="success"
          startIcon={<Iconify icon="ic:schedule" />}
          onClick={handleSchedule}
          sx={{ p: 2 }}
        >
          Programar Mantenimiento
        </Button>
      );
    }
    return (
      <Button
        variant="outlined"
        color="success"
        startIcon={<Iconify icon="ic:round-filter-list" />}
        onClick={handleFilterDates}
      >
        Filtrar Tareas
      </Button>
    );
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected === 1 ? `${numSelected} seleccionado` : `${numSelected} seleccionados`}
        </Typography>
      ) : (
        <Stack direction="row" spacing={2} sx={{ width: '70%' }}>
          <TextField
            fullWidth
            label="Fecha de Inicio"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={selectedStartDate}
            onChange={(e) => setSelectedStartDate(e.target.value)}
            name="startDate"
            size="small"
          />
          <TextField
            fullWidth
            label="Fecha Fin"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={selectedEndDate}
            onChange={(e) => setSelectedEndDate(e.target.value)}
            name="endDate"
            size="small"
          />
        </Stack>
      )}

      {renderOptions()}
    </Toolbar>
  );
}

MaintenanceTaskTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  onFilterDates: PropTypes.func,
  onSchedule: PropTypes.func,
  dates: PropTypes.object,
};
