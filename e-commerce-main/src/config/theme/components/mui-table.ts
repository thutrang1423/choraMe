import type { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiTableContainer: Components<CssVarsTheme>['MuiTableContainer'] = {
  styleOverrides: {
    root: {
      position: 'relative',
      border: 'none'
    }
  }
};

export const MuiTableRow: Components<CssVarsTheme>['MuiTableRow'] = {
  styleOverrides: {
    root: {
      '&.Mui-selected': {
        backgroundColor: 'rgba(0, 120, 103, 0.04)',
        '&:hover': {
          backgroundColor: 'rgba(0, 120, 103, 0.08)'
        }
      }
    }
  }
};

export const MuiTableCell: Components<CssVarsTheme>['MuiTableCell'] = {
  styleOverrides: {
    root: {
      borderLeft: '1px solid rgba(145, 158, 171, 0.2) !important',
      borderBottom: '1px solid rgba(145, 158, 171, 0.2) !important',
      fontSize: 13
    },
    body: {
      minHeight: 0,
      padding: '4px !important'
    },
    head: ({ theme }) => ({
      wordWrap: 'break-word',
      fontSize: 13,
      color: '#fff',
      fontWeight: 600,
      backgroundColor: `${theme.palette.primary.main} !important`,
      borderLeft: '1px solid #fff !important',
      ':first-of-type': {
        borderLeft: 'none !important',
        borderTopLeftRadius: 8
      },
      ':last-of-type': {
        paddingTop: 0,
        borderTopRightRadius: 8
      }
    }),
    stickyHeader: {
      backgroundColor: '#FFFFFF',
      backgroundImage: 'linear-gradient(to bottom, #F4F6F8 0%, #F4F6F8 100%)'
    },
    paddingCheckbox: {
      paddingLeft: '8px'
    }
  }
};
