import React, { AnchorHTMLAttributes } from 'react';
import { isSecureLink } from '@platformbuilders/helpers';
import { AnchorBase } from './styles';

const Anchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  href = '',
  ...rest
}) => {
  return (
    <AnchorBase {...rest} href={isSecureLink(href) ? href : ''}>
      {children}
    </AnchorBase>
  );
};

export default Anchor;
