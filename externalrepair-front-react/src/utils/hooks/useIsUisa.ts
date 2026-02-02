import { useStore } from '~/stores';

export const useIsUisa = () => {
  const { userStore } = useStore();
  return userStore.isUisa;
};
