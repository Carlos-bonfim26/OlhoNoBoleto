import axios from 'axios';


const api = axios.create({
  baseURL:'http://localhost:10000',
  // baseURL: 'https://tight-roxana-carlosbonfim26-bca61679.koyeb.app',
  timeout: 30000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    console.log(`🌐 [${config.method?.toUpperCase()}] ${config.baseURL}${config.url}`);
    
    if (config.method?.toUpperCase() === 'GET') {
      config.params = {
        ...config.params,
        _t: Date.now()
      };
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
    console.log(`✅ [${response.status}] ${response.config.url}`);
    return response;
  },
  (error) => {
    const { response } = error;
    
    console.error('❌ Erro na resposta:', {
      url: error.config?.url,
      status: response?.status,
      data: response?.data,
      message: error.message
    });

    switch (response?.status) {
      case 401:
        console.log('🔐 Não autorizado - usuário não autenticado');
        break;
        
      case 403:
        console.log('🚫 Acesso negado - sem permissão');
        break;
        
      case 404:
        console.log('🔍 Recurso não encontrado');
        break;
        
      case 500:
        console.log('💥 Erro interno do servidor');
        break;
        
      default:
        if (error.code === 'ERR_NETWORK') {
          console.error('🌐 Erro de rede - verifique se o backend está rodando');
        }
        break;
    }

    return Promise.reject(error);
  }
);

export default api;