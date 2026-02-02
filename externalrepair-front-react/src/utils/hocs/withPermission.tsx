import React from 'react';
import { navigate } from 'vike/client/router';
import { usePermissions } from '~/utils/hooks';
import { SectionType } from '~/utils/permissions';

export const withPermission = (
  requiredPermission: 'edit' | 'view' | 'access',
  section: SectionType,
  fallback: React.ReactNode = <div>Acesso negado</div>,
  redirectTo404: boolean = false,
) => {
  return <P extends object>(Component: React.ComponentType<P>) => {
    const WrappedComponent = (props: P) => {
      const permissions = usePermissions();

      let hasPermission = false;

      switch (requiredPermission) {
        case 'edit':
          hasPermission = permissions.canEdit(section);
          break;
        case 'view':
          hasPermission = permissions.canView(section);
          break;
        case 'access':
          hasPermission = permissions.canAccess(section);
          break;
      }

      if (hasPermission) {
        return <Component {...props} />;
      }

      if (redirectTo404) {
        React.useEffect(() => {
          navigate('/404');
        }, []);
        return null;
      }

      return <>{fallback}</>;
    };

    WrappedComponent.displayName = `withPermission(${Component.displayName || Component.name})`;

    return WrappedComponent;
  };
};
