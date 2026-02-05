import { Navigate } from 'react-router-dom';
import { useAuth } from '../useAuth';
import RequireAuth from './RequireAuth';

export default function RequireRole({ role, children }) {
  const { isLoading, hasRole } = useAuth();

  if (isLoading) return null;
  if (!hasRole(role)) return null;

  return (
    <RequireAuth>
      {hasRole(role) ? children : <Navigate to="/" replace />}
    </RequireAuth>
  );
}