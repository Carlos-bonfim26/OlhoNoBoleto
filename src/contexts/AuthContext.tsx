import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/authService';
import type { User, LoginRequest, CadastroRequest } from '../types';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  cadastro: (userData: CadastroRequest) => Promise<void>; // ✅ ADICIONAR ESTA LINHA
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
          logout();
        } else {
          const userData = localStorage.getItem('userData');
          if (userData) {
            setUser(JSON.parse(userData) as User);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar token:', error);
        logout();
      }
    }
    setLoading(false);
  };

      const login = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      const result = await authService.login(credentials);
      if (result.success && result.tokens && result.user) {
        localStorage.setItem('accessToken', result.tokens.accessToken);
        localStorage.setItem('refreshToken', result.tokens.refreshToken);
        
        const userObj: User = {
          nome: result.user.nome ?? '',
          email: result.user.email ?? '',
          role: result.user.role ?? ''
        };
        localStorage.setItem('userData', JSON.stringify(userObj));
        setUser(userObj);
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADICIONAR FUNÇÃO CADASTRO
  const cadastro = async (userData: CadastroRequest) => {
    setLoading(true);
    try {
      const result = await authService.cadastro(userData);
      if (result.success) {
        // Cadastro bem-sucedido, mas não faz login automático
        console.log('Usuário cadastrado com sucesso');
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      cadastro, // ✅ ADICIONAR NO PROVIDER
      logout, 
      isAuthenticated, 
      loading, 
      checkAuth 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};