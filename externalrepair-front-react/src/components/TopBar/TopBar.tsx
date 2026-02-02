import React from 'react';
import NotificationsArea from '../NotificationsArea';
import WelcomeBox from '../WelcomeBox';
import { TopBarWrapper } from './styles';

interface TopBarProps {
  userName: string;
}

const TopBar: React.FC<TopBarProps> = ({ userName }) => {
  return (
    <TopBarWrapper>
      <WelcomeBox userName={userName} />
      <NotificationsArea userName={userName} />
    </TopBarWrapper>
  );
};

export default TopBar;
