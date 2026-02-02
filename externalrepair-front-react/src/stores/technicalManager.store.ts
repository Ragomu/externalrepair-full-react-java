import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import {
  TechnicalManagerNfItemsResponse,
  TechnicalManagerNfList,
  technicalManagerApi,
} from '~/api/technicalManager';
import { uisaApi } from '~/api/uisaApi';

export class TechnicalManagerStore {
  technicalManagerNfs: TechnicalManagerNfList[] = [];
  technicalManagerNfsLoading = false;
  technicalManagerNfsError: string | null = null;
  pdfUrl: string | null = null;
  pdfLoading = false;
  technicalManagerNfItems: TechnicalManagerNfItemsResponse | null = null;
  technicalManagerNfItemsLoading = false;
  technicalManagerNfItemsError: string | null = null;
  technicalManagerLoading = false;
  searchTerm: string = '';
  selectedFilters: string[] = [];
  currentPage: number = 0;
  pageSize: number = 10;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'TechnicalManagerStore',
      properties: ['searchTerm', 'selectedFilters', 'currentPage', 'pageSize'],
      expireIn: 30 * 60 * 1000,
    });
  }

  async fetchTechnicalManagerNfs(query?: string) {
    this.technicalManagerNfsLoading = true;
    this.technicalManagerNfsError = null;

    try {
      const data = await technicalManagerApi.getTechnicalManagerNfs(query);
      runInAction(() => {
        this.technicalManagerNfs = data;
        this.technicalManagerNfsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.technicalManagerNfsError =
          error instanceof Error ? error.message : 'Erro desconhecido';
        this.technicalManagerNfsLoading = false;
      });
    }
  }

  async fetchTechnicalManagerNfItems(nf: string) {
    this.technicalManagerNfItemsLoading = true;
    this.technicalManagerNfItemsError = null;

    try {
      const data = await technicalManagerApi.getTechnicalManagerItems(nf);
      runInAction(() => {
        this.technicalManagerNfItems = data;
        this.technicalManagerNfItemsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.technicalManagerNfItemsError =
          error instanceof Error ? error.message : 'Erro desconhecido';
        this.technicalManagerNfItemsLoading = false;
      });
    }
  }

  async updateTechnicalManagerItem(
    nf: string,
    subItemId: number,
    payload: {
      action: 'approve' | 'reject';
    },
  ) {
    this.technicalManagerLoading = true;
    try {
      const result = await technicalManagerApi.updateTechnicalManagerItem(
        nf,
        subItemId,
        payload,
      );
      await this.fetchTechnicalManagerNfItems(nf);
      return result;
    } catch (error) {
      console.error('Erro ao atualizar item do gestor técnico:', error);
      throw error;
    } finally {
      this.technicalManagerLoading = false;
    }
  }

  async finishTechnicalManagerNf(itemId: number) {
    this.technicalManagerLoading = true;
    try {
      return await technicalManagerApi.finishTechnicalManagerNf(itemId);
    } catch (error) {
      console.error('Erro ao finalizar item do gestor técnico:', error);
      throw error;
    } finally {
      this.technicalManagerLoading = false;
    }
  }

  clearError() {
    this.technicalManagerNfsError = null;
    this.technicalManagerNfItemsError = null;
  }

  async getNfPdf(nf: string) {
    this.pdfLoading = true;
    try {
      const pdfUrl = await uisaApi.getNfPdf(nf);
      this.pdfUrl = pdfUrl;
    } finally {
      this.pdfLoading = false;
    }
  }

  clearPdfUrl() {
    this.pdfUrl = null;
  }
}
