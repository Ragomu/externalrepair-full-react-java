import { useMemo } from 'react';

export interface StatusColors {
  background: string;
  text: string;
  border: string;
}

export type StatusType =
  | 'Negociação'
  | 'Trânsito'
  | 'complete'
  | 'partial'
  | 'pending'
  | 'rejected'
  | 'approved'
  | 'finished'
  | 'unfinished'
  | 'sent'
  | 'reproved'
  | 'correctionSent'
  | 'notInitialized'
  | 'irreparable'
  | 'received'
  | 'none'
  | 'completed'
  | 'assigned'
  | 'discard';

export const useStatusColors = (status: string): StatusColors => {
  return useMemo(() => {
    const SUCCESS_COLORS = {
      background: 'var(--color-success-light)',
      text: 'var(--color-success-green)',
      border: 'var(--color-success-green)',
    };

    const WARNING_COLORS = {
      background: 'var(--color-yellow-lighter)',
      text: 'var(--color-yellow-dark)',
      border: 'var(--color-yellow-dark)',
    };

    const ERROR_COLORS = {
      background: 'var(--color-danger-red-light)',
      text: 'var(--color-danger-red)',
      border: 'var(--color-danger-red)',
    };

    switch (status) {
      case 'notInitialized':
      case 'none':
        return {
          background: 'transparent',
          text: '#595959',
          border: '#cccccc',
        };
      case 'sent':
        return {
          background: 'transparent',
          text: 'var(--color-text-light)',
          border: 'transparent',
        };
      case 'negotiation':
      case 'Negociação':
        return {
          background: '#ffefc1',
          text: '#cfa423',
          border: '#cfa423',
        };
      case 'transit':
      case 'Trânsito':
        return {
          background: '#a8d8ff',
          text: '#2f458b',
          border: '#2f458b',
        };
      case 'complete':
      case 'approved':
      case 'finished':
      case 'received':
      case 'completed':
      case 'assigned':
        return SUCCESS_COLORS;
      case 'partial':
      case 'pending':
      case 'waiting_approval':
      case 'unfinished':
        return WARNING_COLORS;
      case 'rejected':
      case 'reproved':
      case 'irreparable':
      case 'irreparable_return':
      case 'irreparable_discard':
        return ERROR_COLORS;
      case 'discard':
        return {
          background: 'transparent',
          text: 'var(--color-text-light)',
          border: 'transparent',
        };
      case 'returned':
        return {
          background: 'transparent',
          text: 'var(--color-text-light)',
          border: 'transparent',
        };
      default:
        return {
          background: 'transparent',
          text: '#595959',
          border: 'transparent',
        };
    }
  }, [status]);
};
