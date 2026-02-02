import React from 'react';
import { Text } from '../../Typography/styles';
import { NfStatus } from '../hooks/useNfState';
import { Icon, IconContainer } from '../styles';

interface StatusMessageProps {
  show: boolean;
  status: NfStatus;
}

const StatusMessage = ({ show, status }: StatusMessageProps) => {
  if (!show) return null;

  const getMessageConfig = () => {
    switch (status) {
      case NfStatus.SENT:
        return {
          icon: 'check_circle',
          text: 'Todos os itens foram verificados',
          color: 'var(--color-success-green)',
        };
      case NfStatus.APPROVED:
        return {
          icon: 'verified',
          text: 'Item aprovado',
          color: 'var(--color-success-green)',
        };
      case NfStatus.REJECTED:
        return {
          icon: 'cancel',
          text: 'Item rejeitado',
          color: 'var(--color-error)',
        };
      default:
        return null;
    }
  };

  const config = getMessageConfig();
  if (!config) return null;

  return (
    <IconContainer>
      <Icon
        className="material-symbols-outlined"
        style={{ color: config.color }}
      >
        {config.icon}
      </Icon>
      <Text variant="small" color={config.color}>
        {config.text}
      </Text>
    </IconContainer>
  );
};

export default StatusMessage;
