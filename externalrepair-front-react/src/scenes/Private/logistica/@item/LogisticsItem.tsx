import { LogisticsNfItem, LogisticsNfItemUpdatePayload } from '~/api/logistics';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import MainContentContainer from '~/components/MainContentContainer';
import { useLogisticsState } from '~/components/TableItem/hooks';
import TableItem from '~/components/TableItem/TableItem';
import { createLogisticsValidationRules } from '~/components/TableItem/validation';
import { Text } from '~/components/Typography/styles';
import { useStore } from '~/stores';
import { showAlert } from '~/utils/helpers';
import { usePermissions, useUserName } from '~/utils/hooks';
import { ScrollableContainer, TitleContainer } from './styles';

interface LogisticaItemProps {
  data: LogisticsNfItem[];
  isLoading: boolean;
}

const LogisticaItem = ({ data, isLoading }: LogisticaItemProps) => {
  const nfe = sessionStorage.getItem('selectedNf');
  const { logisticsStore } = useStore();
  const userName = useUserName();
  const { canEdit } = usePermissions();

  const logisticsStatus =
    logisticsStore.logisticsNfItems?.[0]?.logisticStatus || 'none';
  const logisticsState = useLogisticsState(logisticsStatus);

  const handleSave = async (values: Record<string, any>) => {
    let payload: LogisticsNfItemUpdatePayload;

    if (values.fleet === 'UISA') {
      payload = {
        id: values.id,
        fleet: 'uisa',
        driver: values.driver,
        plate: values.plate,
        observation: values.observation,
      };
    } else if (values.fleet === 'Terceiro') {
      payload = {
        id: values.id,
        fleet: 'external',
        carrier: values.carrier,
        contact: values.contact,
        observation: values.observation,
        plate: values.plate,
      };
    } else {
      console.warn('Tipo de frota inválido:', values.fleet);
      return;
    }

    try {
      await logisticsStore.updateLogisticsNfItem(nfe!, payload);
      showAlert({
        message: 'Item de logística atualizado com sucesso',
        type: 'success',
        position: 'top-right',
      });

      await logisticsStore.fetchLogisticsNfItems(nfe!);
    } catch (error) {
      console.error('Erro ao atualizar item de logística:', error);
      showAlert({
        message: 'Erro ao atualizar item de logística',
        type: 'error',
        position: 'top-right',
      });
    }
  };

  const normalFields = [
    { key: 'request', label: 'Requisição', maxWidth: 100 },
    { key: 'material', label: 'Material', minWidth: 100 },
    { key: 'description', label: 'Descrição', minWidth: 300 },
    { key: 'quantity', label: 'Qtd.', maxWidth: 60 },
    { key: 'dimensions', label: 'Dimensões', maxWidth: 100 },
    { key: 'label', label: 'Etiqueta', maxWidth: 100 },
    { key: 'totalPrice', label: 'Valor total', maxWidth: 120 },
    { key: 'unitPrice', label: 'Valor unitário', maxWidth: 110 },
    { key: 'shippingDate', label: 'Data', maxWidth: 80 },
  ];

  const validationRules = createLogisticsValidationRules();

  return (
    <MainContentContainer
      title="Logística"
      actionArea={false}
      userName={userName}
      icon="delivery_truck_speed"
      goBack={true}
    >
      <TitleContainer>
        <Text variant="titleLight">
          NF-e {nfe} - Nº referencia:{' '}
          {logisticsStore.logisticsNfItems?.[0]?.fluigNumber || ''}
        </Text>
      </TitleContainer>
      <ScrollableContainer>
        {isLoading ? (
          <TableSkeleton />
        ) : !data || !Array.isArray(data) || data.length === 0 ? (
          <EmptyStateFeedback text="Nenhum item encontrado" />
        ) : (
          data.map((item: LogisticsNfItem, index: number) => (
            <TableItem
              key={item.id || index}
              item={item}
              fields={normalFields}
              expandedFields={[]}
              state={{
                canEdit: logisticsState.canEdit && canEdit('logistica'),
                canSignal: false,
                canOnlyView:
                  logisticsState.showOnlyView || !canEdit('logistica'),
              }}
              onSave={handleSave}
              isLogistic={true}
              validationRules={validationRules}
              itemStatus={item.logisticItemStatus}
              customText={{
                edit: 'Definir Logística',
                signal: 'Definir Logística',
                view: 'Visualizar',
              }}
              customIcon={{
                edit: 'add_circle',
                signal: 'add_circle',
                view: 'visibility',
              }}
            />
          ))
        )}
      </ScrollableContainer>
    </MainContentContainer>
  );
};

export default LogisticaItem;
