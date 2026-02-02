import { setupWorker } from 'msw/browser';

import { authHandlers } from './auth/auth.handlers';

export const allHandlers = [...authHandlers];

export const mswWorker = setupWorker(...allHandlers);
