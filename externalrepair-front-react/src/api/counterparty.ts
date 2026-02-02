import request from './request';

export interface CounterpartySubItem {
  id: number;
  subItemAction?: 'sell' | 'discard' | 'return';
  material: string;
  description?: string;
  quantity: number;
  unitValue: string;
  unitPrice?: number;
  unitWeight?: number;
  dimensions: string;
  tag?: string;
  label: string;
  date: string;
}

export interface CounterpartyNfItem {
  id: number;
  material: string;
  description: string;
  sent: number;
  irreparable: number;
  unitValue: string;
  totalValue: string;
  dimensions: string;
  date: string;
  subItems: CounterpartySubItem[];
  status?: 'none' | 'initalized' | 'finished';
}

export interface CounterpartyNfItemsResponse {
  nf: string;
  fluigNumber: string;
  items: CounterpartyNfItem[];
}

export interface CounterpartyNfList {
  nf: string;
  emissionDate: string;
  issuer: string;
  receiver: string;
  totalQuantity: number;
}

export const counterpartyApi = {
  getCounterpartyNfItems: async (query?: string) => {
    // Sempre garantir o prefixo "query=" quando o parâmetro não vier no formato chave=valor
    const normalizedQuery =
      query && query.trim().length > 0
        ? query.includes('=')
          ? query
          : `query=${encodeURIComponent(query)}`
        : '';
    const url = normalizedQuery
      ? `/counterparty-nfs?${normalizedQuery}`
      : '/counterparty-nfs';
    const response = await request.get<CounterpartyNfList[]>(url);
    return response.data;
  },

  getCounterpartyItems: async (nf: string) => {
    const response = await request.get<CounterpartyNfItemsResponse>(
      `/counterparty-items/${nf}`,
    );
    return response.data;
  },

  updateCounterpartyItem: async (
    nf: string,
    subItemId: number,
    payload: {
      action: 'sell' | 'discard' | 'return';
      quantity: number;
    },
  ) => {
    const response = await request.post(
      `/counterparty-action/${nf}/${subItemId}`,
      payload,
    );
    return response.status;
  },

  finishCounterpartyItem: async (itemId: number) => {
    const response = await request.post(`/counterparty-finish-item/${itemId}`);
    return response.status;
  },

  deleteCounterpartyItem: async (subItemId: number) => {
    const response = await request.delete(
      `/counter-party-delete-subitem/${subItemId}`,
    );
    return response.status;
  },
};
