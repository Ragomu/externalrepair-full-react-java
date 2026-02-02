import { Fragment, useState } from 'react';
import {
  Container,
  EditIcon,
  EditableFieldInput,
  EditableFieldWrapper,
  FieldColumn,
  FieldLabel,
  FieldValue,
  FieldsRow,
  FieldsRowExpanded,
  ReceiptItemContainer,
  SaveButton,
  SaveButtonContainer,
  SaveIcon,
  SignalButton,
  SignalIcon,
} from '~/components/ReceiptItem/styles';
import { formatToInputDate } from '~/utils/helpers/dateFormatter';
import Divider from '../Divider';

const ReceiptItem = ({
  item,
  onSave,
  allItemsReceived = false,
  hasPhotos = false,
}: {
  item: ReceiptItemType;
  onSave: (payload?: { receivedDate: string; receivedQty: string }) => void;
  allItemsReceived?: boolean;
  hasPhotos?: boolean;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [receivedQty, setReceivedQty] = useState(item.quantity || '');
  const [receivedDateInput, setReceivedDateInput] = useState(
    formatToInputDate(item.shippingDate || ''),
  );

  const isViewOnly = allItemsReceived && hasPhotos;

  return (
    <Container>
      <ReceiptItemContainer received={item.received}>
        <FieldsRow>
          <FieldColumn width={'100%'}>
            <FieldLabel>Requisição</FieldLabel>
            <FieldValue>{item.request}</FieldValue>
          </FieldColumn>
          <FieldColumn width={'100%'}>
            <FieldLabel>Material</FieldLabel>
            <FieldValue>{item.material}</FieldValue>
          </FieldColumn>
          <FieldColumn width={'100%'}>
            <FieldLabel>Qtd.</FieldLabel>
            <FieldValue>{item.quantity}</FieldValue>
          </FieldColumn>
          <FieldColumn width={'100%'}>
            <FieldLabel>Descrição</FieldLabel>
            <FieldValue>{item.description}</FieldValue>
          </FieldColumn>
          <FieldColumn width={'100%'}>
            <FieldLabel>Valor total</FieldLabel>
            <FieldValue>{item.totalPrice}</FieldValue>
          </FieldColumn>
          <FieldColumn width={'100%'}>
            <FieldLabel>Data</FieldLabel>
            <FieldValue>{item.shippingDate}</FieldValue>
          </FieldColumn>
        </FieldsRow>
        {expanded && (
          <Fragment>
            <FieldsRowExpanded>
              <FieldColumn width={'100%'}>
                <FieldLabel>Descrição/assunto</FieldLabel>
                <FieldValue>{item.subject}</FieldValue>
              </FieldColumn>
              <FieldColumn width={'100%'}>
                <FieldLabel>Valor Unitário</FieldLabel>
                <FieldValue>{item.unitPrice}</FieldValue>
              </FieldColumn>{' '}
              <FieldColumn width={'100%'}>
                <FieldLabel>Data de recebimento</FieldLabel>
                {isViewOnly ? (
                  <FieldValue>{receivedDateInput}</FieldValue>
                ) : (
                  <EditableFieldWrapper>
                    <EditableFieldInput
                      type="date"
                      value={receivedDateInput}
                      onChange={(e) => setReceivedDateInput(e.target.value)}
                    />
                    <EditIcon className="material-symbols-outlined">
                      edit
                    </EditIcon>
                  </EditableFieldWrapper>
                )}
              </FieldColumn>{' '}
              <FieldColumn width={'100%'}>
                <FieldLabel>Qtd recebida</FieldLabel>
                {isViewOnly ? (
                  <FieldValue>{receivedQty}</FieldValue>
                ) : (
                  <EditableFieldWrapper>
                    <EditableFieldInput
                      type="number"
                      value={receivedQty}
                      onChange={(e) => setReceivedQty(e.target.value)}
                    />
                    <EditIcon className="material-symbols-outlined">
                      edit
                    </EditIcon>
                  </EditableFieldWrapper>
                )}
              </FieldColumn>
            </FieldsRowExpanded>
            <Divider />
            {expanded && !isViewOnly && (
              <Fragment>
                <SaveButtonContainer>
                  <SaveButton
                    onClick={() => {
                      onSave({
                        receivedDate: receivedDateInput,
                        receivedQty: receivedQty.toString(),
                      });
                      setExpanded(false);
                    }}
                  >
                    <SaveIcon className="material-symbols-outlined">
                      download_done
                    </SaveIcon>{' '}
                    Salvar
                  </SaveButton>
                </SaveButtonContainer>
              </Fragment>
            )}
          </Fragment>
        )}
      </ReceiptItemContainer>
      {!expanded && (
        <Fragment>
          <SignalButton onClick={() => setExpanded(true)}>
            {isViewOnly ? (
              <SignalIcon className="material-symbols-outlined">
                visibility
              </SignalIcon>
            ) : item.received ? (
              <SignalIcon className="material-symbols-outlined">
                edit
              </SignalIcon>
            ) : (
              <SignalIcon className="material-symbols-outlined">
                add_circle
              </SignalIcon>
            )}
            {isViewOnly
              ? 'Visualizar'
              : item.received
                ? 'Editar'
                : 'Sinalizar recebimento'}
          </SignalButton>
        </Fragment>
      )}
    </Container>
  );
};

export default ReceiptItem;
