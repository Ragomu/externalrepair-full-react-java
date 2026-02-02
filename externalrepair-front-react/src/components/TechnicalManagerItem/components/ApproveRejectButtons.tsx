import { Text } from '~/components/Typography/styles';
import { AproveRejectButton, AproveRejectButtonsContainer } from './styles';

interface AproveRejectButtonsProps {
  onConfirm: (destiny: 'approve' | 'reject') => void;
  status?: 'approve' | 'reject';
  disabled?: boolean;
}

const AproveRejectButtons = ({
  onConfirm,
  status,
  disabled = false,
}: AproveRejectButtonsProps) => {
  const isApproved = status === 'approve';
  const isRejected = status === 'reject';
  const hasStatus = isApproved || isRejected;

  return (
    <AproveRejectButtonsContainer>
      {(!hasStatus || isApproved) && (
        <AproveRejectButton
          onClick={() => !disabled && onConfirm('approve')}
          disabled={disabled}
          className={isApproved ? 'approved' : ''}
        >
          <Text variant="small" color="#fff">
            {isApproved ? 'Aprovado' : 'Aprovar'}
          </Text>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 15, fontWeight: 300 }}
          >
            check_circle
          </span>
        </AproveRejectButton>
      )}
      {(!hasStatus || isRejected) && (
        <AproveRejectButton
          onClick={() => !disabled && onConfirm('reject')}
          disabled={disabled}
          className={isRejected ? 'rejected' : ''}
        >
          <Text variant="small" color="#fff">
            {isRejected ? 'Rejeitado' : 'Rejeitar'}
          </Text>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 15, fontWeight: 300 }}
          >
            cancel
          </span>
        </AproveRejectButton>
      )}
    </AproveRejectButtonsContainer>
  );
};

export default AproveRejectButtons;
