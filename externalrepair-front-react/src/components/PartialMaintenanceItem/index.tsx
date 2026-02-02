import { Fragment, useRef, useState } from 'react';
import moment from 'moment';
import { MaintenanceNfItem } from '~/api/maintenance';
import { useStore } from '~/stores';
import { showAlert } from '~/utils/helpers';
import { ISO_DATE_INPUT } from '~/utils/helpers/dateFormatter';
import { usePermissions } from '~/utils/hooks';
import { useStatusColors } from '~/utils/hooks/useStatusColors';
import {
  mapMaintenanceItemDestiny,
  mapMaintenanceItemStatus,
} from '~/utils/status';
import ReturnSection from '../CompleteMaintenanceItem/components/ReturnSection';
import { ConnectionLine } from '../ConnectionLine';
import CorrectionSection from '../CorrectionSection';

import { DividerComponent } from '../Divider/styles';
import StatusChip from '../StatusChip';
import { Text } from '../Typography/styles';
import SubItemLabelChip from '../WaitingApprovelChip';
import {
  DisposalReport,
  PartialMaintenanceTable,
  SimpleQuantityForm,
} from './components';
import EditForm from './components/PartialReturnNfInput';
import {
  ActionButton,
  ActionButtonsContainer,
  ButtonsContainer,
  Container,
  DeleteButton,
  DeleteButtonContainer,
  DeleteIcon,
  ReturnButton,
  SignalButton,
  SignalIcon,
  Wrapper,
} from './styles';

// Removido estado local de itens sinalizados: agora cálculo depende só do backend

const PartialMaintenanceItem = ({ item }: { item: MaintenanceNfItem }) => {
  const NOT_FOUND_NF = 'NF não encontrada';
  const { maintenanceStore } = useStore();
  const { canEdit } = usePermissions();
  const canEditMaintenance = canEdit('manutencao');
  const [expanded, setExpanded] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    'return' | 'irreparable' | 'none' | null
  >(null);
  const [activeSubItemId, setActiveSubItemId] = useState<number | null>(null);

  // estados para formulário de retorno
  const [returnDate, setReturnDate] = useState('');
  const [returnNf, setReturnNf] = useState('');
  const [returnQuantity, setReturnQuantity] = useState<number | undefined>(
    undefined,
  );
  // arquivos separados por tipo
  const [returnPdfFile, setReturnPdfFile] = useState<File | null>(null);
  const [discardPdfFile, setDiscardPdfFile] = useState<File | null>(null);

  const [isAddingNewReturn, setIsAddingNewReturn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // estado para edição de sub-item
  const [isEditingSubItem, setIsEditingSubItem] = useState<number | null>(null);
  const [pendingSubItems, setPendingSubItems] = useState<any[]>([]);

  const firstCellRef = useRef<HTMLDivElement>(null);

  // refs necessários pelo EditForm
  const inputsContainerRef = useRef<HTMLDivElement>(null);
  const saveButtonRef = useRef<HTMLButtonElement>(null);

  const handleReturnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnPdfFile(e.target.files?.[0] || null);
  };

  const handleDiscardFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscardPdfFile(e.target.files?.[0] || null);
  };

  const handleSave = async (relatedNfs?: { pdfFile: File | null }[]) => {
    if (!canEditMaintenance) return;
    // Se não temos subitens (primeiro retorno), só validar quantidade
    const hasSubItems = ((item as any).subItems || []).length > 0;

    if (!hasSubItems) {
      // Caso simples: só quantidade
      if (!returnQuantity) {
        showAlert({
          message: 'Preencha a quantidade de retorno',
          type: 'error',
          position: 'top-right',
        });
        return;
      }
    } else {
      // Caso completo: validação condicional baseada na ação
      if (selectedAction === 'irreparable') {
        // Para irreparáveis: só validar quantidade
        if (!returnQuantity) {
          showAlert({
            message: 'Preencha a quantidade',
            type: 'error',
            position: 'top-right',
          });
          return;
        }
      } else {
        // Para retorno: todos os campos obrigatórios
        if (!returnPdfFile || !returnDate || !returnNf || !returnQuantity) {
          showAlert({
            message: 'Preencha todos os campos obrigatórios',
            type: 'error',
            position: 'top-right',
          });
          return;
        }
      }
    }

    const totalProcessedFromBackend = ((item as any).subItems || [])
      .filter(
        (s: any) =>
          s.destinyItem === 'return' || s.destinyItem === 'irreparable',
      )
      .reduce(
        (acc: number, s: any) => acc + (Number(s.returnQuantity) || 0),
        0,
      );
    const originalQuantity = Number(item.quantity) || 0;
    const currentQty = Number(returnQuantity) || 0;
    if (totalProcessedFromBackend + currentQty > originalQuantity) {
      showAlert({
        message:
          'A soma das quantidades processadas (retorno + irreparável) não pode exceder a quantidade da nota',
        type: 'error',
        position: 'top-right',
      });
      return;
    }

    try {
      let returnDateFormatted = '';
      const nfe = sessionStorage.getItem('selectedNf');

      if (!nfe) {
        throw new Error(NOT_FOUND_NF);
      }

      // Se a ação selecionada for irreparável, usar a API específica
      if (selectedAction === 'irreparable') {
        await maintenanceStore.flagIrreparableSubItem(nfe, {
          itemId: item.id,
          quantity: returnQuantity || 0,
          destinyItem: 'irreparable',
        });
      } else {
        // Caso de retorno (lógica existente)
        if (hasSubItems) {
          // Caso completo: usar dados do formulário
          returnDateFormatted = moment(new Date(returnDate)).format(
            ISO_DATE_INPUT,
          );
        } else {
          // Caso simples: usar data atual
          returnDateFormatted = moment().format(ISO_DATE_INPUT);
        }

        // Enviar 1 subitem por confirmação
        await maintenanceStore.flagSubItem(nfe, {
          request: {
            id: item.id,
            returnNfNumber: returnNf,
            returnNfDate: returnDateFormatted,
            returnQuantity: returnQuantity,
            destinyItem: 'return',
          },
          returnNfFile: returnPdfFile,
          additionalNfFiles: (relatedNfs || [])
            .map((nf) => nf.pdfFile)
            .filter(Boolean) as File[],
        });
      }

      // Atualizar dados após cada envio
      await maintenanceStore.fetchPartialNfItems(nfe);
      // Remover placeholder pendente, se existir
      setPendingSubItems((prev) =>
        prev.filter((p) => p.id !== activeSubItemId),
      );

      if (selectedAction === 'irreparable') {
        showAlert({
          message: 'Item marcado como irreparável com sucesso',
          type: 'success',
          position: 'top-right',
        });
      } else {
        showAlert({
          message: 'Retorno enviado com sucesso',
          type: 'success',
          position: 'top-right',
        });
      }

      // Reset form mas manter selectedAction como 'return' para mostrar tabela
      setReturnDate('');
      setReturnNf('');
      setReturnQuantity(undefined);
      setReturnPdfFile(null);
      setIsAddingNewReturn(false);
      setActiveSubItemId(null);
    } catch (error: any) {
      console.error('Erro ao sinalizar item:', error);

      // Tratamento específico por tipo de erro
      const errorMessage =
        error.message || 'Erro ao sinalizar item. Tente novamente.';

      showAlert({
        message: errorMessage,
        type: 'error',
        position: 'top-right',
      });
    }
  };

  const handleReturnClick = (subItemId?: number) => {
    if (!canEditMaintenance) return;
    setSelectedAction('return');
    setActiveSubItemId(subItemId ?? null);
    setIsAddingNewReturn(true);
  };

  const handleIrreparableClick = (subItemId?: number) => {
    if (!canEditMaintenance) return;
    setSelectedAction('irreparable');
    setActiveSubItemId(subItemId ?? null);
  };

  const handleAddReturn = () => {
    if (!canEditMaintenance) return;
    const tempId = Date.now();
    const placeholder = {
      id: tempId,
      destinyItem: 'none',
      returnQuantity: 0,
      returnDate: '',
      material: item.material,
      description: item.description,
      unitPrice: item.unitPrice,
      unitWeight: 0,
      dimensions: item.dimensions,
      sentNfs: [],
      status: 'waiting_approval',
      subItemStatus: 'waiting_approval',
      subItemLabel: 'returnable',
    } as any;

    setPendingSubItems((prev) => [...prev, placeholder]);
    setSelectedAction(null);
    setIsAddingNewReturn(true);
    setActiveSubItemId(tempId);
  };

  // (legacy) conversores antigos removidos; agora usamos subItems do backend
  const mapBackendSubItemToItem = (s: any): MaintenanceNfItem => ({
    id: s.id,
    material: s.material,
    description: s.description,
    quantity: s.returnQuantity,
    unitPrice: s.unitPrice,
    totalPrice: (s.unitPrice || 0) * (s.returnQuantity || 0),
    dimensions: s.dimensions,
    date: s.returnDate,
  });

  // Removido criador de sinalizados locais

  const calculateMaxAvailableQuantity = (): number => {
    const originalQuantity = Number(item.quantity) || 0;
    const totalProcessed = ((item as any).subItems || [])
      .filter(
        (s: any) =>
          s.destinyItem === 'return' || s.destinyItem === 'irreparable',
      )
      .reduce(
        (acc: number, s: any) => acc + (Number(s.returnQuantity) || 0),
        0,
      );

    return Math.max(0, originalQuantity - totalProcessed);
  };

  // Monta os children do ConnectionLine: todas as subtabelas existentes + formulário (quando adicionando ou primeiro retorno)
  const buildConnectionChildren = (): React.ReactNode[] => {
    const children: React.ReactNode[] = [];
    const backendSubItems: any[] = ((item as any).subItems || []) as any[];
    const allSubItems: any[] = [...backendSubItems, ...pendingSubItems];
    const isFinished = (item as any).status === 'finished';

    // Caso não exista nenhum subItem ainda do backend
    if (backendSubItems.length === 0) {
      if (isFinished) {
        return children; // nada a exibir além do cabeçalho/tabela
      }

      // Se existir placeholder pendente, não renderizar no nível root; tratar nos subitens combinados
      if (pendingSubItems.length > 0) {
        // segue o fluxo para renderizar allSubItems abaixo
      } else if (
        selectedAction === 'return' &&
        isAddingNewReturn &&
        activeSubItemId === null
      ) {
        children.push(
          <EditForm
            key={`sub-form-root`}
            returnDate={returnDate}
            setReturnDate={setReturnDate}
            returnNf={returnNf}
            setReturnNf={setReturnNf}
            returnQuantity={returnQuantity}
            setReturnQuantity={setReturnQuantity}
            pdfFile={returnPdfFile}
            onFileChange={handleReturnFileChange}
            onSave={() => handleSave()}
            inputsContainerRef={inputsContainerRef}
            saveButtonRef={saveButtonRef}
            loading={maintenanceStore.partialLoading}
          />,
        );
        return children;
      } else if (selectedAction === 'irreparable' && activeSubItemId === null) {
        const maxQty = calculateMaxAvailableQuantity();
        if (maxQty > 0) {
          children.push(
            <SimpleQuantityForm
              key={`sub-form-irreparable`}
              returnQuantity={returnQuantity}
              setReturnQuantity={setReturnQuantity}
              onSave={() => handleSave()}
              loading={maintenanceStore.partialLoading}
              maxQuantity={maxQty}
            />,
          );
        }
        return children;
      } else if (pendingSubItems.length === 0) {
        children.push(
          <ActionButtonsContainer key={`sub-actions-root`}>
            <ActionButton
              onClick={() => handleReturnClick(undefined)}
              disabled={!canEditMaintenance}
              aria-disabled={!canEditMaintenance}
              className={!canEditMaintenance ? 'disabled' : undefined}
            >
              <Text variant="small" color="#fff">
                Retorno
              </Text>
            </ActionButton>
            <ActionButton
              onClick={() => handleIrreparableClick(undefined)}
              disabled={!canEditMaintenance}
              aria-disabled={!canEditMaintenance}
              className={!canEditMaintenance ? 'disabled' : undefined}
            >
              <Text variant="small" color="#fff">
                Irreparável
              </Text>
            </ActionButton>
          </ActionButtonsContainer>,
        );
        return children;
      }
      // se cair aqui, é porque vamos renderizar os placeholders em allSubItems
    }

    // Renderiza todos os subitens na ordem (do primeiro para o último)
    allSubItems.forEach((sub) => {
      if (isFinished) {
        const destinyFinished: 'return' | 'irreparable' | 'none' =
          sub.destinyItem || 'none';
        if (destinyFinished === 'irreparable') {
          children.push(
            <div key={`sub-fi-${sub.id}`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16,
                }}
              >
                <Text variant="small" color="#3153DD">
                  {sub.returnQuantity}
                </Text>
                <StatusChip
                  status={mapMaintenanceItemDestiny(sub.destinyItem)}
                />
                {sub.subItemLabel && (
                  <SubItemLabelChip label={sub.subItemLabel} />
                )}
              </div>
              <PartialMaintenanceTable
                item={mapBackendSubItemToItem(sub)}
                expanded
              />
              {sub.subItemLabel === 'irreparable_discard' && (
                <div style={{ marginTop: 8, marginLeft: 16 }}>
                  <DisposalReport
                    file={discardPdfFile}
                    onFileChange={handleDiscardFileChange}
                    label="Laudo de descarte"
                    subItemId={sub.id}
                  />
                </div>
              )}
            </div>,
          );
        } else {
          const nfToShow =
            sub.sentNfs && sub.sentNfs.length > 0
              ? sub.sentNfs[sub.sentNfs.length - 1].returnNf
              : '--------';

          children.push(
            <div key={`sub-fi-${sub.id}`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16,
                }}
              >
                <Text variant="small" color="#3153DD">
                  {sub.returnQuantity}
                </Text>
                <StatusChip
                  status={mapMaintenanceItemDestiny(sub.destinyItem)}
                />
              </div>
              <PartialMaintenanceTable
                key={`sub-f-${sub.id}`}
                item={mapBackendSubItemToItem(sub)}
                expanded
              >
                <ReturnSection
                  returnNf={nfToShow}
                  onEdit={() => handleEditSubItem(sub.id)}
                  onDelete={() => handleDeleteSubItem(sub.id)}
                  maintenanceStatus={sub.status}
                />
              </PartialMaintenanceTable>
            </div>,
          );
        }
        return;
      }

      const destiny: 'return' | 'irreparable' | 'none' =
        sub.destinyItem || 'none';

      if (destiny === 'return') {
        const nfToShow =
          sub.sentNfs && sub.sentNfs.length > 0
            ? sub.sentNfs[sub.sentNfs.length - 1].returnNf
            : '--------';

        // Se este sub-item está sendo editado, mostrar formulário de edição
        if (isEditingSubItem === sub.id) {
          children.push(
            <div key={`edit-correction-${sub.id}`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16,
                  marginBottom: 20,
                  paddingBottom: 40,
                }}
              >
                {/* <Text variant="small" color="#3153DD">
                  {sub.returnQuantity}
                </Text> */}
                {/* <StatusChip
                  status={mapMaintenanceItemDestiny(sub.destinyItem)}
                /> */}
              </div>
              {sub.subItemLabel === 'reproved' && (
                <div style={{ marginBottom: 16 }}>
                  <CorrectionSection sentNf={sub.sentNfs} />
                </div>
              )}
              <EditForm
                returnDate={returnDate}
                setReturnDate={setReturnDate}
                returnNf={returnNf}
                setReturnNf={setReturnNf}
                returnQuantity={returnQuantity}
                setReturnQuantity={setReturnQuantity}
                pdfFile={returnPdfFile}
                onFileChange={handleReturnFileChange}
                onSave={() => handleSaveEditSubItem(sub.id)}
                inputsContainerRef={inputsContainerRef}
                saveButtonRef={saveButtonRef}
                loading={maintenanceStore.partialLoading}
                showRelatedNf={false}
              />
            </div>,
          );
        } else {
          children.push(
            <div key={`sub-r-${sub.id}`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16,
                }}
              >
                <Text variant="small" color="#3153DD">
                  {sub.returnQuantity}
                </Text>
                <StatusChip
                  status={mapMaintenanceItemDestiny(sub.destinyItem)}
                />
              </div>
              <PartialMaintenanceTable
                item={mapBackendSubItemToItem(sub)}
                expanded
              >
                {sub.subItemLabel === 'reproved' ? (
                  <div style={{ marginTop: 16, marginBottom: 100 }}>
                    <div style={{ marginTop: 16, marginBottom: 16 }}>
                      <CorrectionSection sentNf={sub.sentNfs} />
                    </div>
                    <div style={{ marginTop: 16, marginBottom: 16 }}>
                      <EditForm
                        returnDate={returnDate}
                        setReturnDate={setReturnDate}
                        returnNf={returnNf}
                        setReturnNf={setReturnNf}
                        returnQuantity={returnQuantity}
                        setReturnQuantity={setReturnQuantity}
                        pdfFile={returnPdfFile}
                        onFileChange={handleReturnFileChange}
                        onSave={() => handleSaveEditSubItem(sub.id)}
                        inputsContainerRef={inputsContainerRef}
                        saveButtonRef={saveButtonRef}
                        loading={maintenanceStore.partialLoading}
                        showRelatedNf={false}
                      />
                    </div>
                  </div>
                ) : (
                  <ReturnSection
                    returnNf={nfToShow}
                    onEdit={() => handleEditSubItem(sub.id)}
                    onDelete={() => handleDeleteSubItem(sub.id)}
                    maintenanceStatus={sub.status}
                  />
                )}
              </PartialMaintenanceTable>
            </div>,
          );
        }
      } else if (destiny === 'irreparable') {
        // Caso especial: quando irreparável com label "irreparable_return",
        if (sub.subItemLabel === 'irreparable_return') {
          children.push(
            <div key={`sub-ir-${sub.id}`} style={{ paddingBottom: 60 }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16,
                }}
              >
                <Text variant="small" color="#3153DD">
                  {sub.returnQuantity}
                </Text>
                <StatusChip status={mapMaintenanceItemDestiny('return')} />
              </div>
              <PartialMaintenanceTable
                item={mapBackendSubItemToItem(sub)}
                expanded
              />
              <div
                style={{
                  marginTop: 16,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <EditForm
                  returnDate={returnDate}
                  setReturnDate={setReturnDate}
                  returnNf={returnNf}
                  setReturnNf={setReturnNf}
                  returnQuantity={returnQuantity}
                  setReturnQuantity={setReturnQuantity}
                  pdfFile={returnPdfFile}
                  onFileChange={handleReturnFileChange}
                  onSave={() => handleSaveEditSubItem(sub.id)}
                  inputsContainerRef={inputsContainerRef}
                  saveButtonRef={saveButtonRef}
                  loading={maintenanceStore.partialLoading}
                  showRelatedNf={false}
                />
              </div>
            </div>,
          );
        } else {
          children.push(
            <div key={`sub-i-${sub.id}`}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 16,
                }}
              >
                <Text variant="small" color="#3153DD">
                  {sub.returnQuantity}
                </Text>
                <StatusChip
                  status={mapMaintenanceItemDestiny(sub.destinyItem)}
                />
              </div>
              <PartialMaintenanceTable
                item={mapBackendSubItemToItem(sub)}
                expanded
              />
              {sub.subItemLabel === 'irreparable_discard' && (
                <div style={{ marginTop: 8, marginLeft: 16 }}>
                  <DisposalReport
                    file={discardPdfFile}
                    onFileChange={handleDiscardFileChange}
                    label="Laudo de descarte"
                    subItemId={sub.id}
                  />
                </div>
              )}
              <DeleteButtonContainer>
                <DeleteButton onClick={() => handleDeleteSubItem(sub.id)}>
                  <DeleteIcon className="material-symbols-outlined">
                    delete
                  </DeleteIcon>
                </DeleteButton>
              </DeleteButtonContainer>
            </div>,
          );
        }
      } else {
        // destiny === 'none' - Mostrar botões de escolha ou o formulário se este subitem está ativo
        const isActivePending =
          activeSubItemId === sub.id &&
          (selectedAction === 'return' || selectedAction === 'irreparable');
        if (isActivePending && selectedAction === 'return') {
          children.push(
            <EditForm
              key={`sub-form-${sub.id}`}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              returnNf={returnNf}
              setReturnNf={setReturnNf}
              returnQuantity={returnQuantity}
              setReturnQuantity={setReturnQuantity}
              pdfFile={returnPdfFile}
              onFileChange={handleReturnFileChange}
              onSave={() => handleSave()}
              inputsContainerRef={inputsContainerRef}
              saveButtonRef={saveButtonRef}
              loading={maintenanceStore.partialLoading}
            />,
          );
        } else if (isActivePending && selectedAction === 'irreparable') {
          const maxQty = calculateMaxAvailableQuantity();
          if (maxQty > 0) {
            children.push(
              <SimpleQuantityForm
                key={`sub-form-irreparable-${sub.id}`}
                returnQuantity={returnQuantity}
                setReturnQuantity={setReturnQuantity}
                onSave={() => handleSave()}
                loading={maintenanceStore.partialLoading}
                maxQuantity={maxQty}
              />,
            );
          }
        } else {
          // Não renderiza linha de subtabela quando ainda não escolheu ação;
          // apenas apresenta os botões para iniciar o fluxo
          children.push(
            <ActionButtonsContainer key={`sub-actions-${sub.id}`}>
              <ActionButton
                onClick={() => handleReturnClick(sub.id)}
                disabled={!canEditMaintenance}
                aria-disabled={!canEditMaintenance}
                className={!canEditMaintenance ? 'disabled' : undefined}
              >
                <Text variant="small" color="#fff">
                  Retorno
                </Text>
              </ActionButton>
              <ActionButton
                onClick={() => handleIrreparableClick(sub.id)}
                disabled={!canEditMaintenance}
                aria-disabled={!canEditMaintenance}
                className={!canEditMaintenance ? 'disabled' : undefined}
              >
                <Text variant="small" color="#fff">
                  Irreparável
                </Text>
              </ActionButton>
            </ActionButtonsContainer>,
          );
        }
      }
    });

    // Formulário no final da lista, quando aplicável
    if (
      !isFinished &&
      selectedAction === 'return' &&
      isAddingNewReturn &&
      activeSubItemId === null
    ) {
      children.push(
        <EditForm
          key={`sub-form-tail`}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          returnNf={returnNf}
          setReturnNf={setReturnNf}
          returnQuantity={returnQuantity}
          setReturnQuantity={setReturnQuantity}
          pdfFile={returnPdfFile}
          onFileChange={handleReturnFileChange}
          onSave={handleSave}
          inputsContainerRef={inputsContainerRef}
          saveButtonRef={saveButtonRef}
          loading={maintenanceStore.partialLoading}
        />,
      );
    } else if (
      !isFinished &&
      selectedAction === 'irreparable' &&
      activeSubItemId === null
    ) {
      const maxQty = calculateMaxAvailableQuantity();
      if (maxQty > 0) {
        children.push(
          <SimpleQuantityForm
            key={`sub-form-irreparable-tail`}
            returnQuantity={returnQuantity}
            setReturnQuantity={setReturnQuantity}
            onSave={() => handleSave()}
            loading={maintenanceStore.partialLoading}
            maxQuantity={maxQty}
          />,
        );
      }
    }

    return children;
  };

  const handleSubmitAll = async () => {
    const nfe = sessionStorage.getItem('selectedNf');
    if (!nfe) {
      showAlert({
        message: NOT_FOUND_NF,
        type: 'error',
        position: 'top-right',
      });
      return;
    }
    if (!canEditMaintenance) return;
    try {
      setIsSubmitting(true);

      await maintenanceStore.finishPartialItemsMaintenance(nfe, item.id);
      await maintenanceStore.fetchPartialNfItems(nfe);

      showAlert({
        message: 'Manutenção parcial finalizada com sucesso',
        type: 'success',
        position: 'top-right',
      });

      setTimeout(() => window.history.back(), 1000);
    } catch (error: any) {
      console.error('Erro ao finalizar manutenção parcial:', error);
      showAlert({
        message:
          error.message ||
          'Erro ao finalizar manutenção parcial. Tente novamente.',
        type: 'error',
        position: 'top-right',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para editar sub-item
  const handleEditSubItem = async (subItemId: number) => {
    setIsEditingSubItem(subItemId);
  };

  // Função para deletar sub-item
  const handleDeleteSubItem = async (subItemId: number) => {
    const nfe = sessionStorage.getItem('selectedNf');
    if (!nfe) {
      showAlert({
        message: NOT_FOUND_NF,
        type: 'error',
        position: 'top-right',
      });
      return;
    }

    try {
      await maintenanceStore.deleteSubItem(subItemId);

      // Recarregar os dados após deletar
      await maintenanceStore.fetchPartialNfItems(nfe);

      showAlert({
        message: 'Sub-item deletado com sucesso',
        type: 'success',
        position: 'top-right',
      });
    } catch (error: any) {
      console.error('Erro ao deletar sub-item:', error);
      showAlert({
        message: error.message || 'Erro ao deletar sub-item. Tente novamente.',
        type: 'error',
        position: 'top-right',
      });
    }
  };

  // Função para salvar edição de sub-item
  const handleSaveEditSubItem = async (subItemId: number) => {
    const nfe = sessionStorage.getItem('selectedNf');
    if (!nfe) {
      showAlert({
        message: NOT_FOUND_NF,
        type: 'error',
        position: 'top-right',
      });
      return;
    }

    if (!returnPdfFile || !returnDate || !returnNf || !returnQuantity) {
      showAlert({
        message: 'Preencha todos os campos obrigatórios',
        type: 'error',
        position: 'top-right',
      });
      return;
    }

    try {
      await maintenanceStore.sendCorrectionSubItem(
        nfe,
        {
          subItemId,
          returnNfNumber: returnNf,
          returnNfDate: moment(new Date(returnDate)).format(ISO_DATE_INPUT),
          returnQuantity,
        },
        returnPdfFile,
      );

      // Recarregar os dados após salvar
      await maintenanceStore.fetchPartialNfItems(nfe);

      // Reset do formulário e estado de edição
      setReturnDate('');
      setReturnNf('');
      setReturnQuantity(undefined);
      setReturnPdfFile(null);
      setIsEditingSubItem(null);

      showAlert({
        message: 'Sub-item editado com sucesso',
        type: 'success',
        position: 'top-right',
      });
    } catch (error: any) {
      console.error('Erro ao editar sub-item:', error);
      showAlert({
        message: error.message || 'Erro ao editar sub-item. Tente novamente.',
        type: 'error',
        position: 'top-right',
      });
    }
  };

  const shouldShowReturnButton = () => {
    // Esconder enquanto existir placeholder pendente ou formulário aberto
    if (isAddingNewReturn) return false;
    if (pendingSubItems.length > 0) return false;

    const originalQuantity = Number(item.quantity) || 0;
    const backendTotal = ((item as any).subItems || [])
      .filter(
        (s: any) =>
          s.destinyItem === 'return' || s.destinyItem === 'irreparable',
      )
      .reduce(
        (acc: number, s: any) => acc + (Number(s.returnQuantity) || 0),
        0,
      );
    const remaining = originalQuantity - backendTotal;
    return remaining > 0;
  };

  const isTotalReached = () => {
    const originalQuantity = Number(item.quantity) || 0;
    const backendTotal = ((item as any).subItems || [])
      .filter(
        (s: any) =>
          s.destinyItem === 'return' || s.destinyItem === 'irreparable',
      )
      .reduce(
        (acc: number, s: any) => acc + (Number(s.returnQuantity) || 0),
        0,
      );
    return originalQuantity - backendTotal === 0;
  };

  const connectionChildren = buildConnectionChildren();

  const isFinished = item.status === 'finished';
  const statusColors = useStatusColors(mapMaintenanceItemStatus(item.status));
  const BORDER_COLOR = statusColors.border;

  // Para o novo fluxo por subitem, os children já são retornados prontos por buildConnectionChildren
  const childrenForConnectionLine = connectionChildren;

  return (
    <Wrapper>
      <Container expanded={expanded} borderColor={BORDER_COLOR}>
        <PartialMaintenanceTable
          item={item}
          expanded={expanded}
          ref={firstCellRef}
        />

        {expanded &&
          (childrenForConnectionLine.length > 0 ||
            (selectedAction === 'return' &&
              (isAddingNewReturn || activeSubItemId !== null))) && (
            <>
              <ConnectionLine
                items={childrenForConnectionLine.map(() => ({
                  color: BORDER_COLOR,
                }))}
                firstCellRef={firstCellRef}
                itemsCount={1}
                childrenConfig={childrenForConnectionLine.map(() => ({}))}
                left={10}
                top={30}
                gap={16}
              >
                {childrenForConnectionLine}
              </ConnectionLine>
              {!isFinished && <DividerComponent />}

              <ButtonsContainer
                $showReturnButton={!isFinished && shouldShowReturnButton()}
              >
                {!isFinished && shouldShowReturnButton() && (
                  // Botão para adicionar mais um retorno (visível apenas quando há saldo disponível)
                  <ReturnButton
                    onClick={() => {
                      if (!isFinished) handleAddReturn();
                    }}
                    disabled={!canEditMaintenance || isFinished}
                    aria-disabled={!canEditMaintenance || isFinished}
                    className={!canEditMaintenance ? 'disabled' : undefined}
                  >
                    <SignalIcon className="material-symbols-outlined">
                      add
                    </SignalIcon>
                    Adicionar mais um retorno
                  </ReturnButton>
                )}
                {/* Botão Salvar - só aparece quando o total foi atingido */}
                {!isFinished && isTotalReached() && (
                  <SignalButton
                    onClick={handleSubmitAll}
                    expanded
                    disabled={isSubmitting || !canEditMaintenance}
                    aria-disabled={isSubmitting || !canEditMaintenance}
                    className={!canEditMaintenance ? 'disabled' : undefined}
                  >
                    <SignalIcon className="material-symbols-outlined">
                      {isSubmitting ? 'progress_activity' : 'download_done'}
                    </SignalIcon>
                    {isSubmitting ? 'Salvando...' : 'Salvar'}
                  </SignalButton>
                )}

                {!isFinished && !isTotalReached() && (
                  <SignalButton
                    onClick={() => {
                      // Limpa todos os campos não salvos e fecha expansão
                      setReturnDate('');
                      setReturnNf('');
                      setReturnQuantity(undefined);
                      setReturnPdfFile(null);
                      // Remove placeholder pendente, se houver
                      setPendingSubItems((prev) =>
                        prev.filter((p) => p.id !== activeSubItemId),
                      );
                      setIsAddingNewReturn(false);
                      setActiveSubItemId(null);
                      setSelectedAction(null);
                      setExpanded(false);
                    }}
                    expanded
                  >
                    <SignalIcon className="material-symbols-outlined">
                      chip_extraction
                    </SignalIcon>
                    Sair da edição
                  </SignalButton>
                )}
              </ButtonsContainer>
            </>
          )}
      </Container>
      {!expanded && (
        <Fragment>
          {isFinished ? (
            <SignalButton onClick={() => setExpanded(true)}>
              <SignalIcon className="material-symbols-outlined">
                visibility
              </SignalIcon>
              Visualizar
            </SignalButton>
          ) : canEditMaintenance ? (
            <SignalButton onClick={() => setExpanded(true)}>
              <SignalIcon className="material-symbols-outlined">
                add_circle
              </SignalIcon>
              Sinalizar manutenção
            </SignalButton>
          ) : (
            <SignalButton onClick={() => setExpanded(true)}>
              <SignalIcon className="material-symbols-outlined">
                visibility
              </SignalIcon>
              Visualizar
            </SignalButton>
          )}
        </Fragment>
      )}
    </Wrapper>
  );
};

export default PartialMaintenanceItem;
