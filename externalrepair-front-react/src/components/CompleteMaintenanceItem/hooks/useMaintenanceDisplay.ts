import { useMemo } from 'react';

export interface MaintenanceDisplayConfig {
  showEditForm: boolean;
  showMaintenanceTable: boolean;
  showStatusMessage: boolean;
  showReturnSection: boolean;
  showReprovedContent: boolean;
  timelineColor: string;
  contentType: 'edit' | 'view' | 'reproved' | 'sent';
}

interface UseMaintenanceDisplayProps {
  maintenanceStatus: string;
  expanded: boolean;
  isEditing?: boolean;
}

export const useMaintenanceDisplay = ({
  maintenanceStatus,
  expanded,
  isEditing = false,
}: UseMaintenanceDisplayProps): MaintenanceDisplayConfig => {
  return useMemo(() => {
    const isApproved = maintenanceStatus === 'approved';
    const isSent = maintenanceStatus === 'sent';
    const isReproved = maintenanceStatus === 'reproved';

    const baseConfig = {
      showEditForm: false,
      showMaintenanceTable: false,
      showStatusMessage: false,
      showReturnSection: false,
      showReprovedContent: false,
      timelineColor: 'var(--color-border)',
      contentType: 'view' as const,
    };

    if (!expanded) {
      return {
        ...baseConfig,
        showStatusMessage: isSent || isApproved || isReproved,
      };
    }

    if (isReproved) {
      return {
        ...baseConfig,
        showEditForm: isEditing,
        showReprovedContent: !isEditing,
        showReturnSection: true,
        timelineColor: 'var(--color-danger-red)',
        contentType: isEditing ? 'edit' : 'reproved',
      };
    }

    if (isSent) {
      return {
        ...baseConfig,
        showStatusMessage: true,
        timelineColor: 'var(--color-warning-yellow)',
        contentType: 'sent',
      };
    }

    if (isApproved) {
      return {
        ...baseConfig,
        showMaintenanceTable: true,
        showReturnSection: true,
        timelineColor: 'var(--color-success-green)',
        contentType: 'view',
      };
    }

    return {
      ...baseConfig,
      showEditForm: isEditing,
      showMaintenanceTable: !isEditing,
      showReturnSection: true,
      contentType: isEditing ? 'edit' : 'view',
    };
  }, [maintenanceStatus, expanded, isEditing]);
};
