import styled from 'styled-components';
import CustomButton from '../CustomButton';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  box-sizing: border-box;
`;

export const ImageContainer = styled.div`
  max-width: 350px;
  height: auto;
`;

export const HighlightedText = styled.span`
  color: #00a3e1;
  font-weight: 500;
`;

export const Button = styled(CustomButton)`
  background-color: var(--color-primary-blue);
  width: 219px;
  height: 30px;
  color: #ffff;
  font-size: 13px;
  border-radius: 6px;
  margin-top: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icon10x10 = styled.span`
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  transform: rotate(45deg);
  color: #c3cfff;
`;

export const TextContainer = styled.div`
  text-align: center;
  padding: 18px;
`;
