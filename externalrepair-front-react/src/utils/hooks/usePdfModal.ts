import { useCallback, useState } from 'react';

interface PdfStore {
  getNfPdf: (nfe: string) => Promise<string | void>;
  clearPdfUrl: () => void;
  pdfUrl: string | null;
  pdfLoading?: boolean;
}

interface UsePdfModalReturn {
  handleEyeClick: (nfe: string) => Promise<void>;
  handleClosePdfModal: () => void;
  pdfUrl: string | null;
  isLoading: boolean;
  isVisible: boolean;
}

export const usePdfModal = (
  store: PdfStore,
  getPdfMethod?: (nfe: string) => Promise<string | void>,
): UsePdfModalReturn => {
  const [isVisible, setIsVisible] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  const handleEyeClick = useCallback(
    async (nfe: string) => {
      try {
        setIsVisible(true);
        setLocalLoading(true);

        if (getPdfMethod) {
          await getPdfMethod.call(store, nfe);
        } else {
          await store.getNfPdf(nfe);
        }
      } catch (error) {
        console.error('Erro ao abrir PDF:', error);
        setIsVisible(false);
      } finally {
        setLocalLoading(false);
      }
    },
    [store, getPdfMethod],
  );

  const handleClosePdfModal = useCallback(() => {
    setIsVisible(false);
    setLocalLoading(false);
    try {
      store.clearPdfUrl();
    } catch (error) {
      console.error('Erro ao limpar PDF:', error);
    }
  }, [store]);

  return {
    handleEyeClick,
    handleClosePdfModal,
    pdfUrl: store.pdfUrl,
    isLoading: localLoading || store.pdfLoading || false,
    isVisible:
      isVisible || localLoading || !!store.pdfUrl || store.pdfLoading || false,
  };
};
