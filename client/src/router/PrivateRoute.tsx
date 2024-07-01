import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/useAuth';
import { useState, useEffect } from 'react';
import { SplashScreen } from '../view/components/SplashScreen';

interface PrivateRouteProps {
  isPrivate: boolean;
  isAdmin: boolean;
}

export function PrivateRoute({ isPrivate, isAdmin }: PrivateRouteProps) {
  const { adminSignedIn, checkAndRefreshToken, userSignedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (adminSignedIn && isAdmin) {
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
      }, 1000);
    };

    verifyToken();
  }, [adminSignedIn, isAdmin, checkAndRefreshToken]);

  if (loading) {
    return <SplashScreen isLoading={loading} />;
  }

  if (isAdmin) {
    if (!adminSignedIn) {
      return <Navigate to="/admin" replace />;
    }
  } else {
    if (isPrivate && !userSignedIn) {
      return <Navigate to="/" replace />;
    }
    if (!isPrivate && userSignedIn) {
      return <Navigate to="/classes" replace />;
    }
  }

  return <Outlet />;
}
