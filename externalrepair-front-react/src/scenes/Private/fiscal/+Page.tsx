import { useEffect } from 'react';

import { observer } from 'mobx-react';
import { useStore } from '~/stores';
import { withFiscalAccess } from '~/utils/hocs';
import Fiscal from './Fiscal';

const FiscalContainer = () => {
  const { fiscalStore } = useStore();

  useEffect(() => {
    fiscalStore.fetchFiscalNfs();
  }, []);

  return <Fiscal />;
};

export const Page = withFiscalAccess(observer(FiscalContainer));
