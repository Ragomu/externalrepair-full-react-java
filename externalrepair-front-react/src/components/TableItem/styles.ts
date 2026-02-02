import InputMask from 'react-input-mask';
import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: var(--color-background-primary);
  border-radius: 16px;
  box-sizing: border-box;
  align-self: center;
  width: 100%;
  margin: 48px 0 0 0;
  padding: 0 3% 0% 3%;
`;

export const TableItemContainer = styled.div<{ borderColor?: string }>`
  display: flex;
  flex-direction: column;
  background: var(--color-background-primary);
  border-radius: 16px;
  border: 1px solid ${({ borderColor }) => borderColor || 'var(--color-border)'};
  box-sizing: border-box;
  width: 100%;
`;

export const FieldsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-start;
  justify-content: space-between;
  padding-top: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
`;

export const FieldsRowExpanded = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: flex-start;
  padding-left: 16px;
  padding-right: 16px;
  padding-bottom: 16px;
  padding-top: 0;
`;

export const FieldColumn = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    prop !== 'minWidth' && prop !== 'width' && prop !== 'maxWidth',
})<{ width?: string; minWidth?: number; maxWidth?: number }>`
  display: flex;
  flex-direction: column;
  width: ${({ width }) => (width ? `${width}` : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? `${pxToRem(minWidth)}` : '90px')};
  max-width: ${({ maxWidth }) => (maxWidth ? `${pxToRem(maxWidth)}` : 'none')};
`;

export const FieldLabel = styled.span`
  background: var(--color-background-secondary);
  border-radius: 5px;
  padding: 6px 8px;
  font-weight: 500;
  font-size: 12px;
  height: 24px;
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
  height: 24px;

  padding: 6px 8px;
  background: #fafafa;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  border: 1px solid var(--color-blue-notification);
  border-radius: 5px;
  padding: 6px 40px 6px 18px;
  background: #fefeff;
  height: 24px;

  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border: 1px solid var(--color-blue-notification);
    outline: none;
  }
`;

export const EditableFieldCommonInput = styled.input`
  font-weight: 400;
  font-size: 12px;
  color: #595959;
  border: 1px solid var(--color-border);
  margin-bottom: 0;
  border-radius: 5px;
  padding: 6px 40px 6px 18px;
  background: #fefeff;
  height: 24px;

  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border: 1px solid var(--color-blue-notification);
  }
`;

export const PhoneInputMask = styled.input`
  font-weight: 400;
  font-size: 12px;
  color: #595959;
  border: 1px solid var(--color-border);
  margin-bottom: 0;
  border-radius: 5px;
  padding: 6px 40px 6px 18px;
  background: #fefeff;
  height: 24px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border: 1px solid var(--color-blue-notification);
  }
`;

export const StyledInputMask = styled(InputMask)`
  font-weight: 400;
  font-size: 12px;
  color: #595959;
  border: 1px solid var(--color-border);
  margin-bottom: 0;
  border-radius: 5px;
  padding: 6px 40px 6px 18px;
  background: #fefeff;
  height: 24px;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;

  &:focus {
    border: 1px solid var(--color-blue-notification);
  }
`;

export const EditableFieldCommonInputObservation = styled.textarea`
  font-weight: 400;
  font-size: 12px;
  color: #595959;
  border: 1px solid var(--color-border);
  margin-bottom: 0;
  border-radius: 5px;
  padding: 6px 40px 6px 18px;
  background: #fefeff;
  height: 80px;

  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  width: 585px;
  height: 120px;
  border: 1px solid #c7c7c7;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: #333;
  background-color: #ffffff;
  resize: none;
  font-family: 'DM Sans', sans-serif;
  vertical-align: top;

  &:focus,
  &:hover {
    border: 1px solid var(--color-blue-notification);
  }
`;

export const EditableFieldWrapperObservation = styled.div`
  position: relative;
  display: flex;
  align-items: baseline;
  justify-content: center;
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

export const SignalButton = styled.button`
  align-self: flex-start;
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
  padding-bottom: 16px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
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
