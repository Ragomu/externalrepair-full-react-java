import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background-primary);
  border-radius: 16px;
  margin: 48px;
  box-sizing: border-box;
  align-self: center;
  width: 100%;
  padding: 0 3%;
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
  padding: 0 16px 16px 20px;
`;
export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
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
