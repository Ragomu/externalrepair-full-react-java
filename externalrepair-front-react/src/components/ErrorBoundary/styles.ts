import styled from 'styled-components';
import Typography from '../Typography';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ErrorMessage = styled(Typography).attrs({
  variant: 'xl',
})`
  color: red;
  text-align: center;
`;
