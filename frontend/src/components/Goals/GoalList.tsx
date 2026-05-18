import React from 'react';
import { Goal } from '../../types';
import { GoalCard } from './GoalCard';

interface GoalListProps {
  goals: Goal[];
  loading?: boolean;
  onSelect?: (goal: Goal) => void;
  selectedId?: string;
}

export function GoalList({ goals, loading, onSelect, selectedId }: GoalListProps) {
  if (loading) return <p className="text-gray-600">Loading goals...</p>;
  if (goals.length === 0) return <p className="text-gray-600">No goals yet</p>;

  return (
    <div className="space-y-4">
      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onSelect={onSelect}
          selected={selectedId === goal.id}
        />
      ))}
    </div>
  );
}
