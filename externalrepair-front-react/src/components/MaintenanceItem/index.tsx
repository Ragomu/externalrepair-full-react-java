import { Fragment, useState } from 'react';
import { MaintenanceNfItem } from '~/api/maintenance';
import { ConnectionLine } from '../ConnectionLine';
import Divider from '../Divider';
import { Text } from '../Typography/styles';
import {
  ActionButton,
  ActionButtonsContainer,
  Container,
  ExpandedContentWrapper,
  FieldColumn,
  FieldLabel,
  FieldValue,
  FieldsRow,
  MaintenanceItemContainer,
  SignalButton,
  SignalIcon,
} from './styles';

const PartialMaintenanceItem = ({ item }: { item: MaintenanceNfItem }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container>
      <MaintenanceItemContainer received={false}>
        <FieldsRow>
          <FieldColumn width={'auto'}>
            <FieldLabel>Material</FieldLabel>
            <FieldValue>{item.material}</FieldValue>
          </FieldColumn>
          <FieldColumn width={'100%'}>
            <FieldLabel>Descrição</FieldLabel>
            <FieldValue>{item.description}</FieldValue>
          </FieldColumn>
          <FieldColumn width={'auto'}>
            <FieldLabel>Qtd.</FieldLabel>
            <FieldValue>{item.quantity}</FieldValue>
          </FieldColumn>
          <FieldColumn width={'auto'}>
            <FieldLabel>Valor unitário</FieldLabel>
            <FieldValue>
              R$ {item.unitPrice?.toFixed(2).replace('.', ',')}
            </FieldValue>
          </FieldColumn>
          <FieldColumn width={'auto'}>
            <FieldLabel>Valor total</FieldLabel>
            <FieldValue>
              R$ {item.totalPrice?.toFixed(2).replace('.', ',')}
            </FieldValue>
          </FieldColumn>
          <FieldColumn width={'auto'}>
            <FieldLabel>Data</FieldLabel>
            <FieldValue>{item.date}</FieldValue>
          </FieldColumn>
        </FieldsRow>

        {expanded && (
          <Fragment>
            <ExpandedContentWrapper>
              <ConnectionLine
                items={[
                  {
                    color: '#515151',
                  },
                  {
                    color: '#515151',
                    traceHeight: 65,
                  },
                  {
                    color: '#515151',
                    traceHeight: 35,
                  },
                ]}
              />

              <ActionButtonsContainer>
                <ActionButton>
                  <Text variant="small" color="#fff">
                    Retorno
                  </Text>
                </ActionButton>
                <ActionButton>
                  <Text variant="small" color="#fff">
                    Irreparável
                  </Text>
                </ActionButton>
              </ActionButtonsContainer>
            </ExpandedContentWrapper>
            <Divider />
            <Fragment>
              <SignalButton
                onClick={() => setExpanded(true)}
                expanded={expanded}
              >
                <Text variant="small" color="var(--color-text-light)">
                  {expanded ? 'Sair da edição' : 'Visualizar'}
                </Text>
                <SignalIcon className="material-symbols-outlined">
                  chip_extraction
                </SignalIcon>
              </SignalButton>
            </Fragment>
          </Fragment>
        )}
      </MaintenanceItemContainer>

      {!expanded && (
        <Fragment>
          <SignalButton onClick={() => setExpanded(true)}>
            <SignalIcon className="material-symbols-outlined">
              add_circle
            </SignalIcon>
            Sinalizar manutenção
          </SignalButton>
        </Fragment>
      )}
    </Container>
  );
};

export default PartialMaintenanceItem;
