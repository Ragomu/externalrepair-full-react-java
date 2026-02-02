import { observer } from 'mobx-react';
import { navigate } from 'vike/client/router';
import DataTable from '~/components/DataTable/DataTable';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import Divider from '~/components/Divider';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import ContainerHeaderActions, {
  FISCAL_FILTERS,
} from '~/components/Historic/ContainerHeaderActions';
import MainContentContainer from '~/components/MainContentContainer';
import PdfModal from '~/components/PdfModal';
import { Routes } from '~/routes';
import { StorageService } from '~/services/storage';
import { useStore } from '~/stores';
import { usePdfModal } from '~/utils/hooks';
import { Container, ScrollableContainer } from './styles';

const Fiscal = observer(() => {
  const { fiscalStore } = useStore();

  const { handleEyeClick, handleClosePdfModal, pdfUrl, isLoading, isVisible } =
    usePdfModal(fiscalStore);

  const handleSearchSubmit = (term: string) => {
    fiscalStore.fetchFiscalNfs(term);
  };

  const handleAdvancedFilterApply = (queryString: string) => {
    fiscalStore.fetchFiscalNfs(queryString);
  };

  const handleRowClick = async (nfe: string) => {
    sessionStorage.setItem('selectedNf', nfe);

    // Buscar o item da lista para verificar o status
    const nfItem = fiscalStore.fiscalNfs.find((item) => item.nf === nfe);

    if (nfItem?.status === 'partial') {
      // Redirecionar para fiscal parcial
      const url = Routes.FISCAL_PARTIAL.replace('@item', nfe);
      navigate(url);
    } else {
      // Redirecionar para fiscal completo (padrão)
      const url = Routes.FISCAL_ITEM.replace('@item', nfe);
      navigate(url);
    }
  };

  return (
    <>
      <MainContentContainer
        title="Fiscal"
        actionArea={false}
        userName={StorageService.getUserData()?.name || ''}
        icon="receipt_long"
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
              statusOptions: FISCAL_FILTERS,
            }}
          />
          <ScrollableContainer>
            {fiscalStore.fiscalNfsLoading && <TableSkeleton />}
            {fiscalStore.fiscalNfs.length === 0 &&
              !fiscalStore.fiscalNfsLoading && (
                <EmptyStateFeedback text="Nenhuma nota fiscal correspondente" />
              )}
            {fiscalStore.fiscalNfs.length > 0 &&
              !fiscalStore.fiscalNfsLoading && (
                <DataTable
                  data={fiscalStore.fiscalNfs}
                  onRowClick={handleRowClick}
                  onEyeClick={handleEyeClick}
                  showType={false}
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

export default Fiscal;
