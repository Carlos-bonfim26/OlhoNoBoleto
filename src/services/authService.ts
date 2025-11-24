// // src/services/authService.ts
// import api from "./API";
// import type { CadastroRequest, LoginRequest, User } from "../types/index";

// export const authService = {
//   async login(credentials: LoginRequest): Promise<{ success: boolean; message: string; user?: User }> {
//     try {
//       // Para cookies/sessão, precisamos enviar como form-data
//       const formData = new FormData();
//       formData.append('username', credentials.email);
//       formData.append('password', credentials.senha);

//       const response = await api.post("/auth/login", formData, {
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       });

//       return {
//         success: true,
//         message: response.data.message || "Login bem-sucedido",
//         user: {
//           email: credentials.email,
//           role: "ROLE_USER", // Isso virá do backend no endpoint do usuário atual
//         },
//       };
//     } catch (error: any) {
//       const errorMessage = error.response?.data?.message || error.response?.data || "Erro ao fazer login";
//       return {
//         success: false,
//         message: errorMessage,
//       };
//     }
//   },

//   async cadastro(userData: CadastroRequest): Promise<{ success: boolean; message: string; user?: User }> {
//     try {
//       const response = await api.post("/auth/cadastro", userData);
      
//       return {
//         success: true,
//         message: "Cadastro realizado com sucesso",
//         user: {
//           nome: userData.nome,
//           email: userData.email,
//           role: "ROLE_USER",
//         },
//       };
//     } catch (error: any) {
//       const errorMessage = error.response?.data || "Erro ao cadastrar usuário";
//       return {
//         success: false,
//         message: errorMessage,
//       };
//     }
//   },

//   async getCurrentUser(): Promise<User> {
//     try {
//       const response = await api.get("/auth/usuario-atual");
//       return response.data;
//     } catch (error: any) {
//       throw new Error(error.response?.data || "Erro ao buscar usuário atual");
//     }
//   },

//   async logout(): Promise<void> {
//     try {
//       await api.post("/auth/logout");
//     } catch (error: any) {
//       throw new Error(error.response?.data || "Erro ao fazer logout");
//     }
//   }
// };