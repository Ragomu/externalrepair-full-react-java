import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import SkeletonHistoricTableRow from '~/components/Historic/SkeletonHistoricTableRow';
import MainContentContainer from '~/components/MainContentContainer';
import { Divider } from '~/components/MainContentContainer/styles';
import PartialFiscalItem from '~/components/PartialFiscalItem';
import PdfModal from '~/components/PdfModal';
import { Text } from '~/components/Typography/styles';
import { StorageService } from '~/services/storage';
import { useStore } from '~/stores';
import { withFiscalAccess, withFiscalView } from '~/utils/hocs';
import { usePdfModal } from '~/utils/hooks';
import { ContentScrollContainer } from '../@item/styles';
import { ItemsContainer, TitleContainer } from './styles';

const PartialFiscalPage = () => {
  const { fiscalStore } = useStore();
  const nf = sessionStorage.getItem('selectedNf');
  const { handleClosePdfModal, pdfUrl, isLoading, isVisible } =
    usePdfModal(fiscalStore);

  const storePdfUrl = fiscalStore.pdfUrl;
  const storePdfLoading = fiscalStore.pdfLoading;

  useEffect(() => {
    if (nf) {
      fiscalStore.fetchPartialFiscalItems(nf);
    }
  }, [nf, fiscalStore]);

  if (!nf) {
    return (
      <MainContentContainer
        title="Fiscal Parcial"
        actionArea={false}
        userName=""
        icon="gavel"
        goBack={true}
      >
        <Text>NF não encontrada</Text>
      </MainContentContainer>
    );
  }

  const renderContent = () => {
    if (fiscalStore.partialFiscalLoading) {
      return <SkeletonHistoricTableRow />;
    }

    if (fiscalStore.partialFiscalError) {
      return <EmptyStateFeedback text="Erro ao carregar dados" />;
    }

    if (
      !fiscalStore.partialFiscalItems?.items ||
      fiscalStore.partialFiscalItems.items.length === 0
    ) {
      return <EmptyStateFeedback text="Nenhum item encontrado" />;
    }

    return (
      <ItemsContainer>
        {fiscalStore.partialFiscalItems.items.map((item) => (
          <PartialFiscalItem key={item.id} item={item} nf={nf} />
        ))}
      </ItemsContainer>
    );
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
            NF-e {nf} - Nº referencia:{' '}
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
};

export default withFiscalAccess(withFiscalView(observer(PartialFiscalPage)));
