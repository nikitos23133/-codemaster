import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

// Интерцептор для JWT
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  async getCourses() {
    const response = await api.get('/courses');
    return response.data;
  }
};
