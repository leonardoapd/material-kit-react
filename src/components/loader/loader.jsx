import React from 'react';

import { Typography, CircularProgress } from '@mui/material';

const Loader = () => (
  <div style={{ display: 'grid', placeItems: 'center', height: '100%', alignContent: 'center' }}>
    <CircularProgress />
    <Typography variant="body2" sx={{ mt: 2 }}>
      Loading...
    </Typography>
  </div>
);

export default Loader;
