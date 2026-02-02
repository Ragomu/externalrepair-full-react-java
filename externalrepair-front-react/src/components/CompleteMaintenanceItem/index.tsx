import React, { useRef, useState } from 'react';
import { MaintenanceNfItem } from '~/api/maintenance';
import { showAlert } from '~/utils/helpers';
import { formatToScreenDate } from '~/utils/helpers/dateFormatter';
import { useResponsiveAlignment, useStatusColors } from '~/utils/hooks';
import { maintenanceStore } from '../../stores/maintenance.store';
import { ConnectionLine } from '../ConnectionLine';
import CorrectionSection from '../CorrectionSection';
import Divider from '../Divider';
import {
  ActionButton,
  EditForm,
  MaintenanceTable,
  ReturnSection,
  StatusMessage,
} from './components';
import { useMaintenanceState } from './hooks/useMaintenanceState';
import {
  ButtonContainer,
  Container,
  SignalButton,
  SignalIcon,
  Wrapper,
} from './styles';

interface CompleteMaintenanceItemProps {
  items: MaintenanceNfItem[];
  nfe: string;
  maintenanceStatus: string;
  sentNf?: {
    returnNf: string;
    justification: string;
  }[];
}

const CompleteMaintenanceItem = ({
  items,
  nfe,
  maintenanceStatus,
  sentNf,
}: CompleteMaintenanceItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [returnDate, setReturnDate] = useState('');
  const [returnNfInput, setReturnNfInput] = useState('');
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const firstCellRef = useRef<HTMLDivElement>(null);
  const isSent = maintenanceStatus === 'sent';
  const isReproved = maintenanceStatus === 'reproved';

  const statusColors = useStatusColors(maintenanceStatus);
  const BORDER_COLOR = statusColors.border;

  const maintenanceState = useMaintenanceState({
    maintenanceStatus,
  });

  const { containerRef, inputsContainerRef, saveButtonRef } =
    useResponsiveAlignment({
      containerPadding: 100,
      refreshRate: 100,
      initialMargin: 100,
    });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handleSave = async (relatedNfs: any[] = []) => {
    if (pdfFile && returnDate) {
      try {
        const returnDateFormatted = formatToScreenDate(new Date(returnDate));

        const additionalNfNumbers = relatedNfs
          .filter((nf) => nf.nfNumber && nf.nfNumber.trim() !== '')
          .map((nf) => nf.nfNumber);

        const additionalNfFiles = relatedNfs
          .filter((nf) => nf.pdfFile)
          .map((nf) => nf.pdfFile);

        await maintenanceStore.updateMaintenanceNf(nfe, {
          request: {
            returnDate: returnDateFormatted,
            returnNfNumber: returnNfInput,
            additionalNfNumbers: additionalNfNumbers,
          },
          returnNfFile: pdfFile,
          additionalNfFiles: additionalNfFiles.filter(
            (file) => file !== null,
          ) as File[],
        });
        setExpanded(false);

        showAlert({
          message: 'NF-e de retorno atualizada com sucesso',
          type: 'success',
          position: 'top-right',
        });
        setTimeout(() => window.history.back(), 1000);
      } catch (error) {
        console.error('Erro ao salvar NF-e de retorno:', error);
        showAlert({
          message: 'Erro ao salvar NF-e de retorno. Tente novamente.',
          type: 'error',
          position: 'top-right',
        });
      }
    }
  };
  const handleSaveCorrection = async (relatedNfs: any[] = []) => {
    if (pdfFile && returnDate) {
      try {
        const returnDateFormatted = formatToScreenDate(new Date(returnDate));

        const additionalNfNumbers = relatedNfs
          .filter((nf) => nf.nfNumber && nf.nfNumber.trim() !== '')
          .map((nf) => nf.nfNumber);

        const additionalNfFiles = relatedNfs
          .filter((nf) => nf.pdfFile)
          .map((nf) => nf.pdfFile);

        await maintenanceStore.updateMaintenanceNf(nfe, {
          request: {
            returnDate: returnDateFormatted,
            returnNfNumber: returnNfInput,
            additionalNfNumbers: additionalNfNumbers,
          },
          returnNfFile: pdfFile,
          additionalNfFiles: additionalNfFiles.filter(
            (file) => file !== null,
          ) as File[],
        });
        setExpanded(false);

        showAlert({
          message: 'Correção salva com sucesso',
          type: 'success',
          position: 'top-right',
        });
      } catch (error) {
        console.error('Erro ao salvar correção:', error);
        showAlert({
          message: 'Erro ao salvar correção. Tente novamente.',
          type: 'error',
          position: 'top-right',
        });
      }
    }
  };

  const handleDelete = async () => {
    try {
      await maintenanceStore.updateMaintenanceNf(nfe, {
        request: {
          returnDate: null,
          returnNfNumber: null,
          additionalNfNumbers: [],
        },
        returnNfFile: null,
        additionalNfFiles: [],
      });

      showAlert({
        message: 'NF-e de retorno deletada com sucesso',
        type: 'success',
        position: 'top-right',
      });
      setTimeout(() => window.history.back(), 1000);
      setExpanded(false);
    } catch (error) {
      console.error('Erro ao deletar NF-e de retorno:', error);
      showAlert({
        message: 'Erro ao deletar NF-e de retorno. Tente novamente.',
        type: 'error',
        position: 'top-right',
      });
    }
  };

  return (
    <Wrapper>
      <StatusMessage
        show={maintenanceState.showSuccessMessage}
        status={maintenanceState.status}
      />

      <Container borderColor={BORDER_COLOR} ref={containerRef}>
        <MaintenanceTable
          items={items}
          expanded={expanded}
          ref={firstCellRef}
        />

        {expanded && !isSent && !isReproved && (
          <>
            <ConnectionLine
              items={[{ color: BORDER_COLOR }]}
              firstCellRef={firstCellRef}
              itemsCount={items.length}
            >
              <EditForm
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                returnNf={returnNfInput}
                setReturnNf={setReturnNfInput}
                pdfFile={pdfFile}
                onFileChange={handleFileChange}
                onSave={handleSave}
                inputsContainerRef={inputsContainerRef}
                saveButtonRef={saveButtonRef}
                loading={maintenanceStore.maintenanceNfItemsLoading}
              />
            </ConnectionLine>
            <Divider />
            <ButtonContainer style={{ marginBottom: '10px' }}>
              <SignalButton onClick={() => setExpanded(false)} expanded>
                <SignalIcon className="material-symbols-outlined">
                  chip_extraction
                </SignalIcon>
                Sair da edição
              </SignalButton>
            </ButtonContainer>
          </>
        )}

        {isSent && expanded && !maintenanceState.isEditing ? (
          <ConnectionLine
            items={[
              {
                color: BORDER_COLOR,
              },
            ]}
            firstCellRef={firstCellRef}
            itemsCount={items.length}
          >
            <ReturnSection
              returnNf={sentNf?.[sentNf.length - 1]?.returnNf}
              onEdit={() => {
                maintenanceState.setIsEditing(true);
                setExpanded(true);
              }}
              onDelete={handleDelete}
              maintenanceStatus={maintenanceStatus}
            />
          </ConnectionLine>
        ) : isReproved && expanded ? (
          <ConnectionLine
            items={[{ color: BORDER_COLOR }]}
            firstCellRef={firstCellRef}
            itemsCount={items.length}
            childrenConfig={[{ height: 80 }, undefined]}
            gap={80}
          >
            <CorrectionSection sentNf={sentNf} />
            <EditForm
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              returnNf={returnNfInput}
              setReturnNf={setReturnNfInput}
              pdfFile={pdfFile}
              onFileChange={handleFileChange}
              onSave={handleSaveCorrection}
              inputsContainerRef={inputsContainerRef}
              saveButtonRef={saveButtonRef}
              loading={maintenanceStore.maintenanceNfItemsLoading}
            />
          </ConnectionLine>
        ) : (
          isSent &&
          expanded &&
          maintenanceState.isEditing && (
            <>
              <ConnectionLine
                items={[{ color: BORDER_COLOR }]}
                firstCellRef={firstCellRef}
                itemsCount={items.length}
              >
                <EditForm
                  returnDate={returnDate}
                  setReturnDate={setReturnDate}
                  returnNf={returnNfInput}
                  setReturnNf={setReturnNfInput}
                  pdfFile={pdfFile}
                  onFileChange={handleFileChange}
                  onSave={handleSave}
                  inputsContainerRef={inputsContainerRef}
                  saveButtonRef={saveButtonRef}
                  loading={maintenanceStore.maintenanceNfItemsLoading}
                />
              </ConnectionLine>
              <Divider />
              <ButtonContainer style={{ marginBottom: '10px' }}>
                <SignalButton
                  onClick={() => {
                    maintenanceState.setIsEditing(false);
                    setExpanded(false);
                  }}
                  expanded
                >
                  <SignalIcon className="material-symbols-outlined">
                    chip_extraction
                  </SignalIcon>
                  Sair da edição
                </SignalButton>
              </ButtonContainer>
            </>
          )
        )}
      </Container>

      <ActionButton
        maintenanceState={maintenanceState}
        expanded={expanded}
        onExpand={() => setExpanded(true)}
      />
    </Wrapper>
  );
};

export default CompleteMaintenanceItem;
