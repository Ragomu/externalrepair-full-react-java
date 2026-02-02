import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import maintenanceApi, {
  CompleteMaintenancePayload,
  FlagSubItemPayload,
  MaintenanceNfResponse,
  MaintenanceResponse,
  PartialMaintenanceResponse,
} from '~/api/maintenance';
import uisaApi from '~/api/uisaApi';
import { StorageService } from '~/services';

export class MaintenanceStore {
  maintenanceNfs: MaintenanceResponse[] = [];
  maintenanceNfsLoading = false;
  maintenanceNfsError: string | null = null;
  maintenanceNfItems: MaintenanceNfResponse | null = null;
  maintenanceNfItemsLoading = false;
  maintenanceNfItemsError: string | null = null;
  maintenanceNfPdfUrl: string | null = null;
  maintenanceNfPdfLoading = false;
  selectedMaintenanceType: 'complete' | 'partial' | 'none' | null = null;
  completeMaintenance: CompleteMaintenancePayload | null = null;
  completeMaintenanceLoading = false;
  completeMaintenanceError: string | null = null;
  completeMaintenanceStatus: number | null = null;
  completeMaintenanceItemsStatus: string | null = null;

  // PARCIAL
  partialNfItems: PartialMaintenanceResponse | null = null;
  partialLoading = false;
  partialError: string | null = null;

  // Constantes para mensagens de error
  private readonly ERROR_MESSAGES = {
    DEFAULT: 'Erro ao processar solicitação. Tente novamente.',
    INVALID_DATA: 'Dados inválidos: Verifique os campos',
    SERVER_ERROR: 'Erro interno do servidor. Tente novamente.',
    NOT_FOUND: 'Item não encontrado.',
    PARTIAL_MAINTENANCE:
      'Erro ao buscar itens parciais de manutenção. Tente novamente.',
    PDF_ERROR: 'Erro ao buscar PDF da NF. Tente novamente.',
    FINISH_PARTIAL: 'Erro ao finalizar manutenção parcial. Tente novamente.',
    DELETE_SUB_ITEM: 'Erro ao deletar sub-item. Tente novamente.',
    SEND_CORRECTION: 'Erro ao enviar correção. Tente novamente.',
    PARTIAL_NOT_FOUND: 'NF parcial não encontrada.',
    PDF_NOT_FOUND: 'PDF da NF não encontrado.',
    CHECK_FIELDS: 'Verifique os campos obrigatórios',
    MAINTENANCE_NOT_FOUND: 'NF de manutenção não encontrada.',
    MAINTENANCE_ITEMS: 'Erro ao buscar itens de manutenção. Tente novamente.',
  };

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: this.constructor.name,
      properties: ['selectedMaintenanceType'],
    });
  }

  private getSupplierDocument(): string {
    const supplierDocument = StorageService.getSupplierDocument();
    if (!supplierDocument || supplierDocument.trim() === '') {
      throw new Error(
        'Supplier document não encontrado para a requisição /manutencao.',
      );
    }
    return supplierDocument;
  }

  async fetchMaintenanceNfs(query?: string) {
    const supplierDocument = this.getSupplierDocument();
    this.maintenanceNfsLoading = true;
    this.maintenanceNfsError = null;
    try {
      let filters: string | undefined;

      if (query?.trim()) {
        if (query.includes('=')) {
          filters = query;
        } else {
          filters = `query=${encodeURIComponent(query)}`;
        }
      }

      const response = await maintenanceApi.getMaintenanceNfs(
        supplierDocument,
        filters,
      );
      runInAction(() => {
        this.maintenanceNfs = response;
        this.maintenanceNfsLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.maintenanceNfsError = error as string;
        this.maintenanceNfsLoading = false;
      });
    }
  }

  async fetchMaintenanceNfItems(nfe: string) {
    const supplierDocument = this.getSupplierDocument();
    this.maintenanceNfItemsLoading = true;
    this.maintenanceNfItemsError = null;
    try {
      const response = await maintenanceApi.getMaintenanceNfItems(
        supplierDocument,
        nfe,
      );

      runInAction(() => {
        this.maintenanceNfItems = response;
        this.maintenanceNfItemsLoading = false;
      });
    } catch (error: any) {
      // Capturar erro específico da API
      let errorMessage = this.ERROR_MESSAGES.MAINTENANCE_ITEMS;

      if (error.response?.status === 400) {
        errorMessage = `${this.ERROR_MESSAGES.INVALID_DATA}: ${error.response.data?.message || this.ERROR_MESSAGES.CHECK_FIELDS}`;
      } else if (error.response?.status === 500) {
        errorMessage = this.ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.response?.status === 404) {
        errorMessage = this.ERROR_MESSAGES.MAINTENANCE_NOT_FOUND;
      } else if (error.message) {
        errorMessage = error.message;
      }

      runInAction(() => {
        this.maintenanceNfItemsError = errorMessage;
        this.maintenanceNfItemsLoading = false;
      });

      throw new Error(errorMessage);
    }
  }

  // ---------- PARCIAL ----------
  async fetchPartialNfItems(nf: string) {
    const supplierDocument = this.getSupplierDocument();
    this.partialLoading = true;
    this.partialError = null;
    try {
      const resp = await maintenanceApi.getPartialMaintenanceSubItems(
        supplierDocument,
        nf,
      );
      runInAction(() => {
        this.partialNfItems = resp;
        this.partialLoading = false;
      });
    } catch (error: any) {
      // Capturar erro específico da API
      let errorMessage = this.ERROR_MESSAGES.PARTIAL_MAINTENANCE;

      if (error.response?.status === 400) {
        errorMessage = `${this.ERROR_MESSAGES.INVALID_DATA}: ${error.response.data?.message || this.ERROR_MESSAGES.CHECK_FIELDS}`;
      } else if (error.response?.status === 500) {
        errorMessage = this.ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.response?.status === 404) {
        errorMessage = this.ERROR_MESSAGES.PARTIAL_NOT_FOUND;
      } else if (error.message) {
        errorMessage = error.message;
      }

      runInAction(() => {
        this.partialError = errorMessage;
        this.partialLoading = false;
      });

      throw new Error(errorMessage);
    }
  }

  async flagSubItem(
    nf: string,
    payload: {
      request: FlagSubItemPayload;
      returnNfFile: File | null;
      additionalNfFiles: File[];
    },
  ) {
    const supplierDocument = this.getSupplierDocument();
    this.partialLoading = true;
    this.partialError = null;
    try {
      const status = await maintenanceApi.flagSubItem(
        supplierDocument,
        nf,
        payload,
      );

      runInAction(() => {
        this.partialLoading = false;
      });
      return status;
    } catch (error: any) {
      // Capturar erro específico da API
      let errorMessage = this.ERROR_MESSAGES.DEFAULT;

      if (error.response?.status === 400) {
        errorMessage = `${this.ERROR_MESSAGES.INVALID_DATA}: ${error.response.data?.message || this.ERROR_MESSAGES.CHECK_FIELDS}`;
      } else if (error.response?.status === 500) {
        errorMessage = this.ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.message) {
        errorMessage = error.message;
      }

      runInAction(() => {
        this.partialError = errorMessage;
        this.partialLoading = false;
      });

      throw new Error(errorMessage);
    }
  }

  getNfPdf = async (nf: string) => {
    runInAction(() => {
      this.maintenanceNfPdfLoading = true;
      this.maintenanceNfPdfUrl = 'loading';
    });

    try {
      const pdfUrl = await uisaApi.getNfPdf(nf);

      runInAction(() => {
        this.maintenanceNfPdfUrl = pdfUrl;
        this.maintenanceNfPdfLoading = false;
      });

      return pdfUrl;
    } catch (error: any) {
      // Capturar erro específico da API
      let errorMessage = this.ERROR_MESSAGES.PDF_ERROR;

      if (error.response?.status === 400) {
        errorMessage = `${this.ERROR_MESSAGES.INVALID_DATA}: ${error.response.data?.message || this.ERROR_MESSAGES.CHECK_FIELDS}`;
      } else if (error.response?.status === 500) {
        errorMessage = this.ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.response?.status === 404) {
        errorMessage = this.ERROR_MESSAGES.PDF_NOT_FOUND;
      } else if (error.message) {
        errorMessage = error.message;
      }

      runInAction(() => {
        this.maintenanceNfPdfLoading = false;
        this.maintenanceNfPdfUrl = null;
      });

      throw new Error(errorMessage);
    }
  };

  clearPdfUrl() {
    runInAction(() => {
      this.maintenanceNfPdfUrl = null;
      this.maintenanceNfPdfLoading = false;
    });
  }

  async updateMaintenanceNf(nfe: string, payload: CompleteMaintenancePayload) {
    const supplierDocument = this.getSupplierDocument();
    this.completeMaintenanceLoading = true;
    this.completeMaintenanceError = null;
    try {
      const response: number = await maintenanceApi.updateMaintenanceNf(
        supplierDocument,
        nfe,
        payload,
      );

      if (response >= 200 && response < 300) {
        runInAction(() => {
          this.completeMaintenanceStatus = response;
          this.completeMaintenanceLoading = false;
        });
      } else {
        throw new Error(`Erro HTTP ${response}: Operação não foi bem-sucedida`);
      }
    } catch (error) {
      runInAction(() => {
        this.completeMaintenanceError = error as string;
        this.completeMaintenanceLoading = false;
      });
      throw error;
    }
  }

  async finishPartialItemsMaintenance(nf: string, itemId: number) {
    const supplierDocument = this.getSupplierDocument();
    this.partialLoading = true;
    this.partialError = null;
    try {
      const status = await maintenanceApi.finishPartialItemsMaintenance(
        supplierDocument,
        nf,
        { id: itemId },
      );
      runInAction(() => {
        this.partialLoading = false;
      });
      return status;
    } catch (error: any) {
      // Capturar erro específico da API
      let errorMessage = this.ERROR_MESSAGES.FINISH_PARTIAL;

      if (error.response?.status === 400) {
        errorMessage = `${this.ERROR_MESSAGES.INVALID_DATA}: ${error.response.data?.message || this.ERROR_MESSAGES.CHECK_FIELDS}`;
      } else if (error.response?.status === 500) {
        errorMessage = this.ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.message) {
        errorMessage = error.message;
      }

      runInAction(() => {
        this.partialError = errorMessage;
        this.partialLoading = false;
      });

      throw new Error(errorMessage);
    }
  }

  async getMaintenanceNfType(nf: string) {
    const supplierDocument = this.getSupplierDocument();
    try {
      const response: { type: string } =
        await maintenanceApi.getMaintenanceNfType(supplierDocument, nf);
      runInAction(() => {
        this.selectedMaintenanceType = response.type as
          | 'partial'
          | 'complete'
          | 'none';
      });
    } catch (error) {
      console.error('Erro ao buscar o tipo da NF:', error);
      return null;
    }
  }

  // Deletar sub-item
  async deleteSubItem(subItemId: number) {
    this.partialLoading = true;
    this.partialError = null;
    try {
      const status = await maintenanceApi.deleteSubItem(subItemId);

      runInAction(() => {
        this.partialLoading = false;
      });

      return status;
    } catch (error: any) {
      let errorMessage = this.ERROR_MESSAGES.DELETE_SUB_ITEM;

      if (error.response?.status === 400) {
        errorMessage = `${this.ERROR_MESSAGES.INVALID_DATA}: ${error.response.data?.message || this.ERROR_MESSAGES.CHECK_FIELDS}`;
      } else if (error.response?.status === 500) {
        errorMessage = this.ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.response?.status === 404) {
        errorMessage = this.ERROR_MESSAGES.NOT_FOUND;
      } else if (error.message) {
        errorMessage = error.message;
      }

      runInAction(() => {
        this.partialError = errorMessage;
        this.partialLoading = false;
      });

      throw new Error(errorMessage);
    }
  }

  async sendDiscardReport(subItemId: number, file: File) {
    this.partialLoading = true;
    this.partialError = null;
    try {
      const status = await maintenanceApi.sendDiscardReport(subItemId, file);
      runInAction(() => {
        this.partialLoading = false;
      });
      return status;
    } catch (error: any) {
      let errorMessage = 'Erro ao enviar laudo de descarte. Tente novamente.';
      if (error.response?.status === 400) {
        errorMessage = `${this.ERROR_MESSAGES.INVALID_DATA}: ${error.response.data?.message || this.ERROR_MESSAGES.CHECK_FIELDS}`;
      } else if (error.response?.status === 500) {
        errorMessage = this.ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.message) {
        errorMessage = error.message;
      }
      runInAction(() => {
        this.partialError = errorMessage;
        this.partialLoading = false;
      });
      throw new Error(errorMessage);
    }
  }

  // Enviar correção de sub-item
  async sendCorrectionSubItem(
    nf: string,
    payload: {
      subItemId: number;
      returnNfNumber: string;
      returnNfDate: string;
      returnQuantity: number;
    },
    returnNfFile: File,
  ) {
    const supplierDocument = this.getSupplierDocument();
    this.partialLoading = true;
    this.partialError = null;

    try {
      const status = await maintenanceApi.sendCorrectionSubItem(
        supplierDocument,
        nf,
        payload,
        returnNfFile,
      );

      runInAction(() => {
        this.partialLoading = false;
      });

      return status;
    } catch (error: any) {
      let errorMessage = this.ERROR_MESSAGES.SEND_CORRECTION;

      if (error.response?.status === 400) {
        errorMessage = `${this.ERROR_MESSAGES.INVALID_DATA}: ${error.response.data?.message || this.ERROR_MESSAGES.CHECK_FIELDS}`;
      } else if (error.response?.status === 500) {
        errorMessage = this.ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.message) {
        errorMessage = error.message;
      }

      runInAction(() => {
        this.partialError = errorMessage;
        this.partialLoading = false;
      });

      throw new Error(errorMessage);
    }
  }

  // Marcar sub-item como irreparável
  async flagIrreparableSubItem(
    nf: string,
    payload: {
      itemId: number;
      quantity: number;
      destinyItem: string;
    },
  ) {
    const supplierDocument = this.getSupplierDocument();
    this.partialLoading = true;
    this.partialError = null;

    try {
      const status = await maintenanceApi.flagIrreparableSubItem(
        supplierDocument,
        nf,
        payload,
      );

      runInAction(() => {
        this.partialLoading = false;
      });

      return status;
    } catch (error: any) {
      let errorMessage =
        'Erro ao marcar item como irreparável. Tente novamente.';

      if (error.response?.status === 400) {
        errorMessage = `${this.ERROR_MESSAGES.INVALID_DATA}: ${error.response.data?.message || this.ERROR_MESSAGES.CHECK_FIELDS}`;
      } else if (error.response?.status === 500) {
        errorMessage = this.ERROR_MESSAGES.SERVER_ERROR;
      } else if (error.message) {
        errorMessage = error.message;
      }

      runInAction(() => {
        this.partialError = errorMessage;
        this.partialLoading = false;
      });

      throw new Error(errorMessage);
    }
  }
}
export const maintenanceStore = new MaintenanceStore();
