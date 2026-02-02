import React, { useState } from 'react';
import FilterModal from '../FilterModal/FilterModal';
import { Text } from '../Typography/styles';
import {
  Actions,
  FilterButton,
  FilterContainer,
  SearchContainer,
  SearchIcon,
  SearchInput,
} from './styles';

const MysteryIcon = () => (
  <span
    className="material-symbols-outlined"
    style={{ fontSize: 15, fontWeight: 300 }}
  >
    mystery
  </span>
);

interface StatusOption {
  id: string;
  label: string;
}

interface FilterOptionType {
  id: string;
  label: string;
}

interface FilterData {
  status: string[];
  dateFrom: string;
  dateTo: string;
}

interface AdvancedFilterOptions {
  statusOptions?: StatusOption[][];
  typeOptions?: string[];
}

interface ContainerHeaderActionsProps {
  initialFilters?: FilterOptionType[];
  onFilterSelect?: (filterId: string) => void;
  onSearchSubmit?: (searchTerm: string) => void;
  onAdvancedFilterApply?: (queryString: string) => void;
  showSearch?: boolean;
  showFilters?: boolean;
  showFiltersPlus?: boolean;
  advancedFilterOptions?: AdvancedFilterOptions;
}

export const DEFAULT_FILTER_OPTIONS: FilterOptionType[] = [
  { id: 'all', label: 'Todos' },
  { id: 'complete', label: 'Completos' },
  { id: 'incomplete', label: 'Incompletos' },
];

const ContainerHeaderActions: React.FC<ContainerHeaderActionsProps> = ({
  initialFilters,
  onFilterSelect,
  onSearchSubmit,
  onAdvancedFilterApply,
  showSearch = true,
  showFilters = true,
  showFiltersPlus = false,
  advancedFilterOptions,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const filtersToUse = initialFilters || DEFAULT_FILTER_OPTIONS;
  const [selectedFilterId, setSelectedFilterId] = useState<string>(
    filtersToUse[0]?.id || '',
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (onSearchSubmit && e.target.value === '') {
      onSearchSubmit('');
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit(searchTerm);
    }
  };

  const handleFilterClick = (filterId: string) => {
    setSelectedFilterId(filterId);
    if (onFilterSelect) {
      onFilterSelect(filterId);
    }
  };

  const handleAdvancedFilterApply = (filters: FilterData) => {
    const params = new URLSearchParams();

    if (filters.status && filters.status.length > 0) {
      const statusValue = filters.status[0];
      if (statusValue) {
        params.append('status', statusValue);
      }

      const typeValue = filters.status[1];
      if (typeValue) {
        params.append('type', typeValue);
      }
    }

    if (filters.dateFrom) {
      params.append('startDate', filters.dateFrom);
    }
    if (filters.dateTo) {
      params.append('finalDate', filters.dateTo);
    }

    if (onAdvancedFilterApply) {
      onAdvancedFilterApply(params.toString());
    }
    setShowFilterModal(false);
  };

  return (
    <Actions>
      {showSearch && (
        <SearchContainer>
          <SearchIcon>
            <MysteryIcon />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
          />
        </SearchContainer>
      )}
      {showFiltersPlus && (
        <FilterContainer>
          <FilterButton
            isSelected={showFilterModal}
            onClick={() => setShowFilterModal(!showFilterModal)}
          >
            <Text variant="small"> Filtro</Text>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 15, fontWeight: 300, color: '#444' }}
            >
              discover_tune
            </span>
          </FilterButton>
          {showFilterModal && (
            <FilterModal
              onClose={() => setShowFilterModal(false)}
              onApply={handleAdvancedFilterApply}
              statusOptions={advancedFilterOptions?.statusOptions}
            />
          )}
        </FilterContainer>
      )}
      {showFilters && (
        <FilterContainer>
          {filtersToUse.map((filter) => (
            <FilterButton
              key={filter.id}
              isSelected={selectedFilterId === filter.id}
              onClick={() => handleFilterClick(filter.id)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </FilterContainer>
      )}
    </Actions>
  );
};

export default ContainerHeaderActions;

export const STATUS_FILTERS = [
  { id: 'finished', label: 'Completo' },
  { id: 'unfinished', label: 'Incompleto' },
];

export const TYPE_FILTERS = [
  { id: 'partial', label: 'Parcial' },
  { id: 'complete', label: 'Completo' },
  { id: 'irreparable', label: 'Irreparável' },
];

export const MAINTENANCE_FILTERS = [
  // STATUS_FILTERS,
  TYPE_FILTERS,
];

export const RECEIVING_FILTERS = [
  [
    { id: 'negotiation', label: 'Negociação' },
    { id: 'transit', label: 'Trânsito' },
  ],
];

export const FISCAL_FILTERS = [
  [
    { id: 'approved', label: 'Aprovado' },
    { id: 'pending', label: 'Pendente' },
    { id: 'rejected', label: 'Rejeitado' },
  ],
];

export const WAREHOUSE_FILTERS = [
  [
    { id: 'finished', label: 'Completo' },
    { id: 'unfinished', label: 'Incompleto' },
  ],
];
