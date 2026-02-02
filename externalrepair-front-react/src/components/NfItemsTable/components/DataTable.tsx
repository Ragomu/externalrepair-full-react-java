import React, { forwardRef, useRef } from 'react';
import {
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableWrapper,
} from '../styles';
import { NfTableItem } from '../types';

interface DataTableProps {
  items: NfTableItem[];
  headers: string[];
  dataMapping: string[];
  formatters?: ((value: any) => string | React.ReactNode)[];
  gridColumns: string;
  expanded: boolean;
}

const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ items, headers, dataMapping, formatters, gridColumns, expanded }, ref) => {
    const tableRef = useRef<HTMLDivElement>(null);

    const formatValue = (
      value: any,
      index: number,
    ): string | React.ReactNode => {
      if (formatters && formatters[index]) {
        return formatters[index]!(value);
      }
      return value?.toString() || '';
    };

    const getValue = (item: NfTableItem, key: string): any => {
      return item[key];
    };

    return (
      <TableWrapper expanded={expanded}>
        <Table gridColumns={gridColumns}>
          <TableHeader>
            {headers.map((header, index) => (
              <TableHeaderCell key={index}>{header}</TableHeaderCell>
            ))}
          </TableHeader>
          {items.map((item, itemIndex) => (
            <TableRow key={item.id || itemIndex}>
              {dataMapping.map((key, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  ref={cellIndex === 0 ? ref || tableRef : undefined}
                >
                  {formatValue(getValue(item, key), cellIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Table>
      </TableWrapper>
    );
  },
);

DataTable.displayName = 'DataTable';

export default DataTable;
