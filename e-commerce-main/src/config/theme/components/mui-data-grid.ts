import type { Components, CssVarsTheme } from '@mui/material/styles';

export const MuiDataGrid: Components<CssVarsTheme>['MuiDataGrid'] = {
  defaultProps: {
    slotProps: {
      basePopper: {
        placement: 'bottom-end'
      }
    },
    density: 'compact'
  },
  styleOverrides: {
    root: {
      '--unstable_DataGrid-radius': 0,
      '--unstable_DataGrid-headWeight': 600,
      borderWidth: 0
    },
    withBorderColor: {
      borderColor: 'rgba(145, 158, 171, 0.2)'
    },
    columnHeaders: {
      borderBottom: 0
    },
    columnHeader: {
      fontSize: 14,
      color: '#637381',
      backgroundColor: '#F4F6F8',
      '&--sorted': {
        color: '#212B36'
      }
    },
    columnSeparator: {
      color: 'rgba(145, 158, 171, 0.2)'
    },
    cell: {
      borderBottom: '1px solid',
      borderLeft: '1px solid',
      '&--editing': {
        boxShadow: 'none !important',
        backgroundColor: 'rgba(0, 167, 111, 0.08) !important'
      }
    },
    toolbarContainer: {
      gap: '16px',
      padding: '16px'
    },
    toolbarFilterList: {
      padding: 0,
      width: '100%',
      '@media (min-width:900px)': {
        width: 'unset'
      }
    },
    paper: {
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backgroundImage: 'url(/assets/cyan-blur.png), url(/assets/red-blur.png)',
      backgroundRepeat: 'no-repeat, no-repeat',
      backgroundPosition: 'top right, left bottom',
      backgroundSize: '50%, 50%',
      padding: 0,
      boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
      borderRadius: 10
    },
    menu: {
      '& .MuiPaper-root': {
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backgroundImage: 'url(/assets/cyan-blur.png), url(/assets/red-blur.png)',
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: 'top right, left bottom',
        backgroundSize: '50%, 50%',
        padding: '4px',
        boxShadow: '0 0 2px 0 rgba(145, 158, 171, 0.24), -20px 20px 40px -4px rgba(145, 158, 171, 0.24)',
        borderRadius: 4,
        minWidth: 140
      },
      '& .MuiList-root': {
        padding: 0,
        '& .MuiListItemIcon-root': {
          minWidth: 0,
          marginRight: '16px'
        }
      }
    },
    menuIcon: {
      '& .MuiIconButton-root': {
        margin: '0px 8px',
        padding: '2px'
      }
    },
    iconButtonContainer: {
      '& .MuiIconButton-root': {
        padding: '2px',
        marginLeft: '8px'
      }
    },
    footerContainer: {
      minHeight: 'auto',
      borderTop: '1px dashed'
    },
    selectedRowCount: {
      display: 'none',
      whiteSpace: 'nowrap'
    },
    overlay: {
      '& .MuiCircularProgress-root': {
        color: '#212B36'
      }
    },
    panelHeader: {
      padding: '16px 16px 0px 16px'
    },
    panelContent: {
      padding: '8px'
    },
    panelFooter: {
      display: 'none',
      gap: '8px',
      padding: '16px',
      justifyContent: 'flex-end',
      borderTop: 'dashed 1px rgba(145, 158, 171, 0.2)',
      '& .MuiButton-root': {
        padding: '4px 12px',
        '&:first-of-type': {
          border: 'solid 1px rgba(145, 158, 171, 0.24)'
        },
        '&:last-of-type': {
          color: '#FFFFFF',
          backgroundColor: '#212B36'
        }
      }
    },
    filterForm: {
      alignItems: 'center',
      gap: '12px',
      padding: '8px'
    },
    filterFormValueInput: {
      '& .MuiFormControl-root': {
        width: '100%'
      },
      '& .MuiInputLabel-root': {
        transform: 'translate(14px, -9px) scale(0.75)'
      }
    }
  }
};
