import React, { useState } from 'react';
import { achievementsService } from '../../services/achievements.service';
import { Goal } from '../../types';

interface AchievementFormProps {
  goals: Goal[];
  quarterCode?: string;
  onSuccess?: () => void;
}

export function AchievementForm({ goals, quarterCode = 'Q4_2024', onSuccess }: AchievementFormProps) {
  const lockedGoals = goals.filter((g) => g.is_locked && g.status === 'approved');
  const [form, setForm] = useState({
    goal_id: lockedGoals[0]?.id ?? '',
    quarter_code: quarterCode,
    actual_value: '',
    status: 'on_track' as const
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await achievementsService.logAchievement({
        ...form,
        actual_value: Number(form.actual_value)
      });
      onSuccess?.();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      setError(axiosErr.response?.data?.error || 'Failed to log achievement');
    }
  };

  if (lockedGoals.length === 0) {
    return <p className="text-gray-600">No approved locked goals available.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold">Log Achievement</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <select value={form.goal_id} onChange={(e) => setForm({ ...form, goal_id: e.target.value })} className="w-full border px-4 py-2 rounded-lg">
        {lockedGoals.map((g) => (
          <option key={g.id} value={g.id}>{g.title}</option>
        ))}
      </select>
      <input type="text" value={form.quarter_code} onChange={(e) => setForm({ ...form, quarter_code: e.target.value })} className="w-full border px-4 py-2 rounded-lg" />
      <input type="number" required value={form.actual_value} onChange={(e) => setForm({ ...form, actual_value: e.target.value })} className="w-full border px-4 py-2 rounded-lg" placeholder="Actual value" />
      <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as 'on_track' })} className="w-full border px-4 py-2 rounded-lg">
        <option value="not_started">Not started</option>
        <option value="on_track">On track</option>
        <option value="completed">Completed</option>
      </select>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">Save</button>
    </form>
  );
}
