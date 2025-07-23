import type { Components, CssVarsTheme } from '@mui/material/styles';

import CyanBlur from '../../../assets/images/cyan-blur.png';
import RedBlur from '../../../assets/images/red-blur.png';

export const MuiMenuItem: Components<CssVarsTheme>['MuiMenuItem'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      lineHeight: 1.5714285714285714,
      fontSize: '0.875rem',
      fontWeight: 500,
      padding: '6px 8px',
      borderRadius: 6,
      color: theme.vars.palette.text.secondary,
      '&:not(:last-of-type)': {
        marginBottom: 4
      },
      '&.Mui-selected': {
        color: theme.vars.palette.text.primary,
        fontWeight: 600,
        backgroundColor: 'rgba(145, 158, 171, 0.16)',
        '&:hover': {
          backgroundColor: 'rgba(145, 158, 171, 0.08)'
        }
      },
      '& .MuiCheckbox-root': {
        padding: '4px',
        marginLeft: '-4px',
        marginRight: '4px'
      },
      '&.MuiAutocomplete-option[aria-selected="true"]': {
        backgroundColor: 'rgba(145, 158, 171, 0.16)',
        '&:hover': {
          backgroundColor: 'rgba(145, 158, 171, 0.08)'
        }
      },
      '&+.MuiDivider-root': {
        margin: '4px 0px'
      }
    })
  }
};

export const MuiPopover = {
  styleOverrides: {
    paper: {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backgroundImage: `url(${CyanBlur}), url(${RedBlur})`,
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'top right, left bottom',
      backgroundSize: '50%, 50%',
      padding: '4px',
      boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
      borderRadius: 10,
      '& .MuiList-root': {
        paddingTop: 0,
        paddingBottom: 0
      }
    }
  }
};

export const MuiPopper: Components<CssVarsTheme>['MuiPopper'] = {
  styleOverrides: {
    root: {
      '& .MuiPaper-root': {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundImage: `url(${CyanBlur}), url(${RedBlur})`,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'top right, left bottom',
        backgroundSize: '50%, 50%',
        padding: '4px',
        boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
        borderRadius: 10,
        '& .MuiList-root': {
          paddingTop: 0,
          paddingBottom: 0
        }
      }
    }
  }
};
