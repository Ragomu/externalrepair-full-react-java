import React, { useRef, useState } from 'react';
import { useResponsiveAlignment } from '~/utils/hooks';
import { ConnectionLine } from '../ConnectionLine';
import Divider from '../Divider';

import { ActionButton, DataTable, StatusMessage } from './components';
import { useNfState } from './hooks/useNfState';
import {
  ButtonContainer,
  Container,
  SignalButton,
  SignalIcon,
  Wrapper,
} from './styles';
import { NfTableItem } from './types';

export type { NfTableItem };

export interface NfItemsTableProps {
  items: NfTableItem[];
  headers: string[];
  dataMapping: string[];
  formatters?: ((value: any) => string | React.ReactNode)[];
  gridColumns?: string;
  status?: 'pending' | 'sent' | 'approved' | 'rejected';
  onExpand?: () => void;
  onCollapse?: () => void;
  children?: React.ReactNode;
  actionButtonText?: string;
  actionButtonIcon?: string;
  exitButtonText?: string;
}

const NfItemsTable = ({
  items,
  headers,
  dataMapping,
  formatters,
  gridColumns = '1fr 1fr 0.5fr 2fr 0.5fr 0.5fr',
  status = 'pending',
  onExpand,
  onCollapse,
  children,
  actionButtonText,
  actionButtonIcon,
  exitButtonText = 'Sair da edição',
}: NfItemsTableProps) => {
  const [expanded, setExpanded] = useState(false);
  const firstCellRef = useRef<HTMLDivElement>(null);

  const nfState = useNfState({ status });

  const { containerRef } = useResponsiveAlignment({
    containerPadding: 100,
    refreshRate: 100,
    initialMargin: 100,
  });

  const handleExpand = () => {
    setExpanded(true);
    onExpand?.();
  };

  const handleCollapse = () => {
    setExpanded(false);
    onCollapse?.();
  };

  const getBorderStatus = () => {
    switch (status) {
      case 'sent':
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getTraceColor = () => {
    switch (status) {
      case 'sent':
        return 'var(--color-success-green)';
      case 'approved':
        return 'var(--color-success-green)';
      case 'rejected':
        return 'var(--color-danger-red)';
      default:
        return 'var(--color-border)';
    }
  };

  return (
    <Wrapper>
      <StatusMessage
        show={nfState.showSuccessMessage}
        status={nfState.status}
      />

      <Container borderStatus={getBorderStatus()} ref={containerRef}>
        <DataTable
          items={items}
          headers={headers}
          dataMapping={dataMapping}
          formatters={formatters}
          gridColumns={gridColumns}
          expanded={expanded}
          ref={firstCellRef}
        />

        {expanded && (
          <>
            {children && (
              <ConnectionLine
                items={[{ color: getTraceColor() }]}
                firstCellRef={firstCellRef}
                itemsCount={items.length}
              >
                {children}
              </ConnectionLine>
            )}
            <Divider />
            <ButtonContainer style={{ marginBottom: '10px' }} expanded>
              <SignalButton onClick={handleCollapse} expanded>
                <SignalIcon className="material-symbols-outlined">
                  chip_extraction
                </SignalIcon>
                {exitButtonText}
              </SignalButton>
            </ButtonContainer>
          </>
        )}
      </Container>

      <ActionButton
        nfState={nfState}
        expanded={expanded}
        onExpand={handleExpand}
        buttonText={actionButtonText}
        buttonIcon={actionButtonIcon}
      />
    </Wrapper>
  );
};

export default NfItemsTable;
