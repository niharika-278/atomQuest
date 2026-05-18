import React, { useState } from 'react';
import { Goal } from '../../types';
import { goalsService } from '../../services/goals.service';

interface ManagerApprovalPanelProps {
  goal: Goal | null;
  onComplete: () => void;
}

export function ManagerApprovalPanel({ goal, onComplete }: ManagerApprovalPanelProps) {
  const [action, setAction] = useState<'approve' | 'reject'>('approve');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!goal) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-gray-600">
        Select a goal to review
      </div>
    );
  }

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await goalsService.approveGoal(goal.id, action);
      onComplete();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      setError(axiosErr.response?.data?.error || 'Approval failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-bold text-gray-800">Review Goal</h3>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <p className="font-semibold">{goal.title}</p>
      <p className="text-sm text-gray-600">{goal.description}</p>
      <p className="text-sm">Weightage: {goal.weightage}% | Target: {goal.target_value}</p>
      <select
        value={action}
        onChange={(e) => setAction(e.target.value as 'approve' | 'reject')}
        className="w-full px-4 py-2 border rounded-lg"
      >
        <option value="approve">Approve</option>
        <option value="reject">Reject</option>
      </select>
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white font-medium ${
          action === 'approve' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
        } disabled:opacity-50`}
      >
        {loading ? 'Processing...' : action === 'approve' ? 'Approve Goal' : 'Reject Goal'}
      </button>
    </div>
  );
}
