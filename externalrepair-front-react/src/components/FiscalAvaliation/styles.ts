import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 14px;
  gap: 2.5px;
`;

export const JustificationArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2.5px;
  height: auto;
`;
export const JustificationInput = styled.textarea`
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

  &:focus {
    outline: none;
    border-color: #999999;
  }

  &::placeholder {
    color: #999;
    font-size: 14px;
  }
`;

export const ContainerAdditionalButtonsNfs = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`;
export const ButtonContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

export const RelatedNfButton = styled.button`
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
  cursor: pointer;
`;

export const RelatedNfValue = styled.div`
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

export const RelatedNumberNfValue = styled.span`
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
