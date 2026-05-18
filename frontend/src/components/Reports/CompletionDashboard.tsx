import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api';

interface CompletionStats {
  total_goals: number;
  approved_goals: number;
  pending_goals: number;
  active_users: number;
  completion_rate: number;
}

export function CompletionDashboard() {
  const [stats, setStats] = useState<CompletionStats | null>(null);

  useEffect(() => {
    apiClient.get<CompletionStats>('/reports/completion').then((r) => setStats(r.data)).catch(console.error);
  }, []);

  if (!stats) return <p>Loading report...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Stat label="Total Goals" value={stats.total_goals} />
      <Stat label="Approved" value={stats.approved_goals} />
      <Stat label="Pending" value={stats.pending_goals} />
      <Stat label="Completion %" value={stats.completion_rate} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-blue-600">{value}</p>
    </div>
  );
}
