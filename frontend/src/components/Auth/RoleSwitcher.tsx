import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/auth.service';
import { UserRole } from '../../types';

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

export function RoleSwitcher() {
  const user = useAuthStore((state) => state.user);
  const updateAccessToken = useAuthStore((state) => state.updateAccessToken);
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitchRole = async (newRole: UserRole) => {
    try {
      const response = await authService.switchRole(newRole);
      updateAccessToken(response.access_token, response.role as UserRole);
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Role switch failed:', error);
    }
  };

  if (!DEMO_MODE) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded hover:bg-yellow-200"
      >
        {user?.role} ▼
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
          {(['EMPLOYEE', 'MANAGER', 'ADMIN'] as UserRole[]).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleSwitchRole(role)}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {role}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
