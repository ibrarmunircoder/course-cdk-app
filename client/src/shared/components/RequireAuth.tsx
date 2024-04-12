import {
  useAuthIsAuthenticatedSelector,
  useAuthUserSelector,
} from '../hooks/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';
export const RequireAuth = () => {
  const isAuthenticated = useAuthIsAuthenticatedSelector();
  const user = useAuthUserSelector();
  return isAuthenticated && user ? <Outlet /> : <Navigate to="/login" />;
};
