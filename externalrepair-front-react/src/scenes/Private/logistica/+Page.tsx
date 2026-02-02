import { useEffect } from 'react';

import { observer } from 'mobx-react';
import { useStore } from '~/stores';
import { withLogisticAccess } from '~/utils/hocs';
import Logistica from './Logistica';

const LogisticaContainer = () => {
  const { logisticsStore } = useStore();

  useEffect(() => {
    logisticsStore.fetchLogisticsNfs();
  }, []);

  return <Logistica data={logisticsStore.logisticsNfs} />;
};

export const Page = withLogisticAccess(observer(LogisticaContainer));
