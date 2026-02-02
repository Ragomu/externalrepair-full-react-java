import React from 'react';
import { devices } from '~/utils/helpers/devices';
import Divider from '../Divider';
import {
  CloseButton,
  ErrorIcon,
  LoadingContainer,
  MobileContainer,
  MobileParagraph,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  OpenPdfButton,
  PdfViewer,
} from './styles';

interface PdfPreviewModalProps {
  pdfUrl: string | null;
  isLoading?: boolean;
  onClose: () => void;
}

const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  pdfUrl,
  isLoading = false,
  onClose,
}) => {
  const renderContent = () => {
    if (isLoading || pdfUrl === 'loading') {
      return (
        <LoadingContainer>
          <span className="material-symbols-outlined rotating">
            progress_activity
          </span>
          <p>Carregando PDF...</p>
        </LoadingContainer>
      );
    }

    if (!pdfUrl || pdfUrl === '') {
      return (
        <LoadingContainer>
          <ErrorIcon className="material-symbols-outlined">error</ErrorIcon>
          <p>PDF não encontrado ou não disponível</p>
        </LoadingContainer>
      );
    }

    if (devices.isMobile) {
      return (
        <MobileContainer>
          <MobileParagraph>
            Seu dispositivo não suporta visualização de PDF embutido.
            <br />
            Clique abaixo para abrir o PDF em nova aba:
          </MobileParagraph>
          <OpenPdfButton onClick={() => window.open(pdfUrl, '_blank')}>
            Abrir PDF
          </OpenPdfButton>
        </MobileContainer>
      );
    }

    return (
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        title="PDF Preview"
        onError={() => {
          console.error(
            'PdfPreviewModal - Erro no iframe, abrindo em nova aba',
          );
          window.open(pdfUrl, '_blank');
        }}
      />
    );
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </CloseButton>
        </ModalHeader>
        <Divider />
        <PdfViewer>{renderContent()}</PdfViewer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PdfPreviewModal;
