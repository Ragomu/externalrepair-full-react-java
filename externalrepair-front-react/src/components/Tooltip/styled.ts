import styled from 'styled-components';

export const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const TooltipWrapper = styled.div<{
  isVisible: boolean;
  position: 'top' | 'bottom' | 'left' | 'right';
}>`
  position: absolute;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;
  z-index: 9999;
  pointer-events: none;

  ${({ position }) => {
    const positions = {
      top: `
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 8px;
      `,
      bottom: `
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 8px;
      `,
      left: `
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 8px;
      `,
      right: `
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 8px;
      `,
    };

    return positions[position] || positions.bottom;
  }}
`;

export const TooltipContent = styled.div<{
  position?: 'top' | 'bottom' | 'left' | 'right';
}>`
  background: #595959;
  width: 518px;
  height: 47px;
  border-radius: 4px;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  word-wrap: break-word;
  overflow: hidden;
  position: relative;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  box-orient: vertical;
  text-overflow: ellipsis;

  /* Seta/Flecha */
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-style: solid;

    ${({ position = 'bottom' }) => {
      const arrowPositions = {
        top: `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 8px 8px 0 8px;
          border-color: #595959 transparent transparent transparent;
        `,
        bottom: `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 8px 8px 8px;
          border-color: transparent transparent #595959 transparent;
        `,
        left: `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 8px 0 8px 8px;
          border-color: transparent transparent transparent #595959;
        `,
        right: `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          border-width: 8px 8px 8px 0;
          border-color: transparent #595959 transparent transparent;
        `,
      };

      return arrowPositions[position] || arrowPositions.bottom;
    }}
  }
`;
