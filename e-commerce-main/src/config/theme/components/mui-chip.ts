import { alpha, type Components, type ComponentsPropsList, type CssVarsTheme } from '@mui/material/styles';
import { createElement } from 'react';

export const MuiChip: Components<CssVarsTheme>['MuiChip'] = {
  defaultProps: {
    deleteIcon: createElement(
      'span',
      {
        className: 'i-solar-close-circle-bold-duotone h-4 w-4'
      },
      null
    )
  },
  styleOverrides: {
    root: {
      whiteSpace: 'nowrap',
      fontSize: '0.8125rem',
      fontWeight: 500,
      borderRadius: '0.5rem'
    }
  },
  variants: [
    {
      props: { variant: 'filled', color: 'default' },
      style: ({ theme }) => {
        return {
          backgroundColor: theme.vars.palette.grey['800'],
          color: '#ffffff',
          '&:hover': {
            backgroundColor: theme.vars.palette.grey['700']
          }
        };
      }
    },
    {
      props: { variant: 'soft' },
      style: (props) => {
        const { theme, ownerState } = props as {
          theme: CssVarsTheme;
          ownerState: ComponentsPropsList['MuiChip'];
        };
        const { color = 'default' } = ownerState;
        if (color === 'default') {
          return {
            backgroundColor: alpha(theme.palette.grey['400'], 0.16),
            color: theme.palette.text.primary,
            '&:hover': {
              backgroundColor: alpha(theme.palette.grey['400'], 0.24)
            }
          };
        }
        return {
          backgroundColor: alpha(theme.palette[color].light, 0.16),
          color: theme.palette[color].dark,
          '&:hover': {
            backgroundColor: alpha(theme.palette[color].light, 0.24)
          }
        };
      }
    }
  ]
};
