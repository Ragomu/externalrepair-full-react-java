import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const HistoricWrapper = styled.div`
  background-color: var(--color-background-primary);
  width: 100%;
  height: 66.5dvh;
  display: flex;
  flex-direction: column;
  margin-top: ${pxToRem(10)};
  border-radius: ${pxToRem(10)};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

export const Header = styled.header`
  padding: 24px 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h2`
  font-weight: 500;
  font-size: 18px;
  color: var(--color-text-primary);
  margin: 0;
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  flex-wrap: wrap;
  gap: ${pxToRem(10)};

  @media (max-width: 900px) {
    margin-left: ${pxToRem(20)};
    justify-content: center;
  }
  @media (max-width: 600px) {
    margin-left: ${pxToRem(10)};
    flex-direction: column;
    justify-content: center;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  max-width: ${pxToRem(190)};
  width: 100%;
  min-width: ${pxToRem(150)};
  margin-right: ${pxToRem(10)};

  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: ${pxToRem(10)};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 23px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  padding: 4px 16px 4px 30px;

  font-size: 12px;
  color: var(--color-text-medium);
  outline: none;

  &::placeholder {
    color: var(--color-text-light);
    font-family: 'DM Sans';
    font-weight: 400;
    line-height: 15.62px;
  }
`;

export const SearchIcon = styled.span`
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 15px;
  height: 15px;

  .material-symbols-outlined {
    font-size: 15px;
    font-weight: 300;
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: row;
  border-radius: 20px;
  padding: 1px;
  background-color: var(--color-background-secondary);
`;

export const FilterButton = styled.button<{ isSelected: boolean }>`
  border: none;
  border-radius: 20px;
  padding: 4px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin: 1px;
  height: 23px;
  cursor: pointer;

  font-size: 12px;
  color: ${(props) =>
    props.isSelected ? 'var(--color-text-medium)' : 'var(--color-text-light)'};
  transition: all 0.2s;
  background-color: ${(props) =>
    props.isSelected ? 'var(--color-background-primary)' : 'transparent'};
  &:hover {
    background: ${(props) =>
      props.isSelected
        ? 'var(--color-background-primary)'
        : 'var(--color-background-secondary)'};
  }
`;

export const TableWrapper = styled.div`
  padding: 16px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
`;

export const Table = styled.div`
  background: var(--color-background-primary);
  /* overflow: hidden; */
  display: flex;
  flex-direction: column;
  min-width: 900px;
`;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: none;
  padding: 10px 64px;
  border-bottom: 1px solid var(--color-border);

  font-weight: 500;
  font-size: 14px;
  color: var(--color-text-light);
`;

export const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 12px 64px;

  font-size: 12px;
  color: var(--color-text-medium);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-background-secondary);
    justify-self: center;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.div<{
  align?: 'left' | 'right' | 'center';
  flex?: number;
}>`
  white-space: nowrap;
  /* overflow: hidden; */
  text-overflow: ellipsis;
  padding-right: 16px;
  text-align: ${({ align }) => align || 'left'};
  width: ${({ flex }) => (flex ? `${flex * 15}%` : '15%')};

  &:nth-child(1) {
    width: 15%;
  }
  &:nth-child(2) {
    width: 15%;
  }
  &:nth-child(3) {
    width: 30%;
  }
  &:nth-child(4) {
    width: 15%;
  }
  &:nth-child(5) {
    width: 15%;
  }
  &:nth-child(6) {
    width: 10%;
  }
`;

export const StatusBadge = styled.span<{ complete?: boolean }>`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  max-width: 80px;
  padding: 2px 16px;
  border-radius: 5px;
  background: ${({ complete }) =>
    complete ? 'var(--color-success-light)' : 'var(--color-yellow-lighter)'};
  color: ${({ complete }) =>
    complete ? 'var(--color-success-green)' : 'var(--color-yellow-dark)'};
  border: 1px solid
    ${({ complete }) =>
      complete ? 'var(--color-success-green)' : 'var(--color-yellow-dark)'};
  font-size: 10px;

  text-align: center;
`;

export const SkeletonCell = styled.div`
  height: 18px;
  background: #e0e0e0;
  border-radius: 4px;
  margin: 6px 0;
  width: 80%;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 1;
    }
  }
`;
