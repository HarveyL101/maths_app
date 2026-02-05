import { useEffect, useState, useCallback } from "react";
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/credentials', {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();

  }, []);

  // Helpers
  const isAuthenticated = !!user;

  const hasRole = useCallback(
    (role) => user?.roles.includes(role), [user]
  );

  const hasAnyRole = useCallback(
    (roles) => user?.roles?.includes(role), [user]
  );

  const logout = () => {
    localStorage.removeItem('jwt');
    setUser(null)
  };

  return (
    <AuthContext.Provider 
      value={{
        user,
        isLoading,
        isAuthenticated,
        hasRole,
        hasAnyRole,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}