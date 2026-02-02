import { useState } from 'react';
import { navigate } from 'vike/client/router';
import { Routes } from '~/routes';
import { useStore } from '~/stores';
import {
  Button,
  CloseButton,
  ModalContent,
  ModalContentContainer,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OptionCard,
  OptionDescription,
  OptionIcon,
  OptionTitle,
  OptionsContainer,
} from './styles';

export const MaintenanceModal = ({ onClose }: { onClose: () => void }) => {
  const { maintenanceStore, appStore } = useStore();
  const [selectedOption, setSelectedOption] = useState<
    'complete' | 'partial' | 'none'
  >(maintenanceStore.selectedMaintenanceType || 'none');

  const nfe =
    appStore.selectedNf ||
    (typeof window !== 'undefined'
      ? sessionStorage.getItem('selectedNf')
      : null);

  const getOptionAvailability = () => {
    const storeType = maintenanceStore.selectedMaintenanceType;

    return {
      complete: storeType === 'none' || storeType === 'complete',
      partial: storeType === 'none' || storeType === 'partial',
    };
  };

  const availability = getOptionAvailability();

  const handleOptionSelect = (option: 'complete' | 'partial') => {
    if (availability[option]) {
      setSelectedOption(option);
    }
  };

  const handleProceed = () => {
    if (nfe && selectedOption) {
      maintenanceStore.selectedMaintenanceType = selectedOption;
      const url = `${Routes.MANUTENCAO_ITEM.replace('@item', nfe)}?tipo=${selectedOption}`;
      navigate(url);
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContentContainer
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </CloseButton>
        </ModalHeader>
        <ModalContent>
          <OptionsContainer>
            <OptionCard
              selected={selectedOption === 'complete'}
              disabled={!availability.complete}
              onClick={() => handleOptionSelect('complete')}
            >
              <OptionIcon
                selected={selectedOption === 'complete'}
                disabled={!availability.complete}
                className="option-icon"
              >
                <span className="material-symbols-outlined">task_alt</span>
              </OptionIcon>
              <OptionTitle
                selected={selectedOption === 'complete'}
                disabled={!availability.complete}
                className="option-title"
              >
                Completo
              </OptionTitle>
              <OptionDescription>
                Sinalize a manutenção e o envio completo da remessa
              </OptionDescription>
            </OptionCard>

            <OptionCard
              selected={selectedOption === 'partial'}
              disabled={!availability.partial}
              onClick={() => handleOptionSelect('partial')}
            >
              <OptionIcon
                selected={selectedOption === 'partial'}
                disabled={!availability.partial}
                className="option-icon"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ rotate: '90deg' }}
                >
                  arrow_upload_progress
                </span>
              </OptionIcon>
              <OptionTitle
                selected={selectedOption === 'partial'}
                disabled={!availability.partial}
                className="option-title"
              >
                Parcial
              </OptionTitle>
              <OptionDescription>
                Sinalize a manutenção e o envio parcial da remessa
              </OptionDescription>
            </OptionCard>
          </OptionsContainer>
        </ModalContent>
        <ModalFooter>
          <Button disabled={selectedOption === 'none'} onClick={handleProceed}>
            Prosseguir
            <span className="material-symbols-outlined">arrow_forward</span>
          </Button>
        </ModalFooter>
      </ModalContentContainer>
    </ModalOverlay>
  );
};

export default MaintenanceModal;
