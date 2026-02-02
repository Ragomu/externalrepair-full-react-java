import { useMemo, useState } from 'react';

export enum MaintenanceStatus {
  NOT_INITIALIZED = 'notInitialized',
  PENDING = 'pending',
  SENT = 'sent',
  APPROVED = 'approved',
  REJECTED = 'reproved', // API retorna 'reproved', mas enum usa 'rejected' internamente
  CORRECTION_SENT = 'correctionSent',
}

export interface MaintenanceState {
  status: MaintenanceStatus;
  canEdit: boolean;
  canSignal: boolean;
  showSuccessMessage: boolean;
  canOnlyView: boolean;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

interface UseMaintenanceStateProps {
  maintenanceStatus: string;
}

export const useMaintenanceState = ({
  maintenanceStatus,
}: UseMaintenanceStateProps): MaintenanceState => {
  const [isEditing, setIsEditing] = useState(false);

  const state = useMemo(() => {
    switch (maintenanceStatus) {
      case 'notInitialized':
        return {
          status: MaintenanceStatus.NOT_INITIALIZED,
          canEdit: false,
          canSignal: true,
          showSuccessMessage: false,
          canOnlyView: false,
        };
      case 'approved':
        return {
          status: MaintenanceStatus.APPROVED,
          canEdit: false,
          canSignal: false,
          showSuccessMessage: true,
          canOnlyView: true,
        };
      case 'sent':
        return {
          status: MaintenanceStatus.SENT,
          canEdit: true,
          canSignal: false,
          showSuccessMessage: true,
          canOnlyView: false,
        };
      case 'reproved':
        return {
          status: MaintenanceStatus.REJECTED,
          canEdit: false,
          canSignal: false,
          showSuccessMessage: true,
          canOnlyView: true,
        };
      case 'correctionSent':
        return {
          status: MaintenanceStatus.CORRECTION_SENT,
          canEdit: true,
          canSignal: false,
          showSuccessMessage: true,
          canOnlyView: false,
        };
      default:
        return {
          status: MaintenanceStatus.PENDING,
          canEdit: false,
          canSignal: true,
          showSuccessMessage: false,
          canOnlyView: false,
        };
    }
  }, [maintenanceStatus]);

  return {
    ...state,
    isEditing,
    setIsEditing,
  };
};
