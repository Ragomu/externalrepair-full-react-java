import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import {
  CounterpartyNfItemsResponse,
  CounterpartyNfList,
  counterpartyApi,
} from '~/api/counterparty';
import { uisaApi } from '~/api/uisaApi';

export class CounterpartyStore {
  counterpartyNfs: CounterpartyNfList[] = [];
  counterpartyNfsLoading = false;
  counterpartyNfsError: string | null = null;
  pdfUrl: string | null = null;
  pdfLoading = false;
  counterpartyNfItems: CounterpartyNfItemsResponse | null = null;
  counterpartyNfItemsLoading = false;
  counterpartyNfItemsError: string | null = null;
  counterpartyLoading = false;
  searchTerm: string = '';
  selectedFilters: string[] = [];
  currentPage: number = 0;
  pageSize: number = 10;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'CounterpartyStore',
      properties: ['searchTerm', 'selectedFilters', 'currentPage', 'pageSize'],
      expireIn: 30 * 60 * 1000,
    });
  }

  async fetchCounterpartyNfs(filters?: string) {
    this.counterpartyNfsLoading = true;
    this.counterpartyNfsError = null;

    try {
      const data = await counterpartyApi.getCounterpartyNfItems(filters);
      runInAction(() => {
        this.counterpartyNfs = data;
        this.counterpartyNfsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.counterpartyNfsError =
          error instanceof Error ? error.message : 'Erro desconhecido';
        this.counterpartyNfsLoading = false;
      });
    }
  }

  async fetchCounterpartyNfItems(nf: string) {
    this.counterpartyNfItemsLoading = true;
    this.counterpartyNfItemsError = null;

    try {
      const data = await counterpartyApi.getCounterpartyItems(nf);
      runInAction(() => {
        this.counterpartyNfItems = data;
        this.counterpartyNfItemsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.counterpartyNfItemsError =
          error instanceof Error ? error.message : 'Erro desconhecido';
        this.counterpartyNfItemsLoading = false;
      });
    }
  }

  async updateCounterpartyNfItem(
    nf: string,
    subItemId: number,
    payload: {
      action: 'sell' | 'discard' | 'return';
      quantity: number;
    },
  ) {
    this.counterpartyLoading = true;
    try {
      const result = await counterpartyApi.updateCounterpartyItem(
        nf,
        subItemId,
        payload,
      );
      await this.fetchCounterpartyNfItems(nf);
      return result;
    } catch (error) {
      console.error('Erro ao atualizar item de contraparte:', error);
      throw error;
    } finally {
      this.counterpartyLoading = false;
    }
  }

  async deleteCounterpartyItem(subItemId: number) {
    this.counterpartyLoading = true;
    try {
      return await counterpartyApi.deleteCounterpartyItem(subItemId);
    } catch (error) {
      console.error('Erro ao excluir item de contraparte:', error);
      throw error;
    } finally {
      this.counterpartyLoading = false;
    }
  }

  async finishCounterpartyItem(itemId: number) {
    this.counterpartyLoading = true;
    try {
      return await counterpartyApi.finishCounterpartyItem(itemId);
    } catch (error) {
      console.error('Erro ao finalizar item de contraparte:', error);
      throw error;
    } finally {
      this.counterpartyLoading = false;
    }
  }

  clearError() {
    this.counterpartyNfsError = null;
    this.counterpartyNfItemsError = null;
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
