import { observer } from 'mobx-react';
import CounterpartyItem from '~/components/CounterpartyItem';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import Divider from '~/components/Divider';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import MainContentContainer from '~/components/MainContentContainer';
import { Text } from '~/components/Typography/styles';
import { StorageService } from '~/services';
import { useStore } from '~/stores';
import {
  MaintenanceItensContainer,
  ScrollableContainer,
  TitleContainer,
} from './styles';

const ItemCounterparty = () => {
  const { counterpartyStore, appStore } = useStore();

  const nfe =
    counterpartyStore.counterpartyNfItems?.nf ||
    appStore.selectedNf ||
    (typeof window !== 'undefined'
      ? sessionStorage.getItem('selectedNf')
      : null);

  const isLoading = counterpartyStore.counterpartyNfItemsLoading;
  const errorMsg = counterpartyStore.counterpartyNfItemsError;

  return (
    <MainContentContainer
      title="Contraparte"
      actionArea={false}
      userName={StorageService.getUserData()?.name || ''}
      icon="person"
      goBack={true}
    >
      <Divider />
      <TitleContainer>
        <Text variant="title">
          NF-e {nfe} - Nº referencia:{' '}
          {counterpartyStore.counterpartyNfItems?.fluigNumber || ''}
        </Text>
      </TitleContainer>
      <ScrollableContainer>
        <MaintenanceItensContainer>
          {isLoading && <TableSkeleton />}

          {errorMsg && <p style={{ color: 'red' }}>Erro: {errorMsg}</p>}

          {counterpartyStore.counterpartyNfItems &&
            counterpartyStore.counterpartyNfItems.items.length === 0 &&
            !isLoading && <EmptyStateFeedback text="Nenhum item encontrado" />}

          {counterpartyStore.counterpartyNfItems?.items.map((itemUnit) => (
            <CounterpartyItem key={itemUnit.id} item={itemUnit} nf={nfe!} />
          ))}
        </MaintenanceItensContainer>
      </ScrollableContainer>
    </MainContentContainer>
  );
};

export default observer(ItemCounterparty);
