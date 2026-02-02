import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 80px;
`;

export const CorrectionButton = styled.div<{ hasFile?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-direction: row;
  width: 170px;
  height: 25px;
  border: 1px solid var(--color-red-lightest);
  background-color: var(--color-gray-lighter);
  margin-left: 10px;
  border-radius: 6px;
  padding: 6px 16px;
  color: #bbbbbb;

  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  svg,
  span {
    color: #bbbbbb;
    font-size: 16px;
  }
`;

export const JustificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 3px;
`;
export const ReturnJustificationNfValue = styled.div`
  border: 1px solid var(--color-red-lightest);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  gap: 4px;
  background: var(--color-gray-lighter);
  color: #bbbbbb;
  padding: 3px 12px 3px 3px;
  border-radius: 4px;
  height: 25px;
  font-size: 12px;
  font-weight: 500;
`;
export const JustificationNumberNfValue = styled.span`
  width: 21px;
  height: 19px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  color: #bbbbbb;
  background: var(--color-gray-lighter);

  padding: 3px;
  border-radius: 4px;
  margin-right: 4px;
`;
export const Justification = styled.div`
  width: 585px;
  height: 70px;
  border: 1px solid #c7c7c7;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: #333;
  background-color: #ffffff;
  resize: none;
`;
