import React from 'react';
import { Table, TableWrapper } from './styles';

const skeletonRows = Array.from({ length: 5 });

const SkeletonCell = () => (
  <div
    style={{
      background: '#ececec',
      borderRadius: 4,
      height: 24,
      margin: '4px 0',
      width: '100%',
      animation: 'pulse 1.5s infinite',
    }}
  />
);

const DatatableSkeleton: React.FC = () => (
  <TableWrapper>
    <Table>
      <tr>
        {Array.from({ length: 8 }).map((_, idx) => (
          <th key={idx}>
            <SkeletonCell />
          </th>
        ))}
      </tr>
      {skeletonRows.map((_, rowIdx) => (
        <tr key={rowIdx}>
          {Array.from({ length: 8 }).map((_, colIdx) => (
            <td key={colIdx}>
              <SkeletonCell />
            </td>
          ))}
        </tr>
      ))}
    </Table>
  </TableWrapper>
);

export default DatatableSkeleton;
