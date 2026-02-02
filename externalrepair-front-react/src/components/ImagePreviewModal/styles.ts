import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: var(--color-bg, #f3f6f7);
  border-radius: 24px;
  max-width: 90vw;
  max-height: 90vh;
  min-width: 320px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0;
  box-shadow: 0 2px 16px #0001;
`;

export const ModalContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: none;
  width: 100%;
`;

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  background: transparent;
  border: none;
  margin: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
`;

interface IconProps {
  fontSize?: number | string;
}

export const Icon = styled.span<IconProps>`
  font-size: ${({ fontSize }) =>
    fontSize !== undefined
      ? typeof fontSize === 'number'
        ? `${fontSize}px`
        : fontSize
      : pxToRem(18)};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
`;

export const CloseButton = styled.button`
  display: flex;
  flex-direction: row;
  margin-bottom: 6px;
  margin-right: 50px;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 23px;
  font-size: 18px;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #e5e9eb;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #f3f6f7;
  }
`;

export const ImagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const Image = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
`;

export const CarouselArea = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  min-width: 320px;
  position: relative;
  background: #d1d5db;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;

  @media (max-width: 600px) {
    padding: 8px;
    min-width: 0;
    min-height: 0;
  }
`;

export const CarouselArrow = styled.button`
  top: 50%;
  transform: translateY(-50%);
  border: none;

  color: #b0b8c1;
  background-color: transparent;
  cursor: pointer;
  z-index: 2;
  padding: 0 8px;
  @media (max-width: 600px) {
    font-size: 32px;
  }
`;

export const CarouselImageBox = styled.div`
  background: #d1d5db;

  border-radius: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 16px #0001;
  @media (max-width: 600px) {
    min-width: 180px;
    min-height: 180px;
    max-width: 90vw;
    max-height: 40vh;
  }
`;

export const CarouselImage = styled.img`
  max-width: 850px;
  max-height: 410px;
  border-radius: 16px;
  object-fit: cover;
  background: #f3f6f7;
`;

export const ModalFooter = styled.div`
  width: 100%;
  background: #d1d5db;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 16px 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 600px) {
    padding: 8px 12px;
  }
`;

export const PlaceholderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  border: 2px solid #2196f3;
  background: #e5e9eb;
`;
