import React, { forwardRef, useRef } from 'react';
import { CounterpartySubItem } from '~/api/counterparty';
import {
  SubItemTable,
  SubItemTableCell,
  SubItemTableHeader,
  SubItemTableHeaderCell,
  SubItemTableRow,
  SubItemTableWrapper,
} from './styles';

interface CounterpartySubItemTableProps {
  subItem: CounterpartySubItem;
  parentDescription: string;
  expanded: boolean;
  children?: React.ReactNode;
}

const CounterpartySubItemTable = forwardRef<
  HTMLDivElement,
  CounterpartySubItemTableProps
>(({ subItem, parentDescription, expanded, children }, ref) => {
  const tableRef = useRef<HTMLDivElement>(null);

  const getQuantityLabel = () => {
    switch (subItem.subItemAction) {
      case 'sell':
        return 'Quant. venda';
      case 'discard':
        return 'Quant. descarte';
      case 'return':
        return 'Quant. retorno';
      default:
        return 'Quantidade';
    }
  };

  const formatCurrency = (value: number): string => {
    return `R$ ${value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatWeight = (value: number): string => {
    return `${value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} kg`;
  };

  return (
    <SubItemTableWrapper expanded={expanded}>
      <SubItemTable>
        <SubItemTableHeader>
          <SubItemTableHeaderCell>Material</SubItemTableHeaderCell>
          <SubItemTableHeaderCell>Descrição</SubItemTableHeaderCell>
          <SubItemTableHeaderCell>{getQuantityLabel()}</SubItemTableHeaderCell>
          <SubItemTableHeaderCell>Valor unitário</SubItemTableHeaderCell>
          <SubItemTableHeaderCell>Dimensões</SubItemTableHeaderCell>
          <SubItemTableHeaderCell>Etiqueta</SubItemTableHeaderCell>
          <SubItemTableHeaderCell>Data</SubItemTableHeaderCell>
          <SubItemTableHeaderCell>Peso unitário</SubItemTableHeaderCell>
        </SubItemTableHeader>
        <SubItemTableRow>
          <SubItemTableCell ref={ref || tableRef}>
            {subItem.material}
          </SubItemTableCell>
          <SubItemTableCell>
            {subItem.description || parentDescription}
          </SubItemTableCell>
          <SubItemTableCell>{subItem.quantity}</SubItemTableCell>
          <SubItemTableCell>
            {subItem.unitPrice ? formatCurrency(subItem.unitPrice) : '-'}
          </SubItemTableCell>
          <SubItemTableCell>{subItem.dimensions}</SubItemTableCell>
          <SubItemTableCell>{subItem.label || '-'}</SubItemTableCell>
          <SubItemTableCell>{subItem.date || '-'}</SubItemTableCell>
          <SubItemTableCell>
            {subItem.unitWeight ? formatWeight(subItem.unitWeight) : '-'}
          </SubItemTableCell>
        </SubItemTableRow>
      </SubItemTable>
      {children}
    </SubItemTableWrapper>
  );
});

CounterpartySubItemTable.displayName = 'CounterpartySubItemTable';

export default CounterpartySubItemTable;
