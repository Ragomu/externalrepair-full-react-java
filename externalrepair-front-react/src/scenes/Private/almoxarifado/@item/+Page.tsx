import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '~/stores';
import AlmoxarifadoItem from './AlmoxarifadoItem';

const AlmoxarifadoItemContainer = () => {
  const { warehouseStore } = useStore();

  useEffect(() => {
    const nf = sessionStorage.getItem('selectedNf');
    if (nf) {
      warehouseStore.fetchWarehouseNfItems(nf);
    }
  }, [warehouseStore]);

  return <AlmoxarifadoItem data={warehouseStore.warehouseNfItems} />;
};

export const Page = observer(AlmoxarifadoItemContainer);
