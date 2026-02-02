import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  align-self: center;
  margin: 16px 32px 32px 0;
`;

export const PageButton = styled.button<{ isActive?: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: none;
  background-color: ${({ isActive }) =>
    isActive
      ? 'var(--color-primary-orange)'
      : 'var(--color-background-secondary)'};
  color: ${({ isActive }) =>
    isActive ? 'var(--color-background-primary)' : 'var(--color-text-medium)'};
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 12px;
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    ${({ isActive }) =>
      !isActive &&
      `
      border: 1px solid #f58220;
      color: #f58220;
      transform: scale(0.99);
      .material-symbols-outlined {
        color: #f58220;
      }
    `}
  }
`;

export const NavigationButton = styled(PageButton)`
  background-color: #e8e8e8;

  .material-symbols-outlined {
    font-size: 20px;
    color: #716d6d;
  }

  &:hover {
    background-color: #d9d9d9;
    border: 1px solid #f58220;
  }

  &:disabled {
    cursor: default;
    opacity: 0.5;
    border: none;
    background-color: #e8e8e8;

    .material-symbols-outlined {
      color: #716d6d;
    }
  }
`;
