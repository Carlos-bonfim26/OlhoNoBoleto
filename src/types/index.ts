// src/types/index.ts
export interface LoginRequest {
  email: string;
  senha: string;
}

export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
  role?: string;
}

export interface UpdateProfileRequest { // 🔥 NOVO TIPO
  nome: string;
  email: string;
  senha?: string;
}

export interface User {
  id?: string;
  nome?: string;
  email: string;
  senha?: string;
  role?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
}

export interface ErrorResponse {
  message: string;
  code?: string;
  timestamp?: string;
}