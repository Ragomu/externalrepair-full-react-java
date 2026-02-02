import { makeAutoObservable, runInAction } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import uisaApi, { HistoryItemResponse, HistoryResponse } from '~/api/uisaApi';
import { TimelineApiResponse } from '~/utils/types/Timeline';

export class HistoryStore {
  items: HistoryItemResponse[] = [];
  totalItems = 0;
  totalPages = 0;
  currentPage = 0;
  loading = false;
  error: string | null = null;
  selectedNf: string | null = null;
  selectedStatus: string = 'all';
  receivedNfDetails: ReceivedNfItemsResponse | null = null;
  firstFilter = 'Item';
  secondFilter = 'NF-e';
  thirdFilter = 'Valor';
  receivedNfList: ReceivedNfListItem[] = [];
  receivedNfListLoading = false;
  receivedNfListError: string | null = null;

  timelineData: TimelineApiResponse = {} as TimelineApiResponse;
  timelineLoading = false;
  timelineError: string | null = null;

  constructor() {
    makeAutoObservable(this);

    if (typeof window !== 'undefined') {
      makePersistable(this, {
        name: 'HistoryStore',
        properties: [
          'receivedNfDetails',
          'selectedStatus',
          'firstFilter',
          'secondFilter',
          'thirdFilter',
        ],
        storage: sessionStorage,
        expireIn: 2 * 60 * 60 * 1000,
      });
    }
  }

  setSelectedStatus(status: string) {
    this.selectedStatus = status;
  }

  async fetchHistory(
    supplierDocument: string,
    page: number = 0,
    size: number = 10,
  ) {
    this.loading = true;
    this.error = null;
    try {
      const data: HistoryResponse = await uisaApi.getHistory(
        supplierDocument,
        page,
        size,
      );
      runInAction(() => {
        this.items = data.items;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        this.loading = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || 'Erro ao buscar histórico';
        this.loading = false;
      });
    }
  }

  async fetchHistoryWithStatus(
    supplierDocument: string,
    status: string = 'all',
    page: number = 0,
    size: number = 10,
    query?: string,
  ) {
    this.loading = true;
    this.error = null;
    try {
      const data: HistoryResponse = await uisaApi.getHistoryWithStatus(
        supplierDocument,
        status,
        page,
        size,
        query,
      );
      runInAction(() => {
        this.items = data.items;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        this.loading = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || 'Erro ao buscar histórico';
        this.loading = false;
      });
    }
  }

  async fetchReceivedNfItems(nf: string) {
    this.loading = true;
    this.error = null;
    try {
      const data: ReceivedNfItemsResponse =
        await uisaApi.getReceivedNfItems(nf);
      runInAction(() => {
        this.receivedNfDetails = data;
        this.loading = false;
      });
      return data;
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || 'Erro ao buscar itens da NF';
        this.loading = false;
      });
    }
  }

  clearReceivedNfDetails() {
    runInAction(() => {
      this.receivedNfDetails = null;
    });
  }

  setFirstFilter(value: string) {
    this.firstFilter = value;
  }

  setSecondFilter(value: string) {
    this.secondFilter = value;
  }

  setThirdFilter(value: string) {
    this.thirdFilter = value;
  }

  async fetchTimeline(nf: string) {
    this.timelineLoading = true;
    this.timelineError = null;

    try {
      const data = await uisaApi.getTimeline(nf);
      runInAction(() => {
        this.timelineData = data;
        this.timelineLoading = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.timelineError = err.message || 'Erro ao buscar timeline';
        this.timelineLoading = false;
      });
    }
  }

  clearTimeline() {
    runInAction(() => {
      this.timelineData = {} as TimelineApiResponse;
      this.timelineError = null;
    });
  }
}

export const historyStore = new HistoryStore();
