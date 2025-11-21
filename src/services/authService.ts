import api from "./API";
import type {
  CadastroRequest,
  LoginRequest,
  User,
  
} from "../types/index";

export const authService = {
async login(credentials: LoginRequest): Promise<{ success: boolean; message: string; user?: User; tokens?: { accessToken: string, refreshToken: string } }> {
  try {
    const response = await api.post("/auth/login", credentials);
    const { accessToken, refreshToken, email, role, nome } = response.data;

    // Armazene os tokens no localStorage ou em um estado global (via context)
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return {
      success: true,
      message: 'Login realizado com sucesso',
      user: {
        nome,
        email,
        role,
      },
      tokens: {
        accessToken,
        refreshToken
      }
    };
  } catch (error: any) {
    const errorMessage = error.response?.data || "Erro ao fazer login";
    return {
      success: false,
      message: errorMessage,
    };
  }
},
 async cadastro(userData: CadastroRequest): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const response = await api.post("/auth/cadastro", userData);
    const userFromBackend = response.data;
    return {
      success: true,
      message: "Cadastro realizado com sucesso",
      user: {
        nome: userFromBackend.nome,
        email: userFromBackend.email,
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
