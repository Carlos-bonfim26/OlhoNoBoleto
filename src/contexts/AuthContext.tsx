import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import type { User, LoginRequest, CadastroRequest } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  cadastro: (userData: CadastroRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: UpdateProfileRequest) => Promise<void>; 
  loading: boolean;
  checkAuth: () => Promise<void>;
  error: string | null;
}

interface UpdateProfileRequest {
  nome: string;
  email: string;
  senha?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = async () => {
    try {
      setError(null);
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error: any) {
      console.log('🔐 Usuário não autenticado:', error.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const updateProfile = async (userData: UpdateProfileRequest) => {
    if (!user?.id) {
      throw new Error('Usuário não autenticado');
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await authService.updateProfile(user.id, userData);
      
      setUser(response);
      
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.login(credentials);
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      await checkAuth();
      
    } catch (error: any) {
      setError(error.message);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cadastro = async (userData: CadastroRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await authService.cadastro(userData);
      
      if (!result.success) {
        throw new Error(result.message);
      }
      
      await login({ 
        email: userData.email, 
        senha: userData.senha 
      });
      
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      await authService.logout();
    } catch (error: any) {
      console.error('Aviso no logout:', error.message);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    cadastro,
    logout,
    updateProfile,
    loading,
    checkAuth,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};