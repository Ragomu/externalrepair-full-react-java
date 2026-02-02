declare type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

declare type AuthResponse = {
  user: User;
  access: AccessToken;
};

declare type AuthUser = {
  email: string;
  password: string;
};

declare type UserAction = {
  user: {
    login(parameter: Credentials): void;
    logout(): void;
  };
};
