import { observer } from 'mobx-react';
import CompleteMaintenanceItem from '~/components/CompleteMaintenanceItem';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import Divider from '~/components/Divider';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import MainContentContainer from '~/components/MainContentContainer';
import { Text } from '~/components/Typography/styles';
import { StorageService } from '~/services';
import { useStore } from '~/stores';
import { DataTableContainer } from '../styles';
import {
  MaintenanceItensContainer,
  ScrollableContainer,
  TitleContainer,
} from './styles';

const ItemMaintenance = () => {
  const { maintenanceStore, appStore } = useStore();

  const nfe =
    maintenanceStore.maintenanceNfItems?.nf ||
    appStore.selectedNf ||
    (typeof window !== 'undefined'
      ? sessionStorage.getItem('selectedNf')
      : null);

  return (
    <MainContentContainer
      title="Envio completo"
      actionArea={false}
      userName={StorageService.getUserData()?.name || ''}
      icon="manufacturing"
      goBack={true}
    >
      <Divider />
      <TitleContainer>
        <Text variant="title">
          NF-e {nfe} - Nº referencia:{' '}
          {maintenanceStore.maintenanceNfItems?.fluigNumber || ''}
        </Text>
      </TitleContainer>
      <ScrollableContainer>
        <MaintenanceItensContainer>
          {maintenanceStore.maintenanceNfItemsLoading && <TableSkeleton />}

          {maintenanceStore.maintenanceNfItemsError && (
            <p style={{ color: 'red' }}>
              Erro: {maintenanceStore.maintenanceNfItemsError}
            </p>
          )}

          {maintenanceStore.maintenanceNfItems &&
            maintenanceStore.maintenanceNfItems.items.length === 0 &&
            !maintenanceStore.maintenanceNfItemsLoading && (
              <EmptyStateFeedback text="Nenhum item encontrado" />
            )}

          {maintenanceStore.maintenanceNfItems?.items &&
            maintenanceStore.maintenanceNfItems?.items.length > 0 && (
              <DataTableContainer>
                <CompleteMaintenanceItem
                  items={maintenanceStore.maintenanceNfItems?.items}
                  nfe={nfe!}
                  maintenanceStatus={
                    maintenanceStore.maintenanceNfItems?.maintenanceStatus
                  }
                  sentNf={maintenanceStore.maintenanceNfItems?.sentNfs}
                />
              </DataTableContainer>
            )}
        </MaintenanceItensContainer>
      </ScrollableContainer>
    </MainContentContainer>
  );
};

export default observer(ItemMaintenance);
