import { HttpStatusCode } from 'axios';
import { HttpResponse, delay, http } from 'msw';
import { BASE_PATH } from '~/utils';
import { user } from './user.mock';

export const postLogin = http.post(
  `${BASE_PATH}/login`,
  async ({ params }): Promise<any> => {
    await delay(1000);

    if (params.password !== '123qwe') {
      return HttpResponse.json(
        {
          message: 'Senha incorreta',
        },
        { status: HttpStatusCode.Forbidden },
      );
    }
    return HttpResponse.json(user, { status: 200 });
  },
);

export const authHandlers = [postLogin];
