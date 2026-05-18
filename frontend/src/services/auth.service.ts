import apiClient from './api';
import { User } from '../types';

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  },

  switchRole: async (role: string) => {
    const response = await apiClient.post<{ access_token: string; role: string }>(
      '/auth/demo/switch-role',
      { role }
    );
    return response.data;
  }
};
