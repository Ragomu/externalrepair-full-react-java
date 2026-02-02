import request from './request';

export interface MaintenanceResponse {
  nf: string;
  emissionDate: string;
  issuer: string;
  receiver: string;
  totalQuantity: number;
  status?: string;
}

export interface MaintenanceNfItem {
  id: number;
  material: string;
  quantity?: number;
  description?: string;
  unitPrice?: number;
  totalPrice?: number;
  dimensions?: string;
  date?: string;
  status?: 'none' | 'initalized' | 'finished';
}

// -------- PARCIAL ---------
const multipartFormData = {
  headers: { 'Content-Type': 'multipart/form-data' },
};

export interface PartialSubItem {
  id: number;
  subItemStatus:
    | 'in_transit'
    | 'returned'
    | 'waiting_approval'
    | 'correction_sent'
    | 'reproved'
    | 'finished';
  subItemLabel: 'irreparable' | 'returnable' | 'discard';
  returnQuantity: number;
  returnDate: string | number[];
  material: string;
  description: string;
  unitPrice: number;
  unitWeight: number;
  dimensions: string;
  destinyItem?: 'return' | 'irreparable' | 'none';
  sentNfs?: { returnNf: string; justification: string }[];
}

export interface PartialMaintenanceItem extends MaintenanceNfItem {
  subItems: PartialSubItem[];
}

export interface PartialMaintenanceResponse {
  nf: string;
  fluigNumber?: string;
  items: PartialMaintenanceItem[];
}

export interface FlagSubItemPayload {
  id: number;
  returnNfNumber?: string;
  returnNfDate?: string;
  returnQuantity?: number;
  destinyItem?: 'return' | 'irreparable' | 'none';
}

export interface CompleteMaintenancePayload {
  request: {
    returnDate: string | null;
    returnNfNumber: string | null;
    additionalNfNumbers: string[];
  };
  returnNfFile: File | null;
  additionalNfFiles: File[];
}

export interface MaintenanceNfResponse {
  nf: string;
  fluigNumber: string;
  items: MaintenanceNfItem[];
  maintenanceStatus: string;
  sentNfs?: { returnNf: string; justification: string }[];
}

export const maintenanceApi = {
  getMaintenanceNfs: async (
    supplierDocument: string,
    filters?: string,
  ): Promise<MaintenanceResponse[]> => {
    const queryParam = filters ? `?${filters}` : '';
    const { data } = await request.get<MaintenanceResponse[]>(
      `/maintenance-nfs/${supplierDocument}${queryParam}`,
    );
    return data;
  },

  getMaintenanceNfItems: async (
    supplierDocument: string,
    nfe: string,
  ): Promise<MaintenanceNfResponse> => {
    const { data } = await request.get<MaintenanceNfResponse>(
      `/maintenance-items/${supplierDocument}/${nfe}`,
    );
    return data;
  },

  getMaintenanceNfType: async (
    supplierDocument: string,
    nf: string,
  ): Promise<{ type: string }> => {
    const { data } = await request.get<{ type: string }>(
      `/maintenance-nf-type/${supplierDocument}/${nf}`,
    );
    return data;
  },

  updateMaintenanceNf: async (
    supplierDocument: string,
    nfe: string,
    payload: CompleteMaintenancePayload,
  ): Promise<number> => {
    const formData = new FormData();
    formData.append('request', JSON.stringify(payload.request));

    if (payload.returnNfFile) {
      formData.append('returnNfFile', payload.returnNfFile);
    }

    if (payload.additionalNfFiles) {
      payload.additionalNfFiles.forEach((file, index) => {
        formData.append(`additionalNfFile_${index}`, file);
      });
    }

    const { status } = await request.post<FormData>(
      `/complete-maintenance/${supplierDocument}/${nfe}`,
      formData,
      multipartFormData,
    );
    return status as number;
  },

  // ---------- PARCIAL -------------

  getPartialMaintenanceSubItems: async (
    supplierDocument: string,
    nf: string,
  ): Promise<PartialMaintenanceResponse> => {
    const { data } = await request.get<PartialMaintenanceResponse>(
      `/partial-maintenance-sub-items/${supplierDocument}/${nf}`,
    );
    return data;
  },

  flagSubItem: async (
    supplierDocument: string,
    nf: string,
    payload: {
      request: FlagSubItemPayload;
      returnNfFile: File | null;
      additionalNfFiles: File[];
    },
  ): Promise<number> => {
    const formData = new FormData();
    formData.append('request', JSON.stringify(payload.request));

    if (payload.returnNfFile) {
      formData.append('returnNfFile', payload.returnNfFile);
    }

    payload.additionalNfFiles.forEach((file, i) => {
      formData.append(`additionalNfFile_${i}`, file);
    });

    const { status } = await request.post<FormData>(
      `/flag-sub-item/${supplierDocument}/${nf}`,
      formData,
      multipartFormData,
    );
    return status as number;
  },

  finishPartialItemsMaintenance: async (
    supplierDocument: string,
    nf: string,
    payload: { id: number },
  ): Promise<number> => {
    const { status } = await request.post(
      `/finish-partial-items-maintenance/${supplierDocument}/${nf}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } },
    );
    return status as number;
  },

  deleteSubItem: async (subItemId: number): Promise<number> => {
    const { status } = await request.delete(`/delete-sub-item/${subItemId}`);
    return status as number;
  },

  sendDiscardReport: async (subItemId: number, file: File): Promise<number> => {
    const formData = new FormData();
    formData.append('discardReportFile', file);

    const { status } = await request.post<FormData>(
      `/send-discard-report/${subItemId}`,
      formData,
      multipartFormData,
    );
    return status as number;
  },

  // Enviar correção de sub-item
  sendCorrectionSubItem: async (
    supplierDocument: string,
    nf: string,
    payload: {
      subItemId: number;
      returnNfNumber: string;
      returnNfDate: string;
      returnQuantity: number;
    },
    returnNfFile: File,
  ): Promise<number> => {
    const formData = new FormData();
    formData.append('request', JSON.stringify(payload));
    formData.append('returnNfFile', returnNfFile);

    const { status } = await request.post<FormData>(
      `/send-correction-sub-item/${supplierDocument}/${nf}`,
      formData,
      multipartFormData,
    );
    return status as number;
  },

  // Marcar sub-item como irreparável
  flagIrreparableSubItem: async (
    supplierDocument: string,
    nf: string,
    payload: {
      itemId: number;
      quantity: number;
      destinyItem: string;
    },
  ): Promise<number> => {
    const { status } = await request.post(
      `/flag-irreparable-sub-item/${supplierDocument}/${nf}`,
      payload,
      { headers: { 'Content-Type': 'application/json' } },
    );
    return status as number;
  },
};

export default maintenanceApi;
