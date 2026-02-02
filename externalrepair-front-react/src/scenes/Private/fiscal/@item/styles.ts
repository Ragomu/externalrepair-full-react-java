import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

const COLOR_HEADER_BG = '#e9e9e9';
const COLOR_HEADER_TEXT = '#959595';
const COLOR_CELL_TEXT = '#595959';

export const TitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  padding: 3% 3%;
`;

export const ContentScrollContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 0% 3% 3% 3%;
  overflow-y: auto;
  max-height: 600px;
`;

export const TableWrapper = styled.div<{ expanded: boolean }>`
  padding: ${({ expanded }) =>
    expanded ? '16px 16px 0px 16px' : '16px 16px 16px 16px'};
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: 10px;
`;

export const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr 2fr 0.5fr 0.5fr;
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

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding: 0 16px 16px 20px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 23px;
  width: 120px;
  padding: 6px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #a1a1a1;
  color: white;
`;

export const SignalButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 12px;
  cursor: pointer;
  padding-left: 24px;

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

export const ExpandedContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
`;

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 12px;
  padding-right: 12px;
  flex-direction: row;
  justify-content: flex-end;
  gap: 8px;
`;
