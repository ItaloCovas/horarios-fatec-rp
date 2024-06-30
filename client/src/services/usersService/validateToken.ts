import { api } from '../api';

interface ValidateTokenData {
  succeeded: boolean;
  errors: null;
  data: null;
}

interface ValidateTokenResponse {
  succeeded: boolean;
  errors: string | null;
  data: ValidateTokenData;
}

export async function validateToken(accessToken: string) {
  const { data } = await api.post<ValidateTokenResponse>(
    '/user/token/validate',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (data.succeeded) {
    return data.data;
  }
}
