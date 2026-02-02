---
to: src/scenes/<%= h.changeCase.pascal(name) %>/styles.ts
---
import { SceneWrapper } from '~/components';
import { getTheme, Typography, styled } from '~/modules'

const brandPrimary = getTheme('brand.primary.main');

export const Wrapper = styled(SceneWrapper)`
  justify-content: center;
  flex: 1;
`;

export const Heading = styled(Typography).attrs({variant: 'h1'})`
  font-weight: normal;
  text-align: center;
  color: ${brandPrimary};
`;
