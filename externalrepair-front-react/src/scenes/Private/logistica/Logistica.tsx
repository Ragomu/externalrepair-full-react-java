import { observer } from 'mobx-react';
import { navigate } from 'vike/client/router';
import { LogisticsNfList } from '~/api/logistics';
import DataTable from '~/components/DataTable/DataTable';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import ContainerHeaderActions, {
  MAINTENANCE_FILTERS,
} from '~/components/Historic/ContainerHeaderActions';
import MainContentContainer from '~/components/MainContentContainer';
import { Divider } from '~/components/MainContentContainer/styles';
import PdfModal from '~/components/PdfModal';
import { Routes } from '~/routes';
import { StorageService } from '~/services/storage';
import { useStore } from '~/stores';
import { usePdfModal } from '~/utils/hooks';
import { Container } from './styles';

const Logistica = observer(({ data }: { data: LogisticsNfList[] }) => {
  const { logisticsStore } = useStore();
  const userName = StorageService.getUserNameFromStore();

  const { handleEyeClick, handleClosePdfModal, pdfUrl, isLoading } =
    usePdfModal(logisticsStore, logisticsStore.getLogisticsNfPdf);

  const handleSearchSubmit = (term: string) => {
    logisticsStore.fetchLogisticsNfs(term);
  };

  const handleAdvancedFilterApply = (queryString: string) => {
    logisticsStore.fetchLogisticsNfs(queryString);
  };

  const handleRowClick = async (nfe: string) => {
    sessionStorage.setItem('selectedNf', nfe);
    const url = Routes.LOGISTICA_ITEM.replace('@item', nfe);
    navigate(url);
  };

  return (
    <>
      <MainContentContainer
        title="Logística"
        userName={userName || ''}
        actionArea={false}
        goBack={false}
        icon="delivery_truck_speed"
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
          {logisticsStore.logisticsNfsLoading && <TableSkeleton />}
          {data.length === 0 && !logisticsStore.logisticsNfsLoading && (
            <EmptyStateFeedback text="Nenhuma nota fiscal correspondente" />
          )}
          {data.length > 0 && !logisticsStore.logisticsNfsLoading && (
            <DataTable
              data={data}
              onRowClick={handleRowClick}
              onEyeClick={handleEyeClick}
              showStatus
            />
          )}
        </Container>
      </MainContentContainer>

      <PdfModal
        pdfUrl={pdfUrl}
        isLoading={isLoading}
        onClose={handleClosePdfModal}
      />
    </>
  );
});

export default Logistica;
