import { alpha, type Components, type CssVarsTheme } from '@mui/material/styles';

import CyanBlur from '../../../assets/images/cyan-blur.png';
import RedBlur from '../../../assets/images/red-blur.png';

export const MuiDrawer: Components<CssVarsTheme>['MuiDrawer'] = {
  styleOverrides: {
    paper: ({ ownerState: { variant } }) => ({
      boxShadow: 'rgba(145, 158, 171, 0.24) 40px 40px 80px -8px',
      backdropFilter: 'blur(20px)',
      backgroundColor: alpha('#fff', 0.9),
      backgroundImage: variant === 'temporary' ? `url(${CyanBlur}), url(${RedBlur})` : '',
      backgroundSize: '50% 50%',
      backgroundRepeat: 'no-repeat no-repeat',
      backgroundPosition: 'right top, left bottom',
      minWidth: 200
    })
  }
};

export const MuiBackdrop = {
  styleOverrides: {
    root: {
      backgroundColor: 'rgba(22, 28, 36, 0.8)'
    },
    invisible: {
      background: 'transparent'
    }
  }
};
