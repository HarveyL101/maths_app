import { useAuth } from '../useAuth';
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>
  }; // Could replace this with a spinner somehow

  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login"
        replace
        state={{ from: location }}
      />
    )
  }

  return children;
}