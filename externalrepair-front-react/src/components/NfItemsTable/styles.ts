import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

const COLOR_HEADER_BG = '#e9e9e9';
const COLOR_HEADER_TEXT = '#959595';
const COLOR_CELL_TEXT = '#595959';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
`;

export const Container = styled.div<{
  borderStatus: 'default' | 'success' | 'error';
}>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid
    ${({ borderStatus }) =>
      borderStatus === 'success'
        ? 'var(--color-border-success)'
        : borderStatus === 'error'
          ? 'var(--color-error)'
          : 'var(--color-border)'};
  border-radius: 10px;
  width: 100%;
`;

export const TableWrapper = styled.div<{ expanded: boolean }>`
  padding: ${({ expanded }) =>
    expanded ? '16px 16px 0px 16px' : '16px 16px 16px 16px'};
  width: 100%;
`;

export const Table = styled.div<{ gridColumns: string }>`
  display: grid;
  grid-template-columns: ${({ gridColumns }) => gridColumns};
  row-gap: ${pxToRem(3)};
  width: 100%;
`;

export const TableHeader = styled.div`
  display: contents;
`;

export const TableHeaderCell = styled.div`
  border-radius: ${pxToRem(5)};
  margin-right: ${pxToRem(4)};
  margin-bottom: ${pxToRem(4)};
  display: flex;
  text-align: left;
  color: ${COLOR_HEADER_TEXT};
  font-weight: 500;
  font-size: ${pxToRem(14)};
  height: ${pxToRem(23)};
  justify-content: center;
  padding-left: ${pxToRem(16)};
  background-color: ${COLOR_HEADER_BG};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
`;

export const TableRow = styled.div`
  display: contents;
  align-content: center;
`;

export const TableCell = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: ${pxToRem(4)};
  margin-right: ${pxToRem(4)};
  padding-left: ${pxToRem(8)};
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: ${COLOR_CELL_TEXT};
  display: flex;
  height: 25px;
  justify-content: flex-start;
  transition: background-color 0.2s ease;
`;

export const ButtonContainer = styled.div<{ expanded?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ expanded }) => (expanded ? 'flex-end' : 'flex-start')};
  width: 100%;
  padding-left: 12px;
  padding-right: 24px;
  flex-direction: row;
  gap: 8px;
`;

export const SignalButton = styled.button<{ expanded?: boolean }>`
  align-self: ${({ expanded }) => (expanded ? 'flex-end' : 'flex-start')};
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 12px;
  cursor: pointer;

  span {
    font-size: 22px;
  }
`;

export const SignalIcon = styled.span`
  font-size: 22px;
  margin-right: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  color: var(--color-gray-dark);
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 8px;
`;

export const Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;
