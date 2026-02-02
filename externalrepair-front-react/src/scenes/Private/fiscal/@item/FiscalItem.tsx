import { observer } from 'mobx-react';
import Divider from '~/components/Divider';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import FiscalAvaliation from '~/components/FiscalAvaliation/NfEvaluation';
import MainContentContainer from '~/components/MainContentContainer';
import NfItemsTable from '~/components/NfItemsTable';
import NfItemsSkeleton from '~/components/NfItemsTable/NfItemsSkeleton';
import PdfModal from '~/components/PdfModal';
import { Text } from '~/components/Typography/styles';
import { StorageService } from '~/services';
import { usePdfModal, usePermissions } from '~/utils/hooks';
import { useFiscalData, useFormatters } from './hooks';
import { ContentScrollContainer, TitleContainer } from './styles';

const FiscalItem = observer(() => {
  const { fiscalStore, transformedData } = useFiscalData();
  const { formatters } = useFormatters();
  const { canEdit } = usePermissions();
  const nfe = sessionStorage.getItem('selectedNf');

  const storePdfUrl = fiscalStore.pdfUrl;
  const storePdfLoading = fiscalStore.pdfLoading;

  const { handleClosePdfModal, pdfUrl, isLoading, isVisible } =
    usePdfModal(fiscalStore);

  const headers = [
    'Requisição',
    'Material',
    'Quantidade',
    'Descrição',
    'Dimensões',
    'Etiqueta',
    'Valor Total',
    'Data',
  ];

  const renderLoadingState = () => <NfItemsSkeleton headers={headers} />;

  const renderErrorState = () => (
    <EmptyStateFeedback text={`Erro: ${fiscalStore.fiscalNfItemsError}`} />
  );

  const renderEmptyState = () => (
    <EmptyStateFeedback text="Nenhum item encontrado" />
  );

  const renderTable = () => (
    <NfItemsTable
      items={transformedData}
      headers={headers}
      dataMapping={[
        'request',
        'material',
        'quantity',
        'description',
        'dimensions',
        'label',
        'totalPrice',
        'shippingDate',
      ]}
      formatters={formatters}
      gridColumns="0.7fr 0.7fr 0.6fr 1.5fr 0.6fr 0.6fr 0.6fr 0.5fr"
      status="pending"
      actionButtonText={canEdit('fiscal') ? 'Avaliar NF-e' : 'Visualizar NF-e'}
      actionButtonIcon="add_circle"
      exitButtonText="Sair da edição"
      children={<FiscalAvaliation />}
    />
  );

  const renderContent = () => {
    if (fiscalStore.fiscalNfItemsLoading) return renderLoadingState();
    if (fiscalStore.fiscalNfItemsError) return renderErrorState();
    if (transformedData.length === 0) return renderEmptyState();
    return renderTable();
  };

  return (
    <>
      <MainContentContainer
        title={`Fiscal`}
        actionArea={false}
        userName={StorageService.getUserData()?.name || ''}
        icon="receipt_long"
        goBack={true}
      >
        <Divider />
        <TitleContainer>
          <Text variant="title">
            NF-e {nfe} - Nº referencia:{' '}
            {fiscalStore.fiscalNfItems?.fluigNumber || ''}
          </Text>
        </TitleContainer>
        <ContentScrollContainer>{renderContent()}</ContentScrollContainer>
      </MainContentContainer>

      <PdfModal
        pdfUrl={storePdfUrl || pdfUrl}
        isLoading={storePdfLoading || isLoading}
        isVisible={!!storePdfUrl || isVisible}
        onClose={handleClosePdfModal}
      />
    </>
  );
});

export default FiscalItem;
