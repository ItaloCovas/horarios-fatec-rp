import { createContext, useCallback, useState } from 'react';
import { SignInAdminData } from '../../services/usersService/signInAdmin';
import { usersService } from '../../services/usersService';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

interface AuthContextProps {
  signedIn: boolean;

  signOut(): void;

  signIn(authData: SignInAdminData): void;

  checkAndRefreshToken(): Promise<JSX.Element | undefined>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem('hrftcrp:acct');
    return Boolean(storedAccessToken);
  });

  const signIn = useCallback((authData: SignInAdminData) => {
    const expirationDate = new Date().getTime() + authData.expireIn * 1000;
    localStorage.setItem('hrftcrp:acct', authData.token);
    localStorage.setItem('hrftcrp:rft', authData.refreshToken);
    localStorage.setItem('hrftcrp:exp', expirationDate.toString());
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    setSignedIn(false);
  }, []);

  const checkAndRefreshToken = async () => {
    const expireIn = localStorage.getItem('hrftcrp:exp');
    const refreshToken = localStorage.getItem('hrftcrp:rft');
    const accessToken = localStorage.getItem('hrftcrp:acct');

    if (expireIn && refreshToken && accessToken) {
      const currentDate = new Date().getTime();
      const expirationDate = parseInt(expireIn, 10);

      if (currentDate >= expirationDate) {
        try {
          const newAuthData = await usersService.refreshToken(refreshToken);
          const newExpirationDate =
            new Date().getTime() + newAuthData!.expireIn * 1000;
          localStorage.setItem('hrftcrp:acct', newAuthData!.token);
          localStorage.setItem('hrftcrp:rft', newAuthData!.refreshToken);
          localStorage.setItem('hrftcrp:exp', newExpirationDate.toString());
        } catch (error) {
          toast.error('Erro ao atualizar as credenciais. Entre novamente.');
          signOut();
          return <Navigate to="/admin" replace />;
        }
      } else {
        try {
          await usersService.validateToken(accessToken);
        } catch {
          toast.error('Erro ao atualizar as credenciais. Entre novamente.');
          signOut();
          return <Navigate to="/admin" replace />;
        }
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{ signedIn, signIn, signOut, checkAndRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
