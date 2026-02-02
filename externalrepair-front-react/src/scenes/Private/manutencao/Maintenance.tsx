import { useState } from 'react';
import { observer } from 'mobx-react';
import { MaintenanceResponse } from '~/api/maintenance';
import DataTable from '~/components/DataTable/DataTable';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import Divider from '~/components/Divider';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import ContainerHeaderActions, {
  MAINTENANCE_FILTERS,
} from '~/components/Historic/ContainerHeaderActions';
import MainContentContainer from '~/components/MainContentContainer';
import { MaintenanceModal } from '~/components/MaintenanceModal';
import PdfPreviewModal from '~/components/PdfPreviewModal';
import { useStore } from '~/stores';
import { useUserName } from '~/utils/hooks';
import { Container, ScrollableContainer } from './styles';

const Maintenance = observer(({ data }: { data: MaintenanceResponse[] }) => {
  const { maintenanceStore, appStore } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userName = useUserName();

  const handleSearchSubmit = (term: string) => {
    maintenanceStore.fetchMaintenanceNfs(term);
  };

  const handleAdvancedFilterApply = (queryString: string) => {
    maintenanceStore.fetchMaintenanceNfs(queryString);
  };

  const handleRowClick = async (nfe: string) => {
    appStore.setSelectedNf(nfe);
    await maintenanceStore.getMaintenanceNfType(nfe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClosePdfModal = () => {
    maintenanceStore.clearPdfUrl();
  };

  const handleEyeClick = async (nfe: string) => {
    try {
      await maintenanceStore.getNfPdf(nfe);
    } catch (error) {
      console.error('Erro ao abrir PDF:', error);
    }
  };

  return (
    <>
      <MainContentContainer
        title="Manutenção"
        actionArea={false}
        userName={userName}
        icon="manufacturing"
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
            {maintenanceStore.maintenanceNfsLoading && <TableSkeleton />}
            {data.length === 0 && !maintenanceStore.maintenanceNfsLoading && (
              <EmptyStateFeedback text="Nenhuma nota fiscal correspondente" />
            )}
            {data.length > 0 && !maintenanceStore.maintenanceNfsLoading && (
              <DataTable
                data={data}
                onRowClick={handleRowClick}
                onEyeClick={handleEyeClick}
              />
            )}
          </ScrollableContainer>
        </Container>
      </MainContentContainer>

      {isModalOpen && <MaintenanceModal onClose={handleCloseModal} />}

      {maintenanceStore.maintenanceNfPdfUrl && (
        <PdfPreviewModal
          pdfUrl={maintenanceStore.maintenanceNfPdfUrl}
          isLoading={maintenanceStore.maintenanceNfPdfLoading}
          onClose={handleClosePdfModal}
        />
      )}
    </>
  );
});

export default Maintenance;
