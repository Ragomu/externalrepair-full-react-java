import React from 'react';
import styled, { keyframes } from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';
import {
  Container,
  Table,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableWrapper,
  Wrapper,
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

const SkeletonCell = styled(TableCell)`
  display: flex;
  align-items: center;
  height: 25px;
  justify-content: flex-start;
`;

const SkeletonRow = styled(TableRow)`
  display: contents;
`;

interface NfItemsSkeletonProps {
  headers: string[];
  gridColumns?: string;
}

const NfItemsSkeleton: React.FC<NfItemsSkeletonProps> = ({
  headers,
  gridColumns = '1fr 1fr 0.5fr 2fr 0.5fr 0.5fr',
}) => {
  return (
    <Wrapper>
      <Container borderStatus="default">
        <TableWrapper expanded={false}>
          <Table gridColumns={gridColumns}>
            <TableHeader>
              {headers.map((header, index) => (
                <TableHeaderCell key={index}>{header}</TableHeaderCell>
              ))}
            </TableHeader>
            {Array.from({ length: 4 }).map((_, idx) => (
              <SkeletonRow key={idx}>
                {headers.map((_, cellIndex) => (
                  <SkeletonCell key={cellIndex}>
                    <SkeletonElement
                      style={{
                        width: cellIndex === 3 ? '90%' : '70%', // Descrição mais larga
                      }}
                    />
                  </SkeletonCell>
                ))}
              </SkeletonRow>
            ))}
          </Table>
        </TableWrapper>
      </Container>
    </Wrapper>
  );
};

export default NfItemsSkeleton;
