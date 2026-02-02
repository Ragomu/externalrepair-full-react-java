import React, { useEffect, useRef, useState } from 'react';
import ConnectionLineItem from './ConnectionLineItem';
import {
  ChildrenContainer,
  ConnectionLineContainer,
  ItemsContainer,
  LineVertical,
  VerticalSpacer,
} from './styles';

type ConnectionLineChildConfig = {
  height?: number;
  traceHeight?: number;
};

type LineItemConfig = {
  color: string;
  traceHeight?: number;
};

type ConnectionLineProps = {
  items: LineItemConfig[];
  left?: number;
  top?: number;
  children?: React.ReactNode;
  firstCellRef?: React.RefObject<HTMLDivElement>;
  itemsCount?: number;
  childrenConfig?: (ConnectionLineChildConfig | undefined)[];
  gap?: number;
  childrenLeft?: number;
};

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  items,
  left,
  top,
  children,
  firstCellRef,
  itemsCount,
  childrenConfig,
  childrenLeft,
  gap = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [calculatedHeight, setCalculatedHeight] = useState(0);
  const [firstCellOffset, setFirstCellOffset] = useState(0);
  const [childrenHeights, setChildrenHeights] = useState<number[]>([]);

  // Força recálculo quando children mudam
  const childrenKey = React.Children.toArray(children)
    .map((child) => (React.isValidElement(child) ? child.key : ''))
    .join(',');

  const measureHeights = () => {
    if (containerRef.current && firstCellRef?.current) {
      const firstCell = firstCellRef.current;
      const prevSibling = containerRef.current.previousElementSibling;

      if (prevSibling && itemsCount) {
        const tableRect = prevSibling.getBoundingClientRect();
        const firstCellRect = firstCell.getBoundingClientRect();

        const firstCellY = firstCellRect.top - tableRect.top;

        const cellHeight = 25;
        const rowGap = 3;

        const needsExtraSpace = itemsCount > 1;
        const lineHeight = needsExtraSpace
          ? itemsCount * cellHeight + (itemsCount - 1) * rowGap + 20
          : itemsCount * cellHeight + (itemsCount - 1) * rowGap + 30;

        setFirstCellOffset(firstCellY);
        setCalculatedHeight(lineHeight);
      }
    }

    // Mede a altura de cada children (ou usa altura customizada por posição no array)
    const heights = childrenRefs.current.map((ref, index) => {
      // Se altura customizada foi fornecida, usa
      if (childrenConfig?.[index]?.height !== undefined) {
        return childrenConfig[index]!.height!;
      }
      // Caso contrário, mede automaticamente
      if (ref) {
        const firstChild = ref.firstElementChild as HTMLElement;
        if (firstChild) {
          return firstChild.offsetHeight;
        }
      }
      return 0;
    });

    setChildrenHeights(heights);
  };

  useEffect(() => {
    const timer = setTimeout(measureHeights, 100);

    // Observar mudanças no DOM dos children
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      setTimeout(measureHeights, 50);
    });

    childrenRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['style', 'class'],
        });
      }
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [children, firstCellRef, itemsCount, childrenKey]);

  const childrenArray = React.Children.toArray(children);
  const defaultGap = gap;
  const totalGaps =
    childrenArray.length > 1 ? (childrenArray.length - 1) * defaultGap : 0;
  const totalChildrenHeight =
    childrenHeights.reduce((acc, h) => acc + h, 0) + totalGaps;

  return (
    <ConnectionLineContainer
      ref={containerRef}
      left={left || 0}
      top={(top || 0) - firstCellOffset}
      style={{
        ['--cl-children-left' as any]: `${childrenLeft}px`,
      }}
    >
      <LineVertical
        totalHeight={
          childrenArray.length > 1
            ? calculatedHeight + totalChildrenHeight
            : calculatedHeight
        }
      />
      <ItemsContainer>
        {childrenArray.map((child, index) => {
          const previousHeights = childrenHeights
            .slice(0, index)
            .reduce((acc, height) => acc + height + gap, 0);

          return (
            <React.Fragment key={index}>
              <ConnectionLineItem
                color={items[index]?.color || 'var(--color-border)'}
                traceHeight={
                  childrenConfig?.[index]?.traceHeight !== undefined
                    ? childrenConfig[index]!.traceHeight!
                    : childrenHeights[index] || 25
                }
                positionY={calculatedHeight + previousHeights}
              />
              <ChildrenContainer
                ref={(el) => (childrenRefs.current[index] = el)}
                positionY={calculatedHeight + previousHeights}
                style={{
                  marginBottom: index < childrenArray.length - 1 ? gap : 0,
                }}
              >
                {child}
              </ChildrenContainer>
            </React.Fragment>
          );
        })}
      </ItemsContainer>
      <VerticalSpacer height={totalChildrenHeight + (top ?? 0)} />
    </ConnectionLineContainer>
  );
};

export default ConnectionLine;
