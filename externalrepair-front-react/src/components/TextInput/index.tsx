import React from 'react';
import { TextInputType } from '@platformbuilders/fluid-react/dist/components/TextInput';
import { TextInputStyled } from './styles';

type Props = TextInputType & {
  borderColor?: string;
};

const TextInput: React.FC<Props> = ({ borderColor, ...rest }) => (
  <TextInputStyled borderColor={borderColor} {...rest} />
);

export default TextInput;
