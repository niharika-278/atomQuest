import { create } from 'zustand';

interface UiStore {
  sidebarOpen: boolean;
  notification: string | null;
  toggleSidebar: () => void;
  setNotification: (message: string | null) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: true,
  notification: null,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setNotification: (notification) => set({ notification })
}));
