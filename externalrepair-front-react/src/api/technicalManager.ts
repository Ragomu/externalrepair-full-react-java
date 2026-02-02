import request from './request';

export interface TechnicalManagerNfList {
  nf: string;
  emissionDate: string;
  issuer: string;
  receiver: string;
  totalQuantity: number;
}

export interface TechnicalManagerSubItem {
  id: number;
  material: string;
  description: string;
  unitPrice: number;
  unitWeight: number;
  dimensions: string;
  subItemStatus?: 'approved' | 'rejected' | 'pending';
  subItemLabel?: string;
  returnQuantity?: number;
  returnDate?: string | null;
  subItemAction?: 'sell' | 'discard' | 'return';
  sellQuantity?: number;
  unitValue?: string;
  date?: string;
  quantity?: number;
  tag?: string;
}

export interface TechnicalManagerNfItem {
  id: number;
  nf: string;
  description: string;
  irreparable: number;
  sent: number;
  unitValue: string | number;
  totalValue: string | number;
  dimensions: string;
  date: string;
  material: string;
  unitWeight?: number;
  subItems: TechnicalManagerSubItem[];
}

export interface TechnicalManagerNfItemsResponse {
  nf: string;
  fluigNumber: string;
  items: TechnicalManagerNfItem[];
}

export const technicalManagerApi = {
  getTechnicalManagerNfs: async (
    query?: string,
  ): Promise<TechnicalManagerNfList[]> => {
    const url = query
      ? `/technical-manager-nfs?query=${query}`
      : '/technical-manager-nfs';
    const response = await request.get<TechnicalManagerNfList[]>(url);
    return response.data;
  },

  getTechnicalManagerItems: async (
    nf: string,
  ): Promise<TechnicalManagerNfItemsResponse> => {
    const response = await request.get<TechnicalManagerNfItemsResponse>(
      `/technical-manager-items/${nf}`,
    );
    return response.data;
  },

  updateTechnicalManagerItem: async (
    nf: string,
    subItemId: number,
    payload: {
      action: 'approve' | 'reject';
    },
  ) => {
    const response = await request.post(
      `/technical-manager-action/${nf}/${subItemId}`,
      { ...payload, subItemId },
    );
    return response.status;
  },
  finishTechnicalManagerNf: async (itemId: number) => {
    const response = await request.post(
      `/finish-technical-manager-item/${itemId}`,
    );
    return response.status;
  },
};
