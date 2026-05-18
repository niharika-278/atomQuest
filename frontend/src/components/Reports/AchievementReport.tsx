import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api';
import { formatPercent, formatNumber } from '../../utils/formatters';

interface AchievementRow {
  id: string;
  quarter_code: string;
  progress_score?: number | string;
  goal?: { title: string; target_value: number | string };
  creator?: { name: string };
}

export function AchievementReport() {
  const [rows, setRows] = useState<AchievementRow[]>([]);
  const [quarter, setQuarter] = useState('Q4_2024');

  useEffect(() => {
    apiClient
      .get<AchievementRow[]>('/reports/achievements', { params: { quarter_code: quarter } })
      .then((r) => setRows(r.data))
      .catch(console.error);
  }, [quarter]);

  return (
    <section className="space-y-4">
      <input
        value={quarter}
        onChange={(e) => setQuarter(e.target.value)}
        className="border px-4 py-2 rounded-lg"
        placeholder="Quarter code"
      />
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Goal</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Employee</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Progress</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="px-6 py-3">{row.goal?.title}</td>
              <td className="px-6 py-3">{row.creator?.name}</td>
              <td className="px-6 py-3">
                {formatPercent(row.progress_score)} (target {formatNumber(row.goal?.target_value)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
