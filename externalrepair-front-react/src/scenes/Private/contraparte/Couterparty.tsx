import { observer } from 'mobx-react';
import { navigate } from 'vike/client/router';
import { CounterpartyNfList } from '~/api/counterparty';
import DataTable from '~/components/DataTable/DataTable';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import Divider from '~/components/Divider';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import ContainerHeaderActions, {
  MAINTENANCE_FILTERS,
} from '~/components/Historic/ContainerHeaderActions';
import MainContentContainer from '~/components/MainContentContainer';
import PdfModal from '~/components/PdfModal';
import { Routes } from '~/routes';
import { useStore } from '~/stores';
import { usePdfModal, useUserName } from '~/utils/hooks';
import { Container, ScrollableContainer } from './styles';

const Counterparty = observer(({ data }: { data: CounterpartyNfList[] }) => {
  const { counterpartyStore, appStore } = useStore();
  const userName = useUserName();

  const { handleEyeClick, handleClosePdfModal, pdfUrl, isLoading, isVisible } =
    usePdfModal(counterpartyStore);

  const handleSearchSubmit = (term: string) => {
    counterpartyStore.fetchCounterpartyNfs(term);
  };

  const handleAdvancedFilterApply = (queryString: string) => {
    counterpartyStore.fetchCounterpartyNfs(queryString);
  };

  const handleRowClick = async (nfe: string) => {
    appStore.setSelectedNf(nfe);
    const url = Routes.CONTRAPARTE_ITEM.replace('@item', nfe);
    await counterpartyStore.fetchCounterpartyNfItems(nfe);
    navigate(url);
  };

  return (
    <>
      <MainContentContainer
        title="Contraparte"
        actionArea={false}
        userName={userName}
        icon="person"
        goBack={true}
      >
        <Divider />

        <Container>
          <ContainerHeaderActions
            onSearchSubmit={handleSearchSubmit}
            onAdvancedFilterApply={handleAdvancedFilterApply}
            showFilters={false}
            showFiltersPlus={true}
            advancedFilterOptions={{
              statusOptions: MAINTENANCE_FILTERS,
            }}
          />
          <ScrollableContainer>
            {counterpartyStore.counterpartyNfsLoading && <TableSkeleton />}
            {data.length === 0 && !counterpartyStore.counterpartyNfsLoading && (
              <EmptyStateFeedback text="Nenhuma nota fiscal correspondente" />
            )}
            {data.length > 0 && !counterpartyStore.counterpartyNfsLoading && (
              <DataTable
                data={data}
                onRowClick={handleRowClick}
                onEyeClick={handleEyeClick}
              />
            )}
          </ScrollableContainer>
        </Container>
      </MainContentContainer>

      <PdfModal
        pdfUrl={pdfUrl}
        isLoading={isLoading}
        isVisible={isVisible}
        onClose={handleClosePdfModal}
      />
    </>
  );
});

export default Counterparty;
