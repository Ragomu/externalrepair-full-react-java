import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export type Theme = 'light' | 'dark' | 'auto';
export type Language = 'pt' | 'en';

export class SettingsStore {
  theme: Theme = 'light';
  language: Language = 'pt';
  pageSize: number = 10;
  showNotifications: boolean = true;
  autoRefresh: boolean = false;
  refreshInterval: number = 30000; // 30 segundos

  // Preferências de exibição
  compactMode: boolean = false;
  showAdvancedFilters: boolean = false;
  sidebarExpanded: boolean = true;

  // Preferências de dados
  rememberFilters: boolean = true;
  cacheTimeout: number = 5 * 60 * 1000; // 5 minutos

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: 'SettingsStore',
      properties: [
        'theme',
        'language',
        'pageSize',
        'showNotifications',
        'autoRefresh',
        'refreshInterval',
        'compactMode',
        'showAdvancedFilters',
        'sidebarExpanded',
        'rememberFilters',
        'cacheTimeout',
      ],
      // Configurações nunca expiram
    });
  }

  setTheme(theme: Theme) {
    this.theme = theme;
  }

  setLanguage(language: Language) {
    this.language = language;
  }

  setPageSize(size: number) {
    if (size > 0 && size <= 100) {
      this.pageSize = size;
    }
  }

  setShowNotifications(show: boolean) {
    this.showNotifications = show;
  }

  setAutoRefresh(enabled: boolean) {
    this.autoRefresh = enabled;
  }

  setRefreshInterval(interval: number) {
    if (interval >= 10000) {
      // Mínimo 10 segundos
      this.refreshInterval = interval;
    }
  }

  setCompactMode(compact: boolean) {
    this.compactMode = compact;
  }

  setShowAdvancedFilters(show: boolean) {
    this.showAdvancedFilters = show;
  }

  setSidebarExpanded(expanded: boolean) {
    this.sidebarExpanded = expanded;
  }

  setRememberFilters(remember: boolean) {
    this.rememberFilters = remember;
  }

  setCacheTimeout(timeout: number) {
    if (timeout >= 60000) {
      // Mínimo 1 minuto
      this.cacheTimeout = timeout;
    }
  }

  // Métodos de conveniência
  toggleCompactMode() {
    this.compactMode = !this.compactMode;
  }

  toggleSidebar() {
    this.sidebarExpanded = !this.sidebarExpanded;
  }

  toggleAdvancedFilters() {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  // Reset para configurações padrão
  resetToDefaults() {
    this.theme = 'light';
    this.language = 'pt';
    this.pageSize = 10;
    this.showNotifications = true;
    this.autoRefresh = false;
    this.refreshInterval = 30000;
    this.compactMode = false;
    this.showAdvancedFilters = false;
    this.sidebarExpanded = true;
    this.rememberFilters = true;
    this.cacheTimeout = 5 * 60 * 1000;
  }
}
