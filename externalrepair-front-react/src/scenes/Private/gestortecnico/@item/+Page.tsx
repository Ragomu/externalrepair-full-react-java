import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '~/stores';
import { withGestorTecnicoAccess } from '~/utils/hocs';
import GestorTecnicoItem from './GestorTecnicoItem';

const GestorTecnicoItemContainer = () => {
  const { technicalManagerStore } = useStore();

  useEffect(() => {
    const loadData = async () => {
      const selectedNf = sessionStorage.getItem('selectedNf');

      if (selectedNf) {
        try {
          await technicalManagerStore.fetchTechnicalManagerNfItems(selectedNf);
        } catch (error) {
          console.error('Erro ao carregar itens de gestor técnico:', error);
        }
      }
    };

    loadData();
  }, [technicalManagerStore]);

  const flatData = technicalManagerStore.technicalManagerNfItems?.items || [];

  console.log('Store data:', technicalManagerStore.technicalManagerNfItems);
  console.log('Flat data:', flatData);
  console.log('Data length:', flatData.length);

  return (
    <GestorTecnicoItem
      data={flatData}
      isLoading={technicalManagerStore.technicalManagerNfItemsLoading}
    />
  );
};

export default withGestorTecnicoAccess(observer(GestorTecnicoItemContainer));
