import { api } from '../api';

export interface SignInAdminParams {
  email: string;
  password: string;
}

interface SignInAdminResponse {
  email: string;
  token: string;
  refreshToken: string;
  expireIn: string;
}

export async function signInAdmin(signInData: SignInAdminParams) {
  const { data } = await api.post<SignInAdminResponse>(
    '/auth/sign-in',
    signInData,
  );

  return data;
}
