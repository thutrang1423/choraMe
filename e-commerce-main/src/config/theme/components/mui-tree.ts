import type { Components, CssVarsTheme } from '@mui/material/styles';
import { createElement } from 'react';

export const MuiTreeItem: Components<CssVarsTheme>['MuiTreeItem'] = {
  styleOverrides: {
    iconContainer: {
      width: 'auto'
    },
    groupTransition: {
      paddingLeft: '8px !important',
      marginLeft: '8px !important'
    }
  }
};

export const MuiCollapse: Components<CssVarsTheme>['MuiCollapse'] = {
  defaultProps: {
    // className: '!pl-2'
  }
};

export const MuiRichTreeView: Components<CssVarsTheme>['MuiRichTreeView'] = {
  defaultProps: {
    slots: {
      expandIcon: () =>
        createElement('span', {
          className: 'i-solar-add-square-bold-duotone w-4 h-4'
        }),
      collapseIcon: () =>
        createElement('span', {
          className: 'i-solar-minus-square-bold-duotone w-4 h-4'
        })
    }
  }
};
