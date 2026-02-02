import request from './request';

export interface WarehouseNfList {
  nf: string;
  emissionDate: string;
  issuer: string;
  receiver: string;
  totalQuantity: number;
}

export interface WarehouseNfItem {
  id?: number;
  material: string;
  returnedQuantity: number;
  unitValue: number;
  dimensions: string;
  label: string;
  description: string;
  unitWeight: number;
  warehouseItemStatus: 'received' | 'none';
  date: string;
  receivedQuantity?: number;
  receiptDate?: string;
}

export interface WarehouseNfItemUpdate {
  id: number;
  receivedQuantity: number;
  receiptDate: string;
}

export interface WarehouseNfItemsResponse {
  id: number;
  nf: string;
  fluigNumber: string;
  finished: boolean;
  warehouseStatus: 'finished' | 'none';
  items: WarehouseNfItem[];
}

export const warehouseApi = {
  getWarehouseNfs: async (filters?: string): Promise<WarehouseNfList[]> => {
    const queryParam = filters ? `?${filters}` : '';
    const { data } = await request.get<WarehouseNfList[]>(
      `/warehouse-nfs${queryParam}`,
    );
    return data;
  },

  getWarehouseNfItems: async (
    nf: string,
  ): Promise<WarehouseNfItemsResponse> => {
    const { data } = await request.get<WarehouseNfItemsResponse>(
      `/warehouse-items/${nf}`,
    );
    return data;
  },

  updateWarehouseNfItem: async (
    nf: string,
    itemId: number,
    item: WarehouseNfItemUpdate,
  ): Promise<any> => {
    const { data } = await request.post(
      `/flag-item-receipt-warehouse/${nf}`,
      item,
    );
    return data;
  },
};

export default warehouseApi;
