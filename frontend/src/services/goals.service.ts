import apiClient from './api';
import { Goal } from '../types';

export const goalsService = {
  createGoal: async (data: Record<string, unknown>) => {
    const response = await apiClient.post<Goal>('/goals', data);
    return response.data;
  },

  getMyGoals: async () => {
    const response = await apiClient.get<Goal[]>('/goals/my-goals');
    return response.data;
  },

  getPendingApprovals: async () => {
    const response = await apiClient.get<Goal[]>('/goals/pending-approvals');
    return response.data;
  },

  approveGoal: async (goalId: string, action: 'approve' | 'reject') => {
    const response = await apiClient.post('/goals/approve', { goalId, action });
    return response.data;
  }
};
