import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { isEmpty } from 'lodash';
import { useSSR } from 'use-ssr';
import { Routes } from '~/routes';
import { StorageService } from '~/services';
import { ExpiredSessionError } from '~/utils';

const { isBrowser } = useSSR();

export const successResponse = (response: AxiosResponse): AxiosResponse => {
  if (response.config.responseType === 'blob') {
    return response;
  }

  if (response.headers['content-type']?.includes('application/octet-stream')) {
    try {
      const text = response.data.toString();
      response.data = JSON.parse(text);
    } catch (e) {
      console.warn('Não foi possível converter a resposta para JSON:', e);
    }
  }
  return response;
};

export const addAuthHeaders = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const token: AccessToken | null = StorageService.getToken();

  if (!token || isEmpty(token) || !token.access_token) {
    console.warn(
      '[AuthHeaders] Token não encontrado ou inválido no StorageService.',
    );
    return config;
  }

  const tid = new Date().getUTCMilliseconds().toString();
  config.headers.set('tid', tid);
  config.headers.set('Authorization', `Bearer ${token.access_token}`);

  const supplierDocument = StorageService.getSupplierDocument();
  if (supplierDocument && supplierDocument.trim() !== '') {
    config.headers.set('supplierDocument', supplierDocument);
  }

  return config;
};

export const verifyExpiredToken = (
  error: ErrorResponse,
): ExpiredSessionError | ErrorResponse => {
  const expiredSessionError = 401;
  if (error?.response?.status === expiredSessionError) {
    StorageService.setToken(null);
    if (isBrowser) {
      window.location.href = Routes.LOGIN;
    }
    throw new ExpiredSessionError();
  }
  throw error;
};
