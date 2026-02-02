import React, { useState } from 'react';
import { Routes } from '~/routes';
import { navigateTo } from '~/services';
import { useStore } from '~/stores';
import { useSidebarItems } from '~/utils/hooks';
import {
  SidebarContainer,
  SidebarFooter,
  SidebarIcon,
  SidebarItem,
  SidebarList,
  SidebarText,
  SidebarToggle,
} from './styles';

const KEY_TO_ROUTE: Record<string, Routes> = {
  home: Routes.HOME,
  recebimento: Routes.RECEBIMENTO_HOME,
  manutencao: Routes.MANUTENCAO,
  fiscal: Routes.FISCAL,
  almoxarifado: Routes.ALMOXARIFADO,
  logistica: Routes.LOGISTICA,
  contraparte: Routes.CONTRAPARTE,
  gestortecnico: Routes.GESTORTECNICO,
  contato: Routes.CONTATO,
};

const MaterialIcon: React.FC<{ name: string; isActive?: boolean }> = ({
  name,
  isActive,
}) => (
  <span
    className="material-symbols-outlined"
    style={{
      fontSize: '20px',
      fontWeight: 300,
      fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
      width: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {name}
  </span>
);

interface SidebarProps {
  onExpandChange?: (expanded: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onExpandChange }) => {
  const [expanded, setExpanded] = useState(false);
  const { userStore } = useStore();
  const sidebarItems = useSidebarItems();

  const handleLogout = () => {
    userStore.logout();
  };

  const toggleSidebar = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onExpandChange?.(newExpanded);
  };

  const handleNavigation = (route: Routes) => {
    navigateTo(route);
  };

  return (
    <SidebarContainer expanded={expanded}>
      <SidebarToggle onClick={toggleSidebar} expanded={expanded}>
        <MaterialIcon name="arrow_menu_close" />
      </SidebarToggle>

      <SidebarList>
        {sidebarItems.map((item) => {
          const route = KEY_TO_ROUTE[item.key];
          const isActive = window.location.pathname === route;
          return (
            <SidebarItem
              key={item.key}
              active={isActive ? 'true' : undefined}
              expanded={expanded}
              onClick={() => handleNavigation(route)}
            >
              <SidebarIcon>
                <MaterialIcon name={item.icon} isActive={isActive} />
              </SidebarIcon>
              {expanded && (
                <SidebarText expanded={expanded}>{item.label}</SidebarText>
              )}
            </SidebarItem>
          );
        })}
      </SidebarList>

      <SidebarFooter expanded={expanded} onClick={handleLogout}>
        <SidebarIcon style={{ color: 'var(--color-background-primary)' }}>
          <MaterialIcon name="logout" />
        </SidebarIcon>
        {expanded && (
          <SidebarText expanded={expanded} style={{ marginLeft: 8 }}>
            Sair
          </SidebarText>
        )}
      </SidebarFooter>
    </SidebarContainer>
  );
};

export default Sidebar;
