import apiClient from './api';
import { AuditLogEntry, Cycle, User } from '../types';

export const adminService = {
  listUsers: async () => {
    const response = await apiClient.get<User[]>('/admin/users');
    return response.data;
  },

  createUser: async (data: Record<string, unknown>) => {
    const response = await apiClient.post<User>('/admin/users', data);
    return response.data;
  },

  toggleUser: async (id: string) => {
    const response = await apiClient.patch(`/admin/users/${id}/toggle`);
    return response.data;
  },

  getAuditLogs: async (params?: { entity_type?: string; entity_id?: string }) => {
    const response = await apiClient.get<AuditLogEntry[]>('/admin/audit-logs', { params });
    return response.data;
  },

  listCycles: async () => {
    const response = await apiClient.get<Cycle[]>('/admin/cycles');
    return response.data;
  },

  createCycle: async (data: Record<string, unknown>) => {
    const response = await apiClient.post<Cycle>('/admin/cycles', data);
    return response.data;
  },

  activateCycle: async (id: string) => {
    const response = await apiClient.patch<Cycle>(`/admin/cycles/${id}/activate`);
    return response.data;
  }
};
