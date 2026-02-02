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

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  padding: 8px;
`;

export const TableWrapper = styled.div<{ expanded: boolean }>`
  padding: ${({ expanded }) =>
    expanded ? '16px 16px 0px 16px' : '16px 16px 16px 16px'};
  width: 100%;
`;

export const Container = styled.div<{ borderColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 10px;
  width: 100%;
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

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
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

export const RowFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  gap: 4px;
  margin-left: 18px;
  margin-right: 10px;
  position: absolute;
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 4px;
`;

export const ColumnField = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldLabel = styled.span`
  border-radius: 5px;
  padding: 2px 10px;
  font-weight: 300;
  font-size: 12px;
  color: var(--color-text-light);
  margin-bottom: 4px;
  display: inline-block;
  white-space: nowrap;
  text-align: left;
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
  color: var(--color-text-light);
  margin-bottom: 0;
  border: 1px solid #b8b8b8;
  border-radius: 5px;
  padding: 4px 10px 4px 10px;
  background: #fafafa;
  overflow: hidden;
  width: 100%;
  height: 25px;
  box-sizing: border-box;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  :focus {
    border: 1px solid var(--color-secondary);
  }
`;

export const InputNfeContainer = styled.div<{ hasFile?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: row;
  width: 170px;
  height: 25px;
  border: 1px solid #db3537;
  border-radius: 6px;
  padding: 6px 16px;
  background: ${({ hasFile }) => (hasFile ? '#db3537' : '#fff')};
  color: ${({ hasFile }) => (hasFile ? '#fff' : '#db3537')};
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ hasFile }) => (hasFile ? '#b71c1c' : '#fff5f5')};
    border-color: #b71c1c;
  }

  svg,
  span {
    color: ${({ hasFile }) => (hasFile ? '#fff' : '#db3537')};
    font-size: 16px;
  }
`;

export const SaveButton = styled.button<{
  loading?: boolean;
  isFormValid?: boolean;
}>`
  background: var(--color-border-success);
  border: none;
  color: #fff;
  border-radius: 5px;
  padding: 4px 36px;
  font-size: 12px;
  height: 25px;
  opacity: ${({ loading, disabled }) => (loading || disabled ? 0.5 : 1)};
  cursor: ${({ loading, disabled }) =>
    loading || disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ReturnNfButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #db3537;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 4px 16px;
  height: 25px;
  font-size: 12px;
  cursor: default;

  &:disabled {
    opacity: 1;
    cursor: default;
  }
`;

export const ReturnNfValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
  background: var(--color-gray-lighter);
  color: var(--color-text-medium);
  padding: 3px 12px 3px 3px;
  border-radius: 4px;
  height: 25px;
  font-size: 12px;
  font-weight: 500;
`;

export const NumberNfValue = styled.span`
  width: 21px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-text-medium);
  background-color: #c8c4c4;
  padding: 3px;
  border-radius: 4px;
  margin-right: 4px;
`;

export const ReturnActionButton = styled.button<{ variant?: 'danger' }>`
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ variant }) =>
    variant === 'danger' ? '#dc3545' : 'var(--color-gray-lighter)'};
  color: ${({ variant }) =>
    variant === 'danger' ? '#fff' : 'var(--color-text-medium)'};
  border: none;
  border-radius: 4px;
  padding: 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ variant }) =>
      variant === 'danger' ? '#c82333' : 'var(--color-gray-light)'};
  }

  span {
    font-size: 18px;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const RelatedNfButtonContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 12px;
  flex-direction: row;
`;

export const RelatedNfButton = styled.button<{ expanded?: boolean }>`
  align-self: ${({ expanded }) => (expanded ? 'flex-end' : 'flex-start')};
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 12px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;
  span {
    font-size: 22px;
  }
`;
export const RelatedNfIcon = styled.span`
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

export const ExpandedContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
`;

export const ExpandedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`;

export const ExpandedTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export const ExpandedTitleIcon = styled(RelatedNfIcon)`
  margin-right: 8px;
`;

export const AddNfButton = styled(RelatedNfButton)`
  margin: 0;
  align-self: flex-start;
`;

export const RelatedNfItem = styled(InputsContainer)``;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #db3537;
  padding: 4px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  margin-top: 10px;
`;
