import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuItem,
  FilterContainer,
  FilterIcon,
  FilterText,
} from './styles';

export interface FilterDropdownProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
  value: string;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  onSelect,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <FilterContainer
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      <FilterText>{value}</FilterText>
      <FilterIcon>
        <span className="material-symbols-outlined">
          {isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        </span>
      </FilterIcon>
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownMenuItem key={option} onClick={() => handleSelect(option)}>
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      )}
    </FilterContainer>
  );
};

export default FilterDropdown;
