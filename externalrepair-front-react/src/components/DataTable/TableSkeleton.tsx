import styled, { keyframes } from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';
import {
  ScrollableContainerTableHome,
  Table,
  TableHeader,
  TableHeaderCell,
  TableWrapper,
} from './styles';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

const SkeletonElement = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${pxToRem(4)};
  height: ${pxToRem(16)};
  margin: ${pxToRem(4)} 0;
`;

const SkeletonCell = styled.div`
  margin-left: ${pxToRem(4)};
  margin-right: ${pxToRem(4)};
  padding-left: ${pxToRem(8)};
  display: flex;
  align-items: center;
  height: 25px;
  justify-content: center;
`;

const SkeletonRow = styled.div`
  display: contents;
`;

const TableSkeleton = () => {
  return (
    <TableWrapper>
      <Table hasStatus hasEmissionDate hasIssuerReceiver hasTotalQuantity>
        <TableHeader>
          <TableHeaderCell>NF-e</TableHeaderCell>
          <TableHeaderCell>Data de emissão</TableHeaderCell>
          <TableHeaderCell>Emitente/Destinatário</TableHeaderCell>
          <TableHeaderCell>Quant. Total</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableHeader>
      </Table>
      <ScrollableContainerTableHome>
        <Table hasStatus hasEmissionDate hasIssuerReceiver hasTotalQuantity>
          {Array.from({ length: 5 }).map((_, idx) => (
            <SkeletonRow key={idx}>
              <SkeletonCell>
                <SkeletonElement style={{ width: '80%' }} />
              </SkeletonCell>
              <SkeletonCell>
                <SkeletonElement style={{ width: '70%' }} />
              </SkeletonCell>
              <SkeletonCell>
                <SkeletonElement style={{ width: '90%' }} />
              </SkeletonCell>
              <SkeletonCell>
                <SkeletonElement style={{ width: '50%' }} />
              </SkeletonCell>
              <SkeletonCell>
                <SkeletonElement style={{ width: '60%' }} />
              </SkeletonCell>
            </SkeletonRow>
          ))}
        </Table>
      </ScrollableContainerTableHome>
    </TableWrapper>
  );
};

export default TableSkeleton;
