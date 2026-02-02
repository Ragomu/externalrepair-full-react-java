import { useStore } from '~/stores';
import { PERMISSIONS, SectionType } from '~/utils/permissions';

export const usePermissions = () => {
  const { userStore } = useStore();

  const userType = userStore.userData?.role || 'SUPPLIER';
  const permissions =
    PERMISSIONS[userType as keyof typeof PERMISSIONS] || PERMISSIONS.SUPPLIER;

  return {
    canEdit: (section: SectionType) => permissions.canEdit.includes(section),
    canView: (section: SectionType) => permissions.canView.includes(section),
    canAccess: (section: SectionType) =>
      permissions.canAccess.includes(section),
    isAdmin: userType === 'ADMIN',
    isSupplier: userType === 'SUPPLIER',
    isUisa: userType !== 'SUPPLIER',
    permissions,
  };
};
