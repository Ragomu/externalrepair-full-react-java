import React from 'react';
import { observer } from 'mobx-react';
import Divider from '~/components/Divider';
import EmptyStateFeedback from '~/components/EmptyStateFeedback';
import PdfModal from '~/components/PdfModal';
import { Text } from '~/components/Typography/styles';
import { useStore } from '~/stores';
import { usePdfModal } from '~/utils/hooks/usePdfModal';
import type { TimelineApiResponse } from '~/utils/types/Timeline.d.ts';
import HistoricTimelineSkeleton from './HistoricTimelineSkeleton';
import {
  NfeButton,
  TimelineContent,
  TimelineDate,
  TimelineIcon,
  TimelineItemContent,
  TimelineItemWrapper,
  TimelineMessage,
  TimelineTitle,
  TimelineWrapper,
} from './styles';

interface HistoricTimelineResponseProps {
  data: TimelineApiResponse | null;
  loading?: boolean;
  error?: string | null;
}

const HistoricTimeline: React.FC<HistoricTimelineResponseProps> = ({
  data,
  loading = false,
  error = null,
}) => {
  const { fiscalStore } = useStore();
  const { handleEyeClick, handleClosePdfModal, pdfUrl, isLoading, isVisible } =
    usePdfModal(fiscalStore);

  const getStatusConfig = (status: string) => {
    const statusColors: Record<string, string> = {
      Manutenção: '#fdecde',
      Negociação: '#e6ebff',
      Recebimento: '#e4ffe0',
      Logística: '#fff3e0',
      Fiscal: '#f3e5f5',
      Início: '#e6e6e6',
    };

    const iconMap: Record<string, string> = {
      Manutenção: 'build',
      Negociação: 'currency_exchange',
      Recebimento: 'approval_delegation',
      Logística: 'local_shipping',
      Fiscal: 'receipt_long',
      Início: 'flag',
    };

    return {
      color: statusColors[status] || '#e6e6e6',
      icon: iconMap[status] || 'info',
    };
  };

  const handleNfeClick = async () => {
    if (data?.nf) {
      await handleEyeClick(data.nf);
    }
  };

  if (loading) {
    return <HistoricTimelineSkeleton />;
  }

  if (error) {
    return <EmptyStateFeedback text="Erro ao carregar timeline" />;
  }

  if (!data) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h3>Nenhum dado disponível</h3>
      </div>
    );
  }

  return (
    <>
      <TimelineWrapper>
        {data.items?.map((item, index) => {
          const config = getStatusConfig(item.status);
          const isActive = index === 0;
          const isMaintenance = item.status === 'Manutenção';

          return (
            <TimelineItemWrapper
              key={index}
              className={isActive ? 'active' : ''}
            >
              <TimelineItemContent>
                <TimelineIcon color={config.color}>
                  <span className="material-symbols-outlined">
                    {config.icon}
                  </span>
                </TimelineIcon>
                <TimelineContent>
                  <TimelineDate>{item.date}</TimelineDate>
                  <TimelineTitle>{item.status}</TimelineTitle>
                  <TimelineMessage>{item.description}</TimelineMessage>
                </TimelineContent>
                {isMaintenance && (
                  <NfeButton onClick={handleNfeClick}>
                    <span className="material-symbols-outlined">
                      attachment
                    </span>
                    <Text variant="small" color="#959595">
                      NF-e de retorno
                    </Text>
                  </NfeButton>
                )}
              </TimelineItemContent>
              {index !== data.items.length - 1 && <Divider />}
            </TimelineItemWrapper>
          );
        })}
      </TimelineWrapper>

      <PdfModal
        pdfUrl={pdfUrl}
        isLoading={isLoading}
        isVisible={isVisible}
        onClose={handleClosePdfModal}
      />
    </>
  );
};

export default observer(HistoricTimeline);
