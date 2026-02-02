import { withPermission } from './withPermission';

// HOCs específicos para facilitar o uso
export const withFiscalAuth = withPermission('edit', 'fiscal');
export const withWarehouseAuth = withPermission('edit', 'almoxarifado');
export const withLogisticAuth = withPermission('edit', 'logistica');
export const withMaintenanceAuth = withPermission('edit', 'manutencao');
export const withReceivingAuth = withPermission('edit', 'recebimento');
export const withCounterpartyAuth = withPermission('edit', 'contraparte');
export const withGestorTecnicoAuth = withPermission('edit', 'gestortecnico');

// HOCs para visualização
export const withFiscalView = withPermission('view', 'fiscal');
export const withWarehouseView = withPermission('view', 'almoxarifado');
export const withLogisticView = withPermission('view', 'logistica');
export const withCounterpartyView = withPermission('view', 'contraparte');
export const withGestorTecnicoView = withPermission('view', 'gestortecnico');

// HOCs para acesso (sidebar) - com redirecionamento 404
export const withFiscalAccess = withPermission(
  'access',
  'fiscal',
  undefined,
  true,
);
export const withWarehouseAccess = withPermission(
  'access',
  'almoxarifado',
  undefined,
  true,
);
export const withLogisticAccess = withPermission(
  'access',
  'logistica',
  undefined,
  true,
);
export const withCounterpartyAccess = withPermission(
  'access',
  'contraparte',
  undefined,
  true,
);
export const withGestorTecnicoAccess = withPermission(
  'access',
  'gestortecnico',
  undefined,
  true,
);

export { withPermission };
