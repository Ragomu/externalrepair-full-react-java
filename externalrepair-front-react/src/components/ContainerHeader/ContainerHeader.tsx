import React from 'react';
import ContainerHeaderActions from '../Historic/ContainerHeaderActions';
import { Header, Title } from '../Historic/styles';

interface ContainerHeaderProps {
  title?: string;
  filterOptions?: Array<{ id: string; label: string }>;
  onFilterChange?: (filterId: string) => void;
  onSearch?: (searchTerm: string) => void;
  showFilters?: boolean;
}

const ContainerHeader: React.FC<ContainerHeaderProps> = ({
  title,
  filterOptions,
  onFilterChange,
  onSearch,
  showFilters = true,
}) => (
  <Header>
    <Title>{title}</Title>
    <ContainerHeaderActions
      initialFilters={showFilters ? filterOptions : undefined}
      onFilterSelect={showFilters ? onFilterChange : undefined}
      onSearchSubmit={onSearch}
      showFilters={showFilters}
    />
  </Header>
);

export default ContainerHeader;
