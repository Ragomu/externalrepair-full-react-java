import { FC, useCallback, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import uisaApi from '~/api/uisaApi';
import { historyStore } from '../../../stores/history.store';
import Home from './Home';

function mapDisplayValueToApiValue(displayValue: string): string {
  switch (displayValue) {
    case 'Item':
      return 'item';
    case 'NF-e':
      return 'nf';
    case 'Valor':
      return 'value';
    default:
      return displayValue.toLowerCase();
  }
}

const HomeContainer: FC = () => {
  const [homeData, setHomeData] = useState<HomeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const filters: GetHomeFilters = {
        maintenanceType: mapDisplayValueToApiValue(historyStore.firstFilter),
        transitType: mapDisplayValueToApiValue(historyStore.secondFilter),
        negotiationType: mapDisplayValueToApiValue(historyStore.thirdFilter),
      };
      const data = await uisaApi.getHome(filters);
      setHomeData(data);
    } catch (error) {
      console.error('Erro ao buscar dados da home:', error);
      setHomeData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <Home data={homeData} loading={loading} onFilterChange={fetchData} />;
};

export const Page = observer(HomeContainer);
