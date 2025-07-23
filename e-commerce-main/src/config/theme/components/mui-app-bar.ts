import type { Components } from '@mui/material/styles';

export const MuiAppBar: Components['MuiAppBar'] = {
  defaultProps: {
    color: 'transparent'
  },
  styleOverrides: {
    root: {
      boxShadow: 'none',
      backdropFilter: 'blur(6px)',
      // backgroundColor: 'rgba(255,255,255,0.6)',
      backgroundColor: 'rgba(247,240,229, 1)',
      transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
  }
};
