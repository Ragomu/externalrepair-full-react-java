import { Text } from '~/components/Typography/styles';
import { DestinyButton, DestinyButtonsContainer } from './styles';

interface DestinyButtonsProps {
  onConfirm: (destiny: 'sell' | 'discard' | 'return') => void;
  disabled?: boolean;
}

const DestinyButtons = ({ onConfirm, disabled }: DestinyButtonsProps) => {
  return (
    <DestinyButtonsContainer>
      <DestinyButton
        onClick={() => {
          onConfirm('sell');
        }}
        disabled={disabled}
        aria-disabled={disabled}
        className={disabled ? 'disabled' : undefined}
      >
        <Text variant="small" color="#fff">
          Venda
        </Text>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 15, fontWeight: 300 }}
        >
          shopping_cart
        </span>
      </DestinyButton>
      <DestinyButton
        onClick={() => {
          onConfirm('discard');
        }}
        disabled={disabled}
        aria-disabled={disabled}
        className={disabled ? 'disabled' : undefined}
      >
        <Text variant="small" color="#fff">
          Descarte
        </Text>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 15, fontWeight: 300 }}
        >
          delete
        </span>
      </DestinyButton>
      <DestinyButton
        onClick={() => {
          onConfirm('return');
        }}
        disabled={disabled}
        aria-disabled={disabled}
        className={disabled ? 'disabled' : undefined}
      >
        <Text variant="small" color="#fff">
          Retorno
        </Text>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: 15, fontWeight: 300 }}
        >
          arrow_top_left
        </span>
      </DestinyButton>
    </DestinyButtonsContainer>
  );
};

export default DestinyButtons;
