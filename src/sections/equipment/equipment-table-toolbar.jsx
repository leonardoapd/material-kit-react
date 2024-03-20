import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { openDialog } from 'src/features/dialogs/dialogsSlice';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function EquipmentTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  onDelete,
  onSchedule,
}) {
  const dispatch = useDispatch();

  const handleSchedule = () => {
    dispatch(openDialog({ dialogType: 'addMaintenance' }));
  };

  const renderOptions = () => {
    if (numSelected > 0 && numSelected < 2) {
      return (
        <Tooltip title="Programar Mantenimiento">
          <IconButton onClick={handleSchedule}>
            <Iconify icon="ic:schedule" />
          </IconButton>
        </Tooltip>
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
    return (
      <Tooltip title="Filtrar lista">
        <IconButton>
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      </Tooltip>
    );
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
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Buscar equipo..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {renderOptions()}
    </Toolbar>
  );
}

EquipmentTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  onDelete: PropTypes.func,
  onSchedule: PropTypes.func,
};
