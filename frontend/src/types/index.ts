export type UserRole = 'EMPLOYEE' | 'MANAGER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department_id?: string;
  manager_id?: string;
}

export interface Goal {
  id: string;
  employee_id: string;
  thrust_area: string;
  title: string;
  description?: string;
  uom_type: 'MIN' | 'MAX' | 'TIMELINE' | 'ZERO';
  target_value: number | string;
  weightage: number | string;
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'archived';
  is_locked: boolean;
  locked_at?: string;
  created_at: string;
  updated_at: string;
  employee?: User;
  achievements?: Achievement[];
}

export interface Achievement {
  id: string;
  goal_id: string;
  quarter_code: string;
  actual_value?: number | string;
  status: 'not_started' | 'on_track' | 'completed';
  progress_score?: number | string;
  created_at: string;
  updated_at: string;
}

export interface CheckIn {
  id: string;
  employee_id: string;
  manager_id: string;
  quarter_code: string;
  comment?: string;
  is_completed: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLogEntry {
  id: string;
  entity_type: string;
  entity_id: string;
  action: string;
  changed_by: string;
  timestamp: string;
  ip_address?: string;
  user?: { id: string; email: string; name: string };
}

export interface Cycle {
  id: string;
  year: number;
  phase: string;
  window_opens: string;
  window_closes: string;
  is_active: boolean;
}
