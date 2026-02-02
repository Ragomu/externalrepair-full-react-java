import React from 'react';
import { useStore } from '~/stores';
import { Text } from '../Typography/styles';
import {
  CloseButton,
  Container,
  Info,
  NameWrapper,
  ProgressBar,
  ProgressBarBg,
  ProgressBarWrapper,
  ProgressText,
} from './style';

export interface LoadedPhotoProps {
  progress: number;
  name: string;
  url?: string;
  file: File;
  size: string;
  timeLeft?: string;
  onClose?: () => void;
}
const { receivingStore } = useStore();

const LoadedPhoto: React.FC<LoadedPhotoProps> = ({
  progress,
  name,
  onClose,
}) => {
  return (
    <Container>
      <Info>
        <NameWrapper>
          <Text as="span" variant="tiny" color="white">
            {name}
          </Text>
        </NameWrapper>
        {onClose && !receivingStore.hasPhotos && (
          <CloseButton onClick={onClose} aria-label="Remover" />
        )}
      </Info>
      {progress !== 100 && (
        <ProgressBarWrapper>
          <ProgressBarBg>
            <ProgressBar style={{ width: `${progress}%` }} />
          </ProgressBarBg>
          <ProgressText>{progress}%</ProgressText>
        </ProgressBarWrapper>
      )}
    </Container>
  );
};

export default LoadedPhoto;
