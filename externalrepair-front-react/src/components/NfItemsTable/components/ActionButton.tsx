import React from 'react';
import { NfState } from '../hooks/useNfState';
import { ButtonContainer, SignalButton, SignalIcon } from '../styles';

interface ActionButtonProps {
  nfState: NfState;
  expanded: boolean;
  onExpand: () => void;
  buttonText?: string;
  buttonIcon?: string;
}

const ActionButton = ({
  nfState,
  expanded,
  onExpand,
  buttonText,
  buttonIcon,
}: ActionButtonProps) => {
  if (expanded) return null;

  const getButtonConfig = () => {
    if (nfState.canSignal) {
      return {
        icon: buttonIcon || 'add_circle',
        text: buttonText || 'Sinalizar item',
      };
    }
    if (nfState.canEdit) {
      return {
        icon: buttonIcon || 'edit',
        text: buttonText || 'Editar',
      };
    }
    if (nfState.canOnlyView) {
      return {
        icon: buttonIcon || 'visibility',
        text: buttonText || 'Visualizar',
      };
    }
    return null;
  };

  const config = getButtonConfig();
  if (!config) return null;

  return (
    <ButtonContainer style={{ marginTop: '8px' }} expanded={false}>
      <SignalButton onClick={onExpand} expanded={false}>
        <SignalIcon className="material-symbols-outlined">
          {config.icon}
        </SignalIcon>
        {config.text}
      </SignalButton>
    </ButtonContainer>
  );
};

export default ActionButton;
