'use client';

import { styled } from '@mui/material/styles';

export const StyledToastContainer = styled('div')`
  & .Toastify__toast-container {
    width: fit-content;

    & .Toastify__toast {
      min-height: 0;
      background-color: #ffffff;
      padding: 0;
      width: fit-content;
      box-shadow: ${({ theme }) => theme.vars?.customShadows?.z4};
      border-radius: 8px;

      & .Toastify__toast-body {
        border-radius: 8px;
        font-size: ${({ theme }) => theme.typography.body2.fontSize};
        font-weight: 400;
        width: fit-content;
        min-width: ${({ theme }) => theme.spacing(40)};
        margin: 0;
        border: 1px solid;
        padding: 8px 40px 8px 8px;

        & .MuiButton-root {
          font-size: 16px;
          padding: 8px 24px;
          line-height: 1.25;
        }
        div:last-of-type {
          ::before {
            font-size: ${({ theme }) => theme.typography.body1.fontSize};
            font-weight: 600;
          }
          display: inline-flex;
          gap: 2px;
          flex-direction: column;
        }
      }

      & .close-box {
        display: flex;
        align-items: center;
        position: absolute;
        right: 4px;
        top: 0;
        bottom: 0;
      }

      & .Toastify__toast-icon svg {
        fill: currentColor;
      }

      & .MuiButton-root {
        background-color: currentColor;
      }

      &.Toastify__toast--success {
        & .Toastify__toast-body {
          background-color: ${({ theme }) => theme.palette.success.light}14;
          color: ${({ theme }: any) => theme.vars.palette.success.dark};
          border-color: ${({ theme }) => theme.palette.success.main}29;

          div:last-of-type::before {
            content: 'Thành công';
          }
        }
      }

      &.Toastify__toast--warning {
        & .Toastify__toast-body {
          background-color: ${({ theme }) => theme.palette.warning.light}14;
          color: ${({ theme }: any) => theme.vars.palette.warning.dark};
          border-color: ${({ theme }) => theme.palette.warning.main}29;

          div:last-of-type::before {
            content: 'Cảnh báo';
          }
        }
      }

      &.Toastify__toast--error {
        & .Toastify__toast-body {
          background-color: ${({ theme }) => theme.palette.error.light}14;
          color: ${({ theme }: any) => theme.vars.palette.error.dark};
          border-color: ${({ theme }) => theme.palette.error.main}29;

          div:last-of-type::before {
            content: 'Lỗi';
          }
        }
      }

      &.Toastify__toast--default {
        & .Toastify__toast-body {
          background-color: ${({ theme }) => theme.palette.info.light}14;
          color: ${({ theme }: any) => theme.vars.palette.info.dark};
          border-color: ${({ theme }) => theme.palette.info.main}29;

          & > div:last-of-type::before {
            content: '...';
          }
        }

        & .Toastify__spinner {
          border-color: ${({ theme }) => theme.palette.info.main}75;
          border-right-color: ${({ theme }: any) => theme.vars.palette.info.main};
        }
      }

      &.Toastify__toast--info {
        & .Toastify__toast-body {
          background-color: ${({ theme }) => theme.palette.info.main}14;
          color: ${({ theme }: any) => theme.vars.palette.info.dark};
          border-color: ${({ theme }) => theme.palette.info.main}29;

          div:last-of-type::before {
            content: 'Info';
          }
        }
      }
    }

    @media only screen and (max-width: 480px) {
      left: 50% !important;
      transform: translateX(-50%) translateY(16px) !important;

      & .Toastify__toast {
        & .Toastify__toast-body {
          font-size: 12px;
          padding: 8px 40px 12px 8px;
        }
      }
    }
  }
`;
