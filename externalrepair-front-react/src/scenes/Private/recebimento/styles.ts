import styled from 'styled-components';
import { pxToRem } from '@platformbuilders/theme-toolkit';

export const Container = styled.div`
  padding: ${pxToRem(24)} ${pxToRem(32)};
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  gap: ${pxToRem(24)};
`;
