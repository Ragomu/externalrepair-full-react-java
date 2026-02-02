import React from 'react';
import { usePermissions } from '~/utils/hooks';
import { SectionType } from '~/utils/permissions';

interface ActionButtonProps {
  action: 'edit' | 'view';
  section: SectionType;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  action,
  section,
  children,
  fallback = null,
  className,
  onClick,
  disabled = false,
}) => {
  const permissions = usePermissions();

  const hasPermission =
    action === 'edit'
      ? permissions.canEdit(section)
      : permissions.canView(section);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
