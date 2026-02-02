import React, { ReactNode } from 'react';
import ContainerHeader from '../ContainerHeader/ContainerHeader';
import EmptyStateFeedback from '../EmptyStateFeedback';
import NotificationsArea from '../NotificationsArea';
import { Text } from '../Typography/styles';
import {
  Container,
  ContainerWrapper,
  Divider,
  GoBackButton,
  Icon10x10,
  Icon24x24,
  IconContainer,
  TitleHeader,
} from './styles';

export interface MainContentContainerProps {
  title?: string;
  children?: ReactNode;
  userName: string;
  actionArea?: boolean;
  goBack?: boolean;
  icon?: string;
}

const MainContentContainer: React.FC<MainContentContainerProps> = ({
  title,
  children,
  userName,
  actionArea = true,
  goBack = false,
  icon,
}) => {
  return (
    <ContainerWrapper>
      <NotificationsArea userName={userName} />
      <Container>
        <TitleHeader>
          <IconContainer>
            <Icon24x24 className="material-symbols-outlined">{icon}</Icon24x24>
            <Text variant="subtitle">{title}</Text>
          </IconContainer>
          {goBack && (
            <GoBackButton onClick={() => window.history.back()}>
              <Icon10x10 className="material-symbols-outlined">
                arrow_back
              </Icon10x10>
              <Text variant="small">Voltar</Text>
            </GoBackButton>
          )}
        </TitleHeader>
        {actionArea && (
          <>
            <Divider />
            <ContainerHeader />
          </>
        )}
        {children || <EmptyStateFeedback />}{' '}
      </Container>
    </ContainerWrapper>
  );
};

export default MainContentContainer;
