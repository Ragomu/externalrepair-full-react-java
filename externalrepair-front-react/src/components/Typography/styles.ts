import styled, { css } from 'styled-components';
import Typography from '@platformbuilders/fluid-react/dist/components/Typography';
import { getTheme } from '@platformbuilders/theme-toolkit';

const textMain = getTheme('text.main');
const textSecondary = getTheme('text.secondary');
const textError = getTheme('text.error');

const variants = {
  main: css`
    color: ${textMain};
    font-weight: 300;
  `,
  secondary: css`
    color: ${textSecondary};
    font-weight: 400;
  `,
  error: css`
    color: ${textError};
    font-weight: 500;
  `,
  tiny: css`
    font-size: 10px;
    line-height: 13px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
  small: css`
    font-size: 12px;
    line-height: 16px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
  body: css`
    font-size: 14px;
    line-height: 18px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
  subtitle: css`
    font-size: 18px;
    line-height: 23px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
  subtitleLarge: css`
    font-size: 24px;
    line-height: 31px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,

  title: css`
    font-size: 22px;
    line-height: 28px;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
  titleLight: css`
    font-size: 22px;
    line-height: 28px;
    font-weight: 300;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
  h3: css`
    font-size: 25px;
    line-height: 33px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
  h2: css`
    font-size: 30px;
    line-height: 39px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
  h1: css`
    font-size: 40px;
    line-height: 52px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
  display: css`
    font-size: 60px;
    line-height: 78px;
    font-weight: 400;
    font-family: 'DM Sans', sans-serif;
    color: #515151;
  `,
};

type Variant = keyof typeof variants;

interface TextProps {
  variant?: Variant;
  color?: string;
}

export const Text = styled(Typography)<TextProps>`
  ${({ variant = 'main' }) => variants[variant]}
  ${({ color }) => color && `color: ${color};`}
`;
