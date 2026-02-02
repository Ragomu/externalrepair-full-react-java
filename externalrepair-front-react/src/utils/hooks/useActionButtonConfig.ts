import { useMemo } from 'react';

export interface ActionButtonConfigOptions {
  customText?: {
    signal?: string;
    edit?: string;
    view?: string;
  };
  customIcon?: {
    signal?: string;
    edit?: string;
    view?: string;
  };
}

export interface ActionButtonState {
  canSignal?: boolean;
  canEdit?: boolean;
  canOnlyView?: boolean;
}

export const useActionButtonConfig = (
  state: ActionButtonState,
  options: ActionButtonConfigOptions = {},
) => {
  return useMemo(() => {
    if (state.canSignal) {
      return {
        icon: options.customIcon?.signal || 'add_circle',
        text: options.customText?.signal || 'Sinalizar item',
      };
    }
    if (state.canEdit) {
      return {
        icon: options.customIcon?.edit || 'edit',
        text: options.customText?.edit || 'Editar',
      };
    }
    if (state.canOnlyView) {
      return {
        icon: options.customIcon?.view || 'visibility',
        text: options.customText?.view || 'Visualizar',
      };
    }
    return { icon: '', text: '' };
  }, [state, options]);
};
