import React, { useState } from 'react';
import FilterDropdown from '../FilterDropdown';

import { Text } from '../Typography/styles';
import {
  Card,
  CardContent,
  CardExtra,
  CardHeaderWrapper,
  CardLeft,
  CardRight,
  CardSubtitle,
  CardValue,
  CardValueCipher,
  CardValueContainer,
  CardValueUnit,
  IconCircle,
} from './styles';

interface StatusCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  circleColor?: string;
  subtitle?: string;
  extraText?: string;
  filterOptions?: string[];
  onFilterSelect?: (selectedOption: string) => void;
  selectedFilter?: string;
}

function formatExtraText(extraText: string) {
  const match = extraText.match(/^\+\d+/);
  if (!match) return extraText;
  return (
    <span style={{ display: 'inline', whiteSpace: 'nowrap' }}>
      <span style={{ color: '#43a047', fontWeight: 600 }}>{match[0]}</span>
      <span style={{ color: '#a2a2a2', fontWeight: 500 }}>
        {` ${extraText.replace(/^\+\d+/, '').trim()}`}
      </span>
    </span>
  );
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  circleColor,
  subtitle = 'Total',
  extraText,
  filterOptions,
  onFilterSelect,
  selectedFilter,
}) => {
  const [currentSelectedOption, setCurrentSelectedOption] = useState<string>(
    () => (filterOptions && filterOptions.length > 0 ? filterOptions[0] : ''),
  );

  const selectedOption =
    selectedFilter !== undefined ? selectedFilter : currentSelectedOption;

  const isCurrency = selectedOption === 'Valor';

  const handleLocalFilterSelect = (option: string) => {
    setCurrentSelectedOption(option);
    if (onFilterSelect) {
      onFilterSelect(option);
    }
  };

  return (
    <Card>
      <CardHeaderWrapper>
        <Text variant="subtitle">{title}</Text>
        {filterOptions && onFilterSelect && (
          <FilterDropdown
            options={filterOptions}
            onSelect={handleLocalFilterSelect}
            value={selectedOption}
          />
        )}
      </CardHeaderWrapper>
      <CardContent>
        <CardLeft>
          <IconCircle circleColor={circleColor}>{icon}</IconCircle>
        </CardLeft>
        <CardRight>
          <CardSubtitle>{subtitle}</CardSubtitle>
          {isCurrency ? (
            <CardValueContainer>
              <CardValueCipher>R$</CardValueCipher>
              <CardValue>{value}</CardValue>
              <CardValueUnit>mil</CardValueUnit>
            </CardValueContainer>
          ) : (
            <CardValue>{value}</CardValue>
          )}
          {extraText && <CardExtra>{formatExtraText(extraText)}</CardExtra>}
        </CardRight>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
