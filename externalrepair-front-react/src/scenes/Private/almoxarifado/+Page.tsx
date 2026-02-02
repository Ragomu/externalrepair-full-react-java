import { useEffect } from 'react';

import { observer } from 'mobx-react';
import { useStore } from '~/stores';
import { withWarehouseAccess } from '~/utils/hocs';
import Almoxarifado from './Almoxarifado';

const AlmoxarifadoContainer = () => {
  const { warehouseStore } = useStore();

  useEffect(() => {
    warehouseStore.fetchWarehouseNfs();
    const nf = sessionStorage.getItem('selectedNf');
    if (nf) {
      warehouseStore.fetchWarehouseNfItems(nf);
    }
  }, []);

  return <Almoxarifado />;
};

export const Page = withWarehouseAccess(observer(AlmoxarifadoContainer));
