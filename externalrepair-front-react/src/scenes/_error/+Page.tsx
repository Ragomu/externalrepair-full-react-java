import { Subtitle, Title, Wrapper } from './styles';

export const Page: React.FC = () => (
  <Wrapper title="Not Found">
    <Title>404</Title>
    <Subtitle>Woops. Parece que a página não existe.</Subtitle>
  </Wrapper>
);
