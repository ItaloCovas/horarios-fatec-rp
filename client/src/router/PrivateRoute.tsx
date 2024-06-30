import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/useAuth';
import { useState, useEffect } from 'react';
import { SplashScreen } from '../view/components/SplashScreen';

interface PrivateRouteProps {
  isPrivate: boolean;
  isAdmin: boolean;
}

export function PrivateRoute({ isPrivate, isAdmin }: PrivateRouteProps) {
  const { signedIn, checkAndRefreshToken } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (signedIn && isAdmin) {
        setLoading(true);
        if (
          localStorage.getItem('hrftcrp:acct') &&
          localStorage.getItem('hrftcrp:rft') &&
          localStorage.getItem('hrftcrp:exp')
        ) {
          await checkAndRefreshToken();
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    verifyToken();
  }, [signedIn, isAdmin, checkAndRefreshToken]);

  if (loading) {
    return <SplashScreen isLoading={loading} />;
  }

  if (!signedIn && isPrivate) {
    return <Navigate to="/admin" replace />;
  }

  if (signedIn && !isPrivate) {
    return <Navigate to="/admin/classes" replace />;
  }

  return <Outlet />;
}
