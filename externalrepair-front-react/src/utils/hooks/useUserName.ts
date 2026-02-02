import { useMemo } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '~/stores';

export const useUserName = () => {
  const { userStore } = useStore();

  return useMemo(() => {
    return userStore.userName;
  }, [userStore.userData?.name]);
};

export default observer(useUserName);
