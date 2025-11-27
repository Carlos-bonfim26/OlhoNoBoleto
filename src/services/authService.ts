import api from "./API";
import type { CadastroRequest, LoginRequest, User, AuthResponse } from "../types";

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      console.log('🔐 Iniciando processo de login...');

      // 🔥 IMPORTANTE: Formato que o Spring Security espera
      const formData = new URLSearchParams();
      formData.append('email', credentials.email);
      formData.append('senha', credentials.senha);

      console.log('📤 Enviando credenciais para /auth/login');
      
      const response = await api.post("/auth/login", formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log('✅ Login bem-sucedido no servidor');

      // Aguardar um pouco para garantir que a sessão foi estabelecida
      await new Promise(resolve => setTimeout(resolve, 100));

      // Buscar dados do usuário autenticado
      const userData = await this.getCurrentUser();
      
      return {
        success: true,
        message: "Login realizado com sucesso",
        user: userData
      };
      
    } catch (error: any) {
      console.error('❌ Falha no login:', error);
      
      let errorMessage = "Erro ao fazer login";
      
      if (error.response?.status === 401) {
        errorMessage = "Email ou senha incorretos";
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = "Não foi possível conectar ao servidor. Verifique sua conexão.";
      } else if (error.response?.data) {
        errorMessage = typeof error.response.data === 'string' 
          ? error.response.data 
          : error.response.data.message || "Erro de autenticação";
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  },

  async cadastro(userData: CadastroRequest): Promise<AuthResponse> {
    try {
      console.log('📝 Iniciando cadastro de usuário...');
      
      const response = await api.post("/auth/cadastro", userData);
      
      console.log('✅ Usuário cadastrado com sucesso');
      
      return {
        success: true,
        message: "Cadastro realizado com sucesso! Você já pode fazer login.",
        user: response.data
      };
      
    } catch (error: any) {
      console.error('❌ Erro no cadastro:', error);
      
      let errorMessage = "Erro ao cadastrar usuário";
      
      if (error.response?.status === 400) {
        errorMessage = error.response.data || "Dados inválidos";
      } else if (error.code === 'ERR_NETWORK') {
        errorMessage = "Erro de conexão com o servidor";
      }

      return {
        success: false,
        message: errorMessage
      };
    }
  },

async getCurrentUser(): Promise<User> {
    try {
      console.log('👤 Buscando dados do usuário atual...');
      
      const response = await api.get("/auth/usuario-atual");
      
      console.log('✅ Dados do usuário obtidos:', response.data);
      
      // Garante que retorna um objeto User com pelo menos email
      const userData: User = {
        id: response.data.id,
        nome: response.data.nome,
        email: response.data.email,
        role: response.data.role
      };
      
      return userData;
      
    } catch (error: any) {
      console.error('❌ Erro ao buscar usuário atual:', error);
      
      if (error.response?.status === 401) {
        throw new Error("Usuário não autenticado");
      }
      
      throw new Error(error.response?.data || "Erro ao carregar dados do usuário");
    }
  },

  async logout(): Promise<void> {
    try {
      console.log('🚪 Realizando logout...');
      
      await api.post("/auth/logout");
      
      console.log('✅ Logout realizado com sucesso');
      
    } catch (error: any) {
      console.error('❌ Erro no logout:', error);
      
      // Mesmo com erro, consideramos o logout como realizado
      // pois podemos limpar o estado local
      throw new Error("Logout realizado (com possíveis avisos)");
    }
  },

  // Método adicional para verificar saúde da API
  async healthCheck(): Promise<boolean> {
    try {
      await api.get("/auth/usuario-atual", { timeout: 5000 });
      return true;
    } catch (error: any) {
      // Se der 401, ainda está respondendo (só não está autenticado)
      if (error.response?.status === 401) {
        return true;
      }
      return false;
    }
  }
};