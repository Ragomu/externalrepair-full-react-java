import React, { useRef, useState } from 'react';
import { useStore } from '~/stores';
import { Icon } from '../../ImagePreviewModal/styles';
import { Text } from '../../Typography/styles';
import {
  AddNfButton,
  ColumnField,
  EditableFieldInput,
  EditableFieldWrapper,
  ExpandedContainer,
  FieldLabel,
  InputNfeContainer,
  InputsContainer,
  RelatedNfButton,
  RelatedNfButtonContainer,
  RelatedNfIcon,
  RelatedNfItem,
  RemoveButton,
  RowFieldsContainer,
  SaveButton,
} from '../styles';

interface RelatedNf {
  id: string;
  nfNumber: string;
  pdfFile: File | null;
}

interface EditFormProps {
  returnDate: string;
  setReturnDate: (date: string) => void;
  returnNf: string;
  setReturnNf: (nf: string) => void;
  pdfFile: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: (relatedNfs: RelatedNf[]) => void;
  inputsContainerRef: React.RefObject<HTMLDivElement>;
  saveButtonRef: React.RefObject<HTMLButtonElement>;
  loading?: boolean;
}

const { maintenanceStore } = useStore();

const EditForm = ({
  returnDate,
  setReturnDate,
  returnNf,
  setReturnNf,
  pdfFile,
  onFileChange,
  onSave,
  inputsContainerRef,
  saveButtonRef,
  loading,
}: EditFormProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [relatedNfs, setRelatedNfs] = useState<RelatedNf[]>([]);

  const handleFileContainerClick = () => {
    fileInputRef.current?.click();
  };

  const addRelatedNf = () => {
    const newRelatedNf: RelatedNf = {
      id: Date.now().toString(),
      nfNumber: '',
      pdfFile: null,
    };
    setRelatedNfs([...relatedNfs, newRelatedNf]);
  };

  const removeRelatedNf = (id: string) => {
    setRelatedNfs(relatedNfs.filter((nf) => nf.id !== id));
  };

  const updateRelatedNf = (
    id: string,
    field: keyof RelatedNf,
    value: string | File | null,
  ) => {
    setRelatedNfs(
      relatedNfs.map((nf) => (nf.id === id ? { ...nf, [field]: value } : nf)),
    );
  };

  const isFormValid = Boolean(
    returnDate &&
      returnDate.trim() !== '' &&
      returnNf &&
      returnNf.trim() !== '',
  );

  return (
    <RowFieldsContainer>
      <InputsContainer ref={inputsContainerRef}>
        <ColumnField>
          <FieldLabel>Data de retorno</FieldLabel>
          <EditableFieldWrapper>
            <EditableFieldInput
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              required
            />
          </EditableFieldWrapper>
        </ColumnField>
        <ColumnField>
          <FieldLabel>NF-e de retorno</FieldLabel>
          <EditableFieldWrapper>
            <EditableFieldInput
              type="number"
              value={returnNf}
              onChange={(e) => setReturnNf(e.target.value)}
              placeholder="Digite o número da NF-e"
              required
            />
          </EditableFieldWrapper>
        </ColumnField>
        <ColumnField>
          <InputNfeContainer
            onClick={handleFileContainerClick}
            hasFile={!!pdfFile}
          >
            <input
              required
              ref={fileInputRef}
              type="file"
              accept="application/pdf,.pdf"
              style={{ display: 'none' }}
              onChange={onFileChange}
            />
            <Icon className="material-symbols-outlined">attachment</Icon>
            <Text variant="small" color={pdfFile ? '#fff' : '#DB3537'}>
              {pdfFile ? pdfFile.name.slice(0, 15) + '...' : 'Nf-e de retorno'}
            </Text>
          </InputNfeContainer>
        </ColumnField>
        <SaveButton
          ref={saveButtonRef}
          onClick={() => onSave(relatedNfs)}
          loading={loading}
          disabled={!isFormValid}
        >
          {maintenanceStore.completeMaintenanceLoading ? (
            <Icon
              className="material-symbols-outlined"
              style={{
                marginRight: '8px',
                fontSize: '16px',
                animation: 'rotate 1s linear infinite',
              }}
            >
              progress_activity
            </Icon>
          ) : (
            'Confirmar'
          )}
        </SaveButton>
      </InputsContainer>

      {!expanded && (
        <RelatedNfButtonContainer style={{ marginTop: '18px' }}>
          <RelatedNfButton
            onClick={() => {
              setExpanded(true);
              addRelatedNf();
            }}
            expanded={false}
          >
            <RelatedNfIcon className="material-symbols-outlined">
              add_circle
            </RelatedNfIcon>
            Adicionar nota relacionada
          </RelatedNfButton>
        </RelatedNfButtonContainer>
      )}

      {expanded && (
        <ExpandedContainer>
          {relatedNfs.map((relatedNf) => (
            <RelatedNfItem key={relatedNf.id}>
              <ColumnField>
                <FieldLabel>NF-e relacionada</FieldLabel>
                <EditableFieldWrapper>
                  <EditableFieldInput
                    type="number"
                    value={relatedNf.nfNumber}
                    onChange={(e) =>
                      updateRelatedNf(relatedNf.id, 'nfNumber', e.target.value)
                    }
                    placeholder="Digite o número da NF-e relacionada"
                  />
                </EditableFieldWrapper>
              </ColumnField>
              <ColumnField>
                <InputNfeContainer
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'application/pdf,.pdf';
                    input.onchange = (e) => {
                      const file =
                        (e.target as HTMLInputElement).files?.[0] || null;
                      updateRelatedNf(relatedNf.id, 'pdfFile', file);
                    };
                    input.click();
                  }}
                  hasFile={!!relatedNf.pdfFile}
                >
                  <Icon className="material-symbols-outlined">attachment</Icon>
                  <Text
                    variant="small"
                    color={relatedNf.pdfFile ? '#fff' : '#DB3537'}
                  >
                    {relatedNf.pdfFile
                      ? relatedNf.pdfFile.name.slice(0, 15) + '...'
                      : 'NF-e relacionada'}
                  </Text>
                </InputNfeContainer>
              </ColumnField>
              <RemoveButton onClick={() => removeRelatedNf(relatedNf.id)}>
                <Icon className="material-symbols-outlined">delete</Icon>
              </RemoveButton>
            </RelatedNfItem>
          ))}

          <AddNfButton onClick={addRelatedNf} expanded={false}>
            <RelatedNfIcon className="material-symbols-outlined">
              add_circle
            </RelatedNfIcon>
            Adicionar nota relacionada
          </AddNfButton>
        </ExpandedContainer>
      )}
    </RowFieldsContainer>
  );
};

export default EditForm;
