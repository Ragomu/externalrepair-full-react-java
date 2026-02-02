import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import SkeletonHistoricTableRow from '~/components/Historic/SkeletonHistoricTableRow';
import { useStore } from '~/stores';
import ItemReceiving from './ItemReceiving';

const ReceivingContainer: FC = () => {
  const { historyStore, receivingStore } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const selectedNf = sessionStorage.getItem('selectedNf');

      if (selectedNf) {
        try {
          await Promise.all([
            historyStore.fetchReceivedNfItems(selectedNf),
            receivingStore.getNfPhotos(selectedNf),
          ]);
        } catch (error) {
          console.error('Erro ao carregar dados:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return <SkeletonHistoricTableRow />;
  }

  return <ItemReceiving />;
};

export const Page = observer(ReceivingContainer);
