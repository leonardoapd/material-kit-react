import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';

import { useResponsive } from 'src/hooks/use-responsive';

import {
  fetchUiParameters,
  selectUiParametersStatus,
} from 'src/features/uiparameters/uiParametersSlice';

import { NAV, HEADER } from './config-layout';

// ----------------------------------------------------------------------

const SPACING = 8;

export default function Main({ children, sx, ...other }) {
  const dispatch = useDispatch();
  const status = useSelector(selectUiParametersStatus);
  const lgUp = useResponsive('up', 'lg');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUiParameters());
    }
  }, [dispatch, status]);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        minHeight: 1,
        display: 'flex',
        flexDirection: 'column',
        py: `${HEADER.H_MOBILE + SPACING}px`,
        ...(lgUp && {
          px: 2,
          py: `${HEADER.H_DESKTOP + SPACING}px`,
          width: `calc(100% - ${NAV.WIDTH}px)`,
        }),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Box>
  );
}

Main.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};
