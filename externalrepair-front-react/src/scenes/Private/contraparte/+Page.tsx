import { useEffect } from 'react';

import { observer } from 'mobx-react';
import { useStore } from '~/stores';
import Counterparty from './Couterparty';

const CounterpartyContainer = () => {
  const { counterpartyStore } = useStore();

  useEffect(() => {
    counterpartyStore.fetchCounterpartyNfs();
  }, [counterpartyStore]);

  return <Counterparty data={counterpartyStore.counterpartyNfs} />;
};

export const Page = observer(CounterpartyContainer);
