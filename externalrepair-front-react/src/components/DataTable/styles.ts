import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const COLOR_HEADER_BG = '#e9e9e9';
export const COLOR_HEADER_TEXT = '#959595';
export const COLOR_CELL_TEXT = '#595959';
export const COLOR_BORDER = '#d2d2d2';
export const COLOR_ROW_HOVER = 'var(--color-gray-lightest)';

export const TableWrapper = styled.div`
  padding: ${pxToRem(16)} 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const getGridColumns = (
  hasEmissionDate: boolean,
  hasIssuerReceiver: boolean,
  hasTotalQuantity: boolean,
  hasStatus: boolean,
  hasType: boolean,
) => {
  const columns = ['1fr'];
  if (hasEmissionDate) columns.push('1fr');
  if (hasIssuerReceiver) columns.push('3fr');
  if (hasTotalQuantity) columns.push('1fr');
  if (hasStatus) columns.push('1fr');
  if (hasType) columns.push('1fr');
  return columns.join(' ');
};

export const Table = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    ![
      'hasEmissionDate',
      'hasIssuerReceiver',
      'hasTotalQuantity',
      'hasStatus',
      'hasType',
    ].includes(prop),
})<{
  hasEmissionDate?: boolean;
  hasIssuerReceiver?: boolean;
  hasTotalQuantity?: boolean;
  hasStatus?: boolean;
  hasType?: boolean;
}>`
  display: grid;
  grid-template-columns: ${({
    hasEmissionDate,
    hasIssuerReceiver,
    hasTotalQuantity,
    hasStatus,
    hasType,
  }) =>
    getGridColumns(
      hasEmissionDate ?? true,
      hasIssuerReceiver ?? true,
      hasTotalQuantity ?? true,
      hasStatus ?? true,
      hasType ?? true,
    )};
  row-gap: ${pxToRem(3)};
  width: 100%;
`;

export const ScrollableContainerTableHome = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  max-height: 74.5vh;
  padding: 0;

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
`;

export const TableRow = styled.div<{ onClick: () => void }>`
  cursor: pointer;
  display: contents;
  align-content: center;
`;

export const TableCell = styled.div.withConfig({
  shouldForwardProp: (prop) => !['$hovered'].includes(prop as string),
})<{
  align?: 'left' | 'right' | 'center';
  $hovered?: boolean;
}>`
  white-space: nowrap;
  &:hover {
    background-color: var(--color-gray-lightest);
  }
  text-overflow: ellipsis;
  margin-left: ${pxToRem(4)};
  margin-right: ${pxToRem(4)};
  padding-left: ${pxToRem(8)};
  text-align: ${({ align }) => align || 'left'};
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: ${COLOR_CELL_TEXT};
  display: flex;
  align-items: left;
  height: 25px;
  justify-content: center;
  transition: background-color 0.2s ease;
  background-color: ${({ $hovered }) =>
    $hovered ? COLOR_ROW_HOVER : 'transparent'};
`;

export const NfeCell = styled(TableCell)`
  display: flex;
  flex-direction: row;
  border-radius: ${pxToRem(5)};
  background: ${({ $hovered }) =>
    $hovered ? COLOR_ROW_HOVER : 'var(--color-background-primary)'};
  padding: 0 ${pxToRem(12)};
  width: 94%;
  height: ${pxToRem(25)};
  align-items: center;
  font-size: ${pxToRem(12)};
  vertical-align: middle;
  align-items: center;
  justify-content: space-between;
  transition:
    background-color 0.2s ease,
    background 0.2s ease;

  &:hover .eye-icon {
    opacity: 1;
  }
  .eye-icon {
    opacity: 0;
    transition: opacity 0.2s;
  }

  &:hover {
    border: 1px solid ${COLOR_BORDER};
  }
`;

export const StatusCell = styled(TableCell).withConfig({
  shouldForwardProp: (prop) =>
    !['background', 'textColor', 'borderColor', '$hovered'].includes(
      prop as string,
    ),
})<{
  background: string;
  textColor: string;
  borderColor: string;
  $hovered?: boolean;
}>`
  min-width: ${pxToRem(112)};
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $hovered }) =>
    $hovered ? COLOR_ROW_HOVER : 'transparent'};
  > div {
    display: block;
    width: 100%;
    text-align: center;
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: ${pxToRem(10)};
    border-radius: ${pxToRem(5)};
    padding: 0;
    margin: 0;
    height: ${pxToRem(20)};
    line-height: ${pxToRem(20)};
    border: 1px solid;
    background: ${({ background }) => background};
    color: ${({ textColor }) => textColor};
    border-color: ${({ borderColor }) => borderColor};
    box-sizing: border-box;
  }
`;
