import React from 'react';
import styled from 'styled-components';

interface VectorIconProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const StyledVector = styled.img<{
  width?: number | string;
  height?: number | string;
}>`
  width: ${({ width }) =>
    typeof width === 'number' ? `${width}px` : width || 'auto'};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height || 'auto'};
  display: block;
`;

export const VectorIcon: React.FC<VectorIconProps> = ({
  src,
  alt = 'vector icon',
  width,
  height,
  className,
}) => {
  return (
    <StyledVector
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default VectorIcon;
