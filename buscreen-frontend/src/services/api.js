import axios from 'axios';

const API_BASE_URL = 'https://projeto-sa-buscreen.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

export const userAPI = {
  cadastro: (userData) => api.post('/users/cadastro', userData),
  login: (email, senha) => api.get(`/users/login?email=${email}&senha=${senha}`),
};

export const linhasAPI = {
    getAll: () => api.get('/linhas'),
    getById: (id) => api.get(`/linhas/${id}`),
    create: (linhaData) => api.post('/linhas/cadastro', linhaData),
    search: (termo) => api.get(`/linhas?search=${termo}`),
  };

export default api;