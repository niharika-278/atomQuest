import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';

// Empty VITE_API_URL → same-origin /api (nginx proxy in Docker prod)
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';
const baseURL = API_URL === '' ? '/api' : `${API_URL.replace(/\/$/, '')}/api`;

const apiClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await apiClient.post('/auth/refresh');
        const { access_token } = response.data as { access_token: string };
        useAuthStore.getState().updateAccessToken(access_token);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
