import { api } from '../api';

export interface SignInAdminParams {
  email: string;
  password: string;
}

export interface SignInAdminData {
  email: string;
  token: string;
  refreshToken: string;
  expireIn: number;
}

interface SignInAdminResponse {
  succeeded: boolean;
  errors: string | null;
  data: SignInAdminData;
}

export async function signInAdmin(signInData: SignInAdminParams) {
  const { data } = await api.post<SignInAdminResponse>(
    '/user/login',
    signInData,
  );

  if (data.succeeded) {
    return data.data;
  }
}
