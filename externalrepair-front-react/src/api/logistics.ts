import request from './request';

export interface LogisticsNfItem {
  id: number;
  request: string;
  material: string;
  quantity: number;
  description: string;
  unitPrice: number;
  totalPrice: number;
  dimensions: string;
  shippingDate: string;
  label: string;
  logisticItemStatus: 'assigned' | 'none';
}

export interface LogisticsNfResponse {
  nf: string;
  fluigNumber: string;
  logisticStatus: 'completed' | 'none';
  items: LogisticsNfItem[];
}

export interface LogisticsNfList {
  nf: string;
  items: LogisticsNfItem[];
}

export interface LogisticsNfItemUpdatePayload {
  id: number;
  fleet: 'uisa' | 'external';
  driver?: string;
  plate?: string;
  observation?: string;
  carrier?: string;
  contact?: string;
}

export const logisticsApi = {
  getLogisticsNfs: async (filters?: string): Promise<LogisticsNfList[]> => {
    const queryParam = filters ? `?${filters}` : '';
    const { data } = await request.get<LogisticsNfList[]>(
      `/logistic-nfs${queryParam}`,
    );
    return data;
  },

  getLogisticsNfItems: async (nf: string): Promise<LogisticsNfResponse[]> => {
    const { data } = await request.get<LogisticsNfResponse[]>(
      `/logistic-items/${nf}`,
    );
    return data;
  },

  updateLogisticsNfItem: async (
    nf: string,
    payload: LogisticsNfItemUpdatePayload,
  ): Promise<any> => {
    const { data } = await request.post(`/assign-logistic/${nf}`, payload);
    return data;
  },
};

export default logisticsApi;
