import { makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';

export class AppStore {
  selectedNf: string | null = null;
  currentRoute: string | null = null;

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== 'undefined') {
      makePersistable(this, {
        name: 'AppStore',
        properties: ['selectedNf'],
        storage: sessionStorage,
      });
    }
  }

  setSelectedNf(nf: string) {
    this.selectedNf = nf;
  }

  clearSelectedNf() {
    this.selectedNf = null;
  }

  setCurrentRoute(route: string) {
    this.currentRoute = route;
  }
}
