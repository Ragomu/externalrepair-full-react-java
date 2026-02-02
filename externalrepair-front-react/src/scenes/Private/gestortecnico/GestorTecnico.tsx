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

const GestorTecnico = observer(() => {
  const { technicalManagerStore } = useStore();

  const { handleEyeClick, handleClosePdfModal, pdfUrl, isLoading, isVisible } =
    usePdfModal(technicalManagerStore);

  const handleSearchSubmit = (term: string) => {
    technicalManagerStore.fetchTechnicalManagerNfs(term);
  };

  const handleAdvancedFilterApply = (queryString: string) => {
    technicalManagerStore.fetchTechnicalManagerNfs(queryString);
  };

  const handleRowClick = async (nfe: string) => {
    sessionStorage.setItem('selectedNf', nfe);
    const url = Routes.GESTORTECNICO_ITEM.replace('@item', nfe);
    navigate(url);
  };

  return (
    <>
      <MainContentContainer
        title="Gestor Técnico"
        actionArea={false}
        userName={StorageService.getUserData()?.name || ''}
        icon="check_circle"
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
            {technicalManagerStore.technicalManagerNfsLoading && (
              <TableSkeleton />
            )}
            {technicalManagerStore.technicalManagerNfs.length === 0 &&
              !technicalManagerStore.technicalManagerNfsLoading && (
                <EmptyStateFeedback text="Nenhuma nota fiscal correspondente" />
              )}
            {technicalManagerStore.technicalManagerNfs.length > 0 &&
              !technicalManagerStore.technicalManagerNfsLoading && (
                <DataTable
                  data={technicalManagerStore.technicalManagerNfs}
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

export default GestorTecnico;
