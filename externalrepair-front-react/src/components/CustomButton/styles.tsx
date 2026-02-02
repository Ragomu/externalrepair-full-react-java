import styled, { css } from 'styled-components';
import { getTheme } from '@platformbuilders/theme-toolkit';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'text'
  | 'nfe'
  | 'correcao'
  | 'aprovado'
  | 'div';
export type ButtonSize = 'small' | 'normal' | 'medium' | 'large';

interface CustomButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const BRAND_PRIMARY = getTheme('brand.primary.main');
const TEXT_CONTRAST = getTheme('text.contrast');

const getVariantStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'div':
      return css`
        background-color: var(--color-background-secondary);
        color: var(--color-text-light);
        border-radius: 5px;
        border: none;
        font-family: 'DM Sans', sans-serif;
        font-weight: 500;
        font-size: 12px;
        height: 23px;
        padding: 6px 16px;
        cursor: default;
        pointer-events: none;
      `;
    case 'nfe':
      return css`
        background-color: #db3537;
        color: #fff;
        border-radius: 5px;
        border: none;
        font-family: 'DM Sans', sans-serif;
        font-weight: 500;
        font-size: 12px;
        height: 23px;
        padding: 6px 16px;
        &:hover:not(:disabled) {
          opacity: 0.9;
        }
      `;
    case 'correcao':
      return css`
        background-color: #999999;
        color: #595959;
        border-radius: 5px;
        border: none;
        font-family: 'DM Sans', sans-serif;
        font-weight: 500;
        font-size: 12px;
        height: 23px;
        padding: 6px 16px;
        &:hover:not(:disabled) {
          opacity: 0.9;
        }
      `;
    case 'aprovado':
      return css`
        background-color: var(--color-success-green);
        color: #fff;
        border-radius: 5px;
        border: none;
        font-family: 'DM Sans', sans-serif;
        font-weight: 500;
        font-size: 12px;
        height: 23px;
        padding: 6px 16px;
      `;
    case 'primary':
      return css`
        background-color: var(--color-background-primary);
        color: var(--color-text-light);
        border: none;

        &:hover:not(:disabled) {
          opacity: 0.9;
        }
      `;
    case 'secondary':
      return css`
        background-color: var(--color-background-secondary);
        color: ${TEXT_CONTRAST};
        border: none;

        &:hover:not(:disabled) {
          opacity: 0.9;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: ${BRAND_PRIMARY};
        border: 1px solid ${BRAND_PRIMARY};

        &:hover:not(:disabled) {
          background-color: ${BRAND_PRIMARY}10;
        }
      `;
    case 'text':
      return css`
        background-color: transparent;
        color: ${BRAND_PRIMARY};
        border: none;
        padding: 0;

        &:hover:not(:disabled) {
          opacity: 0.8;
        }
      `;
  }
};

const getSizeStyles = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return css`
        height: 25px;
        padding: 6px 16px;
        font-size: 14px;
        border-radius: 6px;
      `;
    case 'normal':
    case 'medium':
      return css`
        height: 32px;
        padding: 12px 24px;
        font-size: 16px;
        border-radius: 6px;
      `;
    case 'large':
      return css`
        height: 40px;
        padding: 16px 32px;
        font-size: 18px;
        border-radius: 8px;
      `;
  }
};

export const StyledButton = styled.button<CustomButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  cursor: ${({ variant }) => (variant === 'div' ? 'default' : 'pointer')};
  transition: all 0.2s ease-in-out;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  position: relative;

  ${({ variant = 'primary' }) => getVariantStyles(variant)}
  ${({ size = 'medium' }) => getSizeStyles(size)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ loading }) =>
    loading &&
    css`
      color: transparent !important;
      pointer-events: none;

      &::after {
        content: '';
        position: absolute;
        width: 16px;
        height: 16px;
        border: 2px solid ${TEXT_CONTRAST};
        border-radius: 50%;
        border-top-color: transparent;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}
`;
