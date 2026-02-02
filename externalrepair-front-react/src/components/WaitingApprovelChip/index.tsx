import { Text } from '../Typography/styles';

const SubItemLabelChip = ({ label }: { label: string }) => {
  const labelText = label.replace('_', ' ');

  const getLabelText = () => {
    if (label === 'in_transit') {
      return 'Em trânsito';
    }
    if (label === 'waiting_approval') {
      return 'Aguardando avaliação';
    }
    return labelText;
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
        backgroundColor: label === 'in_transit' ? '#3153DD' : '#F59D15',
        textTransform: 'uppercase',
      }}
    >
      <Text variant="small" color="#fff">
        {getLabelText()}
      </Text>
    </span>
  );
};

export default SubItemLabelChip;
