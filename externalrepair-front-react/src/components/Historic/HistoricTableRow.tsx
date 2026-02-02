import React from 'react';
import { HistoryItemResponse } from '~/api/uisaApi';
import HistoricStatusBadge from './HistoricStatusBadge';
import { TableCell, TableRow } from './styles';

interface Props {
  item: HistoryItemResponse;
  onClick?: () => void;
}

const HistoricTableRow = ({ item, onClick }: Props) => (
  <TableRow
    onClick={onClick}
    style={{ cursor: onClick ? 'pointer' : undefined }}
  >
    <TableCell>{item.nf}</TableCell>
    <TableCell>{item.emissionDate}</TableCell>
    <TableCell>
      {item.issuer} {'> '}
      {item.receiver}
    </TableCell>
    <TableCell>
      R$ {item.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
    </TableCell>
    <TableCell>
      <HistoricStatusBadge status={item.status} />
    </TableCell>
  </TableRow>
);

export default HistoricTableRow;
