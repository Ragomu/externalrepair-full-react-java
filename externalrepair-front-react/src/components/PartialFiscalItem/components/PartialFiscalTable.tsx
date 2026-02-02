import React, { forwardRef, useRef } from 'react';
import {
  PartialFiscalItem as PartialFiscalItemType,
  PartialFiscalSubItem,
} from '~/api/fiscal';
import {
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableWrapper,
} from '../styles';

interface PartialFiscalTableProps {
  item?: PartialFiscalItemType;
  subItem?: PartialFiscalSubItem;
  expanded: boolean;
  children?: React.ReactNode;
}

const PartialFiscalTable = forwardRef<HTMLDivElement, PartialFiscalTableProps>(
  ({ item, subItem, expanded, children }, ref) => {
    const isSubItem = !!subItem;
    const displayItem = subItem || item;
    const tableRef = useRef<HTMLDivElement>(null);

    if (!displayItem) return null;

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
            <TableCell ref={ref || tableRef}>{displayItem.material}</TableCell>
            <TableCell>{displayItem.description}</TableCell>
            <TableCell>
              {isSubItem
                ? (displayItem as PartialFiscalSubItem).returnQuantity
                : (displayItem as PartialFiscalItemType).quantity}
            </TableCell>
            <TableCell>
              R$ {displayItem.unitPrice?.toFixed(2).replace('.', ',')}
            </TableCell>
            <TableCell>
              {isSubItem
                ? `R$ ${(displayItem.unitPrice * (displayItem as PartialFiscalSubItem).returnQuantity).toFixed(2).replace('.', ',')}`
                : `R$ ${(displayItem as PartialFiscalItemType).totalPrice?.toFixed(2).replace('.', ',')}`}
            </TableCell>
            <TableCell>
              {isSubItem
                ? (displayItem as PartialFiscalSubItem).returnDate
                : (displayItem as PartialFiscalItemType).date}
            </TableCell>
          </TableRow>
        </Table>
        {children}
      </TableWrapper>
    );
  },
);

PartialFiscalTable.displayName = 'PartialFiscalTable';

export default PartialFiscalTable;
