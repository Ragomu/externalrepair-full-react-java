import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  width: 100%;
  height: 100%;
  max-width: 1200px;
  max-height: 800px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 12px;
  min-height: 40px;
  display: flex;
  align-items: flex-end;
`;

export const CloseButton = styled.button`
  background: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  span {
    font-size: 24px;
    color: #666;
  }
`;

export const PdfViewer = styled.div`
  flex: 1;
  padding: 36px;

  iframe {
    border: none;
    border-radius: 8px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 16px;

  .rotating {
    font-size: 48px;
    color: var(--color-primary, #007bff);
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorIcon = styled.span`
  font-size: 48px;
  color: #ff6b6b;
`;

export const MobileContainer = styled.div`
  padding: 40px;
  text-align: center;
`;

export const MobileParagraph = styled.p`
  margin-bottom: 20px;
`;

export const OpenPdfButton = styled.button`
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;
