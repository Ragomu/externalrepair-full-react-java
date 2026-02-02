import { observer } from 'mobx-react';
import { useStore } from '~/stores';

const HistoricPage = () => {
  const { historyStore } = useStore();

  return <div>{historyStore.timelineData.nf}</div>;
};

export default observer(HistoricPage);
