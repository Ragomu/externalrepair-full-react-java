import request from './request';

export interface FiscalNfList {
  nf: string;
  emissionDate: string;
  issuer: string;
  receiver: string;
  totalQuantity: number;
  status: string;
  type: string;
}

export interface FiscalNfItem {
  nf: string;
  fluigNumber: string;
  returnNf: string;
  items: [
    {
      id: number;
      request: string;
      material: string;
      quantity: number;
      description: string;
      unitPrice: number;
      totalPrice: number;
      dimensions: string;
      label: string;
      date: string;
    },
  ];
  status: string;
}

export interface AdditionalNf {
  nfNumber: string;
  nfLink: string;
}

// -------- FISCAL PARCIAL ---------

export interface PartialFiscalSubItem {
  id: number;
  returnQuantity: number;
  returnDate: string;
  material: string;
  description: string;
  unitPrice: number;
  unitWeight: number;
  dimensions: string;
  subItemStatus: string;
  subItemLabel: string;
  returnNfNumber?: string;
}

export interface PartialFiscalItem {
  id: number;
  material: string;
  quantity: number;
  description: string;
  unitPrice: number;
  totalPrice: number;
  dimensions: string;
  date: string;
  subItems: PartialFiscalSubItem[];
}

export interface PartialFiscalResponse {
  nf: string;
  fluigNumber: string;
  items: PartialFiscalItem[];
}

export const fiscalApi = {
  getFiscalNfs: async (filters?: string): Promise<FiscalNfList[]> => {
    const queryParam = filters ? `?${filters}` : '';
    const { data } = await request.get<FiscalNfList[]>(
      `/fiscal-nfs${queryParam}`,
    );
    return data;
  },

  getFiscalNfItems: async (nf: string): Promise<FiscalNfItem> => {
    const { data } = await request.get<FiscalNfItem>(
      `/complete-fiscal-items/${nf}`,
    );
    return data;
  },

  getAdditionalNfs: async (nf: string): Promise<AdditionalNf[]> => {
    const { data } = await request.get<AdditionalNf[]>(`/additional-nfs/${nf}`);
    return data;
  },

  // -------- FISCAL PARCIAL ---------

  getPartialFiscalItems: async (nf: string): Promise<PartialFiscalResponse> => {
    const { data } = await request.get<PartialFiscalResponse>(
      `/partial-fiscal-items/${nf}`,
    );
    return data;
  },

  approvePartialNf: async (
    nf: string,
    itemId: number,
    subItemId: number,
  ): Promise<any> => {
    const { data } = await request.post(
      `/fiscal-approve-partial-nf/${nf}/${itemId}/${subItemId}`,
    );
    return data;
  },

  correctPartialNf: async (
    nf: string,
    itemId: number,
    subItemId: number,
    justification: string,
    returnNfNumber: string,
  ): Promise<any> => {
    const { data } = await request.post(
      `/fiscal-correct-partial-nf/${nf}/${itemId}/${subItemId}`,
      {
        justification,
        returnNfNumber,
      },
    );
    return data;
  },

  approveNf: async (nf: string): Promise<any> => {
    const { data } = await request.post(`/fiscal-approve-complete-nf/${nf}`);
    return data;
  },

  correctNf: async (
    nf: string,
    justification: string,
    returnNf: string,
  ): Promise<any> => {
    const response = await request.post(`/fiscal-correct-complete-nf/${nf}`, {
      justification,
      returnNf,
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(
        `Erro HTTP ${response.status}: Operação não foi bem-sucedida`,
      );
    }
  },
};
