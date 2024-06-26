import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Stack,
  Avatar,
  Popover,
  TableRow,
  Checkbox,
  MenuItem,
  TableCell,
  Typography,
  IconButton,
} from '@mui/material';

import { openDialog } from 'src/features/dialogs/dialogsSlice';

import Iconify from 'src/components/iconify';

export default function EquipmentTableRow({ rowInfo, selected, handleClick, employees }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);

  const { id, name, code, location, purchaseDate, serialNumber, photo, model, category } = rowInfo;
  const normalDate = new Date(purchaseDate);
  const formattedDate = normalDate.toLocaleDateString('en-GB');
  const accountable = employees.find((employee) => employee.id === rowInfo.accountableId)?.name;

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDelete = () => {
    dispatch(openDialog({ dialogType: 'deleteEquipment', data: id }));
    handleCloseMenu();
  };

  const handleEdit = () => {
    dispatch(openDialog({ dialogType: 'editEquipment', data: rowInfo }));
    handleCloseMenu();
  };

  const handleShowInfo = () => {
    dispatch(openDialog({ dialogType: 'showEquipmentInfo', data: rowInfo }));
    handleCloseMenu();
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell
          component="th"
          scope="row"
          padding="none"
          sx={{ maxWidth: 80, textAlign: 'center' }}
        >
          {code}
        </TableCell>

        <TableCell component="th" scope="row" padding="none" sx={{ width: 400 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={photo} />
            <Typography variant="subtitle2">{name}</Typography>
          </Stack>
        </TableCell>

        <TableCell>{location}</TableCell>

        <TableCell>{formattedDate}</TableCell>

        <TableCell>{serialNumber}</TableCell>

        <TableCell>{model}</TableCell>

        <TableCell>{category}</TableCell>

        <TableCell>{accountable}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="material-symbols:expand-circle-down-outline-rounded" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 240 },
        }}
      >
        <MenuItem onClick={handleShowInfo}>
          <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
          Ver información
        </MenuItem>
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:download-fill" sx={{ mr: 2 }} />
          Descargar manual
        </MenuItem>
        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Eliminar
        </MenuItem>
      </Popover>
    </>
  );
}

EquipmentTableRow.propTypes = {
  rowInfo: PropTypes.object,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  employees: PropTypes.array,
};
