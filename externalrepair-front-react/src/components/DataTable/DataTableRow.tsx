import Visibility from '@mui/icons-material/Visibility';
import { useStatusColors } from '~/utils/hooks';
import { NfeCell, StatusCell, TableCell, TableRow } from './styles';

interface DataTableRowProps {
  nf: string;
  emissionDate?: string;
  issuer?: string;
  receiver?: string;
  totalQuantity?: number;
  status?: string;
  showIcon?: boolean;
  onRowClick: (nfe: string) => void;
  onEyeClick: (nfe: string) => void;
  hasStatus?: boolean;
  hasEmissionDate?: boolean;
  hasIssuerReceiver?: boolean;
  hasTotalQuantity?: boolean;
  hasType?: boolean;
  type?: string;
  hovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const DataTableRow = ({
  nf,
  emissionDate,
  issuer,
  receiver,
  totalQuantity,
  status,
  showIcon,
  onRowClick,
  onEyeClick,
  hasStatus = true,
  hasEmissionDate = true,
  hasIssuerReceiver = true,
  hasTotalQuantity = true,
  hasType = true,
  type,
  hovered,
  onMouseEnter,
  onMouseLeave,
}: DataTableRowProps) => {
  const statusColors = useStatusColors(status || '');
  const typeColors = useStatusColors(type || '');

  const typeMapper = {
    complete: 'Completa',
    partial: 'Parcial',
  };

  const statusMapper = {
    pending: 'Pendente',
    rejected: 'Reprovada',
    approved: 'Aprovada',
    finished: 'Finalizada',
    unfinished: 'Incompleta',
    irreparable: 'Irreparável',
    negotiation: 'Negociação',
    Trânsito: 'Trânsito',
    transit: 'Trânsito',
    complete: 'Completa',
    partial: 'Parcial',
  };

  return (
    <TableRow
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => {
        onRowClick(nf);
      }}
    >
      <NfeCell
        $hovered={hovered}
        onClick={(e) => {
          e.stopPropagation();
          onEyeClick(nf);
        }}
      >
        {nf}
        {showIcon && (
          <span className="eye-icon">
            <Visibility
              sx={{ fontSize: 16, color: '#b8b8b8', marginLeft: '8px' }}
            />
          </span>
        )}
      </NfeCell>
      {hasEmissionDate && (
        <TableCell $hovered={hovered}>{emissionDate}</TableCell>
      )}
      {hasIssuerReceiver && (
        <TableCell $hovered={hovered}>{issuer + ' > ' + receiver}</TableCell>
      )}
      {hasTotalQuantity && (
        <TableCell $hovered={hovered}>{totalQuantity}</TableCell>
      )}
      {hasStatus && status && (
        <StatusCell
          background={statusColors.background}
          textColor={statusColors.text}
          borderColor={statusColors.border}
          $hovered={hovered}
        >
          <div>{statusMapper[status as keyof typeof statusMapper]}</div>
        </StatusCell>
      )}
      {hasType && type && (
        <StatusCell
          background={typeColors.background}
          textColor={typeColors.text}
          borderColor={typeColors.border}
          $hovered={hovered}
        >
          <div>{typeMapper[type as keyof typeof typeMapper]}</div>
        </StatusCell>
      )}
    </TableRow>
  );
};

export default DataTableRow;
