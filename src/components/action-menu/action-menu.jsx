import { useState } from 'react';
import PropTypes from 'prop-types';

import { Popover, MenuItem, IconButton } from '@mui/material';

import Iconify from 'src/components/iconify';

export default function ActionMenu({ actions, itemId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    action.onClick(itemId);
    handleClose();
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Iconify icon="material-symbols:expand-circle-down-outline-rounded" />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {actions.map((action, index) => (
          <MenuItem key={index} onClick={() => handleAction(action)} sx={{color: action.color}}>
            {action.icon && <Iconify icon={action.icon} sx={{ mr: 2 }} />}
            {action.label}
          </MenuItem>
        ))}
      </Popover>
    </div>
  );
}

ActionMenu.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
  itemId: PropTypes.string.isRequired,
};
