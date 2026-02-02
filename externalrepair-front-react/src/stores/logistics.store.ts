import { makeAutoObservable, runInAction } from 'mobx';
import {
  LogisticsNfItemUpdatePayload,
  LogisticsNfList,
  LogisticsNfResponse,
  logisticsApi,
} from '~/api/logistics';
import uisaApi from '~/api/uisaApi';
import { StorageService } from '~/services';

export class LogisticsStore {
  pdfUrl: string | null = null;
  pdfLoading = false;
  logisticsNfs: LogisticsNfList[] = [];
  logisticsNfsLoading = false;
  logisticsNfItems: LogisticsNfResponse[] = [];
  logisticsNfItemsLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  private getSupplierDocument(): string {
    const supplierDocument = StorageService.getSupplierDocument();
    if (!supplierDocument || supplierDocument.trim() === '') {
      throw new Error(
        'Supplier document não encontrado para a requisição /logistica.',
      );
    }
    return supplierDocument;
  }

  async fetchLogisticsNfs(query?: string) {
    this.logisticsNfsLoading = true;
    try {
      let filters: string | undefined;

      if (query?.trim()) {
        if (query.includes('=')) {
          filters = query;
        } else {
          filters = `query=${encodeURIComponent(query)}`;
        }
      }

      const logisticsNfs = await logisticsApi.getLogisticsNfs(filters);
      this.logisticsNfs = logisticsNfs;
    } finally {
      this.logisticsNfsLoading = false;
    }
  }

  async fetchLogisticsNfItems(nf: string) {
    this.logisticsNfItemsLoading = true;
    try {
      const logisticsNfItems = await logisticsApi.getLogisticsNfItems(nf);
      this.logisticsNfItems = logisticsNfItems;
    } finally {
      this.logisticsNfItemsLoading = false;
    }
  }

  async updateLogisticsNfItem(
    nf: string,
    payload: LogisticsNfItemUpdatePayload,
  ) {
    try {
      return await logisticsApi.updateLogisticsNfItem(nf, payload);
    } catch (error) {
      console.error('Erro no store updateLogisticsNfItem:', error);
      throw error;
    }
  }

  async getNfPdf(nf: string) {
    runInAction(() => {
      this.pdfLoading = true;
      this.pdfUrl = 'loading';
    });

    try {
      const pdfUrl = await uisaApi.getNfPdf(nf);

      runInAction(() => {
        this.pdfUrl = pdfUrl;
        this.pdfLoading = false;
      });

      return pdfUrl;
    } catch (error) {
      runInAction(() => {
        this.pdfLoading = false;
        this.pdfUrl = null;
      });
      console.error('Erro ao carregar PDF da NF:', error);
      throw error;
    }
  }

  getLogisticsNfPdf = async (nf: string) => {
    await this.getNfPdf(nf);
  };

  clearPdfUrl() {
    runInAction(() => {
      this.pdfUrl = null;
      this.pdfLoading = false;
    });
  }
}

export const logisticsStore = new LogisticsStore();
