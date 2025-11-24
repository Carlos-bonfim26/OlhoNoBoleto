// // src/contexts/AuthContext.tsx
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { authService } from '../services/authService';
// import type{ User, LoginRequest, CadastroRequest } from '../types';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (credentials: LoginRequest) => Promise<void>;
//   cadastro: (userData: CadastroRequest) => Promise<void>;
//   logout: () => Promise<void>;
//   loading: boolean;
//   checkAuth: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   const checkAuth = async () => {
//     try {
//       const userData = await authService.getCurrentUser();
//       setUser(userData);
//     } catch (error) {
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkAuth();
//   }, []);

//   const login = async (credentials: LoginRequest) => {
//     setLoading(true);
//     try {
//       const result = await authService.login(credentials);
//       if (!result.success) {
//         throw new Error(result.message);
//       }
//       // Após login bem-sucedido, buscar dados do usuário
//       await checkAuth();
//     } catch (error: any) {
//       setUser(null);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cadastro = async (userData: CadastroRequest) => {
//     setLoading(true);
//     try {
//       const result = await authService.cadastro(userData);
//       if (!result.success) {
//         throw new Error(result.message);
//       }
//       // Após cadastro, fazer login automaticamente
//       await login({ email: userData.email, senha: userData.senha });
//     } catch (error: any) {
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     setLoading(true);
//     try {
//       await authService.logout();
//     } catch (error) {
//       console.error('Erro ao fazer logout:', error);
//     } finally {
//       setUser(null);
//       setLoading(false);
//     }
//   };

//   const value = {
//     user,
//     isAuthenticated: !!user,
//     login,
//     cadastro,
//     logout,
//     loading,
//     checkAuth,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };