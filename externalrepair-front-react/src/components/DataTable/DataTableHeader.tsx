import { TableHeader, TableHeaderCell } from './styles';

interface DataTableHeaderProps {
  hasStatus?: boolean;
  hasEmissionDate?: boolean;
  hasIssuerReceiver?: boolean;
  hasTotalQuantity?: boolean;
  hasType?: boolean;
}

const DataTableHeader = ({
  hasStatus = true,
  hasEmissionDate = true,
  hasIssuerReceiver = true,
  hasTotalQuantity = true,
  hasType = true,
}: DataTableHeaderProps) => (
  <TableHeader>
    <TableHeaderCell>NF-e</TableHeaderCell>
    {hasEmissionDate && <TableHeaderCell>Data de emissão</TableHeaderCell>}
    {hasIssuerReceiver && (
      <TableHeaderCell>Emitente/Destinatário</TableHeaderCell>
    )}
    {hasTotalQuantity && <TableHeaderCell>Quant. Total</TableHeaderCell>}
    {hasStatus && <TableHeaderCell>Status</TableHeaderCell>}
    {hasType && <TableHeaderCell>Tipo</TableHeaderCell>}
  </TableHeader>
);

export default DataTableHeader;
