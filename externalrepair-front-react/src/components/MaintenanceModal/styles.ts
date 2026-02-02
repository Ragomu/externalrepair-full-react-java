import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';
const orange = 'var(--color-primary-orange)';
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 510px;
  height: 410px;
  border-radius: 10px;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

export const Button = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  background: ${({ disabled }) => (disabled ? '#ccc' : '#4CAF50')};
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin-left: auto;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  &:hover {
    background: ${({ disabled }) => (disabled ? '#ccc' : '#45a049')};
  }
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 16px 24px 0;
  background: transparent;
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 10%;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 18px;
  color: #666;
  margin-left: auto;
`;
export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: white;
`;

export const Icon = styled.span`
  font-size: ${pxToRem(18)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
`;

export const ModalFooter = styled.div`
  width: 100%;
  padding: 16px 24px 24px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #f0f0f0;
  background-color: #eaeaea;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  @media (max-width: 600px) {
    padding: 12px 16px 16px;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const OptionCard = styled.div<{ selected: boolean; disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  border: 1px solid ${({ selected }) => (selected ? `${orange}` : '#e0e0e0')};
  border-radius: 10px;
  padding: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: 185px;
  height: 172px;
  background: white;
  transition: all 0.2s ease;
  overflow: hidden;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  &:hover {
    border-color: ${({ selected, disabled }) =>
      disabled ? '#e0e0e0' : selected ? `${orange}` : '#ccc'};

    .option-icon {
      background-color: ${({ selected, disabled }) =>
        disabled ? '#f5f5f5' : selected ? '#ffe5cf' : '#e0e0e0'} !important;
    }

    .option-title {
      background-color: ${({ selected, disabled }) =>
        disabled ? '#f5f5f5' : selected ? '#ffe5cf' : '#e0e0e0'} !important;
    }
  }
`;

export const OptionIcon = styled.div<{ selected: boolean; disabled?: boolean }>`
  width: 100%;
  padding: 12px 24px 8px;
  background-color: ${({ selected }) => (selected ? '#ffe5cf' : '#f5f5f5')};
  transition: background-color 0.2s ease;

  display: flex;
  justify-content: center;
  align-items: center;

  .material-symbols-outlined {
    font-size: 50px;
    color: ${({ selected, disabled }) =>
      disabled ? '#ccc' : selected ? `${orange}` : '#666'};
    font-variation-settings:
      'FILL' 0,
      'wght' 200,
      'GRAD' 0,
      'opsz' 48;
    transition: color 0.2s ease;
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

export const OptionTitle = styled.h3<{ selected: boolean; disabled?: boolean }>`
  margin: 0;
  font-size: 13px;
  font-weight: 400;
  padding: 4px 8px 12px 4px;
  background-color: ${({ selected }) => (selected ? '#ffe5cf' : '#f5f5f5')};
  color: ${({ selected, disabled }) =>
    disabled ? '#ccc' : selected ? `${orange}` : '#333'};
  text-align: center;
  width: 100%;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
`;

export const OptionDescription = styled.p`
  margin: 0;
  text-align: center;
  color: #666;
  font-size: 12px;
  line-height: 1.4;
  padding: 16px 8px 8px;
`;
