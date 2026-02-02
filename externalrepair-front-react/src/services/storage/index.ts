import { useSSR } from 'use-ssr';
import Keys from './keys';

const { isBrowser } = useSSR();
const Storage = isBrowser ? window.localStorage : null;

const clearWholeStorage = (): void => {
  Storage && Storage.clear();
};

const getToken = (): AccessToken | null => {
  const value = Storage?.getItem(Keys.token);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

const setToken = (token: AccessToken | null): void => {
  const item = JSON.stringify(token);
  Storage && Storage.setItem(Keys.token, item);
};

const getSupplierDocument = (): string | null => {
  const value = Storage?.getItem(Keys.supplierDocument);
  return value || null;
};

const setSupplierDocument = (document: string): void => {
  Storage && Storage.setItem(Keys.supplierDocument, document);
};

const getUserTheme = (): string | null => {
  const value = Storage?.getItem(Keys.userTheme);
  return value || null;
};

const setUserTheme = (theme: string): void => {
  Storage && Storage.setItem(Keys.userTheme, theme);
};

const getUserData = (): User | null => {
  const value = Storage?.getItem('UserStore2');
  if (!value) return null;
  try {
    const parsed = JSON.parse(value);
    return parsed?.userData || null;
  } catch {
    return null;
  }
};

const getUserNameFromStore = (): string | null => {
  const userData = getUserData();
  return userData?.name || null;
};

const getUserNameWithFallback = (): string => {
  const userData = getUserData();
  return userData?.name || 'Usuário';
};

export const StorageService = {
  clearWholeStorage,
  getToken,
  setToken,
  getSupplierDocument,
  setSupplierDocument,
  getUserTheme,
  setUserTheme,
  getUserData,
  getUserNameFromStore,
  getUserNameWithFallback,
};
