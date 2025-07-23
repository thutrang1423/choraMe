import { ThemeProvider } from '@mui/material/styles';
import type * as React from 'react';

import { theme } from '../theme';

interface AppThemeProps {
  children: React.ReactNode;
}

export const ThemeRegistry = ({ children }: AppThemeProps) => {
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange defaultMode='light'>
      {children}
    </ThemeProvider>
  );
};
