import styled from 'styled-components';

export const LINE_VERTICAL_LEFT = 12;
export const TRACE_LEFT = 31;
export const CURVE_GAP = TRACE_LEFT - LINE_VERTICAL_LEFT;

export const ConnectionLineContainer = styled.div<{
  left: number;
  top: number;
}>`
  width: 100%;
  position: relative;
  display: flex;
  left: ${({ left }) => `${left}px`};
  top: ${({ top }) => `${top}px`};
  margin-bottom: 30px;
`;

export const LineVertical = styled.div<{ totalHeight: number }>`
  position: absolute;
  left: ${LINE_VERTICAL_LEFT}px;
  top: 0;
  width: 1px;
  background-color: #d7d7d7;
  height: ${({ totalHeight }) => `${totalHeight}px`};
  min-height: 50px;
`;

export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  width: 100%;
`;

export const ChildrenContainer = styled.div<{ positionY?: number }>`
  position: absolute;
  left: ${TRACE_LEFT + 3}px;
  top: ${({ positionY }) => `${positionY || 0}px`};
  width: calc(100% - 45px);
  display: flex;
`;

export const VerticalSpacer = styled.div<{ height: number }>`
  height: ${({ height }) => `${height}px`};
`;

export const ItemContainer = styled.div<{ positionY?: number }>`
  position: absolute;
  left: ${TRACE_LEFT}px;
  top: ${({ positionY }) => `${positionY || 0}px`};
  display: flex;
  align-items: center;
`;

export const Trace = styled.div<{ color: string; height: number }>`
  position: relative;
  width: 3px;
  height: ${({ height }) => `${height}px`};
  border-radius: 2px;
  background-color: ${({ color }) => color};
  transition: height 0.3s ease;
`;

export const Curve = styled.div`
  position: absolute;
  left: -${CURVE_GAP}px;
  width: ${CURVE_GAP}px;
  height: 15px;
  border-bottom: 1px solid #d7d7d7;
  border-left: 1px solid #d7d7d7;
  border-bottom-left-radius: 16px;
  z-index: 1;
`;
