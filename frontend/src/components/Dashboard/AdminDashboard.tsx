import React, { useState } from 'react';
import { CycleManagement } from '../Admin/CycleManagement';
import { UserManagement } from '../Admin/UserManagement';
import { AuditLog } from '../Admin/AuditLog';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'cycles' | 'users' | 'audit'>('cycles');

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <nav className="flex gap-4 border-b border-gray-200">
        {(['cycles', 'users', 'audit'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium border-b-2 capitalize ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </nav>
      {activeTab === 'cycles' && <CycleManagement />}
      {activeTab === 'users' && <UserManagement />}
      {activeTab === 'audit' && <AuditLog />}
    </section>
  );
}
