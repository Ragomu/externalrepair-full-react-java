import React, { useRef, useState } from 'react';
import { PartialFiscalItem as PartialFiscalItemType } from '~/api/fiscal';
import { ConnectionLine } from '../ConnectionLine';
import FiscalAvaliation from '../FiscalAvaliation/NfEvaluation';
import { PartialFiscalTable } from './components';
import { Container, SignalButton, SignalIcon, Wrapper } from './styles';

interface PartialFiscalItemProps {
  item: PartialFiscalItemType;
  nf: string;
}

const PartialFiscalItem = ({ item }: PartialFiscalItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const firstCellRef = useRef<HTMLDivElement>(null);

  // Monta os children do ConnectionLine: todos os subitens com avaliação fiscal
  const buildConnectionChildren = (): React.ReactNode[] => {
    const children: React.ReactNode[] = [];

    // Verificação de segurança para item.subItems
    if (!item.subItems || !Array.isArray(item.subItems)) {
      return children;
    }

    item.subItems.forEach((subItem) => {
      children.push(
        <div key={`sub-${subItem.id}`}>
          <PartialFiscalTable subItem={subItem} expanded />
          <FiscalAvaliation
            partial
            itemId={item.id}
            subItemId={subItem.id}
            returnNfNumber={subItem.returnNfNumber}
          />
        </div>,
      );
    });

    return children;
  };

  const connectionChildren = buildConnectionChildren();

  return (
    <Wrapper>
      <Container expanded={expanded} borderColor={'#dadada'}>
        <PartialFiscalTable
          item={item}
          expanded={expanded}
          ref={firstCellRef}
        />

        {expanded && connectionChildren.length > 0 && (
          <>
            <ConnectionLine
              items={connectionChildren.map(() => ({
                color: '#515151',
              }))}
              firstCellRef={firstCellRef}
              itemsCount={1}
              childrenConfig={connectionChildren.map(() => ({}))}
              left={10}
              top={30}
              gap={16}
            >
              {connectionChildren}
            </ConnectionLine>
          </>
        )}
      </Container>

      {!expanded && (
        <SignalButton onClick={() => setExpanded(true)}>
          <SignalIcon className="material-symbols-outlined">
            add_circle
          </SignalIcon>
          Avaliar NF-e
        </SignalButton>
      )}
    </Wrapper>
  );
};

export default PartialFiscalItem;
