import PropTypes from 'prop-types';
import React, { useState } from 'react';

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

// import { removeItem } from 'src/state/features/inventory/inventorySlice';
// import { useDeleteInventoryData } from 'src/queries/inventory/inventoryService';

import Iconify from 'src/components/iconify';

import EditEquipmentDialog from './crud/edit-equipment-form-dialog';
import DeleteConfirmationDialog from './crud/delete-confirmation-dialog';

export default function UserTableRow({
  id,
  selected,
  name,
  code,
  location,
  purchaseDate,
  serialNumber,
  image,
  handleClick,
}) {
  // const dispatch = useDispatch();
  // const { mutateAsync } = useDeleteInventoryData();
  const [open, setOpen] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const normalDate = new Date(purchaseDate);
  const formattedDate = normalDate.toLocaleDateString('en-GB');

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleToggleDeleteDialog = () => {
    setOpenDialog(!openDialog);
    setOpen(false);
  };

  const handleToggleEditDialog = () => {
    setOpenEditDialog(!openEditDialog);
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      // mutateAsync(id);
      // dispatch(removeItem(id));
      handleToggleDeleteDialog();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          {code.toUpperCase()}
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={image} />
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{location}</TableCell>

        <TableCell>{formattedDate}</TableCell>

        <TableCell>{serialNumber.toUpperCase()}</TableCell>

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

        <MenuItem onClick={handleToggleEditDialog}>
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={handleToggleDeleteDialog} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <DeleteConfirmationDialog
        open={openDialog}
        onClose={handleToggleDeleteDialog}
        onConfirm={handleDelete}
      />

      <EditEquipmentDialog
        open={openEditDialog}
        onClose={handleToggleEditDialog}
        onConfirm={handleDelete}
        equipment={{ name, code, purchaseDate, serialNumber, location, id }}
      />
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  code: PropTypes.any,
  name: PropTypes.any,
  location: PropTypes.any,
  purchaseDate: PropTypes.any,
  serialNumber: PropTypes.any,
  image: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
};
