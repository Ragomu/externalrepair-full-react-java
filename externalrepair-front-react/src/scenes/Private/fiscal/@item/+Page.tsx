import { useEffect } from 'react';
import { useStore } from '~/stores';
import FiscalItem from './FiscalItem';

const FiscalItemContainer = () => {
  const { fiscalStore } = useStore();

  useEffect(() => {
    const loadData = async () => {
      const selectedNf = sessionStorage.getItem('selectedNf');

      if (selectedNf) {
        try {
          await fiscalStore.fetchFiscalNfItems(selectedNf);
        } catch (error) {
          console.error('Erro ao carregar itens fiscais:', error);
        }
      }
    };

    loadData();
  }, [fiscalStore]);

  return <FiscalItem />;
};

export default FiscalItemContainer;
