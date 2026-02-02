import { FC, PropsWithChildren, ReactNode } from 'react';
import { ButtonProps } from '@platformbuilders/fluid-react/dist/components/Button';
import { Button } from './styles';

interface Props extends ButtonProps {
  accessibility: string;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  showModalOnError?: boolean;
  onPress(): Promise<void> | void;
  loading?: boolean;
}

const Touchable: FC<PropsWithChildren<Props>> = ({
  accessibility,
  children,
  leftIcon,
  rightIcon,
  disabled,
  onPress,
  loading,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      accessibility={accessibility}
      onPress={onPress}
      loading={loading}
      disabled={!!disabled}
    >
      {leftIcon && <span className="icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="icon-right">{rightIcon}</span>}
    </Button>
  );
};

export default Touchable;
