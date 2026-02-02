import styled from 'styled-components';

export const SkeletonCard = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  background-color: #f9f9f9;
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
`;

interface SkeletonLineProps {
  width?: string;
  height?: string;
  isCircle?: boolean;
}

export const SkeletonLine = styled.div<SkeletonLineProps>`
  background-color: #e0e0e0;
  border-radius: ${({ isCircle }) => (isCircle ? '50%' : '4px')};
  height: ${({ height }) => height || '16px'};
  width: ${({ width }) => width || '100%'};
`;

export const SkeletonIconPlaceholder = styled(SkeletonLine).attrs({
  // Remover attrs daqui, pois serão passadas diretamente ou definidas no componente
})``;

export const SkeletonContentRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const SkeletonTextColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
