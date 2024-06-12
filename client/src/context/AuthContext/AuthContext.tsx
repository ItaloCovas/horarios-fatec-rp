import { createContext, useCallback, useState } from 'react';

interface AuthContextProps {
  signedIn: boolean;

  signOut(): void;

  signIn(accessToken: string): void;
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

  const signIn = useCallback((accessToken: string) => {
    localStorage.setItem('hrftcrp:acct', accessToken);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('hrftcrp:acct');
    localStorage.clear();
    setSignedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signedIn: signedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
