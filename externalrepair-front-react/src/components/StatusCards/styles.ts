import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const CardsWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: ${pxToRem(10)};
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: ${pxToRem(10)};
  }
`;

export const CardClickable = styled.div`
  cursor: pointer;
  flex: 1;
  min-width: ${pxToRem(320)};
  height: ${pxToRem(193)};

  @media (max-width: 900px) {
    width: 100%;
  }
`;
