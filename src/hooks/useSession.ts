// src/hooks/useSession.ts
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useSession = () => {
  const { checkAuth, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleFocus = () => {
      console.log('🔄 Janela em foco - verificando autenticação...');
      checkAuth();
    };

    const interval = setInterval(() => {
      if (isAuthenticated) {
        console.log('⏰ Verificação periódica de autenticação...');
        checkAuth();
      }
    }, 300000);

    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [checkAuth, isAuthenticated]);
};