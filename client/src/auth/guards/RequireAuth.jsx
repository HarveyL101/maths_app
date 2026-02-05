import { useAuth } from '../useAuth';

export default function RequireAuth({ children }) {
  const { isLoading, isAuthenticated } = useAuth();
  const location = useLoaction();

  if (isLoading) return null; // Could replace this with a spinner somehow

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