import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

const COLOR_HEADER_BG = '#e9e9e9';
const COLOR_HEADER_TEXT = '#959595';
const COLOR_CELL_TEXT = '#595959';

export const Wrapper = styled.div`
  margin-bottom: 20px;
`;

export const Container = styled.div<{
  expanded?: boolean;
  borderColor?: string;
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background-primary);
  border-radius: 16px;
  border: 1px solid ${({ borderColor }) => borderColor || '#dadada'};
  box-sizing: border-box;
  align-self: center;
  width: 100%;
  transition: all 0.3s ease;
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
  margin-top: 6px;
  padding-left: 12px;
  padding-bottom: 12px;
  padding-right: 12px;
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
`;

// Estilos da tabela parcial - igual ao PartialMaintenanceTable
export const TableWrapper = styled.div<{ expanded: boolean }>`
  padding: ${({ expanded }) =>
    expanded ? '16px 16px 0px 16px' : '16px 16px 16px 16px'};
  width: 100%;
  background: var(--color-background-primary);
  border-radius: 16px;
  box-sizing: border-box;
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr;
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
