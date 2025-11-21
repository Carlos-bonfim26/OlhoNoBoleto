import api from "./API";
import type {
  CadastroRequest,
  LoginRequest,
  User,
} from "../types/index";

export const authService = {
  async login(
    credentials: LoginRequest
  ): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const response = await api.post("/auth/login", credentials);

      return {
        success: true,
        message: response.data,
        user: {
          email: credentials.email,
          senha: credentials.senha,
          role: "ROLE_USER",
        },
      };
    } catch (error: any) {
      const errorMessage = error.response?.data || "Erro ao fazer login";
      return {
        success: false,
        message: errorMessage,
      };
    }
  },
  async cadastro(
    userData: CadastroRequest
  ): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const response = await api.post("/auth/cadastro", userData);

      const userFromBackend = response.data;

      console.log("Usuário criado no backend:", userFromBackend);

      return {
        success: true,
        message: "Cadastro realizado com sucesso",
        user: {
          nome: userFromBackend.nome,
          email: userFromBackend.email,
          senha: userFromBackend.senha,
          role: userFromBackend.role || "ROLE_USER",
        },
      };
    } catch (error: any) {
      const errorMessage = error.response?.data || "Erro ao cadastrar usuário";
      return {
        success: false,
        message: errorMessage,
      };
    }
  },

  async atualizarUsuario(id: string, userData: CadastroRequest): Promise<User> {
    try {
      const response = await api.put(`/auth/atualizar/${id}`, userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data || "Erro ao atualizar usuário");
    }
  },
};
