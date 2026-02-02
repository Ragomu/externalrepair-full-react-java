import { OrangeBox, WelcomeBoxWrapper } from './styles';

interface TopBarProps {
  userName: string;
}

const WelcomeBox = ({ userName }: TopBarProps) => {
  return (
    <WelcomeBoxWrapper>
      <OrangeBox>Bem-vindo, {userName}!</OrangeBox>
    </WelcomeBoxWrapper>
  );
};

export default WelcomeBox;
