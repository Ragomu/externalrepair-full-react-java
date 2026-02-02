import { FC } from 'react';
import { TypographyTypeProps } from '@platformbuilders/fluid-react/dist/components/Typography';
import { Text } from './styles';

const TextComponent: FC<TypographyTypeProps> = (props) => <Text {...props} />;

export default TextComponent;
