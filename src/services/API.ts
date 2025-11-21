import axios from 'axios';

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

// Variável para controlar se já está tentando renovar o token
let isRefreshing = false;
// Fila de requisições que aguardam o token ser renovado
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    console.log(`🚀 ${config.method?.toUpperCase()} para: ${config.baseURL}${config.url}`);
    console.log('Dados:', config.data);
    const token = localStorage.getItem('accessToken');
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
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Se já está tentando renovar, adiciona a requisição na fila
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        api.post('/auth/refresh', { refreshToken })
          .then(({ data }) => {
            const { accessToken } = data;
            localStorage.setItem('accessToken', accessToken);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            processQueue(null, accessToken);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            logout();
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    console.error('❌ Erro na resposta:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
  window.location.href = '/';
};

export default api;