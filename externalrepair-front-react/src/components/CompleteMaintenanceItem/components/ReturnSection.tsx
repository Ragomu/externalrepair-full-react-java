import React from 'react';
import { Icon } from '../../ImagePreviewModal/styles';
import {
  ButtonContainer,
  NumberNfValue,
  ReturnActionButton,
  ReturnNfButton,
  ReturnNfValue,
} from '../styles';

interface ReturnSectionProps {
  returnNf?: string;
  onEdit: () => void;
  onDelete: () => void;
  maintenanceStatus: string;
}

const ReturnSection = ({
  returnNf,
  onEdit,
  onDelete,
  maintenanceStatus,
}: ReturnSectionProps) => {
  const isApproved = maintenanceStatus === 'approved';

  return (
    <ButtonContainer>
      <ReturnNfButton>
        <Icon className="material-symbols-outlined">attachment</Icon>
        NF-e de retorno
      </ReturnNfButton>

      <ReturnNfValue>
        <NumberNfValue>N°</NumberNfValue>
        {returnNf || '---------'}
      </ReturnNfValue>

      <ReturnActionButton onClick={onEdit} disabled={isApproved}>
        <Icon className="material-symbols-outlined">edit</Icon>
      </ReturnActionButton>

      <ReturnActionButton
        onClick={onDelete}
        variant="danger"
        disabled={isApproved}
      >
        <Icon className="material-symbols-outlined">delete</Icon>
      </ReturnActionButton>
    </ButtonContainer>
  );
};

export default ReturnSection;
