import type { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiCard: Components<CssVarsTheme>['MuiCard'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      position: 'relative',
      boxShadow: theme.vars.customShadows.card,
      borderRadius: 8,
      zIndex: 0
    })
  }
};

export const MuiCardHeader: Components<CssVarsTheme>['MuiCardHeader'] = {
  defaultProps: {
    titleTypographyProps: {
      variant: 'button'
    },
    subheaderTypographyProps: {
      variant: 'body2',
      marginTop: '4px'
    }
  },
  styleOverrides: {
    root: ({ theme }) => ({
      padding: 0,
      textAlign: 'center',
      alignSelf: 'center',
      color: 'white',
      backgroundColor: theme.palette.primary.main
    })
  }
};

export const MuiCardContent: Components<CssVarsTheme>['MuiCardContent'] = {
  styleOverrides: {
    root: {
      padding: 8,
      '&:last-child': {
        paddingBottom: '16px'
      }
    }
  }
};
export const MuiCardActions: Components<CssVarsTheme>['MuiCardActions'] = {
  styleOverrides: {
    root: {
      padding: 0,
      paddingBottom: 4
    }
  }
};
