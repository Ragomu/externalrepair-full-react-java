import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import { ENV, SENTRY_DSN } from '~/utils';

const init = (): void => {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: ENV,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
};

const setUser = (user: User): void => {
  Sentry.setUser({
    email: user.email,
  });
};

export const SentryService = {
  init,
  setUser,
};
