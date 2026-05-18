import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-2 rounded-lg text-sm font-medium ${
    isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'
  }`;

export function Sidebar() {
  const { isEmployee, isManager, isAdmin } = useAuth();

  return (
    <aside className="w-56 shrink-0 p-4 hidden md:block">
      <nav className="space-y-2">
        <NavLink to="/dashboard" end className={linkClass}>
          Dashboard
        </NavLink>
        {(isEmployee || isManager) && (
          <NavLink to="/goals" className={linkClass}>
            Goals
          </NavLink>
        )}
        {isEmployee && (
          <NavLink to="/achievements" className={linkClass}>
            Achievements
          </NavLink>
        )}
        {(isManager || isAdmin) && (
          <NavLink to="/reports" className={linkClass}>
            Reports
          </NavLink>
        )}
        {isAdmin && (
          <NavLink to="/admin" className={linkClass}>
            Admin
          </NavLink>
        )}
      </nav>
    </aside>
  );
}
