// import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { themeFormatter } from '@platformbuilders/theme-toolkit';
import { theme } from '~/theme';

type Options = {
  // memoryRouterProps?: MemoryRouterProps;
};

export const renderWithTheme = (children: React.ReactNode, options?: Options) =>
  render(
    // <MemoryRouter {...options?.memoryRouterProps}>
    <ThemeProvider theme={themeFormatter(theme)}>{children}</ThemeProvider>,
    // </MemoryRouter>,
  );
