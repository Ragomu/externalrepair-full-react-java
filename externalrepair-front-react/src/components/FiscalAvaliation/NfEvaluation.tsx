import { useState } from 'react';
import { navigate } from 'vike/client/router';
import { useStore } from '~/stores';
import { showAlert } from '~/utils/helpers/showAlerts';
import AllowDenyButtons from './components/AllowDenyButtons';

const NfEvaluation = ({
  partial = false,
  itemId,
  subItemId,
  returnNfNumber,
}: {
  partial?: boolean;
  itemId?: number;
  subItemId?: number;
  returnNfNumber?: string;
}) => {
  const { fiscalStore } = useStore();
  const nf = sessionStorage.getItem('selectedNf') || '';
  const [showCorrectInput, setShowCorrectInput] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      if (partial && itemId != null && subItemId != null) {
        await fiscalStore.approvePartialNf(nf, itemId, subItemId);
      } else {
        await fiscalStore.approveNf(nf);
      }
      setIsApproved(true);
      showAlert({
        message: 'NF-e aprovada com sucesso!',
        type: 'success',
        position: 'top-right',
      });
      setTimeout(() => navigate('/fiscal'), 2000);
    } catch (error: any) {
      setIsApproved(false);

      // Tratamento específico por tipo de erro
      const errorMessage =
        error.message || 'Erro ao aprovar NF-e. Tente novamente.';

      showAlert({
        message: errorMessage,
        type: 'error',
        position: 'top-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowCorrectInput = () => {
    setShowCorrectInput(true);
  };

  const handleSubmitCorrection = async () => {
    if (instructions.trim()) {
      try {
        if (partial && itemId != null && subItemId != null) {
          if (!returnNfNumber || !returnNfNumber.trim()) {
            showAlert({
              message: 'Informe o número da NF-e de retorno',
              type: 'warning',
              position: 'top-right',
            });
            return;
          }

          await fiscalStore.correctPartialNf(
            nf,
            itemId,
            subItemId,
            instructions,
            returnNfNumber,
          );
        } else {
          await fiscalStore.correctNf(nf, instructions);
        }

        showAlert({
          message: 'Correção enviada com sucesso',
          type: 'success',
          position: 'top-right',
        });
        setTimeout(() => navigate('/fiscal'), 2000);
        setShowCorrectInput(false);
        setInstructions('');
      } catch (error: any) {
        // Tratamento específico por tipo de erro
        const errorMessage =
          error.message || 'Erro ao enviar correção. Tente novamente.';

        showAlert({
          message: errorMessage,
          type: 'error',
          position: 'top-right',
        });
      }
    }
  };

  const fiscalAvaliation = {
    showCorrectInput,
    instructions,
    setInstructions,
    handleApprove,
    handleShowCorrectInput,
    handleSubmitCorrection,
    isApproved: isApproved || loading,
    partial,
  };

  return <AllowDenyButtons fiscalAvaliation={fiscalAvaliation} nf={nf} />;
};

export default NfEvaluation;
