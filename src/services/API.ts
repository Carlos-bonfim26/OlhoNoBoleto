import axios from 'axios';

// Verifica se está em desenvolvimento
const isDevelopment = import.meta.env.MODE === 'development';

const api = axios.create({
  baseURL: isDevelopment 
    ? '/api'  
    : 'https://tight-roxana-carlosbonfim26-bca61679.koyeb.app', 
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} para: ${config.baseURL}${config.url}`);
    console.log('Dados:', config.data);
    
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta recebida:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', error.response?.status, error.response?.data);
    
    if (error.response?.status === 401) {
      localStorage.removeItem('userData');
      localStorage.removeItem('authTimestamp');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;