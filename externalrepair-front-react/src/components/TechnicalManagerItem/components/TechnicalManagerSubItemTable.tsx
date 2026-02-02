import React, { forwardRef, useRef } from 'react';
import { TechnicalManagerSubItem } from '~/api/technicalManager';
import {
  SubItemTable,
  SubItemTableCell,
  SubItemTableHeader,
  SubItemTableHeaderCell,
  SubItemTableRow,
  SubItemTableWrapper,
} from './styles';

interface TechnicalManagerSubItemTableProps {
  subItem: TechnicalManagerSubItem;
  parentDescription: string;
  expanded: boolean;
  children?: React.ReactNode;
}

const TechnicalManagerSubItemTable = forwardRef<
  HTMLDivElement,
  TechnicalManagerSubItemTableProps
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

  // Determinar a quantidade a exibir
  const getQuantity = () => {
    return (
      subItem.quantity ?? subItem.returnQuantity ?? subItem.sellQuantity ?? 0
    );
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
          <SubItemTableCell>{getQuantity()}</SubItemTableCell>
          <SubItemTableCell>
            {subItem.unitPrice ? formatCurrency(subItem.unitPrice) : '-'}
          </SubItemTableCell>
          <SubItemTableCell>{subItem.dimensions}</SubItemTableCell>
          <SubItemTableCell>{subItem.subItemLabel || '-'}</SubItemTableCell>
          <SubItemTableCell>
            {subItem.date || subItem.returnDate || '-'}
          </SubItemTableCell>
          <SubItemTableCell>
            {subItem.unitWeight ? formatWeight(subItem.unitWeight) : '-'}
          </SubItemTableCell>
        </SubItemTableRow>
      </SubItemTable>
      {children}
    </SubItemTableWrapper>
  );
});

TechnicalManagerSubItemTable.displayName = 'TechnicalManagerSubItemTable';

export default TechnicalManagerSubItemTable;
