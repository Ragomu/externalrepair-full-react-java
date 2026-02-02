---
to: src/scenes/<%= h.changeCase.pascal(name) %>/index.tsx
---
import { FC } from 'react';
import { useStores } from '~/utils';

import <%= h.changeCase.pascal(name) %> from './<%= h.changeCase.pascal(name) %>';

type Props = {};

const <%= h.changeCase.pascal(name) %>Container: FC<Props> = ({}) => {
  const { user } = useStores();
  return <<%= h.changeCase.pascal(name) %> />;
};

export default observer(<%= h.changeCase.pascal(name) %>Container);

