import { Divider, Icon } from '@mui/material';

import { CustomButton } from '../CustomButton';
import { Text } from '../Typography/styles';
import {
  Container,
  CorrectionButton,
  Justification,
  JustificationContainer,
  JustificationNumberNfValue,
  ReturnJustificationNfValue,
} from './styles';

interface CorrectionSectionProps {
  correctionButtonRef?: React.RefObject<HTMLDivElement>;
  sentNf?: {
    returnNf: string;
    justification: string;
  }[];
}

const CorrectionSection = ({
  correctionButtonRef,
  sentNf,
}: CorrectionSectionProps) => {
  return (
    <Container>
      <div
        style={{
          height: '25px',
          width: 'fit-content',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          flexDirection: 'row',
          gap: '10px',
        }}
      >
        <CorrectionButton ref={correctionButtonRef}>
          <Text variant="small" color="#bbbbbb">
            {'Nf-e de retorno'}
          </Text>
          <Icon className="material-symbols-outlined">attachment</Icon>
        </CorrectionButton>
        <ReturnJustificationNfValue>
          <JustificationNumberNfValue>N°</JustificationNumberNfValue>
          {sentNf?.[sentNf.length - 1]?.returnNf || 'Não informado'}
        </ReturnJustificationNfValue>
        <div style={{ width: '25px', margin: '12px 0' }}>
          <Divider />
        </div>
        <JustificationContainer>
          <CustomButton accessibility="primary" size="small" variant="div">
            <Text variant="small" color="#595959">
              Correção {'>'} Justificativa
            </Text>
          </CustomButton>
          <Justification>
            {sentNf?.[sentNf.length - 1]?.justification ||
              'Nenhuma justificativa disponível.'}
          </Justification>
        </JustificationContainer>
      </div>
    </Container>
  );
};

export default CorrectionSection;
