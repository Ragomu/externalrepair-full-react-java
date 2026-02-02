import React from 'react';

import { SkeletonCell, TableCell, TableRow } from './styles';

const SkeletonHistoricTableRow = () => (
  <TableRow>
    <TableCell>
      <SkeletonCell />
    </TableCell>
    <TableCell>
      <SkeletonCell />
    </TableCell>
    <TableCell>
      <SkeletonCell />
    </TableCell>
    <TableCell>
      <SkeletonCell />
    </TableCell>{' '}
    <TableCell>
      <SkeletonCell />
    </TableCell>
  </TableRow>
);

export default SkeletonHistoricTableRow;
