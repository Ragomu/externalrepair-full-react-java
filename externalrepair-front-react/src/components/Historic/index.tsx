import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { navigate } from 'vike/client/router';
import { Routes } from '~/routes';
import { StorageService } from '~/services';
import { useStore } from '~/stores';
import ContainerHeader from '../ContainerHeader/ContainerHeader';
import EmptyStateFeedback from '../EmptyStateFeedback';
import Pagination from '../Pagination';
import { DEFAULT_FILTER_OPTIONS } from './ContainerHeaderActions';
import HistoricSkeleton from './HistoricSkeleton';
import HistoricTable from './HistoricTable';
import { HistoricWrapper } from './styles';

const filterOptions = DEFAULT_FILTER_OPTIONS;

const Historic = observer(() => {
  const { historyStore } = useStore();
  const supplierDocument = StorageService.getSupplierDocument();
  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    if (supplierDocument && supplierDocument.trim() !== '') {
      historyStore.fetchHistoryWithStatus(
        supplierDocument,
        historyStore.selectedStatus,
        0,
        10,
      );
    }
  }, [supplierDocument, historyStore.selectedStatus]);

  const handleRowClick = async (item: HistoryItemResponse) => {
    sessionStorage.setItem('selectedNf', item.nf);
    await historyStore.fetchReceivedNfItems(item.nf);
    await historyStore.fetchTimeline(item.nf);
    const url = Routes.HISTORICO_ITEM.replace('@item', item.nf);
    navigate(url);
  };

  const handleFilterSelect = (status: string) => {
    historyStore.setSelectedStatus(status);
  };

  const handleSearchSubmit = (term: string) => {
    setSearchTerm(term);
    if (supplierDocument && supplierDocument.trim() !== '') {
      historyStore.fetchHistoryWithStatus(
        supplierDocument,
        historyStore.selectedStatus,
        0,
        10,
        term,
      );
    }
  };

  function renderContent() {
    if (historyStore.loading) {
      return <HistoricSkeleton />;
    }
    if (historyStore.error) {
      return <EmptyStateFeedback text={`Erro: ${historyStore.error}`} />;
    }
    if (historyStore.items.length === 0) {
      return <EmptyStateFeedback text="Nenhuma nota fiscal correspondente" />;
    }
    return (
      <>
        <HistoricTable items={historyStore.items} onRowClick={handleRowClick} />
        <Pagination
          currentPage={historyStore.currentPage + 1}
          totalPages={historyStore.totalPages}
          onPageChange={(page) => {
            if (
              supplierDocument &&
              supplierDocument.trim() !== '' &&
              page >= 1 &&
              page <= historyStore.totalPages
            ) {
              historyStore.fetchHistoryWithStatus(
                supplierDocument,
                historyStore.selectedStatus,
                page - 1,
                10,
                searchTerm,
              );
            }
          }}
        />
      </>
    );
  }

  return (
    <HistoricWrapper>
      <ContainerHeader
        title="Histórico"
        filterOptions={filterOptions}
        onFilterChange={handleFilterSelect}
        onSearch={handleSearchSubmit}
      />
      {renderContent()}
    </HistoricWrapper>
  );
});

export default Historic;
