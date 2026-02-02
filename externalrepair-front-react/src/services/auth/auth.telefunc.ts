import { login } from '~/api/auth/auth.api';
import { StorageService } from '~/services';
import { encodeLoginPayload } from '~/utils/encryption';

export const signin = async (email: string, password: string) => {
  const payload = await encodeLoginPayload(email, password);
  return await login(payload);
};

export const logout = () => {
  StorageService.clearWholeStorage();
};
