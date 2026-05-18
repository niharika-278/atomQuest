import React from 'react';
import { Goal } from '../../types';
import { formatNumber, statusLabel } from '../../utils/formatters';

interface GoalCardProps {
  goal: Goal;
  onSelect?: (goal: Goal) => void;
  selected?: boolean;
}

export function GoalCard({ goal, onSelect, selected }: GoalCardProps) {
  return (
    <article
      onClick={() => onSelect?.(goal)}
      className={`border p-4 rounded-lg transition ${
        onSelect ? 'cursor-pointer hover:shadow-md' : ''
      } ${selected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
          {goal.description && <p className="text-sm text-gray-600 mt-1">{goal.description}</p>}
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{goal.thrust_area}</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
              {goal.weightage}% weightage
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
              Target: {formatNumber(goal.target_value)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              goal.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : goal.status === 'pending_approval'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
            }`}
          >
            {statusLabel(goal.status)}
          </span>
          {goal.is_locked && <p className="text-xs text-red-600 mt-1">Locked</p>}
        </div>
      </div>
    </article>
  );
}
