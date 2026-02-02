import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import {
  AdditionalNf,
  FiscalNfItem,
  FiscalNfList,
  PartialFiscalResponse,
  fiscalApi,
} from '~/api/fiscal';
import uisaApi from '~/api/uisaApi';
import { StorageService } from '~/services';

export class FiscalStore {
  // -------- FISCAL COMPLETO ---------
  fiscalNfs: FiscalNfList[] = [];
  fiscalNfsLoading = false;
  fiscalNfsError: string | null = null;
  fiscalNfItems: FiscalNfItem | null = null;
  fiscalNfItemsLoading = false;
  fiscalNfItemsError: string | null = null;
  pdfUrl: string | null = null;
  pdfLoading = false;

  // -------- FISCAL PARCIAL ---------
  partialFiscalItems: PartialFiscalResponse | null = null;
  partialFiscalLoading = false;
  partialFiscalError: string | null = null;
  partialReturnFiscalNfPdfUrl: string | null = null;
  partialReturnFiscalNfPdfLoading = false;
  partialReturnFiscalNfPdfError: string | null = null;

  additionalNfs: AdditionalNf[] = [];
  additionalNfsLoading = false;
  additionalNfsError: string | null = null;
  searchTerm: string = '';
  selectedFilters: string[] = [];
  currentPage: number = 0;
  pageSize: number = 10;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'FiscalStore',
      properties: ['searchTerm', 'selectedFilters', 'currentPage', 'pageSize'],
      expireIn: 30 * 60 * 1000,
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

  async fetchFiscalNfs(query?: string) {
    if (query !== undefined) {
      this.setSearchTerm(query);
    }

    this.fiscalNfsLoading = true;
    this.fiscalNfsError = null;

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

      const response = await fiscalApi.getFiscalNfs(filters);
      runInAction(() => {
        this.fiscalNfs = response;
        this.fiscalNfsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.fiscalNfsError = error as string;
        this.fiscalNfsLoading = false;
      });
    }
  }

  async fetchFiscalNfItems(nfe: string) {
    this.fiscalNfItemsLoading = true;
    this.fiscalNfItemsError = null;
    try {
      const response = await fiscalApi.getFiscalNfItems(nfe);
      runInAction(() => {
        this.fiscalNfItems = response;
        this.fiscalNfItemsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.fiscalNfItemsError = error as string;
        this.fiscalNfItemsLoading = false;
      });
    }
  }

  async fetchAdditionalNfs(nfLink: string) {
    const supplierDocument = StorageService.getSupplierDocument();
    if (!supplierDocument || supplierDocument.trim() === '') {
      console.warn(
        'Supplier document não encontrado para buscar NFs adicionais',
      );
      return;
    }

    this.additionalNfsLoading = true;
    this.additionalNfsError = null;

    try {
      const response = await fiscalApi.getAdditionalNfs(nfLink);
      runInAction(() => {
        this.additionalNfs = response;
        this.additionalNfsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.additionalNfsError = error as string;
        this.additionalNfsLoading = false;
      });
    }
  }

  async fetchPartialFiscalItems(nf: string) {
    this.partialFiscalLoading = true;
    this.partialFiscalError = null;
    try {
      const data = await fiscalApi.getPartialFiscalItems(nf);
      runInAction(() => {
        this.partialFiscalItems = data;
        this.partialFiscalLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.partialFiscalError = error as string;
        this.partialFiscalLoading = false;
      });
    }
  }

  async approvePartialNf(nf: string, itemId: number, subItemId: number) {
    try {
      await fiscalApi.approvePartialNf(nf, itemId, subItemId);
      // Recarregar dados após aprovação
      await this.fetchPartialFiscalItems(nf);
    } catch (error: any) {
      // Capturar erro específico da API
      let errorMessage = 'Erro ao aprovar NF parcial. Tente novamente.';

      if (error.response?.status === 400) {
        errorMessage = `Dados inválidos: ${error.response.data?.message || 'Verifique os campos'}`;
      } else if (error.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error('Erro ao aprovar NF parcial:', error);
      throw new Error(errorMessage);
    }
  }

  async correctPartialNf(
    nf: string,
    itemId: number,
    subItemId: number,
    justification: string,
    returnNfNumber: string,
  ) {
    try {
      await fiscalApi.correctPartialNf(
        nf,
        itemId,
        subItemId,
        justification,
        returnNfNumber,
      );
      // Recarregar dados após correção
      await this.fetchPartialFiscalItems(nf);
    } catch (error: any) {
      // Capturar erro específico da API
      let errorMessage = 'Erro ao corrigir NF parcial. Tente novamente.';

      if (error.response?.status === 400) {
        errorMessage = `Dados inválidos: ${error.response.data?.message || 'Verifique os campos'}`;
      } else if (error.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente.';
      } else if (error.response?.status === 404) {
        errorMessage = 'NF parcial não encontrada.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      console.error('Erro ao corrigir NF parcial:', error);
      throw new Error(errorMessage);
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
      throw new Error(error as string);
    }
  };

  getReturnFiscalNfPdf = async (nf: string) => {
    runInAction(() => {
      this.pdfLoading = true;
      this.pdfUrl = 'loading';
    });

    try {
      const pdfUrl = await uisaApi.getReturnFiscalNfPdf(nf);

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
      throw new Error(error as string);
    }
  };

  getPartialReturnFiscalNfPdf = async (nf: string) => {
    runInAction(() => {
      this.pdfLoading = true;
      this.pdfUrl = 'loading';
      this.partialReturnFiscalNfPdfLoading = true;
      this.partialReturnFiscalNfPdfUrl = 'loading';
    });

    try {
      const pdfUrl = await uisaApi.getPartialReturnFiscalNfPdf(nf);

      runInAction(() => {
        this.pdfUrl = pdfUrl;
        this.pdfLoading = false;
        this.partialReturnFiscalNfPdfUrl = pdfUrl;
        this.partialReturnFiscalNfPdfLoading = false;
      });

      return pdfUrl;
    } catch (error) {
      runInAction(() => {
        this.pdfLoading = false;
        this.pdfUrl = null;
        this.partialReturnFiscalNfPdfLoading = false;
        this.partialReturnFiscalNfPdfUrl = null;
      });
    }
  };

  getAdditionalNfPdf = async (link: string) => {
    runInAction(() => {
      this.pdfLoading = true;
      this.pdfUrl = 'loading';
    });

    try {
      const resp = await fetch(link, { mode: 'cors' });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);

      runInAction(() => {
        this.pdfUrl = url;
        this.pdfLoading = false;
      });
      return url;
    } catch (error) {
      runInAction(() => {
        this.pdfLoading = false;
        this.pdfUrl = null;
      });
      throw new Error(error as string);
    }
  };

  clearPdfUrl() {
    if (this.pdfUrl && this.pdfUrl.startsWith('blob:')) {
      URL.revokeObjectURL(this.pdfUrl);
    }
    runInAction(() => {
      this.pdfUrl = null;
      this.pdfLoading = false;
    });
  }

  clearAdditionalNfs() {
    runInAction(() => {
      this.additionalNfs = [];
      this.additionalNfsLoading = false;
      this.additionalNfsError = null;
    });
  }

  async approveNf(nf: string) {
    try {
      await fiscalApi.approveNf(nf);
    } catch (error: any) {
      // Capturar erro específico da API
      let errorMessage = 'Erro ao aprovar NF. Tente novamente.';

      if (error.response?.status === 400) {
        errorMessage = `Dados inválidos: ${error.response.data?.message || 'Verifique os campos'}`;
      } else if (error.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }

  async correctNf(nf: string, instructions: string) {
    const returnNf = this.fiscalNfItems?.returnNf || '';

    try {
      await fiscalApi.correctNf(nf, instructions, returnNf);
    } catch (error: any) {
      // Capturar erro específico da API
      let errorMessage = 'Erro ao corrigir NF. Tente novamente.';

      if (error.response?.status === 400) {
        errorMessage = `Dados inválidos: ${error.response.data?.message || 'Verifique os campos'}`;
      } else if (error.response?.status === 500) {
        errorMessage = 'Erro interno do servidor. Tente novamente.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }
}
