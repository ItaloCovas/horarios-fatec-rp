import { api } from '../api';

export interface Student {
  nomeAluno: string;
  ra: string;
  semestre: string;
}

export interface Class {
  curso: string;
  materia: string;
  horario: string;
  professor: string;
  sala: string;
  andar: string;
  imagemUrl: string;
}

export interface Time {
  [dia: string]: Class[];
}

export interface SignInUserParams {
  ra: string;
  password: string;
}

export interface SignInUserData {
  email: string;
  token: string;
  refreshToken: string;
  expireIn: number;
  estudante: Student;
  dias: Time;
}

export interface SignInUserResponse {
  succeeded: boolean;
  errors: string | null;
  data: SignInUserData;
}

export async function signInUser(
  signInData: SignInUserParams,
): Promise<SignInUserData | null> {
  const { data } = await api.post<SignInUserResponse>(
    '/user/scrape',
    signInData,
  );

  if (data.succeeded) {
    return data.data;
  } else {
    return null;
  }
}
