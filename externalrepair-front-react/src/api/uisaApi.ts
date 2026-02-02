import { StorageService } from '~/services';
import { ResponseError } from '~/utils';
import { TimelineApiResponse } from '~/utils/types/Timeline';
import request, { API_BASE_URL } from './request';

export type ReceivedNfListResponse = ReceivedNfListItem[];

export interface HistoryItemResponse {
  nf: string;
  emissionDate: string;
  issuer: string;
  receiver: string;
  totalValue: number;
  status: string;
}

export interface HistoryResponse {
  items: HistoryItemResponse[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export const uisaApi = {
  getHome: async (filters: GetHomeFilters): Promise<HomeResponse> => {
    try {
      const supplierDocument = StorageService.getSupplierDocument();
      if (!supplierDocument) {
        throw new Error(
          'Supplier document não encontrado para a requisição /home.',
        );
      }

      const params = new URLSearchParams();
      if (filters.maintenanceType) {
        params.append('maintenanceType', filters.maintenanceType);
      }
      if (filters.transitType) {
        params.append('transitType', filters.transitType);
      }
      if (filters.negotiationType) {
        params.append('negotiationType', filters.negotiationType);
      }

      const queryString = params.toString();
      let url = `/home/${supplierDocument}`;
      if (queryString) {
        url += `?${queryString}`;
      }

      const { data } = await request.get<HomeResponse>(url);
      return data;
    } catch (err) {
      if (err instanceof ResponseError) {
        throw err;
      }
      throw new ResponseError(err as Error);
    }
  },

  /**
   * Busca o histórico de notas fiscais de um fornecedor, paginado.
   * @param supplierDocument Documento do fornecedor
   * @param page Página (default: 0)
   * @param size Tamanho da página (default: 10)
   */
  getHistory: async (
    supplierDocument: string,
    page: number = 0,
    size: number = 10,
  ): Promise<HistoryResponse> => {
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('size', String(size));
      const url = `/history/${supplierDocument}?${params.toString()}`;
      const { data } = await request.get<HistoryResponse>(url);
      return data;
    } catch (err) {
      if (err instanceof ResponseError) {
        throw err;
      }
      throw new ResponseError(err as Error);
    }
  },

  getHistoryByStatus: async (status: string = 'all') => {
    const response = await request.get(
      `/history/${StorageService.getSupplierDocument()}?status=${status}`,
    );
    return response.data;
  },

  /**
   * Busca a timeline de eventos de uma NF específica
   * @param nf Número da NF
   */
  getTimeline: async (nf: string): Promise<TimelineApiResponse> => {
    try {
      const { data } = await request.get(`/repair-history/${nf}`);
      return data;
    } catch (err) {
      if (err instanceof ResponseError) {
        throw err;
      }
      throw new ResponseError(err as Error);
    }
  },

  createInitialRequest: async (payload: InitialRequestPayload) => {
    const response = await request.post('/initial-request', payload);
    return response.data;
  },

  /**
   * Busca o histórico de notas fiscais de um fornecedor, paginado e filtrado por status.
   * @param supplierDocument Documento do fornecedor
   * @param status Status para filtrar (default: 'all')
   * @param page Página (default: 0)
   * @param size Tamanho da página (default: 10)
   * @param query Termo de busca (opcional)
   */
  getHistoryWithStatus: async (
    supplierDocument: string,
    status: string = 'all',
    page: number = 0,
    size: number = 10,
    query?: string,
  ): Promise<HistoryResponse> => {
    try {
      const params = new URLSearchParams();
      params.append('page', String(page));
      params.append('size', String(size));
      if (status && status !== 'all') {
        params.append('status', status);
      }
      if (query) {
        params.append('query', query);
      }
      const url = `/history/${supplierDocument}?${params.toString()}`;
      const { data } = await request.get<HistoryResponse>(url);
      return data;
    } catch (err) {
      if (err instanceof ResponseError) {
        throw err;
      }
      throw new ResponseError(err as Error);
    }
  },

  getReceivedNfItems: async (nf: string) => {
    const { data } = await request.get<ReceivedNfItemsResponse>(
      `/received-items/${StorageService.getSupplierDocument()}/${nf}`,
    );
    return data;
  },

  updateReceivedNfItem: async (nf: string, item: ReceivedNfItem) => {
    const response = await request.post<ReceivedNfItem>(
      `/flag-item-receipt/${StorageService.getSupplierDocument()}/${nf}`,
      item,
    );
    return { status: response.status, data: response.data };
  },

  /**
   * Lista de NF-e para recebimento
   * @param supplierDocument Documento do fornecedor (CNPJ)
   * @param status Status para filtrar (default: 'all')
   * @param query Termo de busca (opcional)
   */
  getReceivedNfs: async (
    supplierDocument: string,
    status: string = 'all',
    query?: string,
  ): Promise<ReceivedNfListTableItem[]> => {
    try {
      const params = new URLSearchParams();
      params.append('status', status);
      if (query) params.append('query', query);

      const url = `/received-nfs/${supplierDocument}?${params.toString()}`;
      const { data } = await request.get<ReceivedNfListTableItem[]>(url);
      return data;
    } catch (err) {
      if (err instanceof ResponseError) throw err;
      throw new ResponseError(err as Error);
    }
  },

  uploadReceivedNfPhotos: (
    nf: string,
    file: File,
    onProgress?: (percent: number) => void,
  ) => {
    const supplierDocument = StorageService.getSupplierDocument();
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('equipmentImages', file);
      const xhr = new XMLHttpRequest();
      xhr.open(
        'POST',
        `${API_BASE_URL}/flag-nf-receipt/${supplierDocument}/${nf}`,
      );
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send(formData);
    });
  },

  getNfPhotos: async (supplierDocument: string, nf: string) => {
    const { data } = await request.get<ReceivedNfPhotosResponse>(
      `/images/list/${supplierDocument}/${nf}`,
    );
    return data;
  },
  getNfPdf: async (nf: string) => {
    const response = await request.get(`/pdf/${nf}`, {
      responseType: 'blob',
    });

    const blob = response.data;
    return await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  },

  getReturnFiscalNfPdf: async (nf: string) => {
    try {
      const response = await request.get(`/pdf/${nf}`, {
        responseType: 'blob',
      });

      const blob = response.data;
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(
        'uisaApi.getReturnFiscalNfPdf - Erro ao baixar o PDF:',
        error,
      );
      throw error;
    }
  },

  getPartialReturnFiscalNfPdf: async (nf: string) => {
    try {
      const response = await request.get(`/pdf/partial-maintenance/${nf}`, {
        responseType: 'blob',
      });

      const blob = response.data;
      return await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(
        'uisaApi.getReturnFiscalNfPdf - Erro ao baixar o PDF:',
        error,
      );
      throw error;
    }
  },
};

export default uisaApi;
