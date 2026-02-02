import { makeAutoObservable, runInAction } from 'mobx';
import { clearPersistedStore, makePersistable } from 'mobx-persist-store';
import { enableStaticRendering } from 'mobx-react';
import { login } from '~/api/auth/auth.api';
import { Routes } from '~/routes';
import { StorageService, navigateTo } from '~/services';
import { ResponseError } from '~/utils';

const clearAllPersistedStores = () => {
  if (typeof window !== 'undefined') {
    const keysToRemove = [
      'MaintenanceStore',
      'MaintenanceStore2',
      'FiscalStore',
      'LogisticsStore',
      'ReceivingStore',
      'HistoryStore',
      'WarehouseStore',
      'CounterpartyStore',
      'TechnicalManagerStore',
      'AppStore',
      'SettingsStore',
      'UserStore2',
      'SUPPLIER_DOCUMENT',
    ];

    keysToRemove.forEach((key) => {
      localStorage.removeItem(key);
    });
  }
};

enableStaticRendering(typeof window === 'undefined');

export class UserStore {
  userData: User = {} as User;
  isAuthenticated = false;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    makePersistable(this, {
      name: this.constructor.name,
      properties: ['userData'],
    });
    this.isAuthenticated = !!StorageService.getToken();
  }

  get getUserEmail(): string {
    return this.userData.email;
  }

  get userName(): string {
    return this.userData?.name || 'Usuário';
  }

  get isUisa(): boolean {
    return this.userData?.role !== 'SUPPLIER';
  }

  get userDataFromStore(): User | null {
    return this.userData || null;
  }

  login = async (email: string, password: string) => {
    try {
      this.loading = true;
      this.error = null;
      const payload = { email, password };
      const response = await login(payload);
      runInAction(() => {
        this.isAuthenticated = true;
        this.userData = response.user;
      });
      navigateTo(Routes.HOME);
      return response;
    } catch (error) {
      this.error = error.response?.data?.message || 'Erro ao fazer login';
      throw new ResponseError(error);
    } finally {
      this.loading = false;
    }
  };

  logout = async (): Promise<void> => {
    runInAction(() => {
      StorageService.setToken(null);
      StorageService.setSupplierDocument(''); // Limpa explicitamente o supplierDocument
      this.userData = {} as User;
      this.isAuthenticated = false;
      this.error = null;
    });

    try {
      // Limpa todos os stores persistidos
      await clearPersistedStore(this);

      // Limpa manualmente outros stores que podem estar persistidos
      clearAllPersistedStores();
    } catch (error) {
      console.warn('Erro ao limpar dados persistidos:', error);
    }

    window.location.href = Routes.LOGIN;
  };

  clearError = () => {
    this.error = null;
  };
}
