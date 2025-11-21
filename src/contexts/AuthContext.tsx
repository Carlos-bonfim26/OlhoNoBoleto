// src/contexts/AuthContext.tsx (ATUALIZADO)
import React, { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";
import type { User, LoginRequest, CadastroRequest } from "../types/index";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  cadastro: (userData: CadastroRequest) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  atualizarUsuario: (id: string, userData: CadastroRequest) => Promise<void>; // Nova função
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<boolean> => {
    const userData = localStorage.getItem("userData");
    const authTimestamp = localStorage.getItem("authTimestamp");

    if (userData && authTimestamp) {
      const timestamp = parseInt(authTimestamp);
      const now = Date.now();
      const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);

      if (hoursElapsed < 24) {
        setUser(JSON.parse(userData));
        setLoading(false);
        return true;
      } else {
        logout();
        return false;
      }
    }

    setLoading(false);
    return false;
  };

  const login = async (credentials: LoginRequest) => {
    try {
      const response = await authService.login(credentials);

      if (response.success) {
        const userData: User = {
          nome: credentials.email.split("@")[0],
          email: credentials.email,
          senha: credentials.senha,
          role: "ROLE_USER",
        };

        setUser(userData);
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("authTimestamp", Date.now().toString());
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

 const cadastro = async (userData: CadastroRequest) => {
  try {
    const response = await authService.cadastro(userData);

    if (response.success && response.user) {
      setUser(response.user);
      localStorage.setItem('userData', JSON.stringify(response.user));
      localStorage.setItem('authTimestamp', Date.now().toString());
    } else {
      throw new Error(response.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("authTimestamp");
  };
  const atualizarUsuario = async (id: string, userData: CadastroRequest) => {
    try {
      const updatedUser = await authService.atualizarUsuario(id, userData);
      setUser(updatedUser);
      localStorage.setItem("userData", JSON.stringify(updatedUser));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    cadastro,
    logout,
    checkAuth,
    atualizarUsuario,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
