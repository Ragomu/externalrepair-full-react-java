import React, { ReactNode, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import MainContent from '../MainContent';
import Sidebar from '../Sidebar';
import { LayoutContainer, ToastContainerStyled } from './styles';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <LayoutContainer>
      <Sidebar onExpandChange={setSidebarExpanded} />
      <MainContent sidebarExpanded={sidebarExpanded}>{children}</MainContent>
      <ToastContainerStyled
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </LayoutContainer>
  );
};

export default DashboardLayout;
