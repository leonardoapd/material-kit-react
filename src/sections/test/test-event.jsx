import React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/system';
import { Box, Typography } from '@mui/material';

const StyledEventBox = styled(Box)(({ theme, event }) => ({
  border: `1px solid ${theme.palette.common.white}`, // Borde blanco
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  backgroundColor: event.color,
  color: theme.palette.common.white,
  height: '100%',
}));

const formatDate = (date) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString([], options);
};

const TestEvent = ({ event, ...props }) => {
  const { title, start, end } = event;

  return (
    <StyledEventBox {...props} draggable={false} event={event}>
      <Typography variant="body2">{title}</Typography>
      <Typography variant="caption">
        De {formatDate(start)} A {formatDate(end)}
      </Typography>
    </StyledEventBox>
  );
};

TestEvent.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    color: PropTypes.string,
  }),
};

export default TestEvent;
