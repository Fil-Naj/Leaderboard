import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContextValue, AuthUser } from '../types/auth';
import { fetchCurrentUser, loginWithGitHub, logoutFromAppService } from '../services/authService';

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(undefined);
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
    } catch (err) {
      console.error(err);
      setError('Unable to load your profile.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value: AuthContextValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login: loginWithGitHub,
      logout: logoutFromAppService,
      refresh
    }),
    [user, loading, error, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
