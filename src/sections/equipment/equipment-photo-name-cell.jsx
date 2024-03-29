import React from 'react';
import PropTypes from 'prop-types';

import { Stack, Avatar, Typography } from '@mui/material';

const EquipmentPhotoNameCell = ({ photo, name }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <Avatar src={photo} alt={name} />
    <Typography>{name}</Typography>
  </Stack>
);

export default EquipmentPhotoNameCell;

EquipmentPhotoNameCell.propTypes = {
  photo: PropTypes.string,
  name: PropTypes.string,
};
