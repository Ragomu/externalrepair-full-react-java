import { useEffect } from 'react';

import { observer } from 'mobx-react';
import { useStore } from '~/stores';
import { withGestorTecnicoAccess } from '~/utils/hocs';
import GestorTecnico from './GestorTecnico';

const GestorTecnicoContainer = () => {
  const { technicalManagerStore } = useStore();

  useEffect(() => {
    technicalManagerStore.fetchTechnicalManagerNfs();
  }, []);

  return <GestorTecnico />;
};

export default withGestorTecnicoAccess(observer(GestorTecnicoContainer));
