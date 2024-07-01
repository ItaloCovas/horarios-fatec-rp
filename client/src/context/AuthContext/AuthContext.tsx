import { createContext, useCallback, useState } from 'react';
import { SignInAdminData } from '../../services/usersService/signInAdmin';
import { usersService } from '../../services/usersService';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { SignInUserData } from '../../services/usersService/signInUser';

interface AuthContextProps {
  adminSignedIn: boolean;

  userSignedIn: boolean;

  signOut(): void;

  signInAdmin(authData: SignInAdminData): void;

  signInUser(authData: SignInUserData): void;

  checkAndRefreshToken(): Promise<JSX.Element | undefined>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [adminSignedIn, setAdminSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem('hrftcrp:acct');
    return Boolean(storedAccessToken);
  });

  const [userSignedIn, setUserSignedIn] = useState<boolean>(() => {
    const storedUserData = localStorage.getItem('hrftcrp:udcls');
    return Boolean(storedUserData);
  });

  const signInUser = useCallback((userData: SignInUserData) => {
    localStorage.setItem('hrftcrp:udcls', JSON.stringify(userData));
    setUserSignedIn(true);
  }, []);

  const signInAdmin = useCallback((authData: SignInAdminData) => {
    const expirationDate = new Date().getTime() + authData.expireIn * 1000;
    localStorage.setItem('hrftcrp:acct', authData.token);
    localStorage.setItem('hrftcrp:rft', authData.refreshToken);
    localStorage.setItem('hrftcrp:exp', expirationDate.toString());
    setAdminSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.clear();
    setAdminSignedIn(false);
    setUserSignedIn(false);
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
      value={{
        adminSignedIn,
        userSignedIn,
        signInAdmin,
        signInUser,
        signOut,
        checkAndRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
