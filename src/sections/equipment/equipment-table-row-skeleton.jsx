import React from 'react';

import { TableRow, Skeleton, TableCell } from '@mui/material';

const EquipmentTableRowSkeleton = () => (
    <TableRow hover tabIndex={-1}>
      <TableCell padding="checkbox">
        <Skeleton variant="circular" width={24} height={24} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" width="100%" height={30} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width={80} />
      </TableCell>
      <TableCell align="right">
        <Skeleton variant="circular" width={24} height={24} />
      </TableCell>
    </TableRow>
  );

export default EquipmentTableRowSkeleton;
