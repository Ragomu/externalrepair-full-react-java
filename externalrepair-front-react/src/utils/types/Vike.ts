// https://vike.dev/pageContext#typescript
import type {
  PageContextBuiltInClientWithClientRouting,
  PageContextBuiltInServer,
} from 'vike/types';
import { RootStore } from '~/stores';

interface PageContext {
  Page: Page;
  pageProps?: PageProps;
  data?: PageProps;
  urlPathname: string;
  access_token: { token: string; isLogged: boolean };
  exports: {
    title?: string;
    description?: string;
  };
}

type Page = (pageProps: PageProps) => React.ReactElement;
declare type PageProps = {
  rootStore?: Partial<RootStore>;
};
type PageContextClient = PageContextBuiltInClientWithClientRouting &
  PageContext;

type PageContextServer = PageContextBuiltInServer & PageContext;

export type OnRenderClientAsync = (
  pageContext: PageContextClient,
) => Promise<void>;

export type OnBeforeRenderAsync = (pageContext: PageContextServer) => Promise<{
  pageContext: Partial<PageContext>;
} | void>;
export type DataBeforeRender = (
  pageContext: PageContextServer,
) => Promise<PageProps | void>;
export type GuardAsync = (pageContext: PageContextServer) => Promise<void>;
