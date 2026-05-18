import React, { useEffect } from 'react';
import { GoalForm } from '../Goals/GoalForm';
import { GoalList } from '../Goals/GoalList';
import { useGoals } from '../../hooks/useGoals';

export function EmployeeDashboard() {
  const { goals, loading, loadGoals } = useGoals();

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  const approved = goals.filter((g) => g.status === 'approved').length;
  const pending = goals.filter((g) => g.status === 'pending_approval').length;

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Employee Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Total Goals" value={goals.length} color="text-blue-600" />
        <StatCard label="Approved" value={approved} color="text-green-600" />
        <StatCard label="Pending" value={pending} color="text-yellow-600" />
      </div>
      <GoalForm onSuccess={loadGoals} />
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Your Goals</h2>
        <GoalList goals={goals} loading={loading} />
      </div>
    </section>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-gray-600 text-sm">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
