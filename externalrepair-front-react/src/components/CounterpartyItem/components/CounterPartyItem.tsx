import { Fragment, useMemo, useRef, useState } from 'react';
import { CounterpartyNfItem } from '~/api/counterparty';
import { ConnectionLine } from '~/components/ConnectionLine';
import Divider from '~/components/Divider';
import SimpleQuantityForm from '~/components/PartialMaintenanceItem/components/SimpleQuantityForm';
import StatusChip from '~/components/StatusChip';
import { useStore } from '~/stores';
import { usePermissions } from '~/utils/hooks';
import { useStatusColors } from '~/utils/hooks/useStatusColors';
import { mapUisaItemDestiny } from '~/utils/status';
import CounterpartySubItemTable from './CounterpartySubItemTable';
import CounterpartyTable from './CounterpartyTable';
import DestinyButtons from './DestinyButtons';
import {
  Container,
  DeleteButton,
  DeleteButtonContainer,
  DeleteIcon,
  QuantityFormContainer,
  SignalButton,
  SignalIcon,
  SubItemContainer,
  Wrapper,
} from './styles';

const CounterpartyItem = ({
  item,
  nf,
}: {
  item: CounterpartyNfItem;
  nf: string;
}) => {
  const { counterpartyStore } = useStore();
  const { canEdit } = usePermissions();
  const canEditCounterparty = canEdit('contraparte');
  const [expanded, setExpanded] = useState(false);
  const [destiny, setDestiny] = useState<'sell' | 'discard' | 'return'>('sell');
  const [showQuantityForm, setShowQuantityForm] = useState(false);
  const [returnQuantity, setReturnQuantity] = useState<number | undefined>();
  const [isSaving, setIsSaving] = useState(false);

  const quantity = item.irreparable;
  const firstCellRef = useRef<HTMLDivElement>(null);
  const existingSubItemsQuantity =
    item.subItems && Array.isArray(item.subItems)
      ? item.subItems.reduce((sum, subItem) => sum + subItem.quantity, 0)
      : 0;

  const availableQuantity = quantity - existingSubItemsQuantity;
  const hasAvailableQuantity = availableQuantity > 0;

  // Deriva status do item para borda/traço
  const anyDiscard = item.subItems?.some((s) => s.subItemAction === 'discard');
  const anySell = item.subItems?.some((s) => s.subItemAction === 'sell');
  const anyReturn = item.subItems?.some((s) => s.subItemAction === 'return');
  const itemStatus = hasAvailableQuantity
    ? 'pending'
    : anyDiscard
      ? 'discard'
      : anySell
        ? 'sent'
        : anyReturn
          ? 'returned'
          : 'pending';
  const statusColors = useStatusColors(itemStatus);
  const isFinished = !hasAvailableQuantity;
  const borderColor =
    statusColors.border === 'transparent' ? '#dadada' : statusColors.border;

  const clearDestinedItems = () => {
    setShowQuantityForm(false);
    setReturnQuantity(undefined);
  };

  const handleAddDestinedItem = async () => {
    if (!canEditCounterparty) return;
    if (
      returnQuantity &&
      returnQuantity > 0 &&
      returnQuantity <= availableQuantity
    ) {
      setIsSaving(true);
      try {
        await counterpartyStore.updateCounterpartyNfItem(nf, item.id, {
          action: destiny,
          quantity: returnQuantity,
        });

        await counterpartyStore.fetchCounterpartyNfItems(nf);
        clearDestinedItems();
      } catch (error) {
        console.error('Erro ao adicionar item destinado:', error);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleDeleteSubItem = async (subItemId: number) => {
    if (!canEditCounterparty) return;
    await counterpartyStore.deleteCounterpartyItem(subItemId);
    await counterpartyStore.fetchCounterpartyNfItems(nf);
  };

  const handleExpand = () => {
    setExpanded(true);
    clearDestinedItems();
  };

  const handleDestinyConfirm = (destiny: 'sell' | 'discard' | 'return') => {
    if (!canEditCounterparty) return;
    setDestiny(destiny);
    setShowQuantityForm(true);
  };

  const buildConnectionChildren = useMemo((): React.ReactNode[] => {
    const children: React.ReactNode[] = [];

    // PRIMEIRA ETAPA: Renderiza subItems existentes (já salvos no backend)
    if (item.subItems && Array.isArray(item.subItems)) {
      item.subItems.forEach((subItem) => {
        children.push(
          <SubItemContainer key={`existing-sub-${subItem.id}`}>
            <StatusChip status={mapUisaItemDestiny(subItem.subItemAction)} />

            <CounterpartySubItemTable
              subItem={subItem}
              parentDescription={item.description}
              expanded={true}
              ref={undefined}
            />

            {canEditCounterparty && hasAvailableQuantity && (
              <DeleteButtonContainer>
                <DeleteButton onClick={() => handleDeleteSubItem(subItem.id)}>
                  <DeleteIcon className="material-symbols-outlined">
                    delete
                  </DeleteIcon>
                </DeleteButton>
              </DeleteButtonContainer>
            )}
          </SubItemContainer>,
        );
      });
    }

    // SEGUNDA ETAPA: Renderiza DestinyButtons como uma sub-tabela quando não há formulário
    if (!showQuantityForm && hasAvailableQuantity) {
      children.push(
        <SubItemContainer key="destiny-buttons">
          <DestinyButtons
            onConfirm={handleDestinyConfirm}
            disabled={!canEditCounterparty}
          />
        </SubItemContainer>,
      );
    }

    // TERCEIRA ETAPA: Renderiza formulário de quantidade como uma sub-tabela
    if (showQuantityForm && hasAvailableQuantity && canEditCounterparty) {
      children.push(
        <SubItemContainer key="quantity-form">
          <QuantityFormContainer>
            <SimpleQuantityForm
              maxQuantity={availableQuantity}
              returnQuantity={returnQuantity}
              setReturnQuantity={setReturnQuantity}
              onSave={handleAddDestinedItem}
              loading={isSaving}
            />
          </QuantityFormContainer>
        </SubItemContainer>,
      );
    }

    return children;
  }, [
    item,
    showQuantityForm,
    hasAvailableQuantity,
    returnQuantity,
    isSaving,
    availableQuantity,
    canEditCounterparty,
  ]);

  return (
    <Wrapper>
      <Container expanded={expanded} borderColor={borderColor}>
        <CounterpartyTable item={item} expanded={expanded} ref={firstCellRef} />

        {expanded && (
          <>
            {buildConnectionChildren.length > 0 && (
              <ConnectionLine
                items={buildConnectionChildren.map(() => ({
                  color:
                    statusColors.border === 'transparent'
                      ? '#d7d7d7' // cor neutra do conector (igual à LineVertical)
                      : statusColors.border,
                }))}
                firstCellRef={firstCellRef}
                itemsCount={buildConnectionChildren.length}
                childrenConfig={buildConnectionChildren.map(() => ({}))}
                left={10}
                top={30}
                gap={16}
              >
                {buildConnectionChildren}
              </ConnectionLine>
            )}
            <Divider />
            {!isFinished ? (
              <SignalButton
                onClick={() => {
                  setExpanded(false);
                  setShowQuantityForm(false);
                  setReturnQuantity(undefined);
                }}
                expanded
              >
                <SignalIcon className="material-symbols-outlined">
                  chip_extraction
                </SignalIcon>
                Sair da edição
              </SignalButton>
            ) : (
              <SignalButton
                onClick={async () => {
                  try {
                    if (!canEditCounterparty) return;
                    setIsSaving(true);
                    await counterpartyStore.finishCounterpartyItem(item.id);
                    await counterpartyStore.fetchCounterpartyNfItems(nf);
                    setExpanded(false);
                  } catch (error) {
                    console.error('Erro ao finalizar item:', error);
                  } finally {
                    setIsSaving(false);
                  }
                }}
                expanded
                disabled={isSaving || !canEditCounterparty}
              >
                <SignalIcon className="material-symbols-outlined">
                  {isSaving ? 'progress_activity' : 'download_done'}
                </SignalIcon>
                {isSaving ? 'Salvando...' : 'Salvar'}
              </SignalButton>
            )}
          </>
        )}
      </Container>

      {!expanded && (
        <Fragment>
          {isFinished ? (
            <SignalButton onClick={() => setExpanded(true)}>
              <SignalIcon className="material-symbols-outlined">
                visibility
              </SignalIcon>
              Visualizar
            </SignalButton>
          ) : canEditCounterparty ? (
            <SignalButton onClick={handleExpand}>
              <SignalIcon className="material-symbols-outlined">
                add_circle
              </SignalIcon>
              Avaliar{' '}
            </SignalButton>
          ) : (
            <SignalButton onClick={() => setExpanded(true)}>
              <SignalIcon className="material-symbols-outlined">
                visibility
              </SignalIcon>
              Visualizar
            </SignalButton>
          )}
        </Fragment>
      )}
    </Wrapper>
  );
};

export default CounterpartyItem;
