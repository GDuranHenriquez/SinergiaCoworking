export type UserInfo = {
  type: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  user: UserInfo;
  accessToken: string;
  refreshToken: string;
};
