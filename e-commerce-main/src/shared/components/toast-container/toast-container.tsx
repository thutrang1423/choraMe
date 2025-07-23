'use client';

import CloseIcon from '@mui/icons-material/CloseRounded';
import { Box, IconButton } from '@mui/material';
import type { MouseEvent } from 'react';
import { ToastContainer as BaseToastContainer, type ToastContainerProps } from 'react-toastify';

import { StyledToastContainer } from './toast-container.styles';

const CloseButton = ({ closeToast }: { closeToast: (e: MouseEvent<HTMLElement>) => void }) => {
  return (
    <Box className='close-box'>
      <IconButton size='small' onClick={closeToast}>
        <CloseIcon fontSize='small' />
      </IconButton>
    </Box>
  );
};

const ToastContainer = ({ ...props }: ToastContainerProps) => {
  return (
    <StyledToastContainer>
      <BaseToastContainer position='top-right' {...props} closeButton={CloseButton} />
    </StyledToastContainer>
  );
};

export default ToastContainer;
