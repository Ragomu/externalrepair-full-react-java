import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import uisaApi from '~/api/uisaApi';
import {
  WarehouseNfItem,
  WarehouseNfItemUpdate,
  WarehouseNfItemsResponse,
  WarehouseNfList,
  warehouseApi,
} from '~/api/warehouse';

export class WarehouseStore {
  warehouseNfs: WarehouseNfList[] = [];
  warehouseNfItems: WarehouseNfItem[] = [];
  warehouseNfData: WarehouseNfItemsResponse | null = null;
  pdfUrl: string | null = null;
  warehouseNfsLoading = false;
  warehouseNfItemsLoading = false;
  pdfLoading = false;

  searchTerm: string = '';
  selectedFilters: string[] = [];
  currentPage: number = 0;
  pageSize: number = 10;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'WarehouseStore',
      properties: ['searchTerm', 'selectedFilters', 'currentPage', 'pageSize'],
      expireIn: 30 * 60 * 1000, // 30 minutos para filtros
    });
  }

  setSearchTerm(term: string) {
    this.searchTerm = term;
    this.currentPage = 0;
  }

  setFilters(filters: string[]) {
    this.selectedFilters = filters;
    this.currentPage = 0;
  }

  setCurrentPage(page: number) {
    this.currentPage = page;
  }

  setPageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedFilters = [];
    this.currentPage = 0;
  }

  async fetchWarehouseNfs(query?: string) {
    if (query !== undefined) {
      this.setSearchTerm(query);
    }

    this.warehouseNfsLoading = true;
    try {
      let filters: string | undefined;
      const searchQuery = query || this.searchTerm;

      if (searchQuery?.trim()) {
        if (searchQuery.includes('=')) {
          filters = searchQuery;
        } else {
          filters = `query=${encodeURIComponent(searchQuery)}`;
        }
      }

      const response = await warehouseApi.getWarehouseNfs(filters);
      runInAction(() => {
        this.warehouseNfs = response;
        this.warehouseNfsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.warehouseNfsLoading = false;
      });
      console.error('Erro ao buscar NFs do almoxarifado:', error);
    }
  }

  async fetchWarehouseNfItems(nf: string) {
    this.warehouseNfItemsLoading = true;
    try {
      const response = await warehouseApi.getWarehouseNfItems(nf);
      runInAction(() => {
        this.warehouseNfData = response;
        this.warehouseNfItems = response.items || [];
        this.warehouseNfItemsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.warehouseNfItemsLoading = false;
      });
      console.error('Erro ao buscar itens do almoxarifado:', error);
    }
  }

  async updateWarehouseNfItem(
    nf: string,
    itemId: number,
    itemUpdate: WarehouseNfItemUpdate,
  ) {
    try {
      const response = await warehouseApi.updateWarehouseNfItem(
        nf,
        itemId,
        itemUpdate,
      );
      if (response.status === 200) {
        await this.fetchWarehouseNfItems(nf);
      }
      return response;
    } catch (error) {
      console.error('Erro ao atualizar item do almoxarifado:', error);
      throw error;
    }
  }

  getNfPdf = async (nf: string) => {
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
  };

  clearPdfUrl() {
    runInAction(() => {
      this.pdfUrl = null;
      this.pdfLoading = false;
    });
  }
}

export const warehouseStore = new WarehouseStore();
