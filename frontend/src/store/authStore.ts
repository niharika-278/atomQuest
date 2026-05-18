import { create } from 'zustand';
import { User } from '../types';

interface AuthStore {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  updateAccessToken: (accessToken: string, role?: User['role']) => void;
  logout: () => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? (JSON.parse(storedUser) as User) : null;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: parsedUser,
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  isLoading: false,
  error: null,

  setAuth: (user, accessToken, refreshToken) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    set({ user, accessToken, refreshToken });
  },

  updateAccessToken: (accessToken, role) => {
    localStorage.setItem('accessToken', accessToken);
    const currentUser = get().user;
    if (currentUser && role) {
      const updated = { ...currentUser, role };
      localStorage.setItem('user', JSON.stringify(updated));
      set({ accessToken, user: updated });
    } else {
      set({ accessToken });
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ user: null, accessToken: null, refreshToken: null });
  },

  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading })
}));
