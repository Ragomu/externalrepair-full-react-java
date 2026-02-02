import type { Config } from 'vike/types';
import vikeBuilders from '@platformbuilders/vike-builders';
import { HeadHTML } from '~/components';
import ThemeProvider from '../theme/provider';

export default {
  Layout: ThemeProvider,
  Head: HeadHTML,
  ssr: false,
  title: 'UISA - Reparo Externo',
  description:
    'Aplicação voltada aos fornecedores de reparos de peças e equipamentos',
  favicon: 'favicon.png',
  clientRouting: true,
  meta: {
    guard: {
      env: {
        server: false,
        client: true,
      },
    },
  },
  extends: vikeBuilders,
} satisfies Config;
