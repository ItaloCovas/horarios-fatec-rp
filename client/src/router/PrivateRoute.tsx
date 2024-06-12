import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext/useAuth';

interface PrivateRouteProps {
  isPrivate: boolean;
}

export function PrivateRoute({ isPrivate }: PrivateRouteProps) {
  const { signedIn } = useAuth();

  if (!signedIn && isPrivate) {
    // fazer a lógica se for o login de user..
    return <Navigate to="/admin" replace />;
  }

  if (signedIn && !isPrivate) {
    // fazer a lógica se for o login de user..
    return <Navigate to="/admin/classes" replace />;
  }

  return <Outlet />;
}
