import { FC, useEffect, useMemo, useState } from 'react';
import { PhotoUploadItem } from '../../stores/receiving.store';
import { Text } from '../Typography/styles';
import {
  ButtonContainer,
  CarouselArea,
  CarouselArrow,
  CarouselImage,
  CarouselImageBox,
  CloseButton,
  Icon,
  ModalContent,
  ModalContentContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PlaceholderBox,
} from './styles';

interface ImagePreviewModalProps {
  files: PhotoUploadItem[];
  onClose: () => void;
}

const PlaceholderSVG = () => (
  <PlaceholderBox>
    <svg
      width="80"
      height="80"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="120" height="120" rx="12" fill="#E5E9EB" />
      <path
        d="M40 80L60 60L80 80"
        stroke="#B0B8C1"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="50" r="8" fill="#B0B8C1" />
    </svg>
  </PlaceholderBox>
);

const ImagePreviewModal: FC<ImagePreviewModalProps> = ({ files, onClose }) => {
  const [current, setCurrent] = useState(0);

  const fileUrls = useMemo(() => {
    return files.map((item) => {
      if (item.url) {
        return { file: item.file, url: item.url };
      }
      const file = item.file;
      if (file instanceof File) {
        return { file, url: URL.createObjectURL(file) };
      }
      return { file, url: '' };
    });
  }, [files]);

  useEffect(() => {
    return () => {
      fileUrls.forEach(({ url }) => {
        if (url && !files.some((f) => f.url === url)) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [fileUrls, files]);

  if (files.length === 0) {
    onClose();
    return null;
  }

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev - 1 + files.length) % files.length);
  };
  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % files.length);
  };

  const { file, url } = fileUrls[current];

  return (
    <ModalOverlay onClick={onClose}>
      <div>
        <ButtonContainer>
          <CloseButton onClick={onClose}>
            <Icon
              className="material-symbols-outlined"
              style={{ marginRight: '6px' }}
            >
              arrow_back
            </Icon>
            <Text variant="small">Voltar</Text>
          </CloseButton>
        </ButtonContainer>

        <ModalContentContainer>
          <CarouselArrow onClick={goPrev} aria-label="Imagem anterior">
            <Icon className="material-symbols-outlined" fontSize={33}>
              arrow_back_ios
            </Icon>
          </CarouselArrow>

          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader></ModalHeader>
            <CarouselArea>
              <CarouselImageBox>
                {url ? (
                  <CarouselImage src={url} alt={file.name} />
                ) : (
                  <PlaceholderSVG />
                )}
              </CarouselImageBox>
            </CarouselArea>
            <ModalFooter>
              <Text variant="body" color="#444">
                <span
                  style={{ fontWeight: 500 }}
                >{`${current + 1} de ${files.length} imagens`}</span>
              </Text>
              <Text variant="small" color="#888">
                {file.name}
              </Text>
            </ModalFooter>
          </ModalContent>

          <CarouselArrow onClick={goNext} aria-label="Próxima imagem">
            <Icon className="material-symbols-outlined" fontSize={33}>
              arrow_forward_ios
            </Icon>
          </CarouselArrow>
        </ModalContentContainer>
      </div>
    </ModalOverlay>
  );
};

export default ImagePreviewModal;
