export type JwtPayload = {
  userId: number;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};

export type CurrentUser = JwtPayload & { iat: number; exp: number };
