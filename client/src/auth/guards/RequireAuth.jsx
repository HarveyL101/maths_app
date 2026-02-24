import { useAuth } from '../useAuth';
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>; // Could replace this with a spinner somehow

  if (!isAuthenticated) {
    return (<Navigate to='/' state={{ from: location }} replace />);
  }

  return children;
}

export default RequireAuth;