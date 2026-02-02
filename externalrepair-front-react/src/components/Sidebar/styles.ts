import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

const ALIGN_START = 'flex-start';
const ALIGN_CENTER = 'center';
const ALIGN_END = 'flex-end';

interface SidebarToggleProps {
  expanded: boolean;
}

export const SidebarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>`
  position: fixed;
  left: ${pxToRem(10)};
  top: ${pxToRem(10)};
  height: 97.5dvh;
  width: ${({ expanded }) => (expanded ? pxToRem(220) : pxToRem(48))};
  background: #f58220;
  border-radius: ${({ expanded }) => (expanded ? pxToRem(10) : pxToRem(50))};
  display: flex;
  flex-direction: column;
  align-items: ${({ expanded }) => (expanded ? ALIGN_START : ALIGN_CENTER)};
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: 'DM Sans', sans-serif;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const SidebarToggle = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== 'expanded',
})<SidebarToggleProps>`
  background: transparent;
  border: none;
  color: var(--color-background-primary);
  cursor: pointer;
  align-self: ${({ expanded }) => (expanded ? ALIGN_END : ALIGN_CENTER)};
  margin: ${pxToRem(24)};
  outline: none;
  font-size: ${pxToRem(20)};
  .material-symbols-outlined {
    transition: transform 0.3s ease;
    transform: rotate(${({ expanded }) => (expanded ? '0deg' : '180deg')});
  }
`;

export const SidebarList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
`;

export const SidebarItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== 'expanded' && prop !== 'active',
})<{
  active?: boolean | string;
  expanded: boolean;
}>`
  display: flex;
  align-items: center;
  justify-self: ${({ expanded }) => (expanded ? ALIGN_START : ALIGN_CENTER)};
  justify-content: ${({ expanded }) => (expanded ? ALIGN_START : ALIGN_CENTER)};
  gap: ${({ expanded }) => (expanded ? pxToRem(5) : 0)};
  padding: ${({ expanded }) => (expanded ? `12 8` : `${pxToRem(12)} 0`)};
  margin: ${pxToRem(8)} 0 0 0;
  border-radius: ${pxToRem(5)};
  background: ${({ active, expanded }) =>
    active
      ? expanded
        ? 'rgba(255,255,255,0.15)'
        : 'rgba(255,255,255,0.18)'
      : 'transparent'};
  color: ${({ active }) => (active ? '#fff' : '#fee1c9')};
  font-size: ${pxToRem(13)};
  font-family: inherit;
  font-weight: 300;
  cursor: pointer;
  height: ${pxToRem(25)};
  width: ${({ expanded }) => (expanded ? pxToRem(196) : pxToRem(34))};
  transition:
    background 0.3s,
    color 0.3s,
    width 0.3s;
  &:hover {
    background: ${({ expanded }) =>
      expanded ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.12)'};
  }
`;

export const SidebarIcon = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
`;

export const SidebarText = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>`
  font-size: ${pxToRem(13)};
  font-family: inherit;
  color: #fee1c9;
  display: ${({ expanded }) => (expanded ? 'inline' : 'none')};
`;

export const SidebarFooter = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'expanded',
})<{ expanded: boolean }>`
  width: 100%;
  position: absolute;
  bottom: ${pxToRem(32)};
  cursor: pointer;
  left: 0;
  align-items: center;
  display: flex;
  justify-content: center;
  padding: ${({ expanded }) => (expanded ? `12 8` : `${pxToRem(12)} 0`)};
  flex-direction: row;
  width: ${({ expanded }) => (expanded ? pxToRem(196) : pxToRem(34))};
  align-items: center;
  border-radius: ${pxToRem(5)};
  margin-left: ${({ expanded }) => (expanded ? pxToRem(10) : pxToRem(7))};
  &:hover {
    background: ${({ expanded }) =>
      expanded ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.12)'};
  }
`;
