import styled from 'styled-components';
import TextInput from '@platformbuilders/fluid-react/dist/components/TextInput';

interface TextInputStyledProps {
  borderColor?: string;
}

export const TextInputStyled = styled(TextInput)<TextInputStyledProps>`
  border-color: ${({ borderColor }) => borderColor};
`;
