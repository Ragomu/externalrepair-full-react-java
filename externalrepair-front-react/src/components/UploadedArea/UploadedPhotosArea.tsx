import React from 'react';
import { useStore } from '~/stores';
import { Text } from '../Typography/styles';
import {
  ButtonContainer,
  Container,
  ImagesInfo,
  ImagesList,
  InfoContainer,
  Preview,
  ViewButton,
} from './styles';

interface UploadedPhotosAreaProps {
  images: { name: string }[];
  totalSize: string;
  onClick: () => void;
  onView: () => void;
  children: React.ReactNode;
}
const { receivingStore } = useStore();

const UploadedPhotosArea: React.FC<UploadedPhotosAreaProps> = ({
  images,
  totalSize,
  onClick,
  onView,
  children,
}) => {
  return (
    <Container>
      {receivingStore.canAddMorePhotos && !receivingStore.hasPhotos && (
        <Preview onClick={onClick} aria-label="Adicionar foto">
          <span>+</span>
        </Preview>
      )}

      <InfoContainer>
        <ImagesInfo>
          <Text variant="body" color="white">
            {images.length > 1 ? `Uploads concluídos` : `Upload concluído`}
          </Text>
          {!receivingStore.hasPhotos && (
            <Text variant="small" color="white">
              {totalSize} – {images.length} image
              {images.length > 1 ? 'ns' : 'm'} de 5
            </Text>
          )}

          <ImagesList>{children}</ImagesList>
        </ImagesInfo>
        <ButtonContainer>
          <ViewButton as="a" onClick={onView}>
            Visualizar imagens
          </ViewButton>
        </ButtonContainer>
      </InfoContainer>
    </Container>
  );
};

export default UploadedPhotosArea;
