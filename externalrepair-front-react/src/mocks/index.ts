import { setupServer } from 'msw/node';

import { authHandlers, postLogin } from './auth/auth.handlers';
export { user } from './auth/user.mock';

export { postLogin };

export const allHandlers = [...authHandlers];

export const mswServer = setupServer(...allHandlers);
