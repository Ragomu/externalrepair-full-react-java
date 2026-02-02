import { useEffect } from 'react';
import { observer } from 'mobx-react';

import { Icon } from '~/components/NfItemsTable/styles';
import { Text } from '~/components/Typography/styles';
import { useStore } from '~/stores';
import { usePdfModal } from '~/utils/hooks';
import {
  ButtonContainer,
  ContainerAdditionalButtonsNfs,
  RelatedNfButton,
  RelatedNfValue,
  RelatedNumberNfValue,
} from '../styles';

interface AdditionalNfsButtonsProps {
  nfLink: string;
}

const AdditionalNfsButtons = observer(
  ({ nfLink }: AdditionalNfsButtonsProps) => {
    const { fiscalStore } = useStore();
    const { handleEyeClick } = usePdfModal(
      fiscalStore,
      fiscalStore.getAdditionalNfPdf,
    );

    useEffect(() => {
      if (nfLink) {
        fiscalStore.fetchAdditionalNfs(nfLink);
      }

      return () => {
        fiscalStore.clearAdditionalNfs();
      };
    }, [nfLink, fiscalStore]);

    const handleOpenPdf = async (link: string) => {
      try {
        await handleEyeClick(link);
      } catch (error) {
        console.error('Erro ao abrir PDF da NF adicional:', error);
      }
    };

    if (fiscalStore.additionalNfsLoading) {
      return null; // Não mostra nada durante o loading
    }

    if (!fiscalStore.additionalNfs || fiscalStore.additionalNfs.length === 0) {
      return null; // Não mostra nada se não há NFs adicionais
    }

    return (
      <ContainerAdditionalButtonsNfs>
        <div style={{ marginBottom: '10px' }}>
          <Text variant="small">Notas relacionadas</Text>
        </div>
        {fiscalStore.additionalNfs.map((additionalNf, index) => (
          <ButtonContainer key={index}>
            <RelatedNfValue>
              <RelatedNumberNfValue>N°</RelatedNumberNfValue>
              {additionalNf.nfNumber || '---------'}
            </RelatedNfValue>
            <RelatedNfButton onClick={() => handleOpenPdf(additionalNf.nfLink)}>
              <Icon className="material-symbols-outlined">attachment</Icon>
              NF-e relacionada
            </RelatedNfButton>
          </ButtonContainer>
        ))}
      </ContainerAdditionalButtonsNfs>
    );
  },
);

export default AdditionalNfsButtons;
