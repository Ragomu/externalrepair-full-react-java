import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const Container = styled.div`
  padding: ${pxToRem(24)} ${pxToRem(32)};
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: ${pxToRem(24)};
`;

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 74.5vh;
  width: 100%;
  border-radius: 16px;
  padding: 0 3%;

  &::-webkit-scrollbar {
    display: block;
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const DataTableContainer = styled.div`
  width: 100%;
  margin-bottom: 120px;
`;
