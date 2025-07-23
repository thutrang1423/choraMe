import {
  DensityMediumRounded,
  DensitySmallRounded,
  FilterListOffRounded,
  FilterListRounded
} from '@mui/icons-material';
import type { MRT_TableOptions } from 'material-react-table';
import { createElement } from 'react';

import { dataGridLocalization } from '@/shared/utilities/localization';
import NoRecordView from '@/shared/components/no-record-view';

export const tableOptions: Partial<MRT_TableOptions<any>> = {
  paginationDisplayMode: 'pages',
  layoutMode: 'grid',
  muiPaginationProps: {
    variant: 'soft',
    shape: 'rounded',
    color: 'primary'
  },
  manualPagination: true,
  manualFiltering: true,
  enableSorting: false,
  enableGlobalFilter: false,
  localization: dataGridLocalization,
  renderEmptyRowsFallback: () => createElement(NoRecordView),
  icons: {
    DensitySmallIcon: () =>
      createElement(DensitySmallRounded, {
        fontSize: 'small'
      }),
    DensityMediumIcon: () =>
      createElement(DensityMediumRounded, {
        fontSize: 'small'
      }),
    DensityLargeIcon: () =>
      createElement(DensityMediumRounded, {
        fontSize: 'small'
      }),
    ViewColumnIcon: () =>
      createElement('span', {
        className: 'i-mingcute-column-fill h-5 w-5'
      }),
    FilterListIcon: () => createElement(FilterListRounded, { fontSize: 'small' }),
    FilterListOffIcon: () => createElement(FilterListOffRounded, { fontSize: 'small' })
  },
  muiColumnActionsButtonProps: {
    size: 'small'
  },
  muiTableHeadCellProps: {
    align: 'center',
    className: '!text-wrap'
  },
  positionActionsColumn: 'last',
  muiTableContainerProps: {
    className: 'overflow-x-auto'
  },
  displayColumnDefOptions: {
    'mrt-row-actions': {
      muiTableHeadCellProps: {
        align: 'center'
      },
      muiTableBodyCellProps: {
        align: 'center'
      },
      size: 100
    },
    'mrt-row-expand': {
      header: '',
      muiTableBodyCellProps: {
        align: 'center'
      },
      size: 60,
      maxSize: 60,
      minSize: 60
    }
  }
};
