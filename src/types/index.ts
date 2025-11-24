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

export interface User {
  id?: string;
  nome?: string;
  email: string;
  senha?: string;
  role?: string;
}