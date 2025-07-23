import type { Components, CssVarsTheme } from '@mui/material/styles';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { createElement } from 'react';

const slots = {
  openPickerIcon: () => createElement(Calendar, { className: 'size-4' }),
  leftArrowIcon: () => createElement(ChevronLeft, { className: 'size-4' }),
  rightArrowIcon: () => createElement(ChevronRight, { className: 'size-4' }),
  switchViewIcon: () => createElement(ChevronDown, { className: 'size-4' }),
  clearIcon: () => createElement(ChevronDown, { className: 'size-4' })
};

export const MuiDatePicker: Components<CssVarsTheme>['MuiDatePicker'] = {
  defaultProps: {
    slots,
    slotProps: {
      textField: {
        size: 'small',
        InputLabelProps: {
          shrink: true
        }
      }
    },
    format: 'DD/MM/YYYY'
  }
};

export const MuiDateTimePicker: Components<CssVarsTheme>['MuiDateTimePicker'] = {
  defaultProps: {
    slots
  }
};

export const MuiStaticDatePicker: Components<CssVarsTheme>['MuiStaticDatePicker'] = {
  defaultProps: {
    slots
  }
};

export const MuiDesktopDatePicker: Components<CssVarsTheme>['MuiDesktopDatePicker'] = {
  defaultProps: {
    slots,
    slotProps: {
      textField: {
        size: 'small',
        slotProps: {
          inputLabel: {
            shrink: true
          }
        }
      }
    }
  }
};

export const MuiDesktopDateTimePicker: Components<CssVarsTheme>['MuiDesktopDateTimePicker'] = {
  defaultProps: {
    slots
  }
};

export const MuiMobileDatePicker: Components<CssVarsTheme>['MuiMobileDatePicker'] = {
  defaultProps: {
    slots,
    slotProps: {
      textField: {
        size: 'small',
        slotProps: {
          inputLabel: {
            shrink: true
          }
        }
      }
    }
  }
};

export const MuiMobileDateTimePicker: Components<CssVarsTheme>['MuiMobileDateTimePicker'] = {
  defaultProps: {
    slots
  }
};

export const MuiMultiSectionDigitalClock: Components<CssVarsTheme>['MuiMultiSectionDigitalClock'] = {
  styleOverrides: {
    root: {
      '& .MuiMultiSectionDigitalClockSection-root': {
        '&::-webkit-scrollbar': {
          width: '4px'
        }
      }
    }
  }
};
