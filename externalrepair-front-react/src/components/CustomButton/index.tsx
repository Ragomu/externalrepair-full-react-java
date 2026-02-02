import { FC, ReactNode } from 'react';
import { ButtonSize, ButtonVariant, StyledButton } from './styles';

export interface CustomButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  accessibility: string;
  onPress?: () => Promise<void> | void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const CustomButton: FC<CustomButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  onPress,
  type = 'button',
  className,
  leftIcon,
  rightIcon,
  accessibility,
  ...rest
}) => {
  const handleClick = onPress ? onPress : onClick;

  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || loading}
      loading={loading}
      onClick={handleClick}
      type={type}
      className={className}
      aria-label={accessibility}
      data-loading={loading}
      {...rest}
    >
      {leftIcon && <span className="icon-left">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="icon-right">{rightIcon}</span>}
    </StyledButton>
  );
};

export default CustomButton;
