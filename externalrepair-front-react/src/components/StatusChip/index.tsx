import React from 'react';
import { useStatusColors } from '~/utils/hooks/useStatusColors';
import { Text } from '../Typography/styles';

interface StatusChipProps {
  status: string;
  label?: string;
}

const StatusChip: React.FC<StatusChipProps> = ({ status, label }) => {
  const { text } = useStatusColors(status);
  const textLabel = label || status;

  const getTextLabel = () => {
    if (status === 'discard') {
      return 'Descarte';
    }
    return textLabel;
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'left',
        padding: '2px 18px',
        borderRadius: 6,
        fontSize: 10,
        lineHeight: '12px',
        textTransform: 'capitalize',
      }}
    >
      <Text variant="small" color={text}>
        {getTextLabel().toUpperCase()}
      </Text>
    </span>
  );
};

export default StatusChip;
