import styled from 'styled-components';
import { Text } from '~/components/Typography/styles';
import CustomButton from '../CustomButton';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  gap: 8px;
  height: 135px;
  width: 65%;
  min-height: 210px;
  margin-bottom: 48px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Title = styled(Text).attrs({ variant: 'tiny' })`
  font-weight: 500;
  text-transform: uppercase;
`;

export const Icon = styled.span<{ isActive?: boolean }>`
  font-size: 64px;
  font-weight: 200;
  color: var(--color-blue-medium);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Instruction = styled(Text)`
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  color: var(--color-text-secondary);
  margin: 12px;
`;

export const Button = styled(CustomButton)`
  background-color: var(--color-primary-blue);
  width: 219px;
  height: 30px;
  color: #ffff;
  font-size: 13px;
  border-radius: 6px;
  margin-top: 48px;

  &[data-loading='true'] {
    opacity: 0.9 !important;
    background-color: var(--color-primary-blue) !important;

    &::after {
      border: 3px solid rgba(255, 255, 255, 0.2) !important;
      border-top-color: #ffffff !important;
      border-left-color: #ffffff !important;
      border-radius: 50% !important;
      width: 16px !important;
      height: 16px !important;
      animation: spin 0.8s linear infinite !important;
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const UploadArea = styled.div<{ isActive?: boolean }>`
  cursor: pointer;
  border: 2px dashed
    ${({ isActive }) =>
      isActive ? 'var(--color-blue-medium)' : 'var(--color-border)'};
  border-radius: 5px;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Link = styled.span`
  color: var(--color-blue-medium);
  cursor: pointer;
  text-decoration: underline;
`;
