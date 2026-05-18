import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import { AuditLogEntry } from '../../types';
import { formatDate } from '../../utils/formatters';

export function AuditLog() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [filter, setFilter] = useState({ entity_type: '', action: '' });

  useEffect(() => {
    adminService
      .getAuditLogs({
        entity_type: filter.entity_type || undefined
      })
      .then(setLogs)
      .catch(console.error);
  }, [filter.entity_type]);

  const filtered = logs.filter((log) => !filter.action || log.action === filter.action);

  return (
    <section className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow grid grid-cols-2 gap-4">
        <select value={filter.entity_type} onChange={(e) => setFilter({ ...filter, entity_type: e.target.value })} className="border px-4 py-2 rounded-lg">
          <option value="">All entities</option>
          <option value="goals">Goals</option>
          <option value="achievements">Achievements</option>
        </select>
        <select value={filter.action} onChange={(e) => setFilter({ ...filter, action: e.target.value })} className="border px-4 py-2 rounded-lg">
          <option value="">All actions</option>
          <option value="create">Create</option>
          <option value="approve">Approve</option>
          <option value="reject">Reject</option>
        </select>
      </div>
      <table className="w-full bg-white rounded-lg shadow overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">Entity</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">User</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Time</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((log) => (
            <tr key={log.id} className="border-t">
              <td className="px-6 py-3">
                <p className="font-medium">{log.entity_type}</p>
                <p className="text-xs text-gray-500">{log.entity_id}</p>
              </td>
              <td className="px-6 py-3">{log.action}</td>
              <td className="px-6 py-3 text-sm">{log.user?.email ?? log.changed_by}</td>
              <td className="px-6 py-3 text-sm">{formatDate(log.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
