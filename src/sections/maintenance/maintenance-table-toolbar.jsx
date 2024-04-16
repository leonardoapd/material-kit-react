import { useState } from 'react';
import PropTypes from 'prop-types';
// import { useDispatch } from 'react-redux';

import {
  Stack,
  Button,
  Tooltip,
  Toolbar,
  TextField,
  Typography,
  IconButton,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';

// import { openDialog } from 'src/features/dialogs/dialogsSlice';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function MaintenanceTableToolbar({
  dates,
  numSelected,
  filterName,
  onFilterName,
  onDelete,
  onShowInfo,
  onFilterDates,
}) {
  // const dispatch = useDispatch();

  const { startDate, endDate } = dates;
  const [selectedStartDate, setSelectedStartDate] = useState(startDate);
  const [selectedEndDate, setSelectedEndDate] = useState(endDate);

  const handleShowInfo = () => {
    onShowInfo();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'startDate') {
      setSelectedStartDate(value);
    } else {
      setSelectedEndDate(value);
    }
    onFilterDates(selectedStartDate, selectedEndDate);
  };

  const renderOptions = () => {
    if (numSelected > 0 && numSelected < 2) {
      return (
        <Button
          variant="outlined"
          color="success"
          startIcon={<Iconify icon="eva:eye-fill" />}
          onClick={handleShowInfo}
        >
          Ver Detalles
        </Button>
      );
    }
    if (numSelected > 1) {
      return (
        <Tooltip title="Eliminar">
          <IconButton onClick={onDelete}>
            <Iconify icon="ic:round-delete" />
          </IconButton>
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected === 1 ? `${numSelected} seleccionado` : `${numSelected} seleccionados`}
        </Typography>
      ) : (
        <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
          <OutlinedInput
            value={filterName}
            fullWidth
            onChange={onFilterName}
            placeholder="Filtrar"
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: 'text.disabled', width: 20, height: 20 }}
                />
              </InputAdornment>
            }
            size="small"
          />
          <TextField
            fullWidth
            label="Fecha de Inicio"
            variant="outlined"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={selectedStartDate}
            onChange={handleChange}
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
            onChange={handleChange}
            name="endDate"
            size="small"
          />
        </Stack>
      )}

      {renderOptions()}
    </Toolbar>
  );
}

MaintenanceTableToolbar.propTypes = {
  dates: PropTypes.object,
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDelete: PropTypes.func,
  onShowInfo: PropTypes.func,
  onFilterDates: PropTypes.func,
};
