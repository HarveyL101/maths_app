import { Navigate } from 'react-router-dom';
import { useAuth } from '../useAuth';
import RequireAuth from './RequireAuth';

const RequireRole = ({ children, role }) => {
  const { hasRole, isLoading } = useAuth();

  if (isLoading) return null;
  
  if (!hasRole(role)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default RequireRole;