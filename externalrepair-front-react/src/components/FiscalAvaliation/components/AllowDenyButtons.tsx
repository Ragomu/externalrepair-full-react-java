import { Icon } from '@mui/material';
import CustomButton from '~/components/CustomButton';
import Divider from '~/components/Divider';
import Tooltip from '~/components/Tooltip';
import { Text } from '~/components/Typography/styles';
import { useStore } from '~/stores';
import { showAlert } from '~/utils/helpers/showAlerts';
import { Container, JustificationArea, JustificationInput } from '../styles';
import AdditionalNfsButtons from './AdditionalNfsButtons';

interface AllowDenyButtonsProps {
  fiscalAvaliation: {
    showCorrectInput: boolean;
    instructions: string;
    setInstructions: (value: string) => void;
    handleApprove: () => Promise<void>;
    handleShowCorrectInput: () => void;
    handleSubmitCorrection: () => Promise<void>;
    isApproved: boolean;
    partial: boolean;
  };
  nf: string;
}

const AllowDenyButtons = ({ fiscalAvaliation, nf }: AllowDenyButtonsProps) => {
  const { fiscalStore } = useStore();
  const {
    showCorrectInput,
    instructions,
    setInstructions,
    handleApprove,
    handleShowCorrectInput,
    handleSubmitCorrection,
    isApproved,
    partial,
  } = fiscalAvaliation;

  const tooltipText =
    'Informe de forma clara o erro identificado na nota fiscal e o que deve ser corrigido. Esta informação será encaminhada ao fornecedor para que ele realize o ajuste corretamente.';

  const handleReturnPdfClick = async () => {
    try {
      if (partial) {
        await fiscalStore.getPartialReturnFiscalNfPdf(nf);
      } else {
        await fiscalStore.getReturnFiscalNfPdf(nf);
      }
    } catch (error) {
      showAlert({
        message: 'Erro ao carregar PDF da NF-e de retorno',
        type: 'error',
        position: 'top-right',
      });
    }
  };

  return (
    <div style={{ gap: '16px' }}>
      <Container>
        <CustomButton
          accessibility="primary"
          size="small"
          variant="nfe"
          onClick={handleReturnPdfClick}
        >
          <Text variant="small" color="#EDEDED">
            NF-e de retorno
          </Text>
          <Icon
            className="material-symbols-outlined"
            sx={{ color: '#fff', fontSize: 16 }}
          >
            visibility
          </Icon>
        </CustomButton>
        <div style={{ width: '35px', margin: '12px 5px' }}>
          <Divider />
        </div>

        {showCorrectInput ? (
          <JustificationArea>
            <CustomButton accessibility="primary" size="small" variant="div">
              <Text variant="small" color="#595959">
                Justificativa
              </Text>
            </CustomButton>
            <Tooltip text={tooltipText} position="bottom">
              <JustificationInput
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                name="correction-instructions"
                id="correction-instructions"
                placeholder="Ex: Valor incorreto no item 3; CFOP incompatível com a operação."
              />
            </Tooltip>
            <CustomButton
              accessibility="primary"
              size="small"
              variant="correcao"
              onClick={handleSubmitCorrection}
              disabled={!instructions.trim() && !isApproved}
            >
              <Text variant="small" color="#EDEDED">
                Enviar
              </Text>
            </CustomButton>
          </JustificationArea>
        ) : (
          <>
            <CustomButton
              accessibility="primary"
              size="small"
              variant="aprovado"
              onClick={handleApprove}
              disabled={isApproved}
            >
              <Text variant="small" color="#EDEDED">
                Aprovar
              </Text>
            </CustomButton>

            <CustomButton
              accessibility="primary"
              size="small"
              variant="correcao"
              onClick={handleShowCorrectInput}
            >
              <Text variant="small" color="#EDEDED">
                Solicitar correção
              </Text>
            </CustomButton>
          </>
        )}
      </Container>
      <AdditionalNfsButtons nfLink={nf} />
    </div>
  );
};

export default AllowDenyButtons;
