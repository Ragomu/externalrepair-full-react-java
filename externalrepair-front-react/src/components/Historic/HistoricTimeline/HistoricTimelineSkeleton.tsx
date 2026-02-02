import React from 'react';
import styled from 'styled-components';
import {
  TimelineItemContent,
  TimelineItemWrapper,
  TimelineWrapper,
} from './styles';

const SkeletonItem = styled.div`
  background: #e0e0e0;
  border-radius: 4px;
  animation: pulse 1.5s infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const SkeletonIcon = styled(SkeletonItem)`
  width: 50px;
  height: 50px;
  border-radius: 40px;
`;

const SkeletonText = styled(SkeletonItem)`
  height: 10px;
  margin-bottom: 4px;
`;

const SkeletonTitle = styled(SkeletonItem)`
  height: 17px;
  margin-bottom: 4px;
`;

const SkeletonMessage = styled(SkeletonItem)`
  height: 12px;
`;

const HistoricTimelineSkeleton: React.FC = () => {
  return (
    <TimelineWrapper>
      {[1, 2, 3].map((index) => (
        <TimelineItemWrapper key={index}>
          <TimelineItemContent>
            <SkeletonIcon />
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              <SkeletonText style={{ width: '60px' }} />
              <SkeletonTitle style={{ width: '120px' }} />
              <SkeletonMessage style={{ width: '200px' }} />
            </div>
          </TimelineItemContent>
        </TimelineItemWrapper>
      ))}
    </TimelineWrapper>
  );
};

export default HistoricTimelineSkeleton;
