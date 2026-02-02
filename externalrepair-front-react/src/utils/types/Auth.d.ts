declare type LoginPayload = {
  email: string;
  password: string;
};

declare type DecodedToken = {
  sub: string;
  document: string;
  code?: string;
  name: string;
  role?: string;
  iat?: number;
  exp?: number;
};
