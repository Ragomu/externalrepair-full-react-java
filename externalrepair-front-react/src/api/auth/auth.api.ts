import { jwtDecode } from 'jwt-decode';
import { authRequest } from '~/api/request';
import { StorageService } from '~/services';
import { ResponseError } from '~/utils';

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  try {
    const { data } = await authRequest.post('/login', payload);

    if (data && data.token && typeof data.token === 'string') {
      const jwtTokenString = data.token;

      const tokenObjectToStore: AccessToken = { access_token: jwtTokenString };
      StorageService.setToken(tokenObjectToStore);

      let userFromToken: User = {} as User;
      try {
        const decoded = jwtDecode<DecodedToken>(jwtTokenString);
        userFromToken = {
          id: decoded.document,
          name: decoded.name,
          email: decoded.sub,
          role: decoded.role,
        };

        if (decoded.document) {
          StorageService.setSupplierDocument(decoded.document);
        } else {
          // Se o usuário não tem documento, limpa o supplierDocument do storage
          StorageService.setSupplierDocument('');
        }
      } catch (decodeError) {
        console.error('[LOGIN] Erro ao decodificar o token:', decodeError);
      }

      return {
        user: userFromToken,
        access: tokenObjectToStore,
      };
    } else {
      throw new Error('Token não recebido do login.');
    }
  } catch (error: any) {
    throw error instanceof ResponseError ? error : new ResponseError(error);
  }
};

export const logout = async (): Promise<void> => {
  StorageService.clearWholeStorage();
};
