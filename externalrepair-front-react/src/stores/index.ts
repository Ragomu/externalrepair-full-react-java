import { configurePersistable } from 'mobx-persist-store';
import { AppStore } from './app.store';
import { CounterpartyStore } from './counterparty.store';
import { FiscalStore } from './fiscal.store';
import { HistoryStore } from './history.store';
import { LogisticsStore } from './logistics.store';
import { MaintenanceStore } from './maintenance.store';
import { ReceivingStore } from './receiving.store';
import { SettingsStore } from './settings.store';
import { TechnicalManagerStore } from './technicalManager.store';
import { UserStore } from './user.store';
import { WarehouseStore } from './warehouse.store';

configurePersistable(
  {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    expireIn: 24 * 60 * 60 * 1000,
    removeOnExpiration: true,
    debugMode: process.env.NODE_ENV === 'development',
    stringify: true,
  },
  {
    delay: 300,
    fireImmediately: false,
  },
);

class RootStore {
  appStore: AppStore;
  userStore: UserStore;
  settingsStore: SettingsStore;
  historyStore: HistoryStore;
  receivingStore: ReceivingStore;
  maintenanceStore: MaintenanceStore;
  fiscalStore: FiscalStore;
  warehouseStore: WarehouseStore;
  logisticsStore: LogisticsStore;
  counterpartyStore: CounterpartyStore;
  technicalManagerStore: TechnicalManagerStore;

  constructor() {
    this.appStore = new AppStore();
    this.userStore = new UserStore();
    this.settingsStore = new SettingsStore();
    this.historyStore = new HistoryStore();
    this.receivingStore = new ReceivingStore();
    this.maintenanceStore = new MaintenanceStore();
    this.fiscalStore = new FiscalStore();
    this.warehouseStore = new WarehouseStore();
    this.logisticsStore = new LogisticsStore();
    this.counterpartyStore = new CounterpartyStore();
    this.technicalManagerStore = new TechnicalManagerStore();
  }
}

const rootStore = new RootStore();

const useStore = () => ({ ...rootStore });

export {
  useStore,
  RootStore,
  AppStore,
  UserStore,
  SettingsStore,
  HistoryStore,
  FiscalStore,
  WarehouseStore,
  LogisticsStore,
  CounterpartyStore,
  TechnicalManagerStore,
};
