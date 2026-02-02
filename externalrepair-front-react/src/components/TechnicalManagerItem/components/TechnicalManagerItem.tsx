import { Fragment, useMemo, useRef, useState } from 'react';
import { TechnicalManagerNfItem } from '~/api/technicalManager';
import { ConnectionLine } from '~/components/ConnectionLine';
import CounterpartyTable from '~/components/CounterpartyItem/components/CounterpartyTable';
import Divider from '~/components/Divider';
import StatusChip from '~/components/StatusChip';
import { Text } from '~/components/Typography/styles';
import { useStore } from '~/stores';
import { usePermissions } from '~/utils/hooks';
import { useStatusColors } from '~/utils/hooks/useStatusColors';
import { mapTechnicalManagerActionStatus } from '~/utils/status';
import ApproveRejectButtons from './ApproveRejectButtons';
import TechnicalManagerSubItemTable from './TechnicalManagerSubItemTable';
import {
  AproveRejectButtonsContainer,
  Container,
  SignalButton,
  SignalIcon,
  SubItemContainer,
  Wrapper,
} from './styles';

const TechnicalManagerItem = ({
  item,
  nf,
}: {
  item: TechnicalManagerNfItem;
  nf: string;
}) => {
  const { technicalManagerStore } = useStore();
  const { canEdit } = usePermissions();
  const canEditGestor = canEdit('gestortecnico');
  const [expanded, setExpanded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const firstCellRef = useRef<HTMLDivElement>(null);

  const hasProcessedByTechnicalManager =
    item.subItems?.some(
      (subItem) =>
        subItem.subItemStatus?.includes('approved') ||
        subItem.subItemStatus?.includes('rejected'),
    ) || false;

  const hasAvailableQuantity = !hasProcessedByTechnicalManager;
  const isFinished = !hasAvailableQuantity;

  const anyRejected = item.subItems?.some(
    (s) => s.subItemStatus === 'rejected',
  );
  const anyApproved = item.subItems?.some(
    (s) => s.subItemStatus === 'approved',
  );
  const itemStatus = hasAvailableQuantity
    ? 'pending'
    : anyRejected
      ? 'rejected'
      : anyApproved
        ? 'approved'
        : 'sent';
  const statusColors = useStatusColors(itemStatus);

  const handleActionConfirm = async (
    action: 'approve' | 'reject',
    subItemId: number,
  ) => {
    try {
      if (!canEditGestor) return;
      setIsSaving(true);
      await technicalManagerStore.updateTechnicalManagerItem(nf, subItemId, {
        action,
      });
      await technicalManagerStore.fetchTechnicalManagerNfItems(nf);
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleExpand = () => {
    setExpanded(true);
  };

  const buildConnectionChildren = useMemo((): React.ReactNode[] => {
    const children: React.ReactNode[] = [];

    if (item.subItems && Array.isArray(item.subItems)) {
      item.subItems.forEach((subItem) => {
        const subQuantity =
          subItem.quantity ??
          subItem.returnQuantity ??
          subItem.sellQuantity ??
          0;

        children.push(
          <SubItemContainer key={`existing-sub-${subItem.id}`}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 16,
              }}
            >
              <Text variant="small" color="var(--color-text-light)">
                {subQuantity}
              </Text>
              {(() => {
                const action = subItem.subItemAction;

                const { status, label } =
                  mapTechnicalManagerActionStatus(action);

                return <StatusChip status={status} label={label} />;
              })()}
            </div>
            <TechnicalManagerSubItemTable
              subItem={subItem}
              parentDescription={item.description}
              expanded={true}
              ref={undefined}
            />

            <AproveRejectButtonsContainer>
              <ApproveRejectButtons
                onConfirm={(action) => handleActionConfirm(action, subItem.id)}
                status={
                  subItem.subItemStatus as 'approve' | 'reject' | undefined
                }
                disabled={!canEditGestor || isSaving}
              />
            </AproveRejectButtonsContainer>
          </SubItemContainer>,
        );
      });
    }

    return children;
  }, [item, canEditGestor, isSaving]);

  return (
    <Wrapper>
      <Container expanded={expanded} borderColor={statusColors.border}>
        <CounterpartyTable
          item={{
            id: parseInt(item.nf) || 0,
            material: item.material,
            description: item.description,
            sent: item.sent,
            irreparable: item.irreparable,
            unitValue: String(item.unitValue),
            totalValue: String(item.totalValue),
            dimensions: item.dimensions,
            date: item.date,
            subItems: [],
          }}
          expanded={expanded}
          ref={firstCellRef}
        />

        {expanded && (
          <>
            {buildConnectionChildren.length > 0 && (
              <ConnectionLine
                items={buildConnectionChildren.map(() => ({
                  color: statusColors.border,
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
            {hasAvailableQuantity ? (
              <SignalButton
                onClick={() => {
                  setExpanded(false);
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
                    if (!canEditGestor) return;
                    setIsSaving(true);
                    await technicalManagerStore.finishTechnicalManagerNf(
                      item.id,
                    );
                    await technicalManagerStore.fetchTechnicalManagerNfItems(
                      nf,
                    );
                    setExpanded(false);
                  } catch (error) {
                    console.error('Erro ao finalizar item:', error);
                  } finally {
                    setIsSaving(false);
                  }
                }}
                expanded
                disabled={isSaving || !canEditGestor}
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
          ) : canEditGestor ? (
            <SignalButton onClick={handleExpand}>
              <SignalIcon className="material-symbols-outlined">
                add_circle
              </SignalIcon>
              Avaliar NF-e
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

export default TechnicalManagerItem;
