import { useCallback, useRef, useState } from 'react';
import {
  type OnResizeCallback,
  useResizeDetector,
} from 'react-resize-detector';

interface UseResponsiveAlignmentOptions {
  containerPadding?: number;
  refreshRate?: number;
  initialMargin?: number;
}

interface UseResponsiveAlignmentReturn {
  containerRef: any;
  inputsContainerRef: React.RefObject<HTMLDivElement>;
  saveButtonRef: React.RefObject<HTMLButtonElement>;
  calculatedMargin: number;
}

/**
 * Hook para calcular margem responsiva e manter elementos alinhados
 *
 * @param options Opções de configuração
 * @returns Refs e margem calculada para aplicar nos elementos.
 */
export const useResponsiveAlignment = (
  options: UseResponsiveAlignmentOptions = {},
): UseResponsiveAlignmentReturn => {
  const {
    containerPadding = 20,
    refreshRate = 100,
    initialMargin = 100,
  } = options;

  const [calculatedMargin, setCalculatedMargin] = useState(initialMargin);
  const saveButtonRef = useRef<HTMLButtonElement>(null);
  const inputsContainerRef = useRef<HTMLDivElement>(null);

  const onResize: OnResizeCallback = useCallback(
    (payload) => {
      if (
        payload.width !== null &&
        payload.width !== undefined &&
        saveButtonRef.current &&
        inputsContainerRef.current
      ) {
        const saveButtonWidth = saveButtonRef.current.offsetWidth;
        const inputsContainerWidth = inputsContainerRef.current.offsetWidth;

        const newMargin = Math.max(
          0,
          payload.width -
            inputsContainerWidth -
            saveButtonWidth -
            containerPadding,
        );
        setCalculatedMargin(newMargin);
      }
    },
    [containerPadding],
  );

  const { ref: containerRef } = useResizeDetector({
    onResize,
    refreshMode: 'debounce',
    refreshRate,
  });

  return {
    containerRef,
    inputsContainerRef,
    saveButtonRef,
    calculatedMargin,
  };
};
