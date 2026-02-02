import { useEffect } from 'react';
import receivingDoneIcon from '~/assets/images/receivingDone.svg';

import { useStore } from '~/stores';
import { Text } from '../Typography/styles';
import {
  Button,
  Container,
  HighlightedText,
  Icon10x10,
  ImageContainer,
  TextContainer,
} from './styles';

const SuccessReceiving = () => {
  const { receivingStore } = useStore();

  useEffect(() => {
    return () => {
      receivingStore.resetJustFinished();
    };
  }, [receivingStore]);

  const handlePortalAccess = () => {
    receivingStore.resetJustFinished();

    //TODO navigate('/portal');
  };

  return (
    <Container>
      <ImageContainer>
        <img src={receivingDoneIcon} alt="Recebimento concluído" />
      </ImageContainer>
      <Text variant="h2">
        Recebimento <HighlightedText>sinalizado com sucesso!</HighlightedText>{' '}
        👏
      </Text>
      <TextContainer>
        <Text variant="subtitle" color="#858585">
          A nota fiscal destacada foi transferida para o portal de negociação.
          <br />
          Para acessá-la, clique no botão abaixo.
        </Text>
      </TextContainer>
      <Button
        accessibility="Acesso ao portal de negociação"
        onClick={handlePortalAccess}
      >
        Acessar portal
        <Icon10x10 className="material-symbols-outlined">
          arrow_upward
        </Icon10x10>
      </Button>
    </Container>
  );
};

export default SuccessReceiving;
