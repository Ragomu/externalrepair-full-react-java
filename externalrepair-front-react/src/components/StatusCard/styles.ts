import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const CardValue = styled.div`
  font-size: ${pxToRem(60)};
  font-weight: 500;
  line-height: ${pxToRem(54)};
  color: #525252;
  font-family: 'DM Sans', sans-serif;
`;

export const CardValueCipher = styled.div`
  font-size: ${pxToRem(40)};
  font-weight: 500;
  line-height: 1;
  color: #a8a8a8;
  font-family: 'DM Sans', sans-serif;
  margin-right: ${pxToRem(4)};
  transform: translateY(-${pxToRem(4)});
`;

export const CardValueUnit = styled.div`
  font-size: ${pxToRem(38)};
  font-weight: 500;
  line-height: 1;
  color: #525252;
`;

export const Card = styled.div`
  background: #fdfeff;
  border-radius: ${pxToRem(10)};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-width: ${pxToRem(193)};
  height: ${pxToRem(190)};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: ${pxToRem(20)};
  border: 0.5px solid transparent;
  transition:
    border 1s,
    box-shadow 1s,
    transform 1s;

  &:hover {
    border: 1px solid #f58220;
    /* transform: scale(0.99); */

    & ${CardValue} {
      color: #f58220;
      transition: color 1s;
    }

    & ${CardValueCipher} {
      color: rgb(246, 173, 110);
      transition: color 1s;
    }

    & ${CardValueUnit} {
      color: #f58220;
      transition: color 1s;
    }
  }

  @media (max-width: 900px) {
    height: auto;
    min-height: ${pxToRem(160)};
  }
`;

export const CardHeaderWrapper = styled.div`
  margin-bottom: ${pxToRem(12)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const CardLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${pxToRem(16)};
`;

export const CardRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const CardValueContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
`;

export const IconCircle = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'circleColor',
})<{ circleColor?: string }>`
  width: ${pxToRem(96)};
  height: ${pxToRem(96)};
  border-radius: 50%;
  background: ${({ circleColor }) => circleColor || '#ffead8'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardSubtitle = styled.div`
  font-size: ${pxToRem(14)};
  color: #a2a2a2;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
`;

export const CardExtra = styled.div`
  font-size: ${pxToRem(16)};
  color: #43a047;
  font-family: 'DM Sans', sans-serif;
  margin-top: ${pxToRem(4)};
`;
