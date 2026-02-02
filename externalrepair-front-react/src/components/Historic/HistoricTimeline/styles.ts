import styled from 'styled-components';

export const TimelineWrapper = styled.div`
  position: relative;
  max-width: 100%;
  margin: 0;
  padding: 34px 0;

  /* Linha vertical contínua à esquerda */
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    background-color: #d9d9d9;
    top: 65px;
    bottom: 35px; /* Termina antes do traço final */
    left: 30px;
    z-index: 1;
  }

  /* Traço final embaixo */
  &::before {
    content: '';
    position: absolute;
    width: 25px;
    height: 3.5px;
    background-color: #d9d9d9;
    bottom: 33px; /* Posicionado embaixo */
    left: 19px;
    z-index: 1;
    border-radius: 2px;
  }
`;

export const TimelineItemWrapper = styled.div`
  padding: 0 40px;
  position: relative;
  background-color: inherit;
  width: 100%;
  min-height: 97px;
  margin-bottom: 30px;
  transition: all 0.3s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &::after {
    content: '';
    position: absolute;
    width: 11px;
    height: 11px;
    background-color: #fdfeff;
    border: 2px solid #b8b8b8;
    border-radius: 50%;
    top: 25px;
    left: 23.5px;
    z-index: 2;
    transition: all 0.3s ease;
  }

  &.active::after {
    border: 2px solid #646464;
  }
`;

export const TimelineItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 0;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 25px;
`;

export const TimelineIcon = styled.div<{ color: string }>`
  width: 50px;
  height: 50px;
  border-radius: 40px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 3;
  transition: all 0.3s ease;

  .material-symbols-outlined {
    font-size: 24px;
    font-weight: 300;
    color: ${({ color }) => {
      const iconColorMap: Record<string, string> = {
        '#fdecde': '#e67e22', // Manutenção - laranja mais escuro
        '#e6ebff': '#4a90e2', // Negociação - azul mais escuro
        '#e4ffe0': '#27ae60', // Recebimento - verde mais escuro
        '#fff3e0': '#f39c12', // Logística - amarelo mais escuro
        '#f3e5f5': '#9b59b6', // Fiscal - roxo mais escuro
        '#e6e6e6': '#7f8c8d', // Início - cinza mais escuro
      };

      return iconColorMap[color] || '#515151';
    }};
  }
`;

export const TimelineContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TimelineDate = styled.div`
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
  color: #a1a1a1;
`;

export const TimelineTitle = styled.div`
  font-family: 'DM Sans', sans-serif;
  font-size: 17px;
  font-weight: 500;
  line-height: 22px;
  color: #515151;
`;

export const TimelineMessage = styled.div`
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 15.6px;
  color: #515151;
`;

export const NfeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 10px;
  color: #666;
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: auto;
  flex-shrink: 0;
  white-space: nowrap;

  &:hover {
    background: #e8e8e8;
    border-color: #d0d0d0;
  }

  .material-symbols-outlined {
    font-size: 14px;
  }
`;
