import { ExpandMoreRounded } from '@mui/icons-material';
import type { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiInput: Components<CssVarsTheme>['MuiInput'] = {
  defaultProps: {
    size: 'small'
  },
  styleOverrides: {
    underline: {
      '&:before': {
        borderBottomColor: 'rgba(145, 158, 171, 0.32)'
      },
      '&:after': {
        borderBottomColor: '#212B36'
      }
    }
  }
};

export const MuiInputBase: Components<CssVarsTheme>['MuiInputBase'] = {
  defaultProps: {
    size: 'small'
  },
  styleOverrides: {
    root: {
      '&.Mui-disabled': {
        '& svg': {
          color: '#919EAB'
        }
      }
    },
    input: {
      lineHeight: 1.5714285714285714,
      fontSize: '0.875rem',
      fontWeight: 400,
      '&::placeholder': {
        opacity: 1,
        color: '#919EAB'
      }
    }
  }
};

export const MuiOutlinedInput: Components<CssVarsTheme>['MuiOutlinedInput'] = {
  defaultProps: {
    notched: false
  },
  styleOverrides: {
    root: ({ theme }) => {
      return {
        backgroundColor: theme.palette.background.paper,
        '&.Mui-focused': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main
          }
        },
        '&.Mui-error': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main
          }
        },
        '&.Mui-disabled': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.text.disabled
          }
        }
      };
    },
    notchedOutline: ({ theme }) => {
      return {
        borderColor: theme.palette.text.disabled,
        transition: 'border-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
      };
    }
  }
};

export const MuiFilledInput: Components<CssVarsTheme>['MuiFilledInput'] = {
  defaultProps: {
    disableUnderline: true
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: 8,
      backgroundColor: theme.palette.background.paper,
      '&:hover': {
        backgroundColor: theme.palette.background.default
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.action.hover
      },
      '&.Mui-error': {
        backgroundColor: theme.palette.error.light,
        '&.Mui-focused': {
          backgroundColor: theme.palette.error.main
        }
      },
      '&.Mui-disabled': {
        backgroundColor: theme.palette.text.disabled
      }
    })
  }
};

export const MuiFormHelperText: Components<CssVarsTheme>['MuiFormHelperText'] = {
  defaultProps: {
    component: 'div'
  },
  styleOverrides: {
    root: {
      marginTop: '2px',
      marginLeft: '4px'
    }
  }
};

export const MuiSelect: Components<CssVarsTheme>['MuiSelect'] = {
  defaultProps: {
    IconComponent: ExpandMoreRounded
  }
};

export const MuiTextField: Components<CssVarsTheme>['MuiTextField'] = {
  defaultProps: {
    slotProps: {
      inputLabel: {
        shrink: true
      }
    }
  }
};

export const MuiInputLabel: Components<CssVarsTheme>['MuiInputLabel'] = {
  styleOverrides: {
    asterisk: ({ theme }) => ({
      color: theme.vars.palette.error.main,
      fontWeight: 700,
      marginLeft: 2,
      fontSize: '1rem'
    }),
    root: ({ theme }) => ({
      lineHeight: 1.5714285714285714,
      fontSize: '0.875rem',
      fontWeight: 400,
      color: theme.palette.text.disabled || '#919EAB',
      '&.MuiInputLabel-shrink': {
        lineHeight: 2,
        fontSize: '1rem',
        fontWeight: 600,
        color: theme.palette.text.primary,
        '&.Mui-focused': {
          color: theme.palette.primary.main
        },
        '&.Mui-error': {
          color: theme.palette.error.main
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled
        },
        '&.MuiInputLabel-filled': {
          transform: 'translate(12px, 6px) scale(0.75)'
        },
        '&.MuiInputLabel-outlined': {
          transform: 'translate(4px, -0.75em) scale(0.8) !important'
        }
      },
      '&.MuiInputLabel-outlined': {
        transform: 'translate(12px, 10px) scale(0.8) !important',
        paddingRight: '4px'
      }
    })
  }
};
