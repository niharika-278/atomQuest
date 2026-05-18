import React, { useState } from 'react';
import { goalsService } from '../../services/goals.service';

interface GoalFormProps {
  onSuccess?: () => void;
}

export function GoalForm({ onSuccess }: GoalFormProps) {
  const [formData, setFormData] = useState({
    thrust_area: 'STRATEGIC',
    title: '',
    description: '',
    uom_type: 'MIN',
    target_value: '',
    weightage: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await goalsService.createGoal({
        ...formData,
        target_value: Number(formData.target_value),
        weightage: Number(formData.weightage)
      });
      setFormData({
        thrust_area: 'STRATEGIC',
        title: '',
        description: '',
        uom_type: 'MIN',
        target_value: '',
        weightage: ''
      });
      onSuccess?.();
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { error?: string } } };
      setError(axiosErr.response?.data?.error || 'Failed to create goal');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Create Goal</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Thrust Area</label>
          <select
            value={formData.thrust_area}
            onChange={(e) => setFormData({ ...formData, thrust_area: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            {['STRATEGIC', 'OPERATIONAL', 'TALENT', 'QUALITY', 'INNOVATION'].map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">UoM Type</label>
          <select
            value={formData.uom_type}
            onChange={(e) => setFormData({ ...formData, uom_type: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="MIN">Min (Higher is Better)</option>
            <option value="MAX">Max (Lower is Better)</option>
            <option value="TIMELINE">Timeline</option>
            <option value="ZERO">Zero = Success</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
          <input
            type="number"
            value={formData.target_value}
            onChange={(e) => setFormData({ ...formData, target_value: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Weightage (%)</label>
          <input
            type="number"
            min={10}
            max={100}
            value={formData.weightage}
            onChange={(e) => setFormData({ ...formData, weightage: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:bg-gray-400"
      >
        {isLoading ? 'Creating...' : 'Create Goal'}
      </button>
    </form>
  );
}
