import React from 'react';
import { Icon } from '../../ImagePreviewModal/styles';
import { Text } from '../../Typography/styles';
import { MaintenanceStatus } from '../hooks/useMaintenanceState';
import { IconContainer } from '../styles';

interface StatusMessageProps {
  show: boolean;
  status: MaintenanceStatus;
}

const StatusMessage = ({ show, status }: StatusMessageProps) => {
  if (!show) return null;

  const getMessageConfig = () => {
    switch (status) {
      case MaintenanceStatus.SENT:
        return {
          icon: 'check_circle',
          text: 'Todos os itens foram verificados',
          color: 'var(--color-success-green)',
        };
      case MaintenanceStatus.APPROVED:
        return {
          icon: 'verified',
          text: 'Manutenção aprovada',
          color: 'var(--color-success-green)',
        };
      case MaintenanceStatus.REJECTED:
        return {
          icon: 'cancel',
          text: 'Há um erro na nota fiscal',
          color: 'var(--color-danger-red)',
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
