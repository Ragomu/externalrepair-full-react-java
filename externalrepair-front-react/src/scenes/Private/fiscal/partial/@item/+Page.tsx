import { useEffect } from 'react';
import { useStore } from '~/stores';
import PartialFiscalPage from '../+Page';

const PartialFiscalItemContainer = () => {
  const { fiscalStore } = useStore();

  useEffect(() => {
    const loadData = async () => {
      const selectedNf = sessionStorage.getItem('selectedNf');

      if (selectedNf) {
        try {
          await fiscalStore.fetchPartialFiscalItems(selectedNf);
        } catch (error) {
          console.error('Erro ao carregar itens fiscais parciais:', error);
        }
      }
    };

    loadData();
  }, [fiscalStore]);

  return <PartialFiscalPage />;
};

export default PartialFiscalItemContainer;
