export type NormalizedStatus =
  | 'pending'
  | 'in_progress'
  | 'sent'
  | 'approved'
  | 'rejected'
  | 'finished'
  | 'waiting_approval'
  | 'irreparable'
  | 'returned'
  | 'discard';

export function mapTechnicalManagerActionStatus(subItemAction?: string): {
  status: NormalizedStatus;
  label: string;
} {
  switch (subItemAction) {
    case 'sell':
      return { status: 'sent', label: 'venda' };
    case 'discard':
      return { status: 'discard', label: 'descarte' };
    case 'return':
      return { status: 'returned', label: 'retorno' };
    default:
      return { status: 'pending', label: 'pendente' };
  }
}

export function mapCounterpartySubItemStatus(
  subItemAction?: string,
): NormalizedStatus {
  if (subItemAction === 'sell') return 'sent';
  if (subItemAction === 'discard') return 'discard';
  if (subItemAction === 'return') return 'returned';
  return 'pending';
}

export function mapMaintenanceItemStatus(status?: string): NormalizedStatus {
  switch (status) {
    case 'finished':
      return 'finished';
    case 'irreparable':
    case 'irreparable_return':
    case 'irreparable_discard':
      return 'irreparable';
    case 'returned':
      return 'returned';
    case 'reproved':
    case 'rejected':
      return 'rejected';
    case 'sent':
      return 'sent';
    default:
      return 'pending';
  }
}

export function mapMaintenanceItemDestiny(destiny?: string) {
  switch (destiny) {
    case 'irreparable':
      return 'sem reparo';
    case 'irreparable_return':
      return 'retorno';
    case 'return':
      return 'retorno';
    default:
      return 'pending';
  }
}

export function mapUisaItemDestiny(destiny?: string) {
  switch (destiny) {
    case 'sell':
      return 'venda';
    case 'discard':
      return 'descarte';
    case 'return':
      return 'retorno';
    default:
      return 'pending';
  }
}
