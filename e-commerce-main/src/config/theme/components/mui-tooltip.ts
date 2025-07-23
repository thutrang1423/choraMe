import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiTooltip: Components<CssVarsTheme>['MuiTooltip'] = {
  styleOverrides: {
    tooltip: ({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: `1px solid ${theme.palette.divider}`,
      boxShadow: theme.shadows[1],
      fontSize: '12px',
      maxWidth: '400px',
      padding: '8px 12px',
      borderRadius: '6px',
      lineHeight: 1.5
    }),
    arrow: ({ theme }) => ({
      color: theme.palette.background.paper,
      '&:before': {
        border: `1px solid ${theme.palette.divider}`,
        boxSizing: 'border-box'
      }
    })
  }
};
