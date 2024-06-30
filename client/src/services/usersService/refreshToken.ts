import { api } from '../api';

interface RefreshTokenData {
  token: string;
  refreshToken: string;
  expireIn: number;
}

interface RefreshTokenResponse {
  succeeded: boolean;
  errors: string | null;
  data: RefreshTokenData;
}

export async function refreshToken(refreshToken: string) {
  const { data } = await api.post<RefreshTokenResponse>('/user/token/refresh', {
    refreshToken,
  });

  if (data.succeeded) {
    return data.data;
  }
}
