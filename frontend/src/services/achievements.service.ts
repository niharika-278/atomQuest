import apiClient from './api';
import { Achievement, Goal } from '../types';

export const achievementsService = {
  logAchievement: async (data: Record<string, unknown>) => {
    const response = await apiClient.post<Achievement>('/achievements', data);
    return response.data;
  },

  getQuarterlyAchievements: async (quarterCode: string) => {
    const response = await apiClient.get<Goal[]>(
      `/achievements/quarterly?quarter_code=${encodeURIComponent(quarterCode)}`
    );
    return response.data;
  }
};
