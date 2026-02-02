import { usePermissions } from './usePermissions';

export interface SidebarItem {
  key: string;
  label: string;
  path: string;
  icon: string;
}

export const useSidebarItems = (): SidebarItem[] => {
  const { canAccess } = usePermissions();

  const allItems: SidebarItem[] = [
    { key: 'home', label: 'Home', path: '/home', icon: 'home' },
    {
      key: 'recebimento',
      label: 'Recebimento',
      path: '/recebimento',
      icon: 'approval_delegation',
    },
    {
      key: 'manutencao',
      label: 'Manutenção',
      path: '/manutencao',
      icon: 'build',
    },
    { key: 'fiscal', label: 'Fiscal', path: '/fiscal', icon: 'receipt_long' },
    {
      key: 'almoxarifado',
      label: 'Almoxarifado',
      path: '/almoxarifado',
      icon: 'package_2',
    },
    {
      key: 'logistica',
      label: 'Logística',
      path: '/logistica',
      icon: 'delivery_truck_speed',
    },
    {
      key: 'contraparte',
      label: 'Contraparte',
      path: '/contraparte',
      icon: 'person',
    },
    {
      key: 'gestortecnico',
      label: 'Gestor Técnico',
      path: '/gestortecnico',
      icon: 'check_circle',
    },
    {
      key: 'contato',
      label: 'Contato',
      path: '/contato',
      icon: 'mail',
    },
  ];

  // Contato deve aparecer para todos os usuários
  return allItems.filter((item) =>
    item.key === 'contato' ? true : canAccess(item.key as any),
  );
};
