import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const logout = useAuthStore((s) => s.logout);
  const isAuthenticated = Boolean(user && accessToken);

  return {
    user,
    accessToken,
    isAuthenticated,
    isEmployee: user?.role === 'EMPLOYEE',
    isManager: user?.role === 'MANAGER',
    isAdmin: user?.role === 'ADMIN',
    logout
  };
}
