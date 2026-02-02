import React from 'react';
import { MaintenanceState } from '../hooks/useMaintenanceState';
import { ButtonContainer, SignalButton, SignalIcon } from '../styles';

interface ActionButtonProps {
  maintenanceState: MaintenanceState;
  expanded: boolean;
  onExpand: () => void;
}

const ActionButton = ({
  maintenanceState,
  expanded,
  onExpand,
}: ActionButtonProps) => {
  if (expanded) return null;

  const getButtonConfig = () => {
    if (maintenanceState.canSignal) {
      return {
        icon: 'add_circle',
        text: 'Sinalizar manutenção',
      };
    }
    if (maintenanceState.canEdit) {
      return {
        icon: 'edit',
        text: 'Editar',
      };
    }
    if (maintenanceState.canOnlyView) {
      return {
        icon: 'visibility',
        text: 'Visualizar',
      };
    }
    return null;
  };

  const config = getButtonConfig();
  if (!config) return null;

  return (
    <ButtonContainer style={{ marginTop: '8px' }}>
      <SignalButton onClick={onExpand}>
        <SignalIcon className="material-symbols-outlined">
          {config.icon}
        </SignalIcon>
        {config.text}
      </SignalButton>
    </ButtonContainer>
  );
};

export default ActionButton;
