import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background-color: var(--color-background-secondary);
`;

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 74.5vh;
  width: 100%;
  border-radius: 16px;

  &::-webkit-scrollbar {
    display: block;
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }
`;

export const AlmoxarifadoItemTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
