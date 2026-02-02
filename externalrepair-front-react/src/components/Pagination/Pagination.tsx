import React from 'react';
import { NavigationButton, PageButton, PaginationContainer } from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 6;

    for (let i = 1; i <= Math.min(maxVisiblePages, totalPages); i++) {
      pages.push(
        <PageButton
          key={i}
          isActive={currentPage === i}
          onClick={() => {
            if (currentPage !== i) onPageChange(i);
          }}
        >
          {i}
        </PageButton>,
      );
    }

    return pages;
  };

  return (
    <PaginationContainer>
      <NavigationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </NavigationButton>

      {renderPageNumbers()}

      <NavigationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="material-symbols-outlined">arrow_forward</span>
      </NavigationButton>
    </PaginationContainer>
  );
};

export default Pagination;
