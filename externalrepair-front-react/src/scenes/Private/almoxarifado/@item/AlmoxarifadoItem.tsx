import { observer } from 'mobx-react';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import MainContentContainer from '~/components/MainContentContainer';
import { useWarehouseState } from '~/components/TableItem/hooks';
import TableItem from '~/components/TableItem/TableItem';
import { createAlmoxarifadoValidationRules } from '~/components/TableItem/validation';
import { Text } from '~/components/Typography/styles';
import { useStore } from '~/stores';
import { showAlert } from '~/utils/helpers';
import { usePermissions, useUserName } from '~/utils/hooks';
import { ScrollableContainer, TitleContainer } from './styles';

const AlmoxarifadoItem = observer(({ data }: { data: any[] }) => {
  const nfe = sessionStorage.getItem('selectedNf');
  const { warehouseStore } = useStore();
  const userName = useUserName();
  const { canEdit } = usePermissions();

  const warehouseStatus =
    warehouseStore.warehouseNfData?.warehouseStatus || 'none';
  const warehouseState = useWarehouseState(warehouseStatus);

  const handleSave = async (values: Record<string, any>) => {
    try {
      const receivedQuantityNumber = Number(values.receivedQuantity);
      await warehouseStore.updateWarehouseNfItem(nfe!, values.id, {
        id: values.id,
        receivedQuantity: receivedQuantityNumber,
        receiptDate: values.receiptDate,
      });

      showAlert({
        message: 'Recebimento registrado com sucesso',
        type: 'success',
        position: 'top-right',
      });

      await warehouseStore.fetchWarehouseNfItems(nfe!);
    } catch (error) {
      console.error('Erro ao registrar recebimento:', error);
      showAlert({
        message: 'Erro ao registrar recebimento. Tente novamente.',
        type: 'error',
        position: 'top-right',
      });
    }
  };

  const normalFields = [
    { key: 'material', label: 'Material', maxWidth: 100 },
    { key: 'description', label: 'Descrição', minWidth: 450 },
    { key: 'returnedQuantity', label: 'Quant. retorno', maxWidth: 120 },
    { key: 'unitValue', label: 'Valor unitário', maxWidth: 120 },
    { key: 'dimensions', label: 'Dimensões', maxWidth: 110 },
    { key: 'label', label: 'Etiqueta', maxWidth: 110 },
    { key: 'date', label: 'Data de retorno', maxWidth: 180 },
    { key: 'unitWeight', label: 'Peso unitário' },
  ];

  const expandedFields = [
    {
      key: 'receivedQuantity',
      label: 'Quant. recebida',
      editable: true,
      type: 'number' as const,
      maxWidth: 158,
      minWidth: 158,
    },
    {
      key: 'receiptDate',
      label: 'Data de recebimento',
      editable: true,
      type: 'date' as const,
      maxWidth: 158,
    },
  ];

  const validationRules = createAlmoxarifadoValidationRules();

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <MainContentContainer
        title="Almoxarifado"
        actionArea={false}
        userName={userName}
        icon="package_2"
        goBack={true}
      >
        <TitleContainer>
          <Text variant="titleLight">
            NF-e {nfe} - Nº referencia:{' '}
            {warehouseStore.warehouseNfData?.fluigNumber || ''}
          </Text>
        </TitleContainer>
        <ScrollableContainer>
          <Text>Nenhum item encontrado.</Text>
        </ScrollableContainer>
      </MainContentContainer>
    );
  }

  return (
    <MainContentContainer
      title="Almoxarifado"
      actionArea={false}
      userName={userName}
      icon="package_2"
      goBack={true}
    >
      <TitleContainer>
        <Text variant="titleLight">
          NF-e {nfe} - Nº referencia:{' '}
          {warehouseStore.warehouseNfData?.fluigNumber || ''}
        </Text>
      </TitleContainer>
      {warehouseStore.warehouseNfItemsLoading && (
        <ScrollableContainer>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TableSkeleton />
          </div>
        </ScrollableContainer>
      )}
      {!warehouseStore.warehouseNfItemsLoading && !data.length && (
        <EmptyStateFeedback text="Nenhum item encontrado" />
      )}

      {!warehouseStore.warehouseNfItemsLoading && data.length > 0 && (
        <ScrollableContainer>
          {data.map((item, index) => (
            <TableItem
              key={index}
              item={item}
              fields={normalFields}
              expandedFields={expandedFields}
              state={{
                canEdit: warehouseState.canEdit && canEdit('almoxarifado'),
                canSignal: warehouseState.canEdit && canEdit('almoxarifado'),
                canOnlyView:
                  warehouseState.showOnlyView || !canEdit('almoxarifado'),
              }}
              onSave={handleSave}
              validationRules={validationRules}
              itemStatus={item.warehouseItemStatus}
              customText={{
                edit: 'Sinalizar recebimento',
                signal: 'Sinalizar recebimento',
                view: 'Visualizar',
              }}
              customIcon={{
                edit: 'add_circle',
                signal: 'add_circle',
                view: 'visibility',
              }}
            />
          ))}
        </ScrollableContainer>
      )}
    </MainContentContainer>
  );
});

export default AlmoxarifadoItem;
