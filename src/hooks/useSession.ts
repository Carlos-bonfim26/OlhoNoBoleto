// src/hooks/useSession.ts
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useSession = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      checkAuth();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [checkAuth]);

  useEffect(() => {
    const handleFocus = () => {
      checkAuth();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [checkAuth]);
};