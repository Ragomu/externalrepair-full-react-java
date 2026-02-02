import { useEffect } from 'react';

import { observer } from 'mobx-react';
import { useStore } from '~/stores';
import Maintenance from './Maintenance';

const ManutentionContainer = () => {
  const { maintenanceStore } = useStore();

  useEffect(() => {
    maintenanceStore.fetchMaintenanceNfs();
  }, [maintenanceStore]);

  return <Maintenance data={maintenanceStore.maintenanceNfs} />;
};

export const Page = observer(ManutentionContainer);
