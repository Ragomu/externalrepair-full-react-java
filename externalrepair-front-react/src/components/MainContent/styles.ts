import styled from 'styled-components';

export const MainContentWrapper = styled.div<{ sidebarExpanded?: boolean }>`
  flex: 1;
  padding: 0px 10px 17px
    ${({ sidebarExpanded }) => (sidebarExpanded ? '241px' : '68px')};
  transition: padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
  background: #ededed;
`;
