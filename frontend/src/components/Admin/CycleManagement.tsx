import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import { Cycle } from '../../types';
import { formatDate } from '../../utils/formatters';

export function CycleManagement() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    phase: 'goal_setting',
    window_opens: '',
    window_closes: ''
  });

  const load = async () => {
    try {
      setCycles(await adminService.listCycles());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await adminService.createCycle(formData);
    setShowForm(false);
    load();
  };

  return (
    <section className="space-y-6">
      <button
        type="button"
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        {showForm ? 'Cancel' : '+ New Cycle'}
      </button>
      {showForm && (
        <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow space-y-4">
          <input
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value, 10) })}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <select
            value={formData.phase}
            onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="goal_setting">Goal Setting</option>
            <option value="q1_checkin">Q1 Check-in</option>
            <option value="q2_checkin">Q2 Check-in</option>
            <option value="q3_checkin">Q3 Check-in</option>
            <option value="q4_final">Q4 Final</option>
          </select>
          <input type="date" value={formData.window_opens} onChange={(e) => setFormData({ ...formData, window_opens: e.target.value })} className="w-full border px-4 py-2 rounded-lg" required />
          <input type="date" value={formData.window_closes} onChange={(e) => setFormData({ ...formData, window_closes: e.target.value })} className="w-full border px-4 py-2 rounded-lg" required />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">Create</button>
        </form>
      )}
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Year</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Phase</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Window</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cycles.map((cycle) => (
            <tr key={cycle.id} className="border-t">
              <td className="px-6 py-3">{cycle.year}</td>
              <td className="px-6 py-3">{cycle.phase}</td>
              <td className="px-6 py-3 text-sm text-gray-600">
                {formatDate(cycle.window_opens)} – {formatDate(cycle.window_closes)}
              </td>
              <td className="px-6 py-3">{cycle.is_active ? 'Active' : 'Inactive'}</td>
              <td className="px-6 py-3">
                {!cycle.is_active && (
                  <button type="button" onClick={() => adminService.activateCycle(cycle.id).then(load)} className="text-blue-600 text-sm">
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
