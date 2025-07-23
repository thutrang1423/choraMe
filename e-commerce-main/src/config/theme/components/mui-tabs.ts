import type { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiTabs: Components<CssVarsTheme>['MuiTabs'] = {
  defaultProps: {
    textColor: 'inherit',
    variant: 'scrollable',
    allowScrollButtonsMobile: true
  },
  styleOverrides: {
    root: {
      minHeight: 24,
      position: 'relative'
    },
    fixed: {
      height: 24
    },
    scrollButtons: {
      width: 24,
      borderRadius: '50%'
    },
    indicator: ({ theme }) => ({
      height: '100%',
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      backgroundColor: theme.palette.primary.main,
      zIndex: -1,
      transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    })
  }
};

export const MuiTab: Components<CssVarsTheme>['MuiTab'] = {
  defaultProps: {
    disableRipple: true,
    iconPosition: 'start'
  },
  styleOverrides: {
    root: ({ theme }) => ({
      padding: '8px 16px',
      opacity: 1,
      minWidth: 48,
      minHeight: 24,
      fontWeight: 600,
      transition: 'color 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      '&.Mui-selected': {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        color: '#fff',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          backgroundColor: theme.palette.primary.main
        }
      },
      '&:not(.Mui-selected):hover': {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        backgroundColor: theme.palette.grey[400]
      }
    })
  }
};
