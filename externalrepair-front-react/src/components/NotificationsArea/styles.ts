import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const NotificationsAreaWrapper = styled.div`
  align-self: flex-end;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: ${pxToRem(10)};
  margin-right: 0;
  background: #fdfeff;
  border-radius: ${pxToRem(10)};
  height: ${pxToRem(50)};
  gap: ${pxToRem(6)};
  padding: 0 ${pxToRem(10)};
  box-sizing: border-box;

  @media (max-width: 900px) {
    align-items: center;
    min-height: ${pxToRem(50)};
    height: auto;
  }
`;

export const ThemeToggleCircle = styled.div`
  width: ${pxToRem(30)};
  height: ${pxToRem(30)};
  background: var(--color-background-body);
  color: var(--color-icon-primary);

  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const NotificationCircle = styled.div`
  width: ${pxToRem(30)};
  height: ${pxToRem(30)};
  background: var(--color-background-body);
  color: var(--color-icon-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 900px) {
    width: ${pxToRem(24)};
    height: ${pxToRem(24)};
    .material-symbols-outlined {
      font-size: ${pxToRem(18)};
    }
    .material-symbols-rounded {
      font-size: ${pxToRem(18)};
    }
  }
`;

export const UserCircle = styled.div`
  width: ${pxToRem(30)};
  height: ${pxToRem(30)};
  background: var(--color-blue-notification);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-background-primary);
  font-family: 'DM Sans', sans-serif;
  font-size: ${pxToRem(15)};
  font-weight: 300;

  @media (max-width: 900px) {
    width: ${pxToRem(24)};
    height: ${pxToRem(24)};
    font-size: ${pxToRem(12)};
  }
`;
