import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

const COLOR_HEADER_BG = '#e9e9e9';
const COLOR_HEADER_TEXT = '#959595';
const COLOR_CELL_TEXT = '#595959';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 36px;
  padding-right: 36px;
  padding-top: 16px;
  margin-bottom: 42px;
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
`;

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
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
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

export const MaintenanceItemContainer = styled.div<{ received?: boolean }>`
  display: flex;
  flex-direction: column;
  background: var(--color-background-primary);
  border-radius: 16px;
  border: 1px solid
    ${({ received }) => (received ? 'var(--color-success-green)' : '#dadada')};
  box-sizing: border-box;
  width: 100%;
`;

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 74.5vh;
  width: 100%;
  border-radius: 16px;

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

export const ReceiptHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-background-secondary);
  width: 100%;
  padding: 20px;
`;

export const FieldsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 24px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
`;

export const FieldsRowExpanded = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-start;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 24px;
  padding-top: 0;
`;

export const FieldColumn = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'minWidth' && prop !== 'width',
})<{ width?: string; minWidth?: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? `${width}` : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? `${pxToRem(minWidth)}` : '120px')};
`;

export const FieldLabel = styled.span`
  background: var(--color-background-secondary);
  border-radius: 5px;
  padding: 6px 18px;
  font-weight: 500;
  font-size: 12px;
  color: var(--color-text-light);
  margin-bottom: 4px;
  display: inline-block;
  white-space: nowrap;
`;

export const FieldValue = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: var(--color-text-medium);
  margin-bottom: 0;
  border-radius: 5px;
  padding: 6px 18px;
  background: #fafafa;
  overflow: hidden;
`;

export const EditableFieldValue = styled.input`
  font-weight: 400;
  font-size: 12px;
  color: var(--color-text-medium);
  margin-bottom: 0;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 6px 18px;
  background: #fafafa;
  overflow: hidden;
`;

export const EditableFieldWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EditableFieldInput = styled.input`
  font-weight: 400;
  font-size: 12px;
  color: #595959;
  margin-bottom: 0;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  padding: 6px 40px 6px 18px;
  background: #fafafa;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  :focus {
    border: 1px solid var(--color-secondary);
  }
`;

export const EditIcon = styled.span`
  position: absolute;
  right: 12px;
  font-size: 16px;
  color: var(--color-text-light);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ReceiptItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: ${pxToRem(360)};
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

export const SaveButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 24px;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 24px;
`;

export const SaveButton = styled.button`
  align-self: flex-end;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 12px;
  cursor: pointer;
  span {
    font-size: 22px;
    margin-right: 4px;
  }
`;

export const SaveIcon = styled.span`
  font-size: 22px;
  margin-right: 4px;
  border-radius: 50%;
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
  padding-bottom: 0;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  padding-left: 16px;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 23px;
  width: 120px;
  padding: 6px 16px;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #a1a1a1;
  color: white;
  opacity: 1;

  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

export const ButtonsContainer = styled.div<{ $showReturnButton?: boolean }>`
  display: flex;
  justify-content: ${({ $showReturnButton }) =>
    $showReturnButton ? 'space-between' : 'flex-end'};
  flex-direction: row;

  width: 100%;
  padding: 6px;
`;

export const ReturnButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 12px;
  cursor: pointer;
  padding: 6px 12px;
  border-radius: 5px;
  transition: all 0.2s ease;

  span {
    font-size: 22px;
    margin-right: 4px;
  }
`;

export const DeleteButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 12px;
  padding-left: 16px;
  padding-top: 8px;
  transition: background 0.2s ease;
`;

export const DeleteIcon = styled.span`
  font-size: 18px;
  color: var(--color-text-light);
  transition: all 0.2s ease;
`;

export const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;

  &:hover {
    background-color: var(--color-danger-red);

    ${DeleteIcon} {
      color: #fff;
    }

    ${DeleteButtonContainer} {
      background: rgba(220, 53, 69, 0.1);
    }
  }
`;

export const DeleteButtonInline = styled.button`
  background: none;
  cursor: pointer;
  color: red;
  font-size: 16px;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #ffebee;
  }
`;

export const QuantityFormContainer = styled.div`
  margin-left: 6px;
`;

export const SubItemContainer = styled.div`
  margin-bottom: 16px;
`;

export const DeleteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const DestinyButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 6px;
  padding-left: 10px;
`;

export const DestinyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 23px;
  width: 120px;
  padding: 6px 16px;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #a1a1a1;
  color: white;
  opacity: 1;

  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

// Estilos específicos para os botões de aprovar/rejeitar
export const AproveRejectButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 6px;
  padding-left: 10px;
`;

export const AproveRejectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 23px;
  width: 120px;
  padding: 6px 16px;
  border-radius: 5px;
  border: none;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #a1a1a1;
  color: white;
  opacity: 1;

  &.disabled {
    opacity: 0.4;
    pointer-events: none;
  }

  &.approved {
    background-color: var(--color-success-green);
    cursor: default;
  }

  &.rejected {
    background-color: var(--color-danger-red);
    cursor: default;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubItemTableWrapper = styled.div<{ expanded: boolean }>`
  padding: ${({ expanded }) =>
    expanded ? '16px 16px 0px 16px' : '16px 16px 16px 16px'};
  width: 100%;
  background: var(--color-background-primary);
  border-radius: 16px;
  box-sizing: border-box;
`;

export const SubItemTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  row-gap: ${pxToRem(3)};
  width: 100%;
`;

export const SubItemTableHeader = styled.div`
  display: contents;
`;

export const SubItemTableHeaderCell = styled.div`
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

export const SubItemTableRow = styled.div`
  display: contents;
  align-content: center;
`;

export const SubItemTableCell = styled.div`
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
