import styled from 'styled-components';

export const FilterModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 100%;
  right: 0;
  z-index: 1000;
  background: #ffffff;
  border: 1px solid #dedede;
  border-radius: 10px;
  width: fit-content;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
`;

export const FilterRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;

  flex-direction: row;
  gap: 5px;
`;

export const RadioButton = styled.div<{ selected: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid ${({ selected }) => (selected ? '#3153dd' : '#c1c1c1')};
  position: relative;
  cursor: pointer;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #3153dd;
    position: absolute;
    top: 1px;
    left: 1px;
    opacity: ${({ selected }) => (selected ? 1 : 0)};
  }
`;

export const RadioLabel = styled.span`
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #515151;
  cursor: pointer;
`;

export const DateSection = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 14px;
  margin-bottom: 14px;
  align-items: center;
  flex-direction: row;
  max-width: 220px;
`;

export const DateField = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 23px;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100px;
`;

export const DateInput = styled.input`
  border: none;
  outline: none;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: #a3a3a3;
  background: transparent;
  text-align: center;
  width: 100%;
  &::-webkit-inner-spin-button,
  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }

  &::placeholder {
    color: #a3a3a3;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-top: 12px;
`;

export const LeftButtons = styled.div`
  display: flex;
  flex-direction: row;
`;

export const RightButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
`;

export const ActionButton = styled.button<{
  variant: 'clear' | 'cancel' | 'save';
}>`
  background: none;
  border: none;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
  color: ${({ variant }) => {
    switch (variant) {
      case 'clear':
        return '#db3537';
      case 'cancel':
        return '#adadad';
      case 'save':
        return '#3153dd';
      default:
        return '#515151';
    }
  }};

  &:hover {
    opacity: 0.8;
  }
`;
