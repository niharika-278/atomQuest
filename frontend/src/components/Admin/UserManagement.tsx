import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import { User } from '../../types';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'EMPLOYEE' as const,
    password: 'password123'
  });

  const load = async () => {
    try {
      setUsers(await adminService.listUsers());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminService.createUser(formData);
    setShowForm(false);
    load();
  };

  return (
    <section className="space-y-6">
      <button type="button" onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        {showForm ? 'Cancel' : '+ New User'}
      </button>
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow space-y-4">
          <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full border px-4 py-2 rounded-lg" placeholder="Email" />
          <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full border px-4 py-2 rounded-lg" placeholder="Name" />
          <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value as 'EMPLOYEE' })} className="w-full border px-4 py-2 rounded-lg">
            <option value="EMPLOYEE">Employee</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">Create User</button>
        </form>
      )}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3 text-sm text-gray-600">{user.email}</td>
              <td className="px-6 py-3">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
