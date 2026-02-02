import { useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '~/stores';
import LoadedPhoto from '../LoadedPhoto';
import UploadedPhotosArea from '../UploadedArea/UploadedPhotosArea';
import {
  Button,
  Container,
  Icon,
  Instruction,
  Link,
  Title,
  UploadArea,
} from './styled';

interface PhotoUploadProps {
  onView: () => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = observer(({ onView }) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { receivingStore } = useStore();

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const processFiles = (selectedFiles: File[]) => {
    if (selectedFiles.length === 0) return;
    for (const file of selectedFiles) {
      receivingStore.addPhoto(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const dropped = Array.from(e.dataTransfer.files);
    processFiles(dropped);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  const handleConfirmRecebimento = async () => {
    await receivingStore.uploadAllPhotos();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files ? Array.from(e.target.files) : [];
    processFiles(selected);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemove = (file: File) => {
    receivingStore.removePhoto(file);
  };

  const { photos } = receivingStore;

  return (
    <Container>
      <input
        type="file"
        accept="image/jpeg, image/jpg"
        multiple
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      {photos.length === 0 && (
        <>
          <Title>IMAGENS DO EQUIPAMENTO</Title>

          <UploadArea
            isActive={isDragActive}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <Icon isActive={isDragActive} className="material-symbols-rounded">
              add_photo_alternate
            </Icon>
            <Instruction>
              Arraste e solte ou{' '}
              <Link onClick={handleClick}>escolha as imagens</Link> para fazer
              upload
            </Instruction>
          </UploadArea>
        </>
      )}
      {photos.length > 0 && (
        <UploadedPhotosArea
          images={photos.map((u) => ({
            name: u.file.name,
            url: u.url,
            file: u.file,
          }))}
          totalSize={formatSize(
            photos
              .filter((p) => !p.url)
              .reduce((acc, u) => acc + u.file.size, 0),
          )}
          onClick={handleClick}
          onView={onView}
        >
          {photos.map((u) => (
            <LoadedPhoto
              key={u.file.name + u.file.size}
              progress={u.progress}
              name={u.file.name}
              url={u.url}
              file={u.file}
              size={formatSize(u.file.size)}
              onClose={() => handleRemove(u.file)}
            />
          ))}
        </UploadedPhotosArea>
      )}
      {receivingStore.newPhotos.length > 0 && (
        <Button
          onClick={handleConfirmRecebimento}
          disabled={
            receivingStore.newPhotos.length < 5 || receivingStore.loading
          }
          loading={receivingStore.loading}
          accessibility="Confirmar recebimento e enviar imagens"
        >
          Confirmar o recebimento
        </Button>
      )}
    </Container>
  );
});

export default PhotoUpload;
