import styled from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 3%;
`;

export const MaintenanceItensContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const ScrollableContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 74.5vh;
  width: 100%;
  border-radius: 16px;
  padding: 0 3%;

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
