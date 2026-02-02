import React, { forwardRef, useRef } from 'react';
import { MaintenanceNfItem } from '~/api/maintenance';
import {
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableWrapper,
} from '../styles';

interface PartialMaintenanceTableProps {
  item: MaintenanceNfItem;
  expanded: boolean;
  children?: React.ReactNode;
}

const PartialMaintenanceTable = forwardRef<
  HTMLDivElement,
  PartialMaintenanceTableProps
>(({ item, expanded, children }, ref) => {
  const tableRef = useRef<HTMLDivElement>(null);

  return (
    <TableWrapper expanded={expanded}>
      <Table>
        <TableHeader>
          <TableHeaderCell>Material</TableHeaderCell>
          <TableHeaderCell>Descrição</TableHeaderCell>
          <TableHeaderCell>Qtd.</TableHeaderCell>
          <TableHeaderCell>Valor unitário (R$)</TableHeaderCell>
          <TableHeaderCell>Valor total (R$)</TableHeaderCell>
          <TableHeaderCell>Data</TableHeaderCell>
        </TableHeader>
        <TableRow>
          <TableCell ref={ref || tableRef}>{item.material}</TableCell>
          <TableCell>{item.description}</TableCell>
          <TableCell>{item.quantity}</TableCell>
          <TableCell>
            R$ {item.unitPrice?.toFixed(2).replace('.', ',')}
          </TableCell>
          <TableCell>
            R$ {item.totalPrice?.toFixed(2).replace('.', ',')}
          </TableCell>
          <TableCell>{item.date}</TableCell>
        </TableRow>
      </Table>
      {children}
    </TableWrapper>
  );
});

PartialMaintenanceTable.displayName = 'PartialMaintenanceTable';

export default PartialMaintenanceTable;
