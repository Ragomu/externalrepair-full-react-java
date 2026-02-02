import { makeAutoObservable, runInAction } from 'mobx';
import uisaApi from '~/api/uisaApi';
import { StorageService } from '~/services/storage';

export interface PhotoUploadItem {
  file: File;
  progress: number;
  url?: string;
}

export class ReceivingStore {
  updateStatus: number | null = null;
  updateData: any = null;
  loading = false;
  error: string | null = null;

  receivedNfList: ReceivedNfListItem[] = [];
  receivedNfListLoading = false;
  receivedNfListError: string | null = null;
  receivedNfListTableItems: ReceivingTableItem[] = [];

  uploadStatus: number | null = null;
  uploadData: any = null;

  photos: PhotoUploadItem[] = [];
  pdfUrl: string | null = null;
  pdfLoading = false;

  hasJustFinished = false;

  constructor() {
    makeAutoObservable(this);
  }

  private getSupplierDocument(): string {
    const supplierDocument = StorageService.getSupplierDocument();
    if (!supplierDocument || supplierDocument.trim() === '') {
      throw new Error('Supplier document not found');
    }
    return supplierDocument;
  }

  addPhoto(file: File) {
    this.photos.push({ file, progress: 0 });
  }

  setPhotoProgress(file: File, progress: number) {
    const photo = this.photos.find((p) => p.file === file);
    if (photo) photo.progress = progress;
  }

  removePhoto(file: File) {
    this.photos = this.photos.filter((p) => p.file !== file);
  }

  clearPhotos() {
    this.photos = [];
  }

  get onlyVisualize() {
    return this.hasPhotos;
  }

  get hasPhotos() {
    return this.loadedPhotos.length === 5;
  }

  get newPhotos() {
    return this.photos.filter((photo) => !photo.url);
  }

  get loadedPhotos() {
    return this.photos.filter((photo) => photo.url);
  }

  get canAddMorePhotos() {
    return this.newPhotos.length < 5;
  }

  async uploadAllPhotos() {
    this.loading = true;
    this.error = null;
    const nf = sessionStorage.getItem('selectedNf')!;
    if (!nf) {
      runInAction(() => {
        this.error = 'NF não selecionada.';
        this.loading = false;
      });
      return;
    }

    try {
      const photosToUpload = this.photos.filter((photo) => !photo.url);

      for (const photo of photosToUpload) {
        await uisaApi.uploadReceivedNfPhotos(nf, photo.file, (percent) => {
          this.setPhotoProgress(photo.file, percent);
        });
        this.setPhotoProgress(photo.file, 100);
      }
      runInAction(() => {
        this.loading = false;
        this.clearPhotos();
        this.hasJustFinished = true;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || 'Erro ao fazer upload de todas as fotos';
        this.loading = false;
      });
      throw err;
    }
  }

  async updateReceivedNfItem(nf: string, item: ReceivedNfItem) {
    this.loading = true;
    this.error = null;
    try {
      const response = await uisaApi.updateReceivedNfItem(nf, item);
      runInAction(() => {
        this.updateStatus = response.status;
        this.updateData = response.data;
        this.loading = false;
      });
      return response;
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || 'Erro ao atualizar item de recebimento';
        this.loading = false;
      });
      throw err;
    }
  }
  async fetchReceivedNfList(
    supplierDocument: string,
    status: string = 'all',
    query?: string,
  ) {
    this.receivedNfListLoading = true;
    this.receivedNfListError = null;
    try {
      const data = await uisaApi.getReceivedNfs(
        supplierDocument,
        status,
        query,
      );
      runInAction(() => {
        this.receivedNfListTableItems = data;
        this.receivedNfListLoading = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.receivedNfListError =
          err.message || 'Erro ao buscar lista de NF-e para recebimento';
        this.receivedNfListLoading = false;
      });
    }
  }

  async uploadReceivedNfPhotos(
    file: File,
    onProgress?: (percent: number) => void,
  ) {
    const nf = sessionStorage.getItem('selectedNf')!;
    this.loading = true;
    this.error = null;
    try {
      await uisaApi.uploadReceivedNfPhotos(nf, file, onProgress);
      runInAction(() => {
        this.loading = false;
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || 'Erro ao fazer upload de fotos';
        this.loading = false;
      });
      throw err;
    }
  }

  async getNfPhotos(nf: string) {
    const supplierDocument = this.getSupplierDocument();

    try {
      const photoUrls = await uisaApi.getNfPhotos(supplierDocument, nf);

      const photoItems: PhotoUploadItem[] = photoUrls.map((url, index) => ({
        file: new File([], `photo_${index + 1}.jpg`, { type: 'image/jpeg' }),
        progress: 100,
        url: url,
      }));

      runInAction(() => {
        this.photos = photoItems;
      });

      return photoUrls;
    } catch (error) {
      console.error('Erro ao carregar fotos da NF:', error);
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

  setHasJustFinished(value: boolean) {
    runInAction(() => {
      this.hasJustFinished = value;
    });
  }

  markAsJustFinished() {
    runInAction(() => {
      this.hasJustFinished = true;
    });
  }

  resetJustFinished() {
    runInAction(() => {
      this.hasJustFinished = false;
    });
  }
}
export const receivingStore = new ReceivingStore();
