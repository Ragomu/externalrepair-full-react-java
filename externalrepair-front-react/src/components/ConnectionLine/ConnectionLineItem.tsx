import React from 'react';
import { Curve, ItemContainer, Trace } from './styles';

export type ConnectionLineItemProps = {
  color: string;
  traceHeight?: number;
  positionY?: number;
};

const ConnectionLineItem: React.FC<ConnectionLineItemProps> = ({
  color,
  traceHeight = 25,
  positionY = 0,
}) => {
  return (
    <ItemContainer positionY={positionY}>
      <Curve />
      <Trace color={color} height={traceHeight} />
    </ItemContainer>
  );
};

export default ConnectionLineItem;
