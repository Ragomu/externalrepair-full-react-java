import React from 'react';
import {
  ColumnField,
  EditableFieldInput,
  EditableFieldWrapper,
  FieldLabel,
  InputsContainer,
  SaveButton,
} from './styles';

interface IrreparableFormIndicateProps {
  returnQuantity?: number;
  setReturnQuantity: (quantity: number | undefined) => void;
  onSave: () => void;
  loading?: boolean;
  maxQuantity: number; // Quantidade máxima disponível
}

const IrreparableFormIndicate = ({
  returnQuantity,
  setReturnQuantity,
  onSave,
  loading,
  maxQuantity,
}: IrreparableFormIndicateProps) => {
  const isFormValid = Boolean(
    returnQuantity && returnQuantity > 0 && returnQuantity <= maxQuantity,
  );

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= maxQuantity) {
      setReturnQuantity(value);
    }
  };

  return (
    <div style={{ marginLeft: '6px' }}>
      <InputsContainer>
        <ColumnField>
          <FieldLabel>Quant. de retorno (máx: {maxQuantity})</FieldLabel>
          <EditableFieldWrapper>
            <EditableFieldInput
              type="number"
              value={returnQuantity}
              onChange={handleQuantityChange}
              max={maxQuantity}
              min={1}
              required
            />
          </EditableFieldWrapper>
        </ColumnField>

        <SaveButton onClick={onSave} loading={loading} disabled={!isFormValid}>
          Confirmar
        </SaveButton>
      </InputsContainer>
    </div>
  );
};

export default IrreparableFormIndicate;
