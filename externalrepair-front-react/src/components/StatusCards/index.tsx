import React from 'react';
import { observer } from 'mobx-react-lite';
import { Routes } from '~/routes';
import { navigateTo } from '~/services';
import { historyStore } from '../../stores/history.store';
import EmptyStateFeedback from '../EmptyStateFeedback';
import StatusCard from '../StatusCard';
import StatusCardSkeleton from '../StatusCardSkeleton';
import { CardClickable, CardsWrapper } from './styles';

interface StatusCardsProps {
  data: HomeResponse | null;
  loading: boolean;
  onFilterChange: () => void;
}

const StatusCards: React.FC<StatusCardsProps> = observer(
  ({ data, loading, onFilterChange }) => {
    if (loading) {
      return (
        <CardsWrapper>
          <CardClickable style={{ cursor: 'default' }}>
            <StatusCardSkeleton />
          </CardClickable>
          <CardClickable style={{ cursor: 'default' }}>
            <StatusCardSkeleton />
          </CardClickable>
          <CardClickable style={{ cursor: 'default' }}>
            <StatusCardSkeleton />
          </CardClickable>
        </CardsWrapper>
      );
    }

    if (!data) return <EmptyStateFeedback />;

    const handleCardClickMaintenance = () => {
      navigateTo(Routes.MANUTENCAO);
    };
    const handleCardClickTransit = () => {
      return null;
    };
    const handleCardClickNegotiation = () => {
      return null;
    };
    return (
      <CardsWrapper>
        <CardClickable onClick={handleCardClickMaintenance}>
          <StatusCard
            filterOptions={['Item', 'NF-e', 'Valor']}
            selectedFilter={historyStore.firstFilter}
            onFilterSelect={(selectedValue) => {
              historyStore.firstFilter = selectedValue;
              onFilterChange();
            }}
            title="Manutenção"
            value={data.maintenance}
            extraText={`${data.maintenanceVariation > 0 ? '+' : ''}${data.maintenanceVariation} esse mês`}
            icon={
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 50, color: '#f58220', fontWeight: 200 }}
              >
                build
              </span>
            }
            circleColor="#ffead8"
          />
        </CardClickable>
        <CardClickable onClick={handleCardClickTransit}>
          <StatusCard
            filterOptions={['NF-e', 'Item', 'Valor']}
            selectedFilter={historyStore.secondFilter}
            onFilterSelect={(selectedValue) => {
              historyStore.secondFilter = selectedValue;
              onFilterChange();
            }}
            title="Trânsito"
            value={data.transit}
            icon={
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 50, color: '#f58220', fontWeight: 200 }}
              >
                delivery_truck_speed
              </span>
            }
            circleColor="#ffead8"
          />
        </CardClickable>
        <CardClickable onClick={handleCardClickNegotiation}>
          <StatusCard
            filterOptions={['Valor', 'Item', 'NF-e']}
            selectedFilter={historyStore.thirdFilter}
            onFilterSelect={(selectedValue) => {
              historyStore.thirdFilter = selectedValue;
              onFilterChange();
            }}
            title="Negociação"
            value={data.negotiation}
            icon={
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 50, color: '#f58220', fontWeight: 200 }}
              >
                currency_exchange
              </span>
            }
            circleColor="#ffead8"
          />
        </CardClickable>
      </CardsWrapper>
    );
  },
);

export default StatusCards;
