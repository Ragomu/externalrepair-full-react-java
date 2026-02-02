import { HistoryItemResponse } from '~/api/uisaApi';
import HistoricTableHeader from './HistoricTableHeader';
import HistoricTableRow from './HistoricTableRow';
import { Table, TableWrapper } from './styles';

interface Props {
  items: HistoryItemResponse[];
  onRowClick?: (item: HistoryItemResponse) => void;
}

const HistoricTable = ({ items, onRowClick }: Props) => (
  <TableWrapper>
    <Table>
      <HistoricTableHeader />
      {items.map((item, idx) => (
        <HistoricTableRow
          key={idx}
          item={item}
          onClick={onRowClick ? () => onRowClick(item) : undefined}
        />
      ))}
    </Table>
  </TableWrapper>
);

export default HistoricTable;
