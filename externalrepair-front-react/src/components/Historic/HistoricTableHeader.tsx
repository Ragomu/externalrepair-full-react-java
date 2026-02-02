import React from 'react';
import { TableCell, TableHeader } from './styles';

const columns = [
  'NF-e',
  'Data de Emissão',
  'Emitente/Destinatário',
  'Valor total',
  'Status',
];

const HistoricTableHeader = () => (
  <TableHeader>
    {columns.map((col, idx) => (
      <TableCell key={col} flex={idx === 2 ? 2 : 1}>
        {col}
      </TableCell>
    ))}
  </TableHeader>
);

export default HistoricTableHeader;
