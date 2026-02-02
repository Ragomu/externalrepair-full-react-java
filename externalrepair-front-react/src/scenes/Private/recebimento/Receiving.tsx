import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { navigate } from 'vike/client/router';
import DataTable from '~/components/DataTable/DataTable';
import TableSkeleton from '~/components/DataTable/TableSkeleton';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import ContainerHeaderActions from '~/components/Historic/ContainerHeaderActions';
import MainContentContainer from '~/components/MainContentContainer';
import { Divider } from '~/components/MainContentContainer/styles';
import PdfPreviewModal from '~/components/PdfPreviewModal';
import { Routes } from '~/routes';
import { StorageService } from '~/services';
import { useStore } from '~/stores';
import { Container } from './styles';

const initialFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'negotiation', label: 'Negociação' },
  { id: 'transit', label: 'Trânsito' },
];

const Receiving = observer(({ data }: { data: ReceivedNfListTableItem[] }) => {
  const { historyStore, receivingStore } = useStore();
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const supplierDocument = StorageService.getSupplierDocument();
    if (!supplierDocument || supplierDocument.trim() === '') {
      throw new Error(
        'Supplier document não encontrado para a requisição /recebimento.',
      );
    }
    receivingStore.fetchReceivedNfList(
      supplierDocument,
      selectedStatus,
      searchTerm,
    );
  }, [receivingStore, selectedStatus, searchTerm]);

  const handleRowClick = async (nfe: string) => {
    sessionStorage.setItem('selectedNf', nfe);
    await historyStore.fetchReceivedNfItems(nfe);
    const url = Routes.RECEBIMENTO_ITEM.replace('@item', nfe);
    navigate(url);
  };

  const handleEyeClick = async (nfe: string) => {
    try {
      await receivingStore.getNfPdf(nfe);
    } catch (error) {
      console.error('Erro ao abrir PDF:', error);
    }
  };

  const handleFilterSelect = (status: string) => {
    setSelectedStatus(status);
  };

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
  };

  const handleClosePdfModal = () => {
    receivingStore.clearPdfUrl();
  };

  return (
    <MainContentContainer
      title="Recebimento"
      actionArea={false}
      userName={StorageService.getUserData()?.name || ''}
      icon="approval_delegation"
    >
      <Divider />
      <Container>
        <ContainerHeaderActions
          initialFilters={initialFilters}
          onFilterSelect={handleFilterSelect}
          onSearchSubmit={handleSearchSubmit}
        />
        {receivingStore.receivedNfListLoading && <TableSkeleton />}
        {data.length === 0 && !receivingStore.receivedNfListLoading && (
          <EmptyStateFeedback text="Nenhuma nota fiscal correspondente" />
        )}
        {data.length > 0 && !receivingStore.receivedNfListLoading && (
          <DataTable
            data={data}
            onRowClick={handleRowClick}
            onEyeClick={handleEyeClick}
          />
        )}
      </Container>

      {receivingStore.pdfUrl && (
        <PdfPreviewModal
          pdfUrl={receivingStore.pdfUrl}
          isLoading={receivingStore.pdfLoading}
          onClose={handleClosePdfModal}
        />
      )}
    </MainContentContainer>
  );
});

export default Receiving;
