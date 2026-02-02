import { useMemo, useState } from 'react';

export enum NfStatus {
  PENDING = 'pending',
  SENT = 'sent',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface NfState {
  status: NfStatus;
  canEdit: boolean;
  canSignal: boolean;
  showSuccessMessage: boolean;
  canOnlyView: boolean;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

interface UseNfStateProps {
  status: 'pending' | 'sent' | 'approved' | 'rejected';
}

export const useNfState = ({ status }: UseNfStateProps): NfState => {
  const [isEditing, setIsEditing] = useState(false);

  const state = useMemo(() => {
    switch (status) {
      case 'approved':
        return {
          status: NfStatus.APPROVED,
          canEdit: false,
          canSignal: false,
          showSuccessMessage: true,
          canOnlyView: true,
        };
      case 'rejected':
        return {
          status: NfStatus.REJECTED,
          canEdit: false,
          canSignal: false,
          showSuccessMessage: true,
          canOnlyView: true,
        };
      case 'sent':
        return {
          status: NfStatus.SENT,
          canEdit: true,
          canSignal: false,
          showSuccessMessage: true,
          canOnlyView: false,
        };
      default:
        return {
          status: NfStatus.PENDING,
          canEdit: false,
          canSignal: true,
          showSuccessMessage: false,
          canOnlyView: false,
        };
    }
  }, [status]);

  return {
    ...state,
    isEditing,
    setIsEditing,
  };
};
