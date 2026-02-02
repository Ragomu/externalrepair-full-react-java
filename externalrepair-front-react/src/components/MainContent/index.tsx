import React, { ReactNode } from 'react';
import { MainContentWrapper } from './styles';

interface MainContentProps {
  children?: ReactNode;
  sidebarExpanded?: boolean;
}

const MainContent: React.FC<MainContentProps> = ({
  children,
  sidebarExpanded,
}) => {
  return (
    <MainContentWrapper sidebarExpanded={sidebarExpanded}>
      {children}
    </MainContentWrapper>
  );
};

export default MainContent;
