import React, { useState } from 'react';
import Divider from '../Divider';
import { Text } from '../Typography/styles';
import {
  ActionButton,
  ButtonSection,
  DateField,
  DateInput,
  DateSection,
  FilterModalContainer,
  FilterRow,
  FilterSection,
  LeftButtons,
  RadioButton,
  RadioGroup,
  RadioLabel,
  RightButtons,
} from './styles';

interface FilterModalProps {
  onClose: () => void;
  onApply: (filters: FilterData) => void;
  statusOptions?: StatusOption[][];
}

interface FilterData {
  status: string[];
  dateFrom: string;
  dateTo: string;
}

interface StatusOption {
  id: string;
  label: string;
}

const DEFAULT_STATUS_OPTIONS: StatusOption[][] = [
  [
    { id: 'partial', label: 'Ret. Parcial' },
    { id: 'complete', label: 'Ret. Completo' },
  ],
  // [
  // { id: 'started', label: 'Iniciado' },
  // { id: 'not_started', label: 'Não iniciado' },
  // ],
];

const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  onApply,
  statusOptions,
}) => {
  const statusGroups: StatusOption[][] =
    statusOptions || DEFAULT_STATUS_OPTIONS;

  const groupsLength = statusGroups.length > 0 ? statusGroups.length : 0;

  const [selectedStatus, setSelectedStatus] = useState<string[]>(
    Array(groupsLength).fill(''),
  );
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const handleStatusChange = (groupIdx: number, optionId: string) => {
    setSelectedStatus((prev) => {
      const updated = [...prev];
      updated[groupIdx] = optionId;
      return updated;
    });
  };

  const handleClear = () => {
    setSelectedStatus(Array(groupsLength).fill(''));
    setDateFrom('');
    setDateTo('');
  };

  const handleSave = () => {
    onApply({
      status: selectedStatus,
      dateFrom,
      dateTo,
    });
    onClose();
  };

  return (
    <FilterModalContainer>
      <FilterSection>
        {statusGroups.map((group, groupIdx) => (
          <FilterRow key={groupIdx} style={{ flexDirection: 'row', gap: 24 }}>
            {group.map((option) => (
              <RadioGroup
                key={option.id}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
              >
                <RadioButton
                  selected={selectedStatus[groupIdx] === option.id}
                  onClick={() => handleStatusChange(groupIdx, option.id)}
                />
                <RadioLabel
                  onClick={() => handleStatusChange(groupIdx, option.id)}
                >
                  {option.label}
                </RadioLabel>
              </RadioGroup>
            ))}
          </FilterRow>
        ))}
      </FilterSection>
      <Divider />
      <DateSection>
        <DateField>
          <DateInput
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </DateField>
        <Text variant="small" color="#d5d5d5">
          -
        </Text>
        <DateField>
          <DateInput
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </DateField>
      </DateSection>
      <Divider />
      <ButtonSection>
        <LeftButtons>
          <ActionButton variant="clear" onClick={handleClear}>
            Limpar
          </ActionButton>
        </LeftButtons>
        <RightButtons>
          <ActionButton variant="cancel" onClick={onClose}>
            Cancelar
          </ActionButton>
          <ActionButton variant="save" onClick={handleSave}>
            Buscar
          </ActionButton>
        </RightButtons>
      </ButtonSection>
    </FilterModalContainer>
  );
};

export default FilterModal;
