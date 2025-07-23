import type { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiDialog: Components<CssVarsTheme>['MuiDialog'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      boxShadow: theme.vars.customShadows?.dialog,
      borderRadius: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        width: '90%'
      }
    })
  }
};

export const MuiDialogTitle: Components<CssVarsTheme>['MuiDialogTitle'] = {
  defaultProps: {
    variant: 'subtitle1'
  },
  styleOverrides: {
    root: ({ theme }) => ({
      padding: '4px 16px',
      color: 'white',
      backgroundColor: theme.palette.primary.main
    })
  }
};

export const MuiDialogContent: Components<CssVarsTheme>['MuiDialogContent'] = {
  styleOverrides: {
    root: {
      padding: '16px !important'
    },
    dividers: {
      borderTop: 0,
      borderBottomStyle: 'dashed',
      paddingBottom: '16px'
    }
  }
};

export const MuiDialogActions: Components['MuiDialogActions'] = {
  defaultProps: {
    disableSpacing: true
  },
  styleOverrides: {
    root: {
      padding: '16px',
      '& > :not(:first-of-type)': {
        marginLeft: '12px'
      }
    }
  }
};
