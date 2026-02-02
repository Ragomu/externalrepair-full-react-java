import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import TableSkeleton from '~/components/DataTable/TableSkeleton';
import MainContentContainer from '~/components/MainContentContainer';
import { useStore } from '~/stores';
import { useUserName } from '~/utils/hooks';
import ItemCounterparty from './ItemCounterparty';

const CounterpartyItemContainer: FC = () => {
  const { counterpartyStore, appStore } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const userName = useUserName();
  useEffect(() => {
    const loadData = async () => {
      const selectedNf =
        appStore.selectedNf ||
        (typeof window !== 'undefined'
          ? sessionStorage.getItem('selectedNf')
          : null);

      if (!selectedNf) {
        setIsLoading(false);
        return;
      }

      if (!appStore.selectedNf && selectedNf) {
        appStore.setSelectedNf(selectedNf);
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem('selectedNf', selectedNf);
      }

      try {
        await counterpartyStore.fetchCounterpartyNfItems(selectedNf);
      } catch (error) {
        console.error('Erro ao carregar dados de contraparte:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [counterpartyStore, appStore]);

  if (isLoading) {
    return (
      <MainContentContainer
        title="Contraparte"
        actionArea={false}
        userName={userName}
        icon="person"
        goBack={true}
      >
        <TableSkeleton />
      </MainContentContainer>
    );
  }

  return <ItemCounterparty />;
};

export const Page = observer(CounterpartyItemContainer);
