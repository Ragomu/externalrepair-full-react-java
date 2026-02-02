import { Routes } from '~/routes';
import { StorageService } from '~/services';
import { GuardAsync } from '~/utils/types';

export const guard = async (): ReturnType<GuardAsync> => {
  if (!StorageService.getToken()) {
    window.location.href = Routes.LOGIN;
  }
};
