import React, { forwardRef, useRef } from 'react';
import { CounterpartyNfItem } from '~/api/counterparty';
import {
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableWrapper,
} from './styles';

interface CounterpartyTableProps {
  item: CounterpartyNfItem;
  expanded: boolean;
  children?: React.ReactNode;
}

const CounterpartyTable = forwardRef<HTMLDivElement, CounterpartyTableProps>(
  ({ item, expanded, children }, ref) => {
    const tableRef = useRef<HTMLDivElement>(null);

    return (
      <TableWrapper expanded={expanded}>
        <Table>
          <TableHeader>
            <TableHeaderCell>NF-e</TableHeaderCell>
            <TableHeaderCell>Identificação</TableHeaderCell>
            <TableHeaderCell>Irreparável</TableHeaderCell>
            <TableHeaderCell>Enviado</TableHeaderCell>
            <TableHeaderCell>Valor unitário (R$)</TableHeaderCell>
            <TableHeaderCell>Valor total (R$)</TableHeaderCell>
            <TableHeaderCell>Dimensões</TableHeaderCell>
            <TableHeaderCell>Data</TableHeaderCell>
          </TableHeader>
          <TableRow>
            <TableCell ref={ref || tableRef}>{item.id}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>{item.irreparable}</TableCell>
            <TableCell>{item.sent}</TableCell>
            <TableCell>R$ {item.unitValue}</TableCell>
            <TableCell>R$ {item.totalValue}</TableCell>
            <TableCell>{item.dimensions}</TableCell>
            <TableCell>{item.date}</TableCell>
          </TableRow>
        </Table>
        {children}
      </TableWrapper>
    );
  },
);

CounterpartyTable.displayName = 'CounterpartyTable';

export default CounterpartyTable;
