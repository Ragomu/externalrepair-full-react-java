import styled from 'styled-components';
import Typography from '@platformbuilders/fluid-react/dist/components/Typography';
import { getTheme } from '@platformbuilders/theme-toolkit';
import { Button } from '~/components';
import { breakpoints } from '~/utils';

const spacingLg = getTheme('spacing.lg');
const textMain = getTheme('text.main');
const textContrast = getTheme('text.contrast');
const brandPrimary = getTheme('brand.primary.main');
const backgroundZ1 = getTheme('background.z1');

export const Heading = styled(Typography)`
  font-weight: 700;
  color: ${textMain};
`;

export const Paragraph = styled.div`
  margin-block: ${spacingLg}px;
  font-weight: 400;
  letter-spacing: 1px;
  color: ${textMain};
`;

export const ActionButton = styled(Button)`
  width: 100%;
  margin-top: ${spacingLg}px;
  background-color: ${brandPrimary};
  color: ${textContrast};

  &:hover {
    background-color: ${brandPrimary};
    opacity: 0.9;
  }

  @media ${breakpoints.inMobile} {
    width: 90%;
  }
`;

export const TodoItem = styled.p`
  color: ${textMain};
  margin: ${spacingLg}px 0;
  padding: ${spacingLg}px;
  background-color: ${backgroundZ1};
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
