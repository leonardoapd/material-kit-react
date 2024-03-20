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

import { getCategoryFromValue } from 'src/enums/equipment-category';
import { openEditEquipmentDialog, openDeleteEquipmentDialog } from 'src/features/equipment-dialogs/equipmentDialogSlice';

import Iconify from 'src/components/iconify';


export default function EquipmentTableRow({ rowInfo, selected, handleClick, employees }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(null);
  
  const { id, name, code, location, purchaseDate, serialNumber, photo, model, category } = rowInfo;
  const categoryName = getCategoryFromValue(category);
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
    dispatch(openDeleteEquipmentDialog(id));
    handleCloseMenu();
  };

  const handleEdit = () => {
    dispatch(openEditEquipmentDialog(rowInfo));
    handleCloseMenu();
  }

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

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={photo} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{location}</TableCell>

        <TableCell>{formattedDate}</TableCell>

        <TableCell>{serialNumber}</TableCell>

        <TableCell>{model}</TableCell>

        <TableCell>{categoryName}</TableCell>

        <TableCell>{accountable}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
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
        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:eye-fill" sx={{ mr: 2 }} />
          View Resume
        </MenuItem>

        <MenuItem onClick={handleCloseMenu}>
          <Iconify icon="eva:download-fill" sx={{ mr: 2 }} />
          Download Manual
        </MenuItem>

        <MenuItem onClick={handleEdit}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
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
