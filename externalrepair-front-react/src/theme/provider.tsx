import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { themeFormatter } from '@platformbuilders/theme-toolkit';
import themeJson from './theme.json';
import 'react-toastify/dist/ReactToastify.css';

import './global.css';
type Props = {
  children: React.ReactNode;
};

const ThemeProviderContainer: FC<Props> = ({ children }) => {
  // const fetchTheme = useCallback(() => {
  //   RemoteConfigService.setup({
  //     theme_dark: JSON.stringify(themeJson),
  //     theme_light: JSON.stringify(themeJson),
  //   });
  //   themeStore.fetchTheme();
  // }, [themeStore]);

  // useEffect(() => {
  //   fetchTheme();
  // }, []);

  return (
    <ThemeProvider theme={themeFormatter(themeJson)}>{children}</ThemeProvider>
  );
};

export default observer(ThemeProviderContainer);
