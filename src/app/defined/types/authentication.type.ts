export type JwtPayload = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
};

export type LoginResponse = JwtPayload & {
  accessToken: string;
};

export type RequestUser = Request & { user: JwtPayload };
