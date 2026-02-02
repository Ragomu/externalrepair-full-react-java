import PdfPreviewModal from '../PdfPreviewModal';

interface PdfModalProps {
  pdfUrl: string | null;
  isLoading: boolean;
  isVisible?: boolean;
  onClose: () => void;
}

const PdfModal = ({
  pdfUrl,
  isLoading,
  isVisible = true,
  onClose,
}: PdfModalProps) => {
  const shouldShow = isVisible && (isLoading || (pdfUrl && pdfUrl !== ''));

  const forceShow = !!pdfUrl && pdfUrl !== 'loading';

  if (!shouldShow && !forceShow) {
    return null;
  }

  return (
    <PdfPreviewModal
      pdfUrl={pdfUrl || ''}
      isLoading={isLoading}
      onClose={onClose}
    />
  );
};

export default PdfModal;
