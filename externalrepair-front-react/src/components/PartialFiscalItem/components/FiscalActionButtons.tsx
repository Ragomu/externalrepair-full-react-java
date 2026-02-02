import React from 'react';
import styled from 'styled-components';
import { Text } from '../../Typography/styles';

// Estilos dos botões
const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

interface FiscalActionButtonsProps {
  onApprove: () => void;
  onCorrection: () => void;
  status: string;
}

const FiscalActionButtons = ({
  onApprove,
  onCorrection,
  status,
}: FiscalActionButtonsProps) => {
  const isApproved = status === 'approved' || status === 'finished';
  const isReproved = status === 'reproved';

  return (
    <ActionButtonsContainer>
      <ActionButton
        onClick={onApprove}
        disabled={isApproved}
        style={{
          backgroundColor: isApproved ? '#ccc' : '#28a745',
          cursor: isApproved ? 'not-allowed' : 'pointer',
        }}
      >
        <Text variant="small" color="#fff">
          {isApproved ? 'Aprovado' : 'Aprovar'}
        </Text>
      </ActionButton>

      <ActionButton
        onClick={onCorrection}
        disabled={isReproved}
        style={{
          backgroundColor: isReproved ? '#ccc' : '#ffc107',
          cursor: isReproved ? 'not-allowed' : 'pointer',
        }}
      >
        <Text variant="small" color="#fff">
          {isReproved ? 'Corrigido' : 'Corrigir'}
        </Text>
      </ActionButton>
    </ActionButtonsContainer>
  );
};

export default FiscalActionButtons;
