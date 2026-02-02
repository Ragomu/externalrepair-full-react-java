import { observer } from 'mobx-react';
import { navigate } from 'vike/client/router';
import DataTable from '~/components/DataTable/DataTable';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import ContainerHeaderActions, {
  WAREHOUSE_FILTERS,
} from '~/components/Historic/ContainerHeaderActions';
import MainContentContainer from '~/components/MainContentContainer';
import { Divider } from '~/components/MainContentContainer/styles';
import PdfModal from '~/components/PdfModal';
import { Routes } from '~/routes';
import { StorageService } from '~/services/storage';
import { useStore } from '~/stores';
import { usePdfModal } from '~/utils/hooks';
import { Container } from './styles';

const Almoxarifado = observer(() => {
  const { warehouseStore } = useStore();
  const userName = StorageService.getUserNameFromStore();

  const { handleEyeClick, handleClosePdfModal, pdfUrl, isLoading, isVisible } =
    usePdfModal(warehouseStore);

  const handleSearchSubmit = (term: string) => {
    warehouseStore.fetchWarehouseNfs(term);
  };

  const handleAdvancedFilterApply = (queryString: string) => {
    warehouseStore.fetchWarehouseNfs(queryString);
  };

  const handleRowClick = async (nfe: string) => {
    sessionStorage.setItem('selectedNf', nfe);
    const url = Routes.ALMOXARIFADO_ITEM.replace('@item', nfe);
    navigate(url);
  };

  return (
    <>
      <MainContentContainer
        title="Almoxarifado"
        userName={userName || ''}
        actionArea={false}
        goBack={false}
        icon="package_2"
      >
        <Divider />
        <Container>
          <ContainerHeaderActions
            onSearchSubmit={handleSearchSubmit}
            onAdvancedFilterApply={handleAdvancedFilterApply}
            showFilters={false}
            showFiltersPlus={true}
            advancedFilterOptions={{
              statusOptions: WAREHOUSE_FILTERS,
            }}
          />
        </Container>
        {warehouseStore.warehouseNfsLoading && <TableSkeleton />}
        {warehouseStore.warehouseNfs.length === 0 &&
          !warehouseStore.warehouseNfsLoading && (
            <EmptyStateFeedback text="Nenhuma nota fiscal correspondente" />
          )}
        {warehouseStore.warehouseNfs.length > 0 &&
          !warehouseStore.warehouseNfsLoading && (
            <Container>
              <DataTable
                data={warehouseStore.warehouseNfs}
                onRowClick={handleRowClick}
                onEyeClick={handleEyeClick}
              />
            </Container>
          )}
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

export default Almoxarifado;
