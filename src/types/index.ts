export interface LoginRequest {
  email: string;
  senha: string;
}
export interface CadastroRequest {
  nome: string;
  email: string;
  senha: string;
}
export interface ReportRequest {
  usuarioNome: string;
  usuarioId: string;
  beneficiarioNome: string;
  beneficiarioId: string;
  titulo: string;
  descricao: string;
  linhaDigitavel: string;
}
export interface BoletoValidateRequestDTO {
  linhaDigitavel: string;
}
export interface BeneficarioRequest {
  nome: string;
  document: string;
  banco: string;
  agencia: string;
  totalQueixas: number;
}
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    nome: string;
    email: string;
    role?: string;
    senha?: string;
  };
}
export interface User {
  nome?: string;
  email: string;
  senha?: String;
  role?: string;
}
