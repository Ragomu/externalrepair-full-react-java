import React from 'react';
import {
  SkeletonCard,
  SkeletonContentRow,
  SkeletonIconPlaceholder,
  SkeletonLine,
  SkeletonTextColumn,
} from './styles';

const StatusCardSkeleton: React.FC = () => {
  return (
    <SkeletonCard>
      <SkeletonLine width="60%" />
      <SkeletonContentRow>
        <SkeletonIconPlaceholder width="50px" height="50px" isCircle />
        <SkeletonTextColumn>
          <SkeletonLine width="40%" />
          <SkeletonLine width="70%" height="20px" />
        </SkeletonTextColumn>
      </SkeletonContentRow>
      <SkeletonLine width="50%" />
    </SkeletonCard>
  );
};

export default StatusCardSkeleton;
