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

interface MaintenanceTableProps {
  items: MaintenanceNfItem[];
  expanded: boolean;
}

const MaintenanceTable = forwardRef<HTMLDivElement, MaintenanceTableProps>(
  ({ items, expanded }, ref) => {
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
          {items.map((item) => (
            <TableRow key={item.id}>
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
          ))}
        </Table>
      </TableWrapper>
    );
  },
);

MaintenanceTable.displayName = 'MaintenanceTable';

export default MaintenanceTable;
