import type { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiSlider: Components<CssVarsTheme>['MuiSlider'] = {
  defaultProps: {
    size: 'small'
  },
  styleOverrides: {
    root: {
      '&.Mui-disabled': {
        color: 'rgba(145, 158, 171, 0.8)'
      },
      '& .MuiSlider-thumb': {
        transform: 'translate(-50%, -50%)'
      }
    },
    rail: {
      opacity: 0.32
    },
    markLabel: {
      fontSize: 13,
      color: '#919EAB'
    },
    valueLabel: {
      borderRadius: 8,
      backgroundColor: '#212B36'
    }
  }
};
