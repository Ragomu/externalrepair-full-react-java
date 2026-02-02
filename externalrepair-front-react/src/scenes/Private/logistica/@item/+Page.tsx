import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '~/stores';
import LogisticsItem from './LogisticsItem';

const LogisticsItemContainer = () => {
  const { logisticsStore } = useStore();

  useEffect(() => {
    const nf = sessionStorage.getItem('selectedNf');
    if (nf) {
      logisticsStore.fetchLogisticsNfItems(nf);
    }
  }, [logisticsStore]);

  const flatData =
    logisticsStore.logisticsNfItems &&
    Array.isArray(logisticsStore.logisticsNfItems)
      ? logisticsStore.logisticsNfItems.flatMap((nf) => nf.items || [])
      : [];

  return (
    <LogisticsItem
      data={flatData}
      isLoading={logisticsStore.logisticsNfItemsLoading}
    />
  );
};

export const Page = observer(LogisticsItemContainer);
