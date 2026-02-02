import { observer } from 'mobx-react';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import Divider from '~/components/Divider';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import MainContentContainer from '~/components/MainContentContainer';
import PartialMaintenanceItem from '~/components/PartialMaintenanceItem';
import { Text } from '~/components/Typography/styles';
import { StorageService } from '~/services';
import { useStore } from '~/stores';
import {
  MaintenanceItensContainer,
  ScrollableContainer,
  TitleContainer,
} from './styles';

const ItemMaintenancePartial = () => {
  const { maintenanceStore, appStore } = useStore();

  const nfe =
    maintenanceStore.partialNfItems?.nf ||
    appStore.selectedNf ||
    (typeof window !== 'undefined'
      ? sessionStorage.getItem('selectedNf')
      : null);

  const isLoading = maintenanceStore.partialLoading;
  const errorMsg = maintenanceStore.partialError;

  return (
    <MainContentContainer
      title="Envio parcial"
      actionArea={false}
      userName={StorageService.getUserData()?.name || ''}
      icon="manufacturing"
      goBack={true}
    >
      <Divider />
      <TitleContainer>
        <Text variant="title">
          NF-e {nfe} - Nº referencia:{' '}
          {maintenanceStore.partialNfItems?.fluigNumber || ''}
        </Text>
      </TitleContainer>
      <ScrollableContainer>
        <MaintenanceItensContainer>
          {isLoading && <TableSkeleton />}

          {errorMsg && <p style={{ color: 'red' }}>Erro: {errorMsg}</p>}

          {maintenanceStore.partialNfItems &&
            maintenanceStore.partialNfItems.items.length === 0 &&
            !isLoading && <EmptyStateFeedback text="Nenhum item encontrado" />}

          {maintenanceStore.partialNfItems?.items.map((itemUnit) => {
            const mapped = {
              ...itemUnit,
              status: (itemUnit as any).itemStatus,
              date: (itemUnit as any).date,
            };
            return <PartialMaintenanceItem item={mapped} key={itemUnit.id} />;
          })}
        </MaintenanceItensContainer>
      </ScrollableContainer>
    </MainContentContainer>
  );
};

export default observer(ItemMaintenancePartial);
