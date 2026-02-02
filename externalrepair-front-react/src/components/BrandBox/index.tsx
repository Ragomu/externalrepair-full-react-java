import React, { FC } from 'react';
import { ChildrenWrapper, Constrain } from './styles';

type Props = {
  children: React.ReactNode;
};

const SceneWrapper: FC<Props> = ({ children, ...rest }): JSX.Element => (
  <ChildrenWrapper {...rest}>
    <Constrain>{children}</Constrain>
  </ChildrenWrapper>
);

export default SceneWrapper;
