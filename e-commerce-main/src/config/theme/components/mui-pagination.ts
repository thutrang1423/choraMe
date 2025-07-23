import { alpha, type Components, type ComponentsPropsList, type CssVarsTheme } from '@mui/material/styles';

export const MuiPagination: Components<CssVarsTheme>['MuiPagination'] = {
  styleOverrides: {
    text: ({ theme, ownerState }) => {
      const { color = 'standard' } = ownerState;
      let backgroundColor;
      if (color === 'standard') {
        backgroundColor = theme.vars.palette.grey[800];
      } else {
        backgroundColor = theme.vars.palette[color].main;
      }
      return {
        '& .MuiPaginationItem-root.Mui-selected': {
          backgroundColor,
          color: '#ffffff'
        }
      };
    },
    outlined: ({ theme, ownerState }) => {
      const { color = 'standard' } = ownerState;
      let backgroundColor;
      if (color === 'standard') {
        backgroundColor = alpha(theme.palette.grey[400], 0.24);
      } else {
        backgroundColor = alpha(theme.palette[color].light, 0.24);
      }
      return {
        '& .MuiPaginationItem-root': {
          borderColor: alpha(theme.palette.grey[500], 0.24),
          '&.Mui-selected': {
            borderColor: 'currentColor',
            backgroundColor
          }
        }
      };
    }
  },
  variants: [
    {
      props: {
        variant: 'soft'
      },
      style: (props) => {
        const { theme, ownerState } = props as {
          theme: CssVarsTheme;
          ownerState: ComponentsPropsList['MuiButton'];
        };
        const { color = 'standard' } = ownerState;
        if (color === 'standard' || color === 'inherit') {
          return {
            '& .MuiPaginationItem-root.Mui-selected': {
              backgroundColor: alpha(theme.palette.grey['400'], 0.16),
              color: theme.palette.text.primary
            }
          };
        }
        return {
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: alpha(theme.palette[color].light, 0.16),
            color: theme.palette[color].dark
          }
        };
      }
    }
  ]
};
