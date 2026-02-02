import React, { ReactNode, useState } from 'react';
import { Text } from '../Typography/styles';
import { TooltipContainer, TooltipContent, TooltipWrapper } from './styled';

interface TooltipProps {
  children: ReactNode;
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  position = 'bottom',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <TooltipContainer
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <TooltipWrapper isVisible={isVisible} position={position}>
        <TooltipContent position={position}>
          <Text variant="small" color="#fff">
            {text}
          </Text>
        </TooltipContent>
      </TooltipWrapper>
    </TooltipContainer>
  );
};

export default Tooltip;
