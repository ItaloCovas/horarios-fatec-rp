import { api } from '../api';

export interface SignInUserParams {
  ra: string;
  password: string;
}

// interface SignInUserData {
//   email: string;
//   token: string;
//   refreshToken: string;
//   expireIn: number;
// }

interface SignInUserResponse {
  succeeded: boolean;
  errors: string | null;
  //   data: SignInAdminData;
}

export async function signInAdmin(signInData: SignInUserParams) {
  const { data } = await api.post<SignInUserResponse>(
    '/user/scrape',
    signInData,
  );

  if (data.succeeded) {
    return data;
  }
}
