import type { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiCssBaseline: Components<CssVarsTheme>['MuiCssBaseline'] = {
  styleOverrides: (theme) => ({
    '*': {
      boxSizing: 'border-box',
      scrollbarWidth: 'thin',
      scrollbarColor: `${theme.vars.palette.grey[400]} transparent`,
      '&::-webkit-scrollbar': {
        width: 8,
        height: 6,
        position: 'absolute'
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent'
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.vars.palette.grey[400],
        borderRadius: 4
      }
    },
    html: {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      WebkitOverflowScrolling: 'touch'
    },
    body: {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%'
    },
    '#root, #__next': {
      width: '100%',
      height: '100%'
    },
    input: {
      '&[type=number]': {
        MozAppearance: 'textfield',
        '&::-webkit-outer-spin-button': {
          margin: 0,
          WebkitAppearance: 'none'
        },
        '&::-webkit-inner-spin-button': {
          margin: 0,
          WebkitAppearance: 'none'
        }
      }
    },
    img: {
      maxWidth: '100%',
      display: 'inline-block',
      verticalAlign: 'bottom'
    }
  })
};
