import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const WelcomeBoxWrapper = styled.div`
  width: 100%;
  flex-direction: row;
  min-height: ${pxToRem(50)};
  background: var(--color-background-primary);
  border-radius: ${pxToRem(10)};
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const WelcomeBox = styled.div`
  display: flex;
  align-items: center;
`;

export const OrangeBox = styled.div`
  margin: ${pxToRem(4)};
  background: var(--color-primary-orange);
  border-radius: ${pxToRem(8)};
  justify-content: center;
  align-items: center;
  border-top-right-radius: ${pxToRem(21)};
  border-bottom-right-radius: ${pxToRem(21)};
  padding: ${pxToRem(8)} ${pxToRem(24)};
  color: var(--color-background-primary);
  font-family: 'DM Sans', sans-serif;
  font-size: ${pxToRem(14)};
  font-weight: 500;
  height: ${pxToRem(42)};
`;
