import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

import { fDate } from 'src/utils/format-time';

const StyledEventBox = styled(Box)(({ theme, event }) => ({
  border: `1px solid ${theme.palette.common.white}`, // Borde blanco
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  backgroundColor: event.color,
  color: theme.palette.common.white,
  height: '100%',
}));

export default function RenderedEvent({ event, ...props }) {
  const { title, start, end } = event;

  return (
    <StyledEventBox {...props} draggable={false} event={event}>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="caption">
        Desde {fDate(start, 'dd/MM/yyyy HH:mm a')} hasta {fDate(end, 'dd/MM/yyyy HH:mm a')}
      </Typography>
    </StyledEventBox>
  );
}

RenderedEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    color: PropTypes.string,
  }),
};
