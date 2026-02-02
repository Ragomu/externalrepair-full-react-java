import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const FilterContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  cursor: pointer;
  padding: ${pxToRem(4)} ${pxToRem(8)};
  border-radius: ${pxToRem(4)};
  font-family: 'DM Sans', sans-serif;
  font-size: ${pxToRem(14)};
  font-weight: 400;
  color: #515151;
  background-color: var(--color-background-primary);
`;

export const FilterText = styled.span`
  margin-right: ${pxToRem(8)};
  justify-self: center;
  align-items: center;
`;

export const FilterIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: ${pxToRem(12)};
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: ${pxToRem(4)};
  margin-top: ${pxToRem(4)};
  z-index: 10;
  min-width: 100%;
`;

export const DropdownMenuItem = styled.div`
  padding: ${pxToRem(8)} ${pxToRem(12)};
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;
