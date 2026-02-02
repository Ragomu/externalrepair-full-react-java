import { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';

import TableSkeleton from '~/components/DataTable/TableSkeleton';
import MainContentContainer from '~/components/MainContentContainer';
import { useStore } from '~/stores';
import { useUserName } from '~/utils/hooks';
import ItemMaintenance from './ItemMaintenance';
import ItemMaintenancePartial from './ItemMaintenancePartial';

const MaintenanceItemContainer: FC = () => {
  const { maintenanceStore, appStore } = useStore();
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
      // Persistir NF como fonte única para operações subsequentes
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('selectedNf', selectedNf);
      }

      const urlParams = new URLSearchParams(window.location.search);
      const tipoFromUrl = urlParams.get('tipo') as
        | 'complete'
        | 'partial'
        | null;

      try {
        if (!maintenanceStore.selectedMaintenanceType && !tipoFromUrl) {
          await maintenanceStore.getMaintenanceNfType(selectedNf);
        } else if (!maintenanceStore.selectedMaintenanceType && tipoFromUrl) {
          maintenanceStore.selectedMaintenanceType = tipoFromUrl;
        }

        const currentType =
          maintenanceStore.selectedMaintenanceType || tipoFromUrl;
        if (currentType === 'partial') {
          await maintenanceStore.fetchPartialNfItems(selectedNf);
        } else {
          await maintenanceStore.fetchMaintenanceNfItems(selectedNf);
        }
      } catch (error) {
        console.error('Erro ao carregar dados de manutenção:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [maintenanceStore, appStore]);

  if (isLoading) {
    return (
      <MainContentContainer
        title="Manutenção"
        actionArea={false}
        userName={userName}
        icon="manufacturing"
        goBack={true}
      >
        <TableSkeleton />
      </MainContentContainer>
    );
  }

  const type = maintenanceStore.selectedMaintenanceType;
  return type === 'partial' ? <ItemMaintenancePartial /> : <ItemMaintenance />;
};

export const Page = observer(MaintenanceItemContainer);
