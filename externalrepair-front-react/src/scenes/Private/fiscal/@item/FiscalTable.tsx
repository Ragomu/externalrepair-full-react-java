import React, { Fragment, useState } from 'react';

import { ConnectionLine } from '~/components/ConnectionLine';
import { Text } from '~/components/Typography/styles';
import {
  ActionButton,
  ActionButtonsContainer,
  ButtonContainer,
  ExpandedContentWrapper,
  SignalButton,
  SignalIcon,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableWrapper,
} from './styles';

// Novo tipo para os itens simples
interface FiscalTableItem {
  request: string;
  material: string;
  quantity: number;
  description: string;
  totalPrice: number;
  shippingDate: string;
}

interface FiscalTableProps {
  items: FiscalTableItem[];
}

const FiscalTable: React.FC<FiscalTableProps> = ({ items }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <TableWrapper expanded={expanded}>
        <Table>
          <TableHeader>
            <TableHeaderCell>Requisição</TableHeaderCell>
            <TableHeaderCell>Material</TableHeaderCell>
            <TableHeaderCell>Qtd.</TableHeaderCell>
            <TableHeaderCell>Descrição</TableHeaderCell>
            <TableHeaderCell>Valor total</TableHeaderCell>
            <TableHeaderCell>Data </TableHeaderCell>
          </TableHeader>
          {items.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.request}</TableCell>
              <TableCell>{item.material}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                R$ {item.totalPrice.toFixed(2).replace('.', ',')}
              </TableCell>
              <TableCell>{item.shippingDate}</TableCell>
            </TableRow>
          ))}
        </Table>

        {expanded && (
          <Fragment>
            <ExpandedContentWrapper>
              <ConnectionLine
                items={[
                  {
                    color: '#515151',
                  },
                ]}
              />

              <ActionButtonsContainer>
                <ActionButton>
                  <Text variant="small" color="#fff">
                    Retorno
                  </Text>
                </ActionButton>
                <ActionButton>
                  <Text variant="small" color="#fff">
                    Irreparável
                  </Text>
                </ActionButton>
              </ActionButtonsContainer>
            </ExpandedContentWrapper>
            <div
              style={{
                height: '1px',
                backgroundColor: 'var(--color-border)',
                margin: '0 -16px',
                width: 'calc(100% + 32px)',
              }}
            />
            <ButtonContainer
              style={{
                marginBottom: '10px',
                marginTop: '10px',
                marginRight: '12px',
              }}
            >
              <SignalButton
                onClick={() => {
                  // maintenanceState.setIsEditing(false);
                  setExpanded(false);
                }}
                // expanded
              >
                <SignalIcon className="material-symbols-outlined">
                  chip_extraction
                </SignalIcon>
                Sair da edição
              </SignalButton>
            </ButtonContainer>
          </Fragment>
        )}
      </TableWrapper>
      {!expanded && (
        <Fragment>
          <SignalButton onClick={() => setExpanded(true)}>
            <SignalIcon className="material-symbols-outlined">
              add_circle
            </SignalIcon>
            Avaliar NF-e{' '}
          </SignalButton>
        </Fragment>
      )}
    </>
  );
};

export default FiscalTable;
