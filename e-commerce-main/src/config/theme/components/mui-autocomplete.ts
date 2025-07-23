import { Close, KeyboardArrowDown } from '@mui/icons-material';
import type { Components, CssVarsTheme } from '@mui/material/styles';
import { createElement } from 'react';
import CyanBlur from '../../../assets/images/cyan-blur.png';
import RedBlur from '../../../assets/images/red-blur.png';

export const MuiAutocomplete: Components<CssVarsTheme>['MuiAutocomplete'] = {
  defaultProps: {
    noOptionsText: 'Không có dữ liệu',
    disableClearable: false,
    slotProps: {
      chip: {
        size: 'small',
        variant: 'soft'
      }
    },
    popupIcon: createElement(KeyboardArrowDown, { className: 'size-4' }),
    clearIcon: createElement(Close, { className: 'size-4' })
  },
  styleOverrides: {
    root: {
      '& span.MuiAutocomplete-tag': {
        fontWeight: 600,
        lineHeight: '24px',
        fontSize: '0.85rem',
        height: 24,
        minWidth: 24,
        textAlign: 'center',
        padding: '0px 6px',
        color: '#637381',
        borderRadius: 8,
        backgroundColor: 'rgba(145, 158, 171, 0.16)'
      }
    },
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
      borderRadius: 10
    },
    listbox: {
      padding: 0,
      '&::-webkit-scrollbar': {
        width: 4
      },
      '& .MuiAutocomplete-option': {
        lineHeight: 1.5714285714285714,
        fontSize: '0.875rem',
        fontFamily: 'Public Sans, sans-serif',
        fontWeight: 400,
        padding: '6px 8px',
        borderRadius: 6,
        '&:not(:last-of-type)': {
          marginBottom: 4
        },
        '&.Mui-selected': {
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
      }
    },
    endAdornment: {
      '& .MuiSvgIcon-root': {
        width: 18,
        height: 18
      }
    }
  }
};
