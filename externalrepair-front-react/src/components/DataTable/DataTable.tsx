import { useState } from 'react';
import DataTableHeader from './DataTableHeader';
import DataTableRow from './DataTableRow';
import { ScrollableContainerTableHome, Table, TableWrapper } from './styles';

interface DataTableProps {
  data: any[];
  onRowClick: (nfe: string) => void;
  onEyeClick: (nfe: string) => void;
  showStatus?: boolean;
  showEmissionDate?: boolean;
  showIssuerReceiver?: boolean;
  showTotalQuantity?: boolean;
  showType?: boolean;
}

const DataTable = ({
  data,
  onRowClick,
  onEyeClick,
  showStatus = true,
  showEmissionDate = true,
  showIssuerReceiver = true,
  showTotalQuantity = true,
  showType = true,
}: DataTableProps) => {
  const hasStatus =
    showStatus && data.some((item) => item.status && item.status.trim() !== '');
  const hasEmissionDate =
    showEmissionDate &&
    data.some((item) => item.emissionDate && item.emissionDate.trim() !== '');
  const hasIssuerReceiver =
    showIssuerReceiver &&
    data.some(
      (item) =>
        (item.issuer && item.issuer.trim() !== '') ||
        (item.receiver && item.receiver.trim() !== ''),
    );
  const hasTotalQuantity =
    showTotalQuantity &&
    data.some(
      (item) =>
        item.totalQuantity !== undefined &&
        item.totalQuantity !== null &&
        item.totalQuantity !== '',
    );
  const hasType =
    showType && data.some((item) => item.type && item.type.trim() !== '');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  return (
    <TableWrapper>
      <Table
        hasStatus={hasStatus}
        hasEmissionDate={hasEmissionDate}
        hasIssuerReceiver={hasIssuerReceiver}
        hasTotalQuantity={hasTotalQuantity}
        hasType={hasType}
      >
        <DataTableHeader
          hasStatus={hasStatus}
          hasEmissionDate={hasEmissionDate}
          hasIssuerReceiver={hasIssuerReceiver}
          hasTotalQuantity={hasTotalQuantity}
          hasType={hasType}
        />
      </Table>
      <ScrollableContainerTableHome>
        <Table
          hasStatus={hasStatus}
          hasEmissionDate={hasEmissionDate}
          hasIssuerReceiver={hasIssuerReceiver}
          hasTotalQuantity={hasTotalQuantity}
          hasType={hasType}
        >
          {data.map((row, idx) => (
            <DataTableRow
              showIcon
              key={idx}
              {...row}
              hasStatus={hasStatus}
              hasEmissionDate={hasEmissionDate}
              hasIssuerReceiver={hasIssuerReceiver}
              hasTotalQuantity={hasTotalQuantity}
              hasType={hasType}
              hovered={hoveredIdx === idx}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() =>
                setHoveredIdx((prev) => (prev === idx ? null : prev))
              }
              onRowClick={() => onRowClick(row.nf)}
              onEyeClick={() => onEyeClick(row.nf)}
            />
          ))}
        </Table>
      </ScrollableContainerTableHome>
    </TableWrapper>
  );
};

export default DataTable;
