import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Button, Typography } from '@mui/material';

export default function DescriptionRenderer({ description, maxLength = 100, maxHeight = 200 }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const descriptionStyle = {
    maxHeight: `${maxHeight}px`,
    overflowY: 'auto',
    whiteSpace: 'pre-line', // Esto garantiza que los saltos de línea se respeten
  };

  if (description && description.length > maxLength && !expanded) {
    return (
      <div style={descriptionStyle}>
        <Typography variant="body2" color="text.secondary">
          {`${description.substring(0, maxLength)}...`}
        </Typography>
        <Button onClick={toggleExpanded} size="small">
          Ver más
        </Button>
      </div>
    );
  }

  return (
    <div style={descriptionStyle}>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
      {description && description.length > maxLength && (
        <Button onClick={toggleExpanded} size="small">
          Ver menos
        </Button>
      )}
    </div>
  );
}

DescriptionRenderer.propTypes = {
  description: PropTypes.string,
  maxLength: PropTypes.number,
  maxHeight: PropTypes.number,
};
