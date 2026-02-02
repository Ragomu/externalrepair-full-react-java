import React from 'react';
// import { StorageService } from '~/services';
import {
  NotificationCircle,
  NotificationsAreaWrapper,
  // ThemeToggleCircle,
  UserCircle,
} from './styles';

interface TopBarProps {
  userName: string;
}

export const NotificationsArea: React.FC<TopBarProps> = ({ userName }) => {
  // const handleThemeToggle = () => {
  //   const currentTheme = StorageService.getUserTheme();
  //   StorageService.setUserTheme(currentTheme === 'light' ? 'dark' : 'light');
  // };

  return (
    <NotificationsAreaWrapper>
      {/* <ThemeToggleCircle onClick={handleThemeToggle}>
        <span className="material-symbols-rounded">
          {StorageService.getUserTheme() === 'light'
            ? 'light_mode'
            : 'dark_mode'}
        </span>
      </ThemeToggleCircle> */}
      <NotificationCircle onClick={() => alert(userName)}>
        <span className="material-symbols-rounded">notifications</span>
      </NotificationCircle>
      <UserCircle>{userName?.charAt(0)?.toUpperCase() || 'U'}</UserCircle>
    </NotificationsAreaWrapper>
  );
};

export default NotificationsArea;
