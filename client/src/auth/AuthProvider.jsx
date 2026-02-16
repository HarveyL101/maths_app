import { useEffect, useState, useCallback } from "react";
import { AuthContext } from './AuthContext';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('jwt');

      if (!token) {
        // If a token is not present, the user is not logged in
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch('/credentials', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) {
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (err) {
        console.error("Credentials could not be fetched", err);
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
    (role) => user?.roles?.some(r => r.trim() === role) ?? false,
    [user]
  );

  const hasAnyRole = useCallback(
    (roles) => roles.some(role => user?.roles?.includes(role)),
    [user]
  );

  const login = (token, userData) => {
    localStorage.setItem('jwt', token);
    setUser(userData);
  }

  const logout = async () => {
    localStorage.removeItem('jwt')
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, hasRole, hasAnyRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}