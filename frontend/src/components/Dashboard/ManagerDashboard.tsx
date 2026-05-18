import React, { useEffect, useState } from 'react';
import { goalsService } from '../../services/goals.service';
import { Goal } from '../../types';
import { GoalList } from '../Goals/GoalList';
import { ManagerApprovalPanel } from '../Goals/ManagerApprovalPanel';

export function ManagerDashboard() {
  const [pendingGoals, setPendingGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Goal | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await goalsService.getPendingApprovals();
      setPendingGoals(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm">Pending Approvals</p>
          <p className="text-3xl font-bold text-yellow-600">{pendingGoals.length}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Pending Goal Approvals</h2>
          <GoalList
            goals={pendingGoals}
            loading={loading}
            onSelect={setSelected}
            selectedId={selected?.id}
          />
        </div>
        <ManagerApprovalPanel
          goal={selected}
          onComplete={() => {
            setSelected(null);
            load();
          }}
        />
      </div>
    </section>
  );
}
