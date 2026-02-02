import HistoricTableHeader from './HistoricTableHeader';
import SkeletonHistoricTableRow from './SkeletonHistoricTableRow';
import { Table, TableWrapper } from './styles';

const HistoricSkeleton = () => {
  return (
    <TableWrapper>
      <Table>
        <HistoricTableHeader />
        <SkeletonHistoricTableRow />
      </Table>
    </TableWrapper>
  );
};

export default HistoricSkeleton;
