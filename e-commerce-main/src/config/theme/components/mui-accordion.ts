import { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiAccordion: Components['MuiAccordion'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'transparent',
      '&.Mui-expanded': {
        boxShadow: '0 8px 16px 0 rgba(145, 158, 171, 0.16)',
        borderRadius: 8,
        backgroundColor: '#FFFFFF'
      },
      '&.Mui-disabled': {
        backgroundColor: 'transparent'
      }
    }
  }
};

export const MuiAccordionDetails: Components<CssVarsTheme>['MuiAccordionDetails'] = {
  styleOverrides: {
    root: {
      backgroundColor: '#FFFFFF !important',
      padding: '16px !important',
      borderRadius: '0.5rem',
      margin: '0 8px 8px 8px !important',
      '& .MuiTypography-root': {
        color: 'inherit'
      },
      '& .MuiList-root': {
        padding: 0
      }
    }
  }
};

export const MuiAccordionSummary: Components['MuiAccordionSummary'] = {
  styleOverrides: {
    root: {
      minHeight: '0px !important',

      padding: '8px !important',
      margin: '0 !important',
      '&.Mui-disabled': {
        opacity: 1,
        color: 'rgba(145, 158, 171, 0.8)',
        '& .MuiTypography-root': {
          color: 'inherit'
        }
      }
    },
    content: {
      margin: '0 !important',
      '& .MuiTypography-root': {
        color: 'inherit'
      }
    },
    expandIconWrapper: {
      color: 'inherit'
    }
  }
};
