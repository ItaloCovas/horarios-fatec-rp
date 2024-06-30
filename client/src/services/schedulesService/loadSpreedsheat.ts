import { api } from '../api';

// export interface SignInUserParams {
//   ra: string;
//   password: string;
// }

// interface SignInUserData {
//   email: string;
//   token: string;
//   refreshToken: string;
//   expireIn: number;
// }

interface Schedules {
  succeeded: boolean;
  errors: string | null;
  //   data: SignInAdminData;
}

export async function loadSpreedsheat() {
  const { data } = await api.get<Schedules>('/schedules');

  if (data.succeeded) {
    return data;
  }
}
