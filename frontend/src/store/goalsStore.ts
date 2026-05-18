import { create } from 'zustand';
import { Goal } from '../types';

interface GoalsStore {
  goals: Goal[];
  pendingApprovals: Goal[];
  setGoals: (goals: Goal[]) => void;
  setPendingApprovals: (goals: Goal[]) => void;
}

export const useGoalsStore = create<GoalsStore>((set) => ({
  goals: [],
  pendingApprovals: [],
  setGoals: (goals) => set({ goals }),
  setPendingApprovals: (pendingApprovals) => set({ pendingApprovals })
}));
