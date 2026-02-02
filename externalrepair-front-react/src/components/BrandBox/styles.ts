import styled from 'styled-components';
import { getTheme, pxToRem } from '@platformbuilders/theme-toolkit';
import { breakpoints } from '~/utils';

const backgroundColor = getTheme('background.z1');
const lSpacing = getTheme('spacing.lg');
const xxlSpacing = getTheme('spacing.xxl');
const maxSpacing = getTheme('spacing.max');

export const ChildrenWrapper = styled.div`
  background-color: ${backgroundColor};
  padding: ${lSpacing}px;
  padding-top: ${xxlSpacing}px;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  min-height: 100vh;

  @media ${breakpoints.inTablet} {
    padding: ${xxlSpacing}px;
    padding-top: ${maxSpacing}px;
  }
`;

export const Constrain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: ${pxToRem(650)};
`;
