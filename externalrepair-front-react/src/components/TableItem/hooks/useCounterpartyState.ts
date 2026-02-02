import { useMemo } from 'react';

export const useCounterpartyState = (counterpartyStatus: string) => {
  return useMemo(() => {
    switch (counterpartyStatus) {
      case 'approved':
        return {
          status: 'approved',
          color: 'var(--color-success-green)',
          text: 'Aprovado',
          canEdit: false,
          canApprove: false,
          canReject: false,
        };
      case 'rejected':
        return {
          status: 'rejected',
          color: 'var(--color-danger-red)',
          text: 'Rejeitado',
          canEdit: true,
          canApprove: false,
          canReject: false,
        };
      case 'pending':
        return {
          status: 'pending',
          color: 'var(--color-warning-yellow)',
          text: 'Pendente',
          canEdit: true,
          canApprove: true,
          canReject: true,
        };
      default:
        return {
          status: 'none',
          color: 'var(--color-border)',
          text: 'Não definido',
          canEdit: true,
          canApprove: false,
          canReject: false,
        };
    }
  }, [counterpartyStatus]);
};
