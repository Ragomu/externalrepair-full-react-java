import { ToastContainer } from 'react-toastify';
import styled from 'styled-components';

export const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
`;

export const ToastContainerStyled = styled(ToastContainer)`
  position: fixed !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 99999 !important;

  .Toastify__toast {
    background: var(--color-background-primary);
    color: var(--color-text-main);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--color-border);
  }

  .Toastify__toast--success {
    background: var(--color-success-green);
    color: white;
  }

  .Toastify__toast--error {
    background: var(--color-danger-red);
    color: white;
  }

  .Toastify__toast--warning {
    background: var(--color-primary-yellow);
    color: white;
  }

  .Toastify__toast--info {
    background: var(--color-primary-blue);
    color: white;
  }

  .Toastify__close-button {
    color: currentColor;
    opacity: 0.7;
  }

  .Toastify__progress-bar {
    background: rgba(255, 255, 255, 0.7);
  }
`;
