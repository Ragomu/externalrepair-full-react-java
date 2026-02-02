// Função para criar hash SHA-256
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Função para converter para Base64
function toBase64(str: string): string {
  return btoa(str);
}

export const encodeCredentials = async (data: string): Promise<string> => {
  const hash = await sha256(data);
  return toBase64(hash);
};

export const encodeLoginPayload = async (email: string, password: string) => {
  const hashedPassword = await sha256(password);
  const base64Password = toBase64(hashedPassword);

  return {
    email,
    password: base64Password,
  };
};
