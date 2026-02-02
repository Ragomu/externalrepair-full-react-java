---
to: src/components/<%= h.changeCase.pascal(name) %>/styles.ts
---
import { Typography, styled } from '~/modules';

export const Wrapper = styled.div``;

export const Text = styled(Typography).attrs({ variant: 'lg' })``;
