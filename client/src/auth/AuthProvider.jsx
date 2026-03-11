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
        const res = await fetch('http://localhost:5000/credentials', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.status === 401) {
          logout(); // Invalid token
          setIsLoading(false);
          return;
        }

        if (!res.ok) {
          setUser(null);
        } else {
          let data = null;

          try {
            data = await res.json();
          } catch {
            data = null;
          }

          setUser(data?.user ?? null);
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
    (roles) => roles?.some(role => user?.roles?.includes(role)) ?? false,
    [user]
  );

  const login = (token, userData) => {
    localStorage.setItem('jwt', token);
    localStorage.setItem('user', JSON.stringify(userData));
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