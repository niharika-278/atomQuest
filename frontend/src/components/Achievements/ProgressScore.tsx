import React from 'react';
import { formatPercent } from '../../utils/formatters';

interface ProgressScoreProps {
  score?: number | string;
  label?: string;
}

export function ProgressScore({ score, label = 'Progress' }: ProgressScoreProps) {
  const num = typeof score === 'string' ? parseFloat(score) : score ?? 0;
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{formatPercent(num)}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full transition-all"
          style={{ width: `${Math.min(num, 100)}%` }}
        />
      </div>
    </div>
  );
}
