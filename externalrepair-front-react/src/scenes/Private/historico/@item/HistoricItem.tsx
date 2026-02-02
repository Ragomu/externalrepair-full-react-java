import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import HistoricTimeline from '~/components/Historic/HistoricTimeline/HistoricTimeline';
import MainContentContainer from '~/components/MainContentContainer';
import { Text } from '~/components/Typography/styles';
import { StorageService } from '~/services';
import { useStore } from '~/stores';
import {
  ScrollableContainer,
  TitleContainer,
} from '../../almoxarifado/@item/styles';

const HistoricItem: React.FC = () => {
  const { historyStore } = useStore();

  useEffect(() => {
    const loadTimeline = async () => {
      const selectedNf = sessionStorage.getItem('selectedNf');

      if (selectedNf) {
        try {
          await historyStore.fetchTimeline(selectedNf);
        } catch (error) {
          console.error('Erro ao carregar timeline:', error);
        }
      }
    };

    loadTimeline();
  }, [historyStore]);

  return (
    <MainContentContainer
      title="Histórico"
      userName={StorageService.getUserData()?.name || ''}
      icon="history"
      goBack={true}
      actionArea={false}
    >
      <TitleContainer>
        <Text variant="titleLight">
          NF-e {historyStore.timelineData.nf} - Nº referencia:{' '}
          {historyStore.timelineData.fluigNumber || ''}
        </Text>
      </TitleContainer>
      <ScrollableContainer>
        <HistoricTimeline
          data={historyStore.timelineData}
          loading={historyStore.timelineLoading}
          error={historyStore.timelineError}
        />
      </ScrollableContainer>
    </MainContentContainer>
  );
};

export default observer(HistoricItem);
