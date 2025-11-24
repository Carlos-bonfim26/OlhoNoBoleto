// src/services/API.ts
import axios from 'axios';

// Verifica se está em desenvolvimento
const isDevelopment = import.meta.env.MODE === 'development';

const api = axios.create({
  baseURL: isDevelopment
    ? '/api' // Usa proxy no desenvolvimento
    : 'https://tight-roxana-carlosbonfim26-bca61679.koyeb.app',
  timeout: 30000,
  withCredentials: true, // IMPORTANTE para cookies
});

api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} para: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      // Redirecionar para login se não autenticado
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export default api;